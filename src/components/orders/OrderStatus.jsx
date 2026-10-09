"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";

const stages = [
  { key: "received", label: "Order Received", icon: "📝" },
  { key: "preparing", label: "Kitchen Preparing", icon: "🍳" },
  { key: "out_for_delivery", label: "Out for Delivery", icon: "🛵" },
  { key: "delivered", label: "Delivered", icon: "🍽️" }
];

export default function OrderStatus({ orderId, fallbackData }) {
  const { data: order, error } = useSWR(
    orderId ? `/api/orders/${orderId}` : null,
    fetcher,
    {
      fallbackData,
      refreshInterval: 5000,
      dedupingInterval: 2000,
    }
  );

  if (error && !order) {
    return (
      <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-2xl text-center space-y-4">
        <h2 className="text-xl font-bold text-red-400">Order Not Found</h2>
        <p className="text-neutral-400 text-sm">We couldn&apos;t retrieve the status for order reference {orderId}.</p>
        <Link href="/menu" className="inline-block px-5 py-2 bg-amber-400 text-neutral-950 font-bold rounded-lg text-xs">
          Return to Menu
        </Link>
      </div>
    );
  }

  const currentStageIndex = stages.findIndex((s) => s.key === order?.status);
  const isCancelled = order?.status === "cancelled";

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
            Live Order Tracking
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-100 mt-1">
            Order #{order?.id}
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Polling active every 5s • Auto-updating without page refresh
          </p>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950 border border-neutral-700 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-ping" aria-hidden="true" />
          <span className="text-neutral-300 font-medium capitalize">
            {order?.status?.replace(/_/g, " ") || "Processing"}
          </span>
        </div>
      </div>

      {!isCancelled ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stages.map((stage, idx) => {
            const isCompleted = currentStageIndex >= idx;
            const isCurrent = currentStageIndex === idx;

            return (
              <div
                key={stage.key}
                className={`p-4 rounded-2xl border transition-colors ${
                  isCurrent
                    ? "bg-amber-400/10 border-amber-400 text-neutral-100 shadow-sm"
                    : isCompleted
                    ? "bg-neutral-950 border-emerald-500/40 text-neutral-300"
                    : "bg-neutral-950/50 border-neutral-800 text-neutral-600"
                }`}
              >
                <div className="text-2xl mb-2" aria-hidden="true">{stage.icon}</div>
                <div className="text-xs font-bold">{stage.label}</div>
                <div className="text-[10px] mt-1">
                  {isCurrent ? (
                    <span className="text-amber-400 font-semibold">In Progress…</span>
                  ) : isCompleted ? (
                    <span className="text-emerald-400">Completed</span>
                  ) : (
                    <span>Pending</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm text-center">
          This order has been cancelled.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800 text-sm">
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-200">Customer Details</h3>
          <p className="text-neutral-400 text-xs">Name: {order?.customerName}</p>
          <p className="text-neutral-400 text-xs">Phone: {order?.phone}</p>
          <p className="text-neutral-400 text-xs">Delivery Address: {order?.address}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-200">Ordered Items</h3>
          <ul className="divide-y divide-neutral-800 text-xs">
            {order?.items?.map((item) => (
              <li key={item.id} className="py-2 flex justify-between text-neutral-300">
                <span>{item.name} × {item.qty}</span>
                <span className="font-medium text-amber-400">{item.price * item.qty} Birr</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
