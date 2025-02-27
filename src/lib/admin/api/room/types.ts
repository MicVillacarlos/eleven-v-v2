import { Key } from "react";

export interface Room {
  room_number: string;
  _id: string;
}

export interface HouseType {
  key: Key | null | undefined;
  total_rooms: number;
  rooms: Room[];
  room_type: string;
  price: number;
}

export interface GetRoomApiResponse {
  data: HouseType[];
  count: number;
}

export interface PostRoomApiResponse {
  room: Room;
}
export interface AddRoomData {
  room_type: string;
  price: number;
  room_number: number;
}
