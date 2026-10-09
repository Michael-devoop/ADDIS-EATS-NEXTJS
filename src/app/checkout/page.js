import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fast & Secure Checkout",
  description: "Complete your Addis Eats dining order with secure payment options including Telebirr, CBE Birr, and Cash on Delivery.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=/checkout");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-[#eae8e1] pb-4">
        <span className="text-xs uppercase tracking-wider text-[#0c5836] font-bold">
          Authenticated: {session.name}
        </span>
        <h1 className="font-serif text-3xl text-[#111827] font-black mt-1">
          Complete Your Order
        </h1>
        <p className="text-xs text-[#6b7280] mt-1">
          Confirm your delivery details in Addis Ababa.
        </p>
      </div>

      <CheckoutForm currentUser={session} />
    </div>
  );
}