import { request } from "../../base-api";
import { Bill } from "./types";

export async function createBill(
  due_date: string,
  past_reading: number,
  present_reading: number,
  current_bill: number,
  monthly_given_bill: number,
  type_of_bill: string,
  add_on: number,
  present_reading_date: string,
  past_reading_date: string,
  lodger_id: string
): Promise<{ success: boolean; bill: Bill }> {
  const result = await request<{ success: boolean; bill: Bill }>(
    `/admin/bills/create-bill`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        due_date,
        past_reading,
        present_reading,
        current_bill,
        monthly_given_bill,
        type_of_bill,
        add_on,
        present_reading_date,
        past_reading_date,
        lodger_id,
      }),
    }
  );

  return result;
}

export async function fetchBills(
  search: string,
  limit: number,
  total: number,
  status: string,
  type_of_bill: string
): Promise<{ count: number; data: Bill[] }> {
  const result = request<{ count: number; data: Bill[] }>(
    `/admin/bills/fetch-bills/${limit}/${total}?search=${search}&status=${status}&type_of_bill=${type_of_bill}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return result;
}

export async function deleteBill(id: string) {
  const result = request(`/admin/bills/delete-bill/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return result;
}

export async function updateStatusBill(bill_id: string, status: string) {
  const result = request(`/admin/bills/update-bill-status/${bill_id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
  return result;
}