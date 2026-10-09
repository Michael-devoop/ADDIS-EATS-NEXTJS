"use client";

import { useActionState } from "react";
import { useCart } from "@/lib/providers";
import { placeOrder } from "@/app/actions";
import Link from "next/link";

export default function CheckoutForm() {
  const { items } = useCart();
  const [state, formAction, isPending] = useActionState(placeOrder, null);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const totalItemsCount = items.reduce((sum, item) => sum + item.qty, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="bg-white rounded-3xl border border-[#eae8e1] p-10 sm:p-14 shadow-xs">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#faf9f5] border border-[#eae8e1] flex items-center justify-center text-3xl mb-4" aria-hidden="true">
            🛒
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-[#0c5836]">
            Empty Order
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111827] mt-1 mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#6b7280] max-w-md mx-auto mb-8 leading-relaxed">
            Please add dishes to your cart before proceeding to checkout.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-colors hover:shadow-md"
          >
            <span>Browse the Menu</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-8">
      <div className="border-b border-[#eae8e1] pb-5">
        <span className="text-xs font-black uppercase tracking-widest text-[#0c5836]">
          Secure Checkout
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight mt-1">
          Delivery &amp; <span className="text-[#0c5836]">Order Details</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#6b7280] mt-1.5">
          Enter your delivery details in Addis Ababa to complete your order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-[#eae8e1] p-6 sm:p-8 shadow-xs">
            <h2 className="text-base font-extrabold text-[#111827] mb-6 pb-3 border-b border-[#eae8e1]">
              Delivery Information
            </h2>

            <form action={formAction} className="space-y-6">
              <input
                type="hidden"
                name="items"
                value={JSON.stringify(items)}
              />

              <div>
                <label
                  htmlFor="customerName"
                  className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="customerName"
                  type="text"
                  name="customerName"
                  autoComplete="name"
                  spellCheck={false}
                  placeholder="e.g. Abebe Bikila…"
                  className="w-full bg-[#faf9f5] border border-[#eae8e1] text-[#111827] px-4 py-3.5 rounded-2xl focus-visible:border-[#0c5836] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#0c5836]/20 text-sm transition-colors placeholder:text-[#9ca3af]"
                />
                {state?.fieldErrors?.customerName && (
                  <p
                    className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1.5"
                    aria-live="polite"
                  >
                    <span aria-hidden="true">⚠️</span> {state.fieldErrors.customerName[0]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  spellCheck={false}
                  placeholder="e.g. 0911234567 or +251 911 234 567…"
                  className="w-full bg-[#faf9f5] border border-[#eae8e1] text-[#111827] px-4 py-3.5 rounded-2xl focus-visible:border-[#0c5836] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#0c5836]/20 text-sm transition-colors placeholder:text-[#9ca3af]"
                />
                {state?.fieldErrors?.phone && (
                  <p
                    className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1.5"
                    aria-live="polite"
                  >
                    <span aria-hidden="true">⚠️</span> {state.fieldErrors.phone[0]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-2"
                >
                  Delivery Address &amp; Landmark <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  autoComplete="street-address"
                  placeholder="e.g. Bole Sub-city, Near Medhane Alem Church, House 450…"
                  className="w-full bg-[#faf9f5] border border-[#eae8e1] text-[#111827] px-4 py-3.5 rounded-2xl focus-visible:border-[#0c5836] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#0c5836]/20 text-sm transition-colors placeholder:text-[#9ca3af]"
                />
                {state?.fieldErrors?.address && (
                  <p
                    className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1.5"
                    aria-live="polite"
                  >
                    <span aria-hidden="true">⚠️</span> {state.fieldErrors.address[0]}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#eae8e1] flex items-center gap-3 text-xs text-[#4b5563]">
                <span className="text-xl" aria-hidden="true">💳</span>
                <div>
                  <div className="font-bold text-[#111827]">Payment Upon Arrival</div>
                  <div className="text-[11px] text-[#6b7280]">
                    Cash or direct Telebirr transfer upon warm dish delivery.
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-md disabled:opacity-50 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <span className="animate-spin text-sm" aria-hidden="true">⏳</span>
                    <span>Placing Order…</span>
                  </>
                ) : (
                  <>
                    <span>Place Order (<span className="tabular-nums">{total}</span> Birr)</span>
                    <span aria-hidden="true">&rarr;</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-[#eae8e1] p-6 sm:p-8 shadow-xs space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#eae8e1]">
              <h2 className="text-base font-black text-[#111827]">
                Order Summary
              </h2>
              <span className="text-xs font-bold text-[#0c5836] bg-[#e8f5ed] px-2.5 py-0.5 rounded-full">
                {totalItemsCount} items
              </span>
            </div>

            <ul className="divide-y divide-[#eae8e1] max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <li key={item.id} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-extrabold text-[#111827]">{item.name}</span>
                    <span className="text-[#6b7280] ml-2">× {item.qty}</span>
                  </div>
                  <span className="font-black text-[#0c5836]">
                    {item.price * item.qty} Birr
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[#eae8e1] space-y-2 text-xs">
              <div className="flex justify-between text-[#4b5563]">
                <span>Subtotal</span>
                <span className="font-bold text-[#111827]">{total} Birr</span>
              </div>
              <div className="flex justify-between text-[#4b5563]">
                <span>Delivery</span>
                <span className="font-bold text-[#0c5836]">FREE</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#eae8e1]">
                <span className="text-sm font-bold text-[#111827]">Total</span>
                <span className="text-2xl font-black text-[#0c5836]">
                  {total} Birr
                </span>
              </div>
            </div>

            <div className="bg-[#faf9f5] rounded-2xl p-4 border border-[#eae8e1] text-[11px] text-[#6b7280] space-y-1">
              <div className="font-bold text-[#111827] flex items-center gap-1.5">
                <span>🛡️ Safe &amp; Direct</span>
              </div>
              <p>Your order is sent straight to our chefs for immediate preparation.</p>
            </div>

            <Link
              href="/cart"
              className="block text-center text-xs font-bold text-[#6b7280] hover:text-[#0c5836] transition-colors"
            >
              &larr; Modify Order in Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}