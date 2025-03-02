
export interface FetchLodgerType {
  _id: string;
  birth_date: string;
  sex: string;
  home_address: string;
  phone_number: string;
  emergency_contact_person: string;
  emergency_contact_number: string;
  occupation: string;
  company_or_school: string;
  room_number: string;
  full_name: string;
  email: string;
  age: number;
  room_id: number
}

export interface GetLodgerResponse {
  count: number;
  data: FetchLodgerType[];
}

export interface AddEditLodger {
  first_name: string;
  last_name: string;
  birth_date: string;
  sex: string;
  home_address: string;
  phone_number: number;
  email: string;
  emergency_contact_person: string;
  emergency_contact_number: number;
  occupation: string;
  company_or_school: string;
  number_of_room_occupants: string;
  room_id: string;
}
