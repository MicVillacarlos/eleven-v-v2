import { request } from "../../base-api";
import { LoginType } from "./types";

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
