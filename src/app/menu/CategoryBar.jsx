"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CategoryBar({
  categories = ["All", "Starters", "Mains", "Desserts", "Drinks"],
}) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "All";

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "All":
        return "✨";
      case "Starters":
        return "🥟";
      case "Mains":
        return "🥩";
      case "Desserts":
        return "🍯";
      case "Drinks":
        return "🥤";
      default:
        return "🍽️";
    }
  };

  return (
    <nav
      aria-label="Menu category filters"
      className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none"
    >
      {categories.map((cat) => {
        const isActive = active.toLowerCase() === cat.toLowerCase();
        const targetHref =
          cat === "All"
            ? "/menu"
            : `/menu?category=${encodeURIComponent(cat)}`;

        return (
          <Link
            key={cat}
            href={targetHref}
            scroll={false}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-colors text-left whitespace-nowrap ${
              isActive
                ? "bg-[#0c5836] border-[#0c5836] text-white shadow-xs"
                : "bg-white border-[#eae8e1] text-[#4b5563] hover:border-[#0c5836] hover:text-[#0c5836] hover:bg-[#faf9f5]"
            }`}
          >
            <span aria-hidden="true">{getCategoryIcon(cat)}</span>
            <span>{cat}</span>
          </Link>
        );
      })}
    </nav>
  );
}