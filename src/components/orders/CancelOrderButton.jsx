"use client";

import { useTransition, useState } from "react";
import { cancelOrder } from "@/app/actions";

export default function CancelOrderButton({ orderId }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  function handleCancel() {
    setError(null);
    startTransition(async () => {
      const result = await cancelOrder(orderId);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        onClick={handleCancel}
        disabled={isPending}
        className="px-3 py-1.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
      >
        {isPending ? "Cancelling..." : "Cancel Order"}
      </button>
      {error && <span className="text-[10px] text-red-600 mt-1">{error}</span>}
    </div>
  );
}
