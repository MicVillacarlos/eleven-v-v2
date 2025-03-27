import { fetchBillsMessagingInitial } from "../../../../../lib/admin/api/bills/bills-server";
import Lodger from "./lodger";
interface LodgerMessagingProps {
  params: {
    bill_number: string;
    lodger_id: string;
  };
}

export default async function LodgerId({params}:LodgerMessagingProps) {
  const { bill_number, lodger_id } = params;
  const billNumbersFiltered = bill_number
    .split(",")
    .map((num) => Number(num.slice(2)));

  const { data: initialBills, count: initialTotal } =
    await fetchBillsMessagingInitial(billNumbersFiltered, lodger_id, 1, 5);

  return <Lodger initialBills={initialBills} initialTotal={initialTotal} />;
}