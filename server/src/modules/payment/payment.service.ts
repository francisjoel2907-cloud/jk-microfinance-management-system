import prisma from "../../prisma/client";
import {
  Payment,
  CreatePaymentPayload,
  PaymentHistory,
  PaymentMethod,
} from "./payment.types";
import { LoanStatus } from "@prisma/client";

import ApiError from "../../core/errors/api-error";

import HTTP_STATUS from "../../shared/constants/http-status";

import MESSAGES from "../../shared/constants/messages";

import { InstallmentStatus } from "../installment/installment.types";

import { createPaymentReceipt } from "./payment.receipt";

import { AuditAction, AuditEntity } from "../audit/audit.types";

const getPayments = async (
  period?: string,
  startDate?: string,
  endDate?: string,
): Promise<PaymentHistory[]> => {
  const now = new Date();

  let dateFilter: { gte?: Date; lte?: Date } = {};

  switch (period) {
    case "today": {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);

      const end = new Date(now);
      end.setHours(23, 59, 59, 999);

      dateFilter = { gte: start, lte: end };
      break;
    }

    case "week": {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);

      dateFilter = { gte: start, lte: end };
      break;
    }

    case "month": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);

      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);

      dateFilter = { gte: start, lte: end };
      break;
    }

    case "year": {
      const start = new Date(now.getFullYear(), 0, 1);

      const end = new Date(now.getFullYear(), 11, 31);
      end.setHours(23, 59, 59, 999);

      dateFilter = { gte: start, lte: end };
      break;
    }

    case "custom": {
      if (startDate && endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        dateFilter = { gte: start, lte: end };
      }
      break;
    }
  }

  const payments = await prisma.payment.findMany({
    where:
      Object.keys(dateFilter).length > 0
        ? {
            paymentDate: dateFilter,
          }
        : undefined,

    include: {
      loan: {
        include: {
          customer: {
            select: {
              firstName: true,
              lastName: true,
              phone: true,
            },
          },
        },
      },

      processedBy: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },

    orderBy: {
      paymentDate: "desc",
    },
  });

  const result: PaymentHistory[] = payments.map(
    (payment): PaymentHistory => ({
      id: payment.id,
      customerName: `${payment.loan.customer.firstName} ${payment.loan.customer.lastName}`,
      phone: payment.loan.customer.phone,
      amount: payment.amount,
      paymentMethod:
        PaymentMethod[payment.paymentMethod as keyof typeof PaymentMethod],
      paymentDate: payment.paymentDate,
      referenceNumber: payment.referenceNumber,
      processedBy: `${payment.processedBy.firstName} ${payment.processedBy.lastName}`,
    }),
  );

  return result;
};

