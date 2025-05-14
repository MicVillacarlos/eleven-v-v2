import { request } from "../../base-api-client";
import { LoginType, UpdatePasswordTypeResult } from "./types";

export async function loginUser(
  email: string,
  password: string
): Promise<LoginType> {
  const result = request<LoginType>("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return result;
}

export async function updatePassword(
  newPassword: string,
  confirmPassword: string,
  oldPassword: string
): Promise<UpdatePasswordTypeResult> {
  const result = request<UpdatePasswordTypeResult>("/admin/auth", {
    method: "PATCH",
    body: JSON.stringify({ newPassword, confirmPassword, oldPassword }),
  });
  return result;
}


export async function addNewAdmin(
  first_name: string,
  last_name: string,
  email: string
): Promise<UpdatePasswordTypeResult> {
  const result = request<UpdatePasswordTypeResult>("/admin/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first_name, last_name, email }),
  });
  return result;
}

