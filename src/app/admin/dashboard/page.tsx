import { fetchDashboardData } from "../../../lib/admin/api/dashboard/dashboard-server";
import Dashboard from "./dashboard";

export default async function DashboardPage() {
  const { name, billChartData } = await fetchDashboardData();

  return <Dashboard name={name} billChartData={billChartData} />;
}
