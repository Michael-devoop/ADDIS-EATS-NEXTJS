"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import { useDebounce } from "@/lib/useDebounce";
import { toSlug } from "@/app/menu/slug";

export default function MenuSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 300);

  const queryKey = debouncedTerm.trim()
    ? `/api/dishes?search=${encodeURIComponent(debouncedTerm.trim())}`
    : null;

  const { data: dishes, isValidating } = useSWR(queryKey, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 2000,
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="search"
          name="search"
          id="menu-search-input"
          aria-label="Search dishes by name or category"
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search dishes by name or category (e.g. Sambusa, Mains)…"
          className="w-full bg-white border border-[#eae8e1] text-[#111827] px-4 py-3.5 pl-11 rounded-2xl focus-visible:border-[#0c5836] focus-visible:ring-2 focus-visible:ring-[#0c5836]/20 text-sm transition-colors placeholder:text-[#9ca3af] shadow-xs"
        />
        <span className="absolute left-4 top-3.5 text-[#9ca3af] text-sm" aria-hidden="true">
          🔍
        </span>
        {isValidating && (
          <span
            className="absolute right-4 top-3.5 text-xs text-[#0c5836] font-mono animate-pulse"
            aria-live="polite"
          >
            searching…
          </span>
        )}
      </div>

      {queryKey && (
        <div
          className="bg-white border border-[#eae8e1] rounded-2xl p-4 space-y-3 shadow-xs"
          aria-live="polite"
        >
          <div className="flex justify-between items-center text-xs text-[#6b7280]">
            <span>Search Results for &ldquo;{debouncedTerm}&rdquo;</span>
            <span className="tabular-nums font-bold text-[#0c5836]">{dishes?.length || 0} found</span>
          </div>

          {dishes && dishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dishes.map((dish) => (
                <Link
                  key={dish.id}
                  href={`/menu/${toSlug(dish.name)}`}
                  className="p-3 bg-[#faf9f5] border border-[#eae8e1] rounded-xl hover:border-[#0c5836]/40 transition-colors flex justify-between items-center text-sm group"
                >
                  <div>
                    <div className="font-bold text-[#111827] group-hover:text-[#0c5836] transition-colors">{dish.name}</div>
                    <div className="text-xs text-[#6b7280]">{dish.category}</div>
                  </div>
                  <span className="text-[#0c5836] font-black tabular-nums">{dish.price} Birr</span>
                </Link>
              ))}
            </div>
          ) : (
            !isValidating && (
              <p className="text-xs text-[#6b7280] py-2">
                No dishes matched your search.
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
