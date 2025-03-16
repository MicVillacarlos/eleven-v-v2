import Bills from "./bills"; // Move your client component here
import { fetchBillsInitial } from "../../../lib/admin/api/bills/bills-server";


export default async function BillsPage() {
  const { data: initialBills, count: initialTotal } = await fetchBillsInitial("", 1, 10, "", "");

  return <Bills initialBills={initialBills} initialTotal={initialTotal} />;
}
