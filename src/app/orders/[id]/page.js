import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findOrder } from "@/lib/orders";
import OrderStatus from "@/components/orders/OrderStatus";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order Tracking #${id}`,
    description: `Track live kitchen preparation, dispatch, and delivery updates for Addis Eats order #${id}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function OrderDetailPage({ params }) {
  const session = await getSession();
  const { id } = await params;

  if (!session) {
    redirect(`/login?next=/orders/${id}`);
  }

  const initialOrder = findOrder(id);

  if (!initialOrder) {
    notFound();
  }

  if (initialOrder.userId !== session.userId && session.role !== "staff") {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-4">
      <OrderStatus orderId={id} fallbackData={initialOrder} />
    </div>
  );
}
