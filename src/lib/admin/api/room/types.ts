import { Key } from "react";

export interface Room {
  room_number: string;
  _id: string;
}

export interface HouseType {
  _id: string;
  key: Key | null | undefined;
  total_rooms: number;
  rooms: Room[];
  room_type: string;
  price: number;
}

export interface GetRoomsApiResponse {
  data: HouseType[];
  count: number;
}

export interface GetRoomAvailablesObject {
  _id: string;
  value: string;
  name: string;
}

export type GetRoomAvailablesApiResponse = {
  data: GetRoomAvailablesObject[]
};

export interface PostRoomApiResponse {
  room: Room;
}
export interface AddRoomData {
  room_type: string;
  price: number;
  room_number: number;
}
