import { request } from "../../base-api";
import { GetRoomAvailablesApiResponse } from "./types";

// export async function getRooms(
//   search: string,
//   limit: number,
//   total: number
// ): Promise<GetRoomsApiResponse> {
//   const result = request<GetRoomsApiResponse>(
//     `/admin/room/fetch-rooms/${limit}/${total}?search=${search}`,
//     {
//       method: "GET",
//       credentials: "include",
//     }
//   );
//   return result;
// }

// export async function addRoom(
//   room_type: string,
//   price: number,
//   room_number: string
// ): Promise<PostRoomApiResponse> {
//   const result = request<PostRoomApiResponse>(`/admin/room/create-room`, {
//     method: "POST",
//     body: JSON.stringify({ room_type, price, room_number }),
//   });
//   return result;
// }

// export async function deleteRooom(id: string): Promise<GetRoomsApiResponse> {
//   const result = request<GetRoomsApiResponse>(`/admin/room/delete-room/${id}`, {
//     method: "DELETE",
//     credentials: "include",
//   });
//   return result;
// }