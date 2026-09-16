import prisma from "../../prisma/client";

import { LoanStatus } from "@prisma/client";

import { Customer } from "./customer.types";

import ApiError from "../../core/errors/api-error";

import HTTP_STATUS from "../../shared/constants/http-status";

import MESSAGES from "../../shared/constants/messages";

import { calculateCustomerStatement } from "./customer.statement";

const getCustomers = async (): Promise<Customer[]> => {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return customers;
};

const getEligibleLoanCustomers = async (): Promise<Customer[]> => {
  const customers = await prisma.customer.findMany({
    where: {
      loans: {
        none: {
          status: {
            in: [
              LoanStatus.PENDING,
              LoanStatus.APPROVED,
              LoanStatus.ACTIVE,
              LoanStatus.OVERDUE,
            ],
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return customers as Customer[];
};

const getCustomerStatement = async (customerId: string) => {
  const loans = await prisma.loan.findMany({
    where: {
      customerId,
    },

    include: {
      installments: true,

      customer: true,

      loanOfficer: true,
    },
  });
  const loansWithSummaries = loans.map((loan) => {
    const totalPenalties = loan.installments.reduce(
      (sum, installment) => sum + installment.penaltyAmount,
      0,
    );

    return {
      ...loan,

      summary: {
        totalLoanAmount: loan.totalAmount,

        totalPaidAmount: loan.paidAmount,

        remainingAmount: loan.remainingAmount,

        totalPenalties,

        totalDueAmount: loan.remainingAmount + totalPenalties,
      },
    };
  });
  return calculateCustomerStatement(loansWithSummaries as any);
};

const createCustomer = async (payload: Customer): Promise<Customer> => {
  try {
    const customer = await prisma.customer.create({
      data: payload,
    });

    return customer as Customer;
  } catch (error: any) {
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0];

      if (field === "phone") {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          MESSAGES.CUSTOMER.PHONE_EXISTS,
        );
      }

      if (field === "email") {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          MESSAGES.CUSTOMER.EMAIL_EXISTS,
        );
      }

      if (field === "nationalId") {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          MESSAGES.CUSTOMER.NATIONAL_ID_EXISTS,
        );
      }
    }

    throw error;
  }
};

const updateCustomer = async (
  id: string,
  payload: Customer,
): Promise<Customer> => {
  try {
    const customer = await prisma.customer.update({
      where: {
        id,
      },

      data: payload,
    });

    return customer as Customer;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CUSTOMER.NOT_FOUND);
    }

    if (error.code === "P2002") {
      const field = error.meta?.target?.[0];

      if (field === "phone") {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          MESSAGES.CUSTOMER.PHONE_EXISTS,
        );
      }

      if (field === "email") {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          MESSAGES.CUSTOMER.EMAIL_EXISTS,
        );
      }

      if (field === "nationalId") {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          MESSAGES.CUSTOMER.NATIONAL_ID_EXISTS,
        );
      }
    }

    throw error;
  }
};

const customerService = {
  getCustomers,

  getEligibleLoanCustomers,

  createCustomer,

  updateCustomer,

  getCustomerStatement,
};

export default customerService;