const createPayment = async (
  payload: CreatePaymentPayload,
  processedById: string,
) => {
  return prisma.$transaction(async (tx) => {
    // 1. Get the loan inside the transaction
    const loan = await tx.loan.findUnique({
      where: {
        id: payload.loanId,
      },
    });

    if (!loan) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.LOAN.NOT_FOUND);
    }

    if (loan.status === LoanStatus.COMPLETED) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Loan already completed");
    }

    if (payload.amount > loan.remainingAmount) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Payment exceeds remaining loan amount",
      );
    }
    // Duplicate payment protection (10 seconds)
    const tenSecondsAgo = new Date(Date.now() - 10 * 1000);

    const duplicatePayment = await tx.payment.findFirst({
      where: {
        loanId: payload.loanId,

        processedById,

        amount: payload.amount,

        paymentMethod: payload.paymentMethod,

        paymentDate: new Date(payload.paymentDate),

        createdAt: {
          gte: tenSecondsAgo,
        },
      },
    });

    if (duplicatePayment) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        "Duplicate payment detected. Please wait before submitting again.",
      );
    }

    // 2. Get all unpaid installments
    const installments = await tx.installment.findMany({
      where: {
        loanId: payload.loanId,
        status: {
          not: InstallmentStatus.PAID,
        },
      },
      orderBy: {
        installmentNumber: "asc",
      },
    });

    if (installments.length === 0) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "All installments already paid",
      );
    }

    // 3. Allocate payment across installments
    let remainingPayment = payload.amount;

    for (const installment of installments) {
      if (remainingPayment <= 0) break;

      const balance =
        installment.amount + installment.penaltyAmount - installment.paidAmount;

      if (balance <= 0) continue;

      const paymentToApply = Math.min(balance, remainingPayment);

      const newPaidAmount = installment.paidAmount + paymentToApply;

      const isFullyPaid =
        newPaidAmount >= installment.amount + installment.penaltyAmount;

      await tx.installment.update({
        where: {
          id: installment.id,
        },
        data: {
          paidAmount: newPaidAmount,

          penaltyAmount: isFullyPaid ? 0 : installment.penaltyAmount,

          status: isFullyPaid
            ? InstallmentStatus.PAID
            : InstallmentStatus.PENDING,

          paidDate: isFullyPaid ? new Date() : null,
        },
      });

      remainingPayment -= paymentToApply;
    }
    // 4. Calculate updated loan state
    const updatedPaidAmount = loan.paidAmount + payload.amount;

    const updatedRemainingAmount = Math.max(
      0,
      loan.remainingAmount - payload.amount,
    );

    const updatedStatus =
      updatedRemainingAmount === 0 ? LoanStatus.COMPLETED : LoanStatus.ACTIVE;

    // 6. Generate payment reference
    const referenceNumber =
      payload.paymentMethod === "CASH"
        ? `CASH-${Date.now()}`
        : payload.referenceNumber;

    // 6A. Prevent duplicate external references
    if (payload.paymentMethod !== PaymentMethod.CASH && referenceNumber) {
      const existingReference = await tx.payment.findUnique({
        where: {
          referenceNumber,
        },
      });

      if (existingReference) {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          "This payment reference already exists.",
        );
      }
    }

    // 7. Create payment
    const payment = await tx.payment.create({
      data: {
        loanId: payload.loanId,

        processedById,

        amount: payload.amount,

        paymentMethod: payload.paymentMethod,

        paymentDate: new Date(payload.paymentDate),

        referenceNumber,

        notes: payload.notes,
      },
    });

    // 8. Concurrency-safe loan update
    const loanUpdate = await tx.loan.updateMany({
      where: {
        id: loan.id,

        remainingAmount: {
          gte: payload.amount,
        },
      },

      data: {
        paidAmount: updatedPaidAmount,

        remainingAmount: updatedRemainingAmount,

        status: updatedStatus,
      },
    });

    if (loanUpdate.count === 0) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        "Loan balance changed. Please retry the payment.",
      );
    }

    // 9. Create audit log INSIDE the same transaction
    await tx.auditLog.create({
      data: {
        userId: processedById,

        action: AuditAction.PAYMENT,

        entity: AuditEntity.PAYMENT,

        entityId: payment.id,

        description: `Recorded payment of ${payload.amount} for loan ${loan.id}`,
      },
    });

    // 10. Create receipt
    const receipt = createPaymentReceipt(payment as Payment);

    // Everything above succeeds together.
    // Prisma commits the transaction automatically.
    return {
      payment,

      receipt,
    };
  });
};

const getPaymentReceipt = async (paymentId: string): Promise<any> => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },

    include: {
      loan: true,

      processedBy: {
        select: {
          id: true,

          firstName: true,

          lastName: true,

          email: true,

          role: true,
        },
      },
    },
  });

  if (!payment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Payment not found");
  }

  const receipt = createPaymentReceipt(payment as Payment);

  return {
    payment,

    receipt,
  };
};

const paymentService = {
  getPayments,

  createPayment,

  getPaymentReceipt,
};

export default paymentService;
