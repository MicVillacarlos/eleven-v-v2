import { request } from "../../base-api";
import { GetRoomApiResponse, PostRoomApiResponse } from "./types";

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

export async function addRoom(
  room_type: string,
  price: number,
  room_number: string
): Promise<PostRoomApiResponse> {
  const result = request<PostRoomApiResponse>(
    `/admin/room/create-room`,
    {
      method: "POST",
      body: JSON.stringify({ room_type, price,room_number }),
    }
  );
  return result;
}

export async function deleteRooom(
  id: string,
): Promise<GetRoomApiResponse> {
  const result = request<GetRoomApiResponse>(`/admin/room/delete-room/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return result;
}
