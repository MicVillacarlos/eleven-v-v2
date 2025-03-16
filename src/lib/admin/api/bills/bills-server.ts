import { Bill } from "./types";
import { requestServer } from "../../base-api-server";

export async function fetchBillsInitial(
  search: string,
  limit: number,
  total: number,
  status: string,
  type_of_bill: string
): Promise<{ count: number; data: Bill[] }> {
  return await requestServer(
    `/admin/bills/fetch-bills/${limit}/${total}?search=${search}&status=${status}&type_of_bill=${type_of_bill}`,
    "GET"
  );
}