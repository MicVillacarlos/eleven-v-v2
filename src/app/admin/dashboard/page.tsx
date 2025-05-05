export const dynamic = "force-dynamic";
import { fetchDashboardInitial } from "../../../lib/admin/api/dashboard/dashboard-server";
import Dashboard from "./dashboard";

export default async function DashboardPage() {
  const { name, billChartData, room, dayString, day, month, year } =
    await fetchDashboardInitial();

  return (
    <Dashboard
      name={name}
      billChartData={billChartData}
      roomData={room}
      dayString={dayString}
      day={day}
      year={year}
      month={month}
    />
  );
}
