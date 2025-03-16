import { cookies } from "next/headers";
import { config } from "../../config/config";

// Ensure this is correctly imported

async function getAuthTokenFromCookies() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");
  return authToken?.value ?? "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function requestServer<T = any>(
  endpoint: string,
  method: string
): Promise<T> {
  try {
    const authToken = await getAuthTokenFromCookies();
    const response = await fetch(`${config.baseAPI}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
