
export interface Lodger {
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
  data: Lodger[];
}