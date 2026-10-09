import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllOrdersForStaff } from "@/lib/orders";
import CancelOrderButton from "@/components/orders/CancelOrderButton";

export const metadata = {
  title: "Kitchen Staff Portal",
  description: "Internal dispatch, kitchen operations, and order status management dashboard for Addis Eats staff.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StaffKitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=/staff");
  }

  if (session.role !== "staff") {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-3xl mx-auto">
          ⛔
        </div>
        <h1 className="text-2xl font-black text-[#111827]">
          403 — Refused Server-Side
        </h1>
        <p className="text-xs text-[#6b7280]">
          You are signed in as &ldquo;{session.name}&rdquo; ({session.role}), but access to the kitchen dashboard is strictly refused without staff credentials.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 rounded-full bg-[#0c5836] text-white text-xs font-bold"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const allOrders = getAllOrdersForStaff();

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#eae8e1] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
              Staff Only Dashboard
            </span>
            <span className="text-xs text-[#6b7280]">Role: {session.role}</span>
          </div>
          <h1 className="font-serif text-3xl font-black text-[#111827] mt-1">
            Kitchen Orders Central
          </h1>
          <p className="text-xs text-[#6b7280] mt-1">
            Full view of active deliveries across all customer accounts in Addis Ababa.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {allOrders.map((order) => {
          const total = order.items?.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
          );

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-[#eae8e1] p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#0c5836]">
                    {order.id}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                    User: {order.userId}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold capitalize ${
                      order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {order.status.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="text-sm font-black text-[#111827]">
                  Customer: {order.customerName}
                </div>
                <div className="text-xs text-[#6b7280]">
                  Phone: {order.phone} • Address: {order.address}
                </div>

                <ul className="text-xs text-[#4b5563] list-disc list-inside">
                  {order.items?.map((item) => (
                    <li key={item.id}>
                      {item.name} × {item.qty} ({item.price * item.qty} Birr)
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col md:items-end justify-between gap-3 shrink-0">
                <span className="text-lg font-black text-[#0c5836]">
                  {total} Birr
                </span>
                {order.status !== "cancelled" && (
                  <CancelOrderButton orderId={order.id} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
