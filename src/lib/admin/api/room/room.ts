import { request } from "../../base-api";
import { GetRoomApiResponse } from "./types";

export async function getRooms(
  search: string,
  limit: number,
  total: number
): Promise<GetRoomApiResponse> {
  const result = request<GetRoomApiResponse>(
    `/admin/room/fetch-rooms/${limit}/${total}?search=${search}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return result;
}
