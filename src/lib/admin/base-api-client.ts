import { config } from "../../config/config";

interface RequestOptions extends RequestInit {
  token?: string;
}

function getAuthTokenFromCookies(): string | null {
  const match = document.cookie.match(/(^|;\s*)authToken=([^;]*)/);
  return match ? decodeURIComponent(match[2]) : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function request<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers = new Headers(fetchOptions.headers);

  const authToken = token || getAuthTokenFromCookies();
  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${config.baseAPI}${endpoint}`, {
    ...fetchOptions,
    headers,
    credentials: "include", 
  });

  if (!response.ok) {
    const errorText = await response.json();
    throw { ...errorText, status: response.status };
  }

  return response.json();
}
