import { useQuery } from "@tanstack/react-query";
import { getDashboardStatistics } from "@/api/dashboard.api";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const data = await getDashboardStatistics();

      return data;
    },
  });
};
