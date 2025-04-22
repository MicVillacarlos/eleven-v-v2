

export interface Bill {
  _id: string;
  lodger_id: string;
  lodger_full_name: string;
  room_number: string;
  bill_number: string;
  due_date: string;
  past_reading_date: string;
  present_reading_date: string;
  past_reading: number;
  present_reading: number;
  monthly_given_bill: number;
  type_of_bill: string;
  bill_amount: number;
  status: string; // Assuming only these two statuses exist
  email_sent_status: boolean; // Assuming these values
}

export interface AddEditBillFormData {
  type_of_bill: "electricity" | "water" | "rent" | "";
  lodger_id: string;
  past_reading_date: string;
  present_reading_date: string;
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
