import { cookies } from "next/headers";

export const USERS = [
  {
    id: "user-1",
    email: "abebe@addiseats.et",
    name: "Abebe Kebede",
    role: "customer"
  },
  {
    id: "user-2",
    email: "almaz@addiseats.et",
    name: "Almaz Haile",
    role: "customer"
  },
  {
    id: "user-staff",
    email: "chef@addiseats.et",
    name: "Chef Aster",
    role: "staff"
  }
];

const SESSION_COOKIE_NAME = "session";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export function sanitizeNextUrl(next) {
  if (!next || typeof next !== "string") {
    return "/";
  }
  const trimmed = next.trim();
  if (
    trimmed.startsWith("/") &&
    !trimmed.startsWith("//") &&
    !trimmed.includes("://") &&
    !trimmed.includes("\\")
  ) {
    return trimmed;
  }
  return "/";
}

export function encodeSessionPayload(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

export function decodeSessionPayload(token) {
  try {
    const json = Buffer.from(token, "base64url").toString("utf-8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const rawCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!rawCookie) {
    return null;
  }
  return decodeSessionPayload(rawCookie);
}

export async function createSession(user) {
  const cookieStore = await cookies();
  const token = encodeSessionPayload(user);
  cookieStore.set(SESSION_COOKIE_NAME, token, COOKIE_OPTIONS);
  return token;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export function findUserByEmail(email) {
  if (!email) return null;
  return USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function findUserById(id) {
  if (!id) return null;
  return USERS.find((u) => u.id === id) || null;
}
