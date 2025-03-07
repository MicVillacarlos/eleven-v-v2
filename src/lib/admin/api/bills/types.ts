interface Lodger {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Bill {
  type_of_bill: "electricity" | "water" | "rent" | "";
  lodger: Lodger;
  due_date: string; // ISO date string
  reading_start_date: string; // ISO date string
  reading_end_date: string; // ISO date string
  present_reading: number;
  past_reading: number;
  current_bill: number;
  monthly_given_bill: number;
  add_on: number;
  bill_amount: number;
  status: "unpaid" | "paid" | "pending"; // Extend as needed
  email_sent_status: "undelivered" | "sent" | "pending"; // Extend as needed
  _id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
export interface AddEditBillFormData {
  type_of_bill: "electricity" | "water" | "rent" | "";
  lodger_id: string;
  reading_start_date: string;
  reading_end_date: string;
  present_reading: number;
  past_reading: number;
  current_bill: number;
  monthly_given_bill: number;
  add_on: number;
  due_date: string;
}

// export interface HouseType {
//   key: Key | null | undefined;
//   total_rooms: number;
//   rooms: Room[];
//   room_type: string;
//   price: number;
// }

// export interface GetRoomsApiResponse {
//   data: HouseType[];
//   count: number;
// }

export interface GetRoomAvailablesObject {
  _id: string;
  value: string;
  name: string;
}

export type GetRoomAvailablesApiResponse = {
  data: GetRoomAvailablesObject[];
};

export interface PostBillApiResponse {
  bill: Bill;
}
export interface AddRoomData {
  room_type: string;
  price: number;
  room_number: number;
}
