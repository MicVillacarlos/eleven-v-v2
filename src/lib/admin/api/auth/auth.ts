import { config } from "../../../../config/config";
import { LoginResponse, RequestOptions } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function request<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers = new Headers(fetchOptions.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${config.baseAPI}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "An error occurred");
  }
  return response.json();
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {

  return request<LoginResponse>("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
