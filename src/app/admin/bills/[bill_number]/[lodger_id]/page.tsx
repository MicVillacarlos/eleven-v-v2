import { fetchBillsMessagingInitial } from "../../../../../lib/admin/api/bills/bills-server";
import { billNumbersFiltered } from "../../../../helpers/helpers";
import Lodger from "./lodger";
interface LodgerMessagingProps {
  params: Promise<{ bill_number: string; lodger_id: string }>;
}

export default async function generateMetaData({
  params,
}: LodgerMessagingProps) {
  const { bill_number, lodger_id } = await params;

  const {
    data: initialBills,
    count: initialTotal,
    bill_selected: billSelected,
  } = await fetchBillsMessagingInitial(
    billNumbersFiltered(bill_number),
    lodger_id,
    1,
    5
  );

  return (
    <Lodger
      initialBills={initialBills}
      initialTotal={initialTotal}
      billSelected={billSelected}
    />
  );
}