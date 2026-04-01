import { API_BASE_URL } from "../config/api";

type JsonObject = Record<string, unknown>;

const requestJson = async <T>(
  path: string,
  body: JsonObject
): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    // Backend returns different shapes; try to extract something useful.
    const message =
      (data?.message as string | undefined) ??
      (data?.errors?.fieldErrors as unknown as string | undefined) ??
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data as T;
};

export const authApi = {
  login: (email: string, password: string) =>
    requestJson<{ success: boolean; accessToken: string; user: unknown }>(
      "/api/v1/auth/login",
      { email, password }
    ),
  register: (payload: JsonObject) =>
    requestJson<{ success: boolean; accessToken: string; user: unknown }>(
      "/api/v1/auth/register",
      payload
    ),
};

