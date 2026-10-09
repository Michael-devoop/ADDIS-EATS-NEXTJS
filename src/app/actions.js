"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { orders, addOrder, findOrder } from "@/lib/orders";
import { orderSchema } from "@/lib/schema";
import {
  getSession,
  createSession,
  destroySession,
  findUserByEmail,
  findUserById,
  sanitizeNextUrl,
} from "@/lib/session";

export async function signInAction(arg1, arg2) {
  const formData =
    arg1 && typeof arg1.get === "function"
      ? arg1
      : arg2 && typeof arg2.get === "function"
      ? arg2
      : null;

  if (!formData) {
    return { error: "Invalid form submission." };
  }

  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const userId = formData.get("userId")?.toString().trim();
  const rawNext = formData.get("next")?.toString().trim();

  if (!userId && !email) {
    return { error: "Please enter your email address." };
  }

  const user = userId ? findUserById(userId) : findUserByEmail(email);

  if (!user) {
    return {
      error: "No account found with this email. Try abebe@addiseats.et or chef@addiseats.et.",
    };
  }

  if (password !== undefined && password !== null && password.trim().length === 0) {
    return { error: "Please enter your password." };
  }

  await createSession(user);
  const safeNext = sanitizeNextUrl(rawNext);
  redirect(safeNext);
}

export async function signOutAction() {
  await destroySession();
  redirect("/login");
}

export async function placeOrder(arg1, arg2) {
  const session = await getSession();

  if (!session) {
    return {
      error: "Unauthorized: You must be signed in to place an order.",
    };
  }

  const formData =
    arg2 && typeof arg2.get === "function"
      ? arg2
      : arg1 && typeof arg1.get === "function"
      ? arg1
      : null;

  if (!formData) {
    return {
      error: "Form data missing.",
    };
  }

  let items = [];
  try {
    items = JSON.parse(formData.get("items") || "[]");
  } catch {
    items = [];
  }

  const raw = {
    customerName: session.name,
    phone: formData.get("phone"),
    address: formData.get("address"),
    items,
  };

  const parsed = orderSchema.safeParse(raw);

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const order = addOrder(
    {
      ...parsed.data,
      phone: parsed.data.phone,
      address: parsed.data.address,
      items: parsed.data.items,
    },
    session
  );

  revalidatePath("/orders");
  revalidatePath("/staff");
  revalidatePath("/kitchen");
  redirect(`/checkout/success?id=${order.id}`);
}

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    return { error: "Unauthorized: You must be signed in to cancel an order." };
  }

  const order = findOrder(orderId);
  if (!order) {
    return { error: "Order not found." };
  }

  if (order.userId !== session.userId && session.role !== "staff") {
    return { error: "Forbidden: You do not own this order." };
  }

  order.status = "cancelled";
  revalidatePath("/orders");
  revalidatePath("/staff");
  revalidatePath("/kitchen");
  return { success: true };
}