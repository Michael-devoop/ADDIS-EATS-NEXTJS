import { redirect } from "next/navigation";
import { getSession, USERS, sanitizeNextUrl } from "@/lib/session";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Sign In",
  description: "Sign in to Addis Eats to manage dining orders, save delivery preferences, and access the customer portal.",
  alternates: {
    canonical: "/login",
  },
};

export default async function LoginPage({ searchParams }) {
  const session = await getSession();
  const params = await searchParams;
  const rawNext = params?.next || "";
  const safeNext = sanitizeNextUrl(rawNext);

  if (session) {
    redirect(safeNext);
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl border border-[#eae8e1] p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-[#e8f5ed] text-[#0c5836] flex items-center justify-center text-2xl mx-auto mb-2" aria-hidden="true">
            🔐
          </div>
          <h1 className="font-serif text-2xl font-black text-[#111827]">
            Sign In to Addis Eats
          </h1>
          <p className="text-xs text-[#6b7280]">
            Enter your credentials to access your orders and kitchen dashboard.
          </p>
        </div>

        {rawNext && rawNext !== safeNext && (
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
            <span className="font-bold block">Open Redirect Blocked</span>
            <span>
              The destination parameter &ldquo;{rawNext}&rdquo; was unsafe and has been sanitized to &ldquo;{safeNext}&rdquo;.
            </span>
          </div>
        )}

        <LoginForm safeNext={safeNext} demoUsers={USERS} />

        <div className="pt-4 border-t border-[#eae8e1] text-[11px] text-[#6b7280] text-center">
          Cookies are secured with <code className="bg-neutral-100 px-1 py-0.5 rounded">httpOnly</code> and <code className="bg-neutral-100 px-1 py-0.5 rounded">sameSite: lax</code>.
        </div>
      </div>
    </div>
  );
}
