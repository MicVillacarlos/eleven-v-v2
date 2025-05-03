export const dynamic = "force-dynamic";
import Bills from "./bills"; // Move your client component here
import { fetchBillsInitial } from "../../../lib/admin/api/bills/bills-server";
import { getLodgersOption } from "../../../lib/admin/api/lodgers/lodger-server";


export default async function BillsPage() {
  const { data: initialBills, count: initialTotal } = await fetchBillsInitial(
    "",
    1,
    10,
    "",
    ""
  );
  const result = await getLodgersOption();

  return (
    <Bills
      initialBills={initialBills}
      initialTotal={initialTotal}
      lodgerOptions={result}
    />
  );
}
