import { API_BASE_URL } from "../config/api";

type JsonObject = Record<string, unknown>;

const parseJsonResponse = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message =
      (data?.message as string | undefined) ??
      (data?.errors?.fieldErrors as unknown as string | undefined) ??
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data as T;
};

/** Query string for GET requests (skips undefined / empty string). */
export function buildApiQuery(
  params: Record<string, string | number | boolean | undefined>
): string {
  const q = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    q.append(key, String(value));
  }
  const s = q.toString();
  return s ? `?${s}` : "";
}

export async function requestJsonAuth<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  accessToken: string,
  body?: JsonObject
): Promise<T> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
  };
  const init: RequestInit = { method, headers };
  if (body !== undefined && method !== "GET") {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
    });
    return parseJsonResponse<T>(res);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout. Please check backend connection.");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export async function requestJsonPublic<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: JsonObject
): Promise<T> {
  const headers: Record<string, string> = {};
  const init: RequestInit = { method, headers };
  if (body !== undefined && method !== "GET") {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
    });
    return parseJsonResponse<T>(res);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout. Please check backend connection.");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

const requestJson = async <T>(
  path: string,
  body: JsonObject
): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJsonResponse<T>(res);
};

/** Resolves Mongo-style `_id` or `id` from auth API user payloads. */
export function userIdFromApiUser(user: unknown): string | null {
  if (!user || typeof user !== "object") return null;
  const u = user as Record<string, unknown>;
  const raw = u._id ?? u.id;
  if (typeof raw === "string") return raw;
  return null;
}

export type AuthUserProfile = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
};

const getJsonAuth = async <T>(path: string, accessToken: string): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return parseJsonResponse<T>(res);
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
  getUserById: (userId: string, accessToken: string) =>
    getJsonAuth<{
      success: boolean;
      data: AuthUserProfile;
    }>(
      `/api/v1/auth/users/${encodeURIComponent(userId)}`,
      accessToken
    ),
};

