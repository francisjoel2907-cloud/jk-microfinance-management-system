import prisma from "../../prisma/client";

import { LoanStatus } from "@prisma/client";

import { InstallmentStatus } from "../installment/installment.types";

const updateOverdueLoans = async () => {
  const today = new Date();

  const result = await prisma.loan.updateMany({
    where: {
      status: {
        in: [LoanStatus.ACTIVE, LoanStatus.PENDING],
      },

      dueDate: {
        lt: today,
      },

      remainingAmount: {
        gt: 0,
      },
    },

    data: {
      status: LoanStatus.OVERDUE,
    },
  });

  console.log(`${result.count} overdue loans updated`);

  const overdueInstallments = await prisma.installment.findMany({
    where: {
      dueDate: {
        lt: today,
      },

      status: {
        not: InstallmentStatus.PAID,
      },
    },
  });

  for (const installment of overdueInstallments) {
    await prisma.installment.update({
      where: {
        id: installment.id,
      },

      data: {
        status: InstallmentStatus.OVERDUE,

        penaltyAmount:
          installment.penaltyAmount === 0 ? 5000 : installment.penaltyAmount,
      },
    });
  }

  console.log(`${overdueInstallments.length} overdue installments updated`);
};

export default updateOverdueLoans;
