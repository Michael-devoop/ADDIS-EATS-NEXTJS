"use client";

import { useActionState } from "react";
import { signInAction } from "@/app/actions";

export default function LoginForm({ safeNext = "/", demoUsers = [] }) {
  const [state, formAction, isPending] = useActionState(signInAction, null);

  return (
    <div className="space-y-6">
      {state?.error && (
        <div
          role="alert"
          aria-live="polite"
          className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5"
        >
          <span className="text-base leading-none" aria-hidden="true">
            ⚠️
          </span>
          <div className="flex-1 font-medium leading-relaxed">{state.error}</div>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={safeNext} />

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-black uppercase tracking-wider text-[#374151]"
          >
            Email Address
          </label>
          <div className="relative">
            <span
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm select-none"
              aria-hidden="true"
            >
              ✉️
            </span>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="e.g. abebe@addiseats.et"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#faf9f5] border border-[#eae8e1] text-sm text-[#111827] placeholder-neutral-400 focus:bg-white focus:border-[#0c5836] focus:ring-2 focus:ring-[#0c5836]/20 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="block text-xs font-black uppercase tracking-wider text-[#374151]"
            >
              Password
            </label>
            <span className="text-[11px] text-[#6b7280]">
              Demo: any password works
            </span>
          </div>
          <div className="relative">
            <span
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm select-none"
              aria-hidden="true"
            >
              🔒
            </span>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#faf9f5] border border-[#eae8e1] text-sm text-[#111827] placeholder-neutral-400 focus:bg-white focus:border-[#0c5836] focus:ring-2 focus:ring-[#0c5836]/20 focus:outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all hover:shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Signing In…</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <span aria-hidden="true">&rarr;</span>
            </>
          )}
        </button>
      </form>

      {demoUsers.length > 0 && (
        <div className="pt-4 border-t border-[#eae8e1] space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280] block">
            Quick Login — Demo Accounts
          </span>

          <div className="grid grid-cols-1 gap-2">
            {demoUsers.map((user) => (
              <form key={user.id} action={formAction} className="block">
                <input type="hidden" name="email" value={user.email} />
                <input type="hidden" name="password" value="demo" />
                <input type="hidden" name="next" value={safeNext} />

                <button
                  type="submit"
                  className="w-full p-2.5 rounded-xl border border-[#eae8e1] hover:border-[#0c5836] hover:bg-[#faf9f5] transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-bold text-[#111827] group-hover:text-[#0c5836] truncate">
                      {user.name}
                    </div>
                    <div className="text-[11px] text-[#6b7280] font-mono truncate">
                      {user.email}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        user.role === "staff"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {user.role}
                    </span>
                    <span className="text-neutral-400 group-hover:translate-x-0.5 transition-transform text-xs">
                      &rarr;
                    </span>
                  </div>
                </button>
              </form>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
