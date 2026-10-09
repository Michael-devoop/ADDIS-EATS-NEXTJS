import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllOrdersForStaff } from "@/lib/orders";
import CancelOrderButton from "@/components/orders/CancelOrderButton";

export const metadata = {
  title: "Kitchen Dispatch Dashboard",
  description: "Live kitchen dispatch and culinary order processing dashboard for Addis Eats kitchen staff.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=/kitchen");
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
          You are signed in as &ldquo;{session.name}&rdquo; ({session.role}), but access to the kitchen dispatch dashboard is strictly refused without staff credentials.
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
              Kitchen Dispatch Dashboard
            </span>
            <span className="text-xs text-[#6b7280]">Role: {session.role}</span>
          </div>
          <h1 className="font-serif text-3xl font-black text-[#111827] mt-1">
            Kitchen Operations &amp; Dispatch
          </h1>
          <p className="text-xs text-[#6b7280] mt-1">
            Real-time feed of all customer orders across Addis Ababa.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/staff"
            className="text-xs text-[#0c5836] font-bold hover:underline"
          >
            Staff Orders View &rarr;
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white border border-[#eae8e1] rounded-2xl shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">
            Total Active Orders
          </span>
          <div className="text-3xl font-black text-[#0c5836] mt-1">
            {allOrders.filter((o) => o.status !== "cancelled").length}
          </div>
        </div>

        <div className="p-5 bg-white border border-[#eae8e1] rounded-2xl shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">
            Kitchen Preparing
          </span>
          <div className="text-3xl font-black text-amber-500 mt-1">
            {allOrders.filter((o) => o.status === "preparing").length}
          </div>
        </div>

        <div className="p-5 bg-white border border-[#eae8e1] rounded-2xl shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">
            Dispatched Riders
          </span>
          <div className="text-3xl font-black text-blue-600 mt-1">
            {allOrders.filter((o) => o.status === "out_for_delivery").length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#eae8e1] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-black text-[#111827]">
          Live Order Dispatch Queue
        </h2>

        <div className="divide-y divide-[#eae8e1]">
          {allOrders.map((order) => (
            <div
              key={order.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#0c5836]">
                    #{order.id}
                  </span>
                  <span className="text-xs font-bold text-[#111827]">
                    {order.customerName}
                  </span>
                  <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-[#f3f4f6] text-[#374151]">
                    {order.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-[#6b7280] mt-1">
                  Deliver to: {order.address} &bull; Tel: {order.phone}
                </p>
                <div className="text-xs text-[#374151] font-medium mt-1">
                  Items:{" "}
                  {order.items.map((i) => `${i.name} (${i.qty})`).join(", ")}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/orders/${order.id}`}
                  className="text-xs font-bold text-[#0c5836] hover:underline"
                >
                  Live Status Tracker &rarr;
                </Link>
                {order.status !== "cancelled" && (
                  <CancelOrderButton orderId={order.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
