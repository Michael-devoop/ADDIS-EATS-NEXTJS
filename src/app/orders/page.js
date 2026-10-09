import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersForUser, getAllOrdersForStaff } from "@/lib/orders";
import CancelOrderButton from "@/components/orders/CancelOrderButton";

export const metadata = {
  title: "My Orders & Dining History",
  description: "Track your active Addis Eats orders and review past authentic Ethiopian culinary feasts delivered to your door.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=/orders");
  }

  const userOrders =
    session.role === "staff"
      ? getAllOrdersForStaff()
      : getOrdersForUser(session.userId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-baseline border-b border-[#eae8e1] pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#0c5836] font-bold">
            Scoped to Session: {session.name} ({session.role})
          </span>
          <h1 className="font-serif text-3xl text-[#111827] font-black mt-1">
            My Orders
          </h1>
          <p className="text-[#6b7280] text-xs mt-1">
            Showing exclusively your authentic dining history.
          </p>
        </div>
        <Link
          href="/menu"
          className="text-xs text-[#0c5836] font-bold hover:underline"
        >
          + Place New Order
        </Link>
      </div>

      {userOrders.length === 0 ? (
        <div className="p-8 bg-white border border-[#eae8e1] rounded-3xl text-center shadow-xs">
          <p className="text-[#6b7280] text-xs mb-4">
            You have not placed any orders under account &ldquo;{session.name}&rdquo;.
          </p>
          <Link
            href="/menu"
            className="inline-block px-5 py-2 bg-[#0c5836] text-white font-bold rounded-full text-xs"
          >
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => {
            const total = order.items?.reduce(
              (sum, item) => sum + item.price * item.qty,
              0
            );

            return (
              <div
                key={order.id}
                className="bg-white border border-[#eae8e1] rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs text-[#0c5836] font-bold">
                      {order.id}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#faf9f5] border border-[#eae8e1] capitalize font-medium text-[#374151]">
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="text-sm font-extrabold text-[#111827]">
                    {order.customerName}
                  </div>
                  <div className="text-xs text-[#6b7280]">
                    {order.address} • {total} Birr
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {order.status !== "cancelled" && (
                    <CancelOrderButton orderId={order.id} />
                  )}
                  <Link
                    href={`/orders/${order.id}`}
                    className="px-4 py-2 bg-[#0c5836] text-white font-bold rounded-full text-xs hover:bg-[#084228] transition-colors"
                  >
                    Track Status &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
