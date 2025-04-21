import { request } from "../../base-api-client";
import {
  GetRoomAvailablesApiResponse,
  GetRoomsApiResponse,
  PostRoomApiResponse,
} from "./types";

export async function getRooms(
  search: string,
  limit: number,
  total: number
): Promise<GetRoomsApiResponse> {
  const result = request<GetRoomsApiResponse>(
    `/admin/room/${limit}/${total}?search=${search}`,
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
  const result = request<PostRoomApiResponse>(`/admin/room`, {
    method: "POST",
    body: JSON.stringify({ room_type, price, room_number }),
  });
  return result;
}

export async function deleteRooom(id: string): Promise<GetRoomsApiResponse> {
  const result = request<GetRoomsApiResponse>(`/admin/room/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return result;
}

export async function getAvailableRooms(): Promise<GetRoomAvailablesApiResponse> {
  const result = request<GetRoomAvailablesApiResponse>(
    `/admin/room/available`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return result;
}
