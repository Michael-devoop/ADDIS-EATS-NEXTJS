"use client";

import { useCart } from "@/lib/providers";

export default function CartBadge() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + (item.qty || 1), 0);

  if (count === 0) return null;

  return (
    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-black leading-none text-white bg-[#0c5836] rounded-full shadow-xs">
      {count}
    </span>
  );
}
