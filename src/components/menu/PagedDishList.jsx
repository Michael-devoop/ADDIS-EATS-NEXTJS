"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import { toSlug } from "@/app/menu/slug";

export default function PagedDishList({ initialData }) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const categoryParam = searchParams.get("category");
  const category = categoryParam && categoryParam !== "All" ? categoryParam : "All";
  const page = Math.max(1, parseInt(pageParam || "1", 10));
  const limit = 4;

  const isInitialAllPage = page === 1 && category === "All";

  const apiUrl =
    category !== "All"
      ? `/api/dishes?category=${encodeURIComponent(category)}&page=${page}&limit=${limit}`
      : `/api/dishes?page=${page}&limit=${limit}`;

  const { data, isValidating } = useSWR(apiUrl, fetcher, {
    fallbackData: isInitialAllPage ? initialData : undefined,
    dedupingInterval: 2000,
    revalidateOnFocus: false,
    keepPreviousData: false,
  });

  const dishes =
    data?.dishes || (isInitialAllPage ? initialData?.dishes : []) || [];
  const totalPages =
    data?.totalPages || (isInitialAllPage ? initialData?.totalPages : 1) || 1;
  const total =
    data?.total !== undefined
      ? data.total
      : isInitialAllPage
      ? initialData?.total
      : 0;

  const prevHref =
    category !== "All"
      ? `/menu?category=${encodeURIComponent(category)}&page=${Math.max(1, page - 1)}`
      : `/menu?page=${Math.max(1, page - 1)}`;

  const nextHref =
    category !== "All"
      ? `/menu?category=${encodeURIComponent(category)}&page=${Math.min(totalPages, page + 1)}`
      : `/menu?page=${Math.min(totalPages, page + 1)}`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-xs text-[#6b7280]">
        <span>
          {category !== "All" && (
            <span className="font-bold text-[#0c5836] mr-1.5 uppercase tracking-wider text-[11px]">
              [{category}]
            </span>
          )}
          Showing page <span className="font-bold text-[#111827]">{page}</span> of{" "}
          <span className="font-bold text-[#111827]">{totalPages}</span> (
          <span className="tabular-nums font-medium">{total}</span> total dishes)
        </span>
        {isValidating && (
          <span className="text-[#0c5836] font-mono animate-pulse" aria-live="polite">
            updating…
          </span>
        )}
      </div>

      {dishes.length === 0 ? (
        <div className="p-10 bg-white border border-[#eae8e1] rounded-2xl text-center space-y-3 shadow-xs">
          <div className="text-3xl" aria-hidden="true">🍽️</div>
          <h3 className="font-extrabold text-sm text-[#111827]">
            No dishes found in category &ldquo;{category}&rdquo;
          </h3>
          <p className="text-xs text-[#6b7280]">
            Try choosing another category or exploring all culinary dishes.
          </p>
          <Link
            href="/menu"
            className="inline-block px-5 py-2 rounded-full bg-[#0c5836] text-white text-xs font-bold mt-2"
          >
            Show All Dishes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dishes.map((dish, idx) => (
            <Link
              key={dish.id}
              href={`/menu/${toSlug(dish.name)}`}
              className="group flex gap-4 items-center p-4 bg-white border border-[#eae8e1] rounded-2xl hover:border-[#0c5836]/40 transition-colors shadow-xs hover:shadow-md"
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#faf9f5]">
                <Image
                  src={dish.image || "/images/shiro.png"}
                  alt={dish.alt || `${dish.name} - Addis Eats`}
                  width={80}
                  height={80}
                  sizes="80px"
                  priority={idx === 0 && isInitialAllPage}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h3 className="font-extrabold text-sm text-[#111827] group-hover:text-[#0c5836] transition-colors truncate">
                    {dish.name}
                  </h3>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#e8f5ed] text-[#0c5836] shrink-0">
                    {dish.category}
                  </span>
                </div>
                <p className="text-[#0c5836] font-black text-sm tabular-nums">
                  {dish.price} Birr
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination controls: always rendered to preserve layout and provide predictable navigation */}
      <div className="flex justify-center items-center gap-3 pt-4 border-t border-[#eae8e1]">
        <Link
          href={prevHref}
          scroll={false}
          aria-disabled={page <= 1}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
            page <= 1
              ? "pointer-events-none opacity-40 border-[#eae8e1] text-[#9ca3af] bg-[#faf9f5]"
              : "border-[#eae8e1] bg-white text-[#374151] hover:border-[#0c5836] hover:text-[#0c5836] shadow-xs"
          }`}
        >
          &larr; Previous
        </Link>

        <span className="text-xs font-mono text-[#6b7280] px-2 tabular-nums">
          {page} / {totalPages}
        </span>

        <Link
          href={nextHref}
          scroll={false}
          aria-disabled={page >= totalPages}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
            page >= totalPages
              ? "pointer-events-none opacity-40 border-[#eae8e1] text-[#9ca3af] bg-[#faf9f5]"
              : "border-[#eae8e1] bg-white text-[#374151] hover:border-[#0c5836] hover:text-[#0c5836] shadow-xs"
          }`}
        >
          Next &rarr;
        </Link>
      </div>
    </div>
  );
}
