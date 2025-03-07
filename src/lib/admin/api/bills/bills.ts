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
  reading_end_date: string,
  reading_start_date: string,
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
        reading_end_date,
        reading_start_date,
        lodger_id,
      }),
    }
  );

  return result;
}

// export async function deleteRooom(id: string): Promise<GetRoomsApiResponse> {
//   const result = request<GetRoomsApiResponse>(`/admin/room/delete-room/${id}`, {
//     method: "DELETE",
//     credentials: "include",
//   });
//   return result;
// }
