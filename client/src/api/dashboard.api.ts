// dashboard.api.ts
import api from "@/lib/api";

export const getDashboardStatistics = async () => {
  const response = await api.get("/dashboard/statistics");
  return response.data.data;
};
