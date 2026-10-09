import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schema";
import { addOrder, getOrdersForUser, getAllOrdersForStaff } from "@/lib/orders";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized: Active session required" },
      { status: 401 }
    );
  }

  const results =
    session.role === "staff"
      ? getAllOrdersForStaff()
      : getOrdersForUser(session.userId);

  return NextResponse.json(results, { status: 200 });
}

export async function POST(request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized: Active session required to submit an order" },
      { status: 401 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const order = addOrder(
    {
      ...parsed.data,
      customerName: session.name,
    },
    session
  );

  revalidatePath("/orders");
  revalidatePath("/staff");
  revalidatePath("/kitchen");

  return NextResponse.json(order, { status: 201 });
}