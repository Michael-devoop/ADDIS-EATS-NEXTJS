import Link from "next/link";
import ClearCartOnMount from "./ClearCartOnMount";

export const metadata = {
  title: "Order Confirmed",
  description: "Your Addis Eats order has been successfully placed. Track kitchen preparation and dispatch status in real-time.",
  alternates: {
    canonical: "/checkout/success",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CheckoutSuccessPage({ searchParams }) {
  const { id } = await searchParams;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      <ClearCartOnMount />

      <div className="bg-white rounded-3xl border border-[#eae8e1] p-8 sm:p-14 shadow-xs">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#e8f5ed] border border-[#a7f3d0] flex items-center justify-center text-4xl mb-5 shadow-xs">
          🎉
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-[#0c5836]">
          Order Confirmed
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-[#111827] mt-1 mb-3">
          Thank You for Your Order!
        </h1>

        <p className="text-xs sm:text-sm text-[#6b7280] max-w-md mx-auto mb-6 leading-relaxed">
          Your order has been received and our kitchen has started preparing your dishes with authentic spices and fresh organic ingredients.
        </p>

        {id && (
          <div className="inline-flex items-center gap-2 bg-[#faf9f5] border border-[#eae8e1] px-4 py-2 rounded-2xl mb-8">
            <span className="text-xs font-bold text-[#6b7280]">Order Reference:</span>
            <span className="text-xs font-black font-mono text-[#0c5836]">#{id}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-md mx-auto mb-8">
          <div className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#eae8e1] text-xs text-[#374151]">
            <div className="font-bold text-[#111827] flex items-center gap-1.5">
              <span>⚡ Fast Delivery</span>
            </div>
            <p className="text-[11px] text-[#6b7280] mt-0.5">
              Hot dispatch within 25–35 minutes across Addis.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#eae8e1] text-xs text-[#374151]">
            <div className="font-bold text-[#111827] flex items-center gap-1.5">
              <span>📞 Courier Call</span>
            </div>
            <p className="text-[11px] text-[#6b7280] mt-0.5">
              Our rider will phone you right before arrival.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all hover:shadow-md"
          >
            Explore More Dishes &rarr;
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#eae8e1] text-xs font-bold text-[#4b5563] hover:bg-[#faf9f5] transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}