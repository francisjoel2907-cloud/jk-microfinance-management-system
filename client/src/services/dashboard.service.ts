import { getDashboardStatistics as getDashboardStatisticsApi } from "@/api/dashboard.api";

import type { DashboardStatistics } from "@/types/dashboard.types";

export const getDashboardStatistics =
  async (): Promise<DashboardStatistics> => {
    const response = await getDashboardStatisticsApi();

    return response.data.data;
  };
