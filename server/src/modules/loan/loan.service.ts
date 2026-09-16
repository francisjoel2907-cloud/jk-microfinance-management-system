import prisma from "../../prisma/client";

import type { Loan, CreateLoanPayload } from "./loan.types";

import { LoanStatus } from "@prisma/client";

import ApiError from "../../core/errors/api-error";

import HTTP_STATUS from "../../shared/constants/http-status";

import MESSAGES from "../../shared/constants/messages";

import installmentService from "../installment/installment.service";

import { calculateLoanSummary } from "./loan.summary";

import { calculateLoanStatistics } from "./loan.statistics";

import penaltyService from "../penalty/penalty.service";

const getLoans = async (): Promise<{
  statistics: {
    totalLoans: number;
    activeLoans: number;
    completedLoans: number;
    overdueLoans: number;
    pendingLoans: number;
    totalPortfolio: number;
  };
  loans: Loan[];
}> => {
  await penaltyService.updateOverdueLoans();
  const loans = await prisma.loan.findMany({
    include: {
      customer: true,

      loanOfficer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
        },
      },

      installments: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const loansWithSummary = loans.map((loan) => {
    const totalPenalties = loan.installments.reduce(
      (sum, installment) => sum + installment.penaltyAmount,
      0,
    );

    const summary = calculateLoanSummary(
      loan.totalAmount,
      loan.paidAmount,
      loan.remainingAmount,
      totalPenalties,
    );

    return {
      ...loan,
      summary,
    };
  });

  const statistics = calculateLoanStatistics(loansWithSummary as Loan[]);

  return {
    statistics,
    loans: loansWithSummary,
  };
};

const getLoanById = async (loanId: string): Promise<Loan> => {
  await penaltyService.updateOverdueLoans();

  const loan = await prisma.loan.findUnique({
    where: {
      id: loanId,
    },

    include: {
      customer: true,

      loanOfficer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
        },
      },

      installments: {
        orderBy: {
          installmentNumber: "asc",
        },
      },

      payments: {
        orderBy: {
          paymentDate: "desc",
        },
      },
    },
  });

  if (!loan) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.LOAN.NOT_FOUND);
  }

  const totalPenalties = loan.installments.reduce(
    (sum, installment) => sum + installment.penaltyAmount,
    0,
  );

  const summary = calculateLoanSummary(
    loan.totalAmount,
    loan.paidAmount,
    loan.remainingAmount,
    totalPenalties,
  );

  return {
    ...loan,
    summary,
  } as Loan;
};

const createLoan = async (
  payload: CreateLoanPayload,
  loanOfficerId: string,
): Promise<Loan> => {
  const existingLoan = await prisma.loan.findFirst({
    where: {
      customerId: payload.customerId,

      status: {
        in: [LoanStatus.PENDING, LoanStatus.ACTIVE, LoanStatus.OVERDUE],
      },
    },
  });

  if (existingLoan) {
    throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.LOAN.ACTIVE_LOAN_EXISTS);
  }

  if (payload.interestRate > 30) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Interest rate cannot exceed 30%",
    );
  }

  const principalAmount = payload.principalAmount;

  const interestRate = payload.interestRate;

  const interestAmount = (principalAmount * interestRate) / 100;

  const totalAmount = principalAmount + interestAmount;

  const remainingAmount = totalAmount;

  const issuedDate = new Date(payload.issuedDate);

  const dueDate = new Date(issuedDate);

  dueDate.setMonth(dueDate.getMonth() + payload.durationMonths);

  const loan = await prisma.loan.create({
    data: {
      customerId: payload.customerId,

      loanOfficerId,

      principalAmount,

      interestRate,

      totalAmount,

      paidAmount: 0,

      remainingAmount,

      durationMonths: payload.durationMonths,

      issuedDate,

      dueDate,

      status: LoanStatus.PENDING,
    },
  });

  await installmentService.generateInstallments({
    loanId: loan.id,

    totalAmount,

    durationMonths: payload.durationMonths,

    issuedDate,
  });

  return loan as Loan;
};

const loanService = {
  getLoans,

  getLoanById,

  createLoan,
};

export default loanService;
