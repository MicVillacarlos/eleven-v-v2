import { requestServer } from "../../base-api-server";
import { GetLodgerResponse, LodgerOption } from "./types";

export async function fetchLodgersInitial(
  search: string,
  limit: number,
  total: number
): Promise<GetLodgerResponse> {
  return await requestServer(
    `/admin/lodgers/${limit}/${total}?search=${search}`,
    "GET"
  );
}


export async function getLodgersOption(): Promise<LodgerOption[]> {
  return await requestServer(
    `/admin/lodgers/dropdown-option`,
    "GET"
  );
}