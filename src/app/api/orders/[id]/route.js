import { NextResponse } from "next/server";
import { findOrder } from "@/lib/orders";
import { getSession } from "@/lib/session";

export async function GET(request, { params }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized: Active session required" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const order = findOrder(id);

  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  if (order.userId !== session.userId && session.role !== "staff") {
    return NextResponse.json(
      { error: "Forbidden: You do not own this order record" },
      { status: 403 }
    );
  }

  return NextResponse.json(order, { status: 200 });
}
