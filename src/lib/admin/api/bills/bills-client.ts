import { request } from "../../base-api-client";
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
    `/admin/bills`,
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
    `/admin/bills/${limit}/${total}?search=${search}&status=${status}&type_of_bill=${type_of_bill}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return result;
}

export async function fetchBillsMessaging(
  bill_number: number[],
  id: string,
  page: number,
  limit: number
): Promise<{ count: number; data: Bill[]; bill_selected: Bill[] }> {
  const result = request<{
    count: number;
    data: Bill[];
    bill_selected: Bill[];
  }>(
    `/admin/bills/${bill_number}/${id}/${page}/${limit}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return result;
}

export async function deleteBill(id: string) {
  const result = request(`/admin/bills/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return result;
}

export async function updateStatusBill(bill_id: string, status: string) {
  const result = request(`/admin/bills/status/${bill_id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
  return result;
}

export async function sendBillNotification(lodger_id: string, bill_numbers: number[]) {
  const result = request(`/admin/bills/notification/${lodger_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bill_numbers,
    }),
  });
  return result;
}

export async function sendBillOverdueNotification(
  lodger_id: string,
  bill_id: string
): Promise<{ success: boolean, message:string }> {
  const result = request<{ success: boolean, message:string }>(
    `/admin/bills/notification/overdue/${lodger_id}/${bill_id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return result;
}