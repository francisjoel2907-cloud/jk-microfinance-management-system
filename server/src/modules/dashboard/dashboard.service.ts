import prisma from "../../prisma/client";

import { LoanStatus } from "@prisma/client";

export interface MonthlyCollection {
  month: string;
  total: number;
}

const getDashboardStatistics = async () => {
  const totalCustomers = await prisma.customer.count();

  const totalLoans = await prisma.loan.count();

  const activeLoans = await prisma.loan.count({
    where: {
      status: LoanStatus.ACTIVE,
    },
  });

  const completedLoans = await prisma.loan.count({
    where: {
      status: LoanStatus.COMPLETED,
    },
  });

  const overdueLoans = await prisma.loan.count({
    where: {
      status: LoanStatus.OVERDUE,
    },
  });

  const disbursedResult = await prisma.loan.aggregate({
    _sum: {
      principalAmount: true,
    },
  });

  const totalDisbursed = disbursedResult._sum.principalAmount || 0;

  const collectedResult = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
  });

  const totalCollected = collectedResult._sum.amount || 0;

  const collectionRate =
    totalDisbursed > 0 ? (totalCollected / totalDisbursed) * 100 : 0;

  return {
    totalCustomers,
    totalLoans,
    activeLoans,
    completedLoans,
    overdueLoans,
    totalDisbursed,
    totalCollected,
    collectionRate,
    monthlyCollections: await getMonthlyCollections(),
    recentPayments: await getRecentPayments(),
  };
};

const getMonthlyCollections = async (): Promise<MonthlyCollection[]> => {
  const payments = await prisma.payment.findMany({
    select: {
      amount: true,
      paymentDate: true,
    },
    orderBy: {
      paymentDate: "asc",
    },
  });

  const grouped = new Map<string, number>();

  payments.forEach((payment) => {
    const month = payment.paymentDate.toLocaleDateString("en-US", {
      month: "short",
    });

    grouped.set(month, (grouped.get(month) ?? 0) + payment.amount);
  });

  return Array.from(grouped.entries()).map(([month, total]) => ({
    month,
    total,
  }));
};

const getRecentPayments = async () => {
  const payments = await prisma.payment.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      loan: {
        include: {
          customer: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return payments.map((payment) => ({
    id: payment.id,
    customerName: `${payment.loan.customer.firstName} ${payment.loan.customer.lastName}`,
    amount: payment.amount,
    paymentMethod: payment.paymentMethod,
    paymentDate: payment.paymentDate,
  }));
};

const dashboardService = {
  getDashboardStatistics,
  getMonthlyCollections,
};

export default dashboardService;
