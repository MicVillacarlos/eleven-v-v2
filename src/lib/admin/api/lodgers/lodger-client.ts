import { request } from "../../base-api-client";
import { AddEditLodger, GetLodgerResponse} from "./types";

export async function getLodgers(
  search: string,
  limit: number,
  total: number
): Promise<GetLodgerResponse> {
  const result = request<GetLodgerResponse>(
    `/admin/lodgers/${limit}/${total}?search=${search}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return result;
}

export async function deleteLodger(id: string) {
  const result = request(`/admin/lodgers/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return result;
}

export async function addLodger(
  first_name: string,
  last_name: string,
  birth_date: string,
  sex: string,
  home_address: string,
  phone_number: string,
  email: string,
  emergency_contact_person: string,
  emergency_contact_number: string,
  occupation: string,
  company_or_school: string,
  number_of_room_occupants: number,
  room_id: string
): Promise<{ user: AddEditLodger }> {
  const result = request<{ user: AddEditLodger }>(
    `/admin/lodgers`,
    {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        birth_date,
        sex,
        home_address,
        phone_number,
        email,
        emergency_contact_person,
        emergency_contact_number,
        occupation,
        company_or_school,
        number_of_room_occupants,
        room_id,
      }),
    }
  );
  return result;
}

export async function updateLodger(
  lodger_id:string,
  first_name: string,
  last_name: string,
  birth_date: string,
  sex: string,
  home_address: string,
  phone_number: string,
  email: string,
  emergency_contact_person: string,
  emergency_contact_number: string,
  occupation: string,
  company_or_school: string,
  number_of_room_occupants: number,
  room_id: string
): Promise<{ user: AddEditLodger }> {
  const result = request<{ user: AddEditLodger }>(
    `/admin/lodgers/${lodger_id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        first_name,
        last_name,
        birth_date,
        sex,
        home_address,
        phone_number,
        email,
        emergency_contact_person,
        emergency_contact_number,
        occupation,
        company_or_school,
        number_of_room_occupants,
        room_id,
      }),
    }
  );
  return result;
}

export async function getLodgerDetails(id: string) {
  const result = request(
    `/admin/lodgers/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return result;
}
