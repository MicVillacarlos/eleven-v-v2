import { requestServer } from "../../base-api-server";
import { GetRoomsApiResponse } from "./types";

export async function fetchRoomsInitial(
  search: string,
  limit: number,
  total: number
): Promise<GetRoomsApiResponse> {
  return await requestServer(
    `/admin/room/${limit}/${total}?search=${search}`,
    "GET"
  );
}