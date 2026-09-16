import prisma from "../../prisma/client";

const getCollectionReport = async (
  period?: string,
  startDate?: string,
  endDate?: string,
) => {
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

  const collected = await prisma.payment.aggregate({
    where:
      Object.keys(dateFilter).length > 0
        ? { paymentDate: dateFilter }
        : undefined,
    _sum: { amount: true },
  });

  const paymentsCount = await prisma.payment.count({
    where:
      Object.keys(dateFilter).length > 0
        ? { paymentDate: dateFilter }
        : undefined,
  });

  return {
    totalCollected: collected._sum.amount || 0,
    todayCollections: period === "today" ? collected._sum.amount || 0 : 0,
    monthlyCollections: period === "month" ? collected._sum.amount || 0 : 0,
    paymentsCount,
  };
};

const getPaymentReport = async (
  period?: string,
  startDate?: string,
  endDate?: string,
) => {
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
    where: {
      ...(Object.keys(dateFilter).length > 0 && {
        paymentDate: dateFilter,
      }),
    },

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

  return payments.map((payment) => ({
    id: payment.id,
    customerName: `${payment.loan.customer.firstName} ${payment.loan.customer.lastName}`,
    phone: payment.loan.customer.phone,
    amount: payment.amount,
    paymentMethod: payment.paymentMethod,
    paymentDate: payment.paymentDate,
    referenceNumber: payment.referenceNumber,
    processedBy: `${payment.processedBy.firstName} ${payment.processedBy.lastName}`,
  }));
};

const reportService = {
  getCollectionReport,
  getPaymentReport,
};

export default reportService;
