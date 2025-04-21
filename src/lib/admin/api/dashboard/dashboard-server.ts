import { requestServer } from "../../base-api-server";
import { billChartDataType } from "./types";

export async function fetchDashboardInitial(): Promise<{
  name: string;
  billChartData: billChartDataType[];
  room: billChartDataType[];
  dayString: string;
  month: string;
  day: string;
  year: string;
}> {
  return await requestServer(`/admin/dashboard/home`, "GET");
}
