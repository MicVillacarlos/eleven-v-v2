import { fetchBillsMessagingInitial } from "../../../../../lib/admin/api/bills/bills-server";
import { billNumbersFiltered } from "../../../../helpers/helpers";
import Lodger from "./lodger";
interface LodgerMessagingProps {
  params: {
    bill_number: string;
    lodger_id: string;
  };
}

export default async function LodgerId({params}:LodgerMessagingProps) {
  const { bill_number, lodger_id } = params;

  const {
    data: initialBills,
    count: initialTotal,
    bill_selected: billSelected,
  } = await fetchBillsMessagingInitial(billNumbersFiltered(bill_number), lodger_id, 1, 5);

  return <Lodger initialBills={initialBills} initialTotal={initialTotal} billSelected={billSelected} />;
}