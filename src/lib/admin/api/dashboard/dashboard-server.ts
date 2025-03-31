import { requestServer } from "../../base-api-server";
import { billChartDataType } from "./types";

export async function fetchDashboardData(): Promise<{
  name: string;
  billChartData: billChartDataType[];
}> {
  return await requestServer(`/admin/dashboard/home-data`, "GET");
}