import { request } from "../../base-api";
import { GetLodgerResponse } from "./types";

export async function getLodgers(
  search: string,
  limit: number,
  total: number
): Promise<GetLodgerResponse> {
  const result = request<GetLodgerResponse>(
    `/admin/lodgers/fetch-lodgers/${limit}/${total}?search=${search}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return result;
}

export async function deleteLodger(id: string){
  const result = request(`/admin/lodgers/delete-lodger/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return result;
}
