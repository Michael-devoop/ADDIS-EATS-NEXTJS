"use client";

import Link from "next/link";
import { signOutAction } from "@/app/actions";

export default function UserMenu({ user }) {
  if (!user) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 rounded-full border border-[#0c5836] text-[#0c5836] hover:bg-[#e8f5ed] text-xs font-bold transition-colors"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-right hidden sm:block">
        <div className="text-xs font-bold text-[#111827]">{user.name}</div>
        <div className="text-[10px] text-[#6b7280] flex items-center justify-end gap-1">
          <span
            className={`px-1.5 py-0.2 rounded font-semibold uppercase text-[9px] ${
              user.role === "staff"
                ? "bg-purple-100 text-purple-700 border border-purple-200"
                : "bg-emerald-100 text-emerald-700 border border-emerald-200"
            }`}
          >
            {user.role}
          </span>
        </div>
      </div>

      <form action={signOutAction}>
        <button
          type="submit"
          className="px-3.5 py-1.5 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}
