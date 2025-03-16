import { requestServer } from "../../base-api-server";
import { GetLodgerResponse } from "./types";

export async function fetchLodgersInitial(
  search: string,
  limit: number,
  total: number
): Promise<GetLodgerResponse> {
  return await requestServer(
    `/admin/lodgers/fetch-lodgers/${limit}/${total}?search=${search}`,
    "GET"
  );
}