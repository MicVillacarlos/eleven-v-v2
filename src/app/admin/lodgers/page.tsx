export const dynamic = "force-dynamic";
import { fetchLodgersInitial } from "../../../lib/admin/api/lodgers/lodger-server";
import Lodgers from "./lodgers";


export default async function SettingsPage() {
  const { data: initialLodgers, count: initialTotal } =
    await fetchLodgersInitial("", 1, 10);

  return (
    <Lodgers initialLodgers={initialLodgers} initialTotal={initialTotal} />
  );
}
