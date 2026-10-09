"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/providers";

export default function CartPage() {
  const { items, addToCart, removeFromCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const totalItemsCount = items.reduce((sum, item) => sum + item.qty, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="bg-white rounded-3xl border border-[#eae8e1] p-10 sm:p-14 shadow-xs">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#faf9f5] border border-[#eae8e1] flex items-center justify-center text-3xl mb-4">
            🛍️
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-[#0c5836]">
            Empty Order Bag
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111827] mt-1 mb-3">
            Your Cart is Currently Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#6b7280] max-w-md mx-auto mb-8 leading-relaxed">
            Looks like you haven&apos;t added any authentic Ethiopian specialties yet. Discover our signature wats, sizzling tibs, and fresh organic juices!
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all hover:shadow-md"
          >
            <span>Explore Our Menu</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-8">
      <div className="border-b border-[#eae8e1] pb-5">
        <span className="text-xs font-black uppercase tracking-widest text-[#0c5836]">
          Order Bag
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight mt-1">
          Review Your <span className="text-[#0c5836]">Order</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#6b7280] mt-1.5">
          Review your selected dishes before proceeding to secure checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-[#eae8e1] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#eae8e1] mb-2">
              <h2 className="text-base font-extrabold text-[#111827]">
                Selected Items
              </h2>
              <span className="text-xs font-bold text-[#0c5836] bg-[#e8f5ed] px-3 py-1 rounded-full">
                {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
              </span>
            </div>

            <ul className="divide-y divide-[#eae8e1]">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#eae8e1] shrink-0 bg-[#faf9f5]">
                      <Image
                        src={item.image || "/images/shiro.png"}
                        alt={item.name ? `Cart item: ${item.name}` : "Selected dish"}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-[#111827]">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#6b7280]">
                          {item.price} Birr each
                        </span>
                        <span className="text-xs text-[#d1d5db]">•</span>
                        <span className="text-xs font-bold text-[#0c5836]">
                          Qty: {item.qty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0">
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-[#9ca3af] block">
                        Line Total
                      </span>
                      <span className="text-base font-black text-[#0c5836]">
                        {item.price * item.qty} Birr
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-xl border border-transparent hover:border-red-200 transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-[#eae8e1] p-6 sm:p-8 shadow-xs space-y-6 sticky top-28">
            <h2 className="text-lg font-black text-[#111827]">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-[#4b5563]">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#111827]">{total} Birr</span>
              </div>
              <div className="flex justify-between text-[#4b5563]">
                <span>Addis Express Delivery</span>
                <span className="font-bold text-[#0c5836] bg-[#e8f5ed] px-2 py-0.5 rounded-md">
                  FREE
                </span>
              </div>
              <div className="flex justify-between text-[#4b5563]">
                <span>Packaging &amp; Handling</span>
                <span className="font-bold text-[#111827]">0 Birr</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#eae8e1] flex justify-between items-baseline">
              <div>
                <span className="text-xs font-bold text-[#6b7280] block">
                  Total Amount
                </span>
                <span className="text-[10px] text-[#9ca3af]">Tax Included</span>
              </div>
              <span className="text-2xl font-black text-[#0c5836]">
                {total} Birr
              </span>
            </div>

            <div className="bg-[#faf9f5] rounded-2xl p-4 border border-[#eae8e1] text-xs text-[#4b5563] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#111827]">
                <span>⚡ Express Dispatch</span>
              </div>
              <p className="text-[11px] text-[#6b7280]">
                Freshly cooked and delivered warm in 25–35 minutes across Addis Ababa.
              </p>
            </div>

            <Link
              href="/checkout"
              className="block w-full py-4 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider text-center shadow-sm transition-all hover:shadow-md"
            >
              Proceed to Checkout &rarr;
            </Link>

            <Link
              href="/menu"
              className="block text-center text-xs font-bold text-[#6b7280] hover:text-[#0c5836] transition-colors"
            >
              &larr; Add more dishes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}