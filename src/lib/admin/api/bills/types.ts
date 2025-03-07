interface Lodger {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Bill {
  bill_number: number;
  type_of_bill: string;
  lodger: Lodger;
  due_date: string;
  reading_start_date: string;
  reading_end_date: string;
  present_reading: number;
  past_reading: number;
  current_bill: number;
  monthly_given_bill: number;
  add_on: number;
  bill_amount: number;
  room_number: string;
  status: string;
  email_sent_status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
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
