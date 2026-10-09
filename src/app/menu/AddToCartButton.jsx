"use client";

import { useCart } from "@/lib/providers";
import { useState } from "react";

export default function AddToCartButton({ dish, className = "" }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Add ${dish.name} to order`}
      className={`rounded-full px-4 py-2 bg-[#0c5836] hover:bg-[#084228] text-white font-extrabold text-xs shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer ${className} ${
        added ? "bg-[#10b981] hover:bg-[#059669]" : ""
      }`}
    >
      {added ? (
        <span>Added ✓</span>
      ) : (
        <>
          <span>🛒</span>
          <span>+ Add to Order</span>
        </>
      )}
    </button>
  );
}