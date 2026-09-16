import prisma from "../../prisma/client";

import {
  InstallmentStatus,
  InstallmentGenerationPayload,
} from "./installment.types";

const generateInstallments = async (payload: InstallmentGenerationPayload) => {
  const installmentAmount =
    Math.round((payload.totalAmount / payload.durationMonths) * 100) / 100;

  for (let month = 1; month <= payload.durationMonths; month++) {
    const amount =
      month === payload.durationMonths
        ? Math.round(
            (payload.totalAmount -
              installmentAmount * (payload.durationMonths - 1)) *
              100,
          ) / 100
        : installmentAmount;

    const dueDate = new Date(payload.issuedDate);

    dueDate.setMonth(dueDate.getMonth() + month);

    await prisma.installment.create({
      data: {
        loanId: payload.loanId,

        installmentNumber: month,

        amount,

        paidAmount: 0,

        dueDate,

        status: InstallmentStatus.PENDING,
      },
    });
  }
};

const installmentService = {
  generateInstallments,
};

export default installmentService;
