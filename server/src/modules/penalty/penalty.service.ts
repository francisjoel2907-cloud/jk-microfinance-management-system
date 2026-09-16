import prisma from "../../prisma/client";
import { LoanStatus, InstallmentStatus } from "@prisma/client";
import { calculatePenalty } from "./penalty.utils";

const updateOverdueLoans = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get every loan with its installments
  const loans = await prisma.loan.findMany({
    include: {
      installments: true,
    },
  });

  let updatedLoans = 0;
  let updatedInstallments = 0;

  for (const loan of loans) {
    // -----------------------------
    // 1. Loan already completed
    // -----------------------------
    if (loan.remainingAmount <= 0) {
      if (loan.status !== LoanStatus.COMPLETED) {
        await prisma.loan.update({
          where: { id: loan.id },
          data: { status: LoanStatus.COMPLETED },
        });

        updatedLoans++;
      }

      continue;
    }

    let hasOverdueInstallment = false;

    // -----------------------------
    // 2. Process every installment
    // -----------------------------
    for (const installment of loan.installments) {
      if (installment.status === InstallmentStatus.PAID) {
        continue;
      }

      if (installment.dueDate < today) {
        const { penaltyAmount } = calculatePenalty(installment.dueDate);

        await prisma.installment.update({
          where: { id: installment.id },
          data: {
            status: InstallmentStatus.OVERDUE,
            penaltyAmount,
          },
        });

        hasOverdueInstallment = true;
        updatedInstallments++;
      }
    }

    // -----------------------------
    // 3. Update loan status
    // -----------------------------
    const newStatus = hasOverdueInstallment
      ? LoanStatus.OVERDUE
      : LoanStatus.ACTIVE;

    if (loan.status !== newStatus) {
      await prisma.loan.update({
        where: { id: loan.id },
        data: {
          status: newStatus,
        },
      });

      updatedLoans++;
    }
  }

  return {
    updatedLoans,
    updatedInstallments,
  };
};

const penaltyService = {
  calculatePenalty,
  updateOverdueLoans,
};

export default penaltyService;
