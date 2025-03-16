import { request } from "../../base-api-client";
import { LoginType, UpdatePasswordType } from "./types";

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
): Promise<UpdatePasswordType> {
  const result = request<UpdatePasswordType>("/admin/auth/update-password", {
    method: "PUT",
    body: JSON.stringify({ newPassword, confirmPassword, oldPassword }),
  });
  return result;
}
