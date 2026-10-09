"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [sort, setSort] = useState("default");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#eae8e1] text-xs text-[#6b7280]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#111827]">Sort &amp; Filter</span>
          <span className="text-[10px] bg-[#e8f5ed] text-[#0c5836] font-bold px-2 py-0.5 rounded-full">
            All Dishes
          </span>
        </div>

        <label className="flex items-center gap-2 font-medium">
          <span>Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white border border-[#eae8e1] text-[#111827] font-semibold px-3 py-1.5 rounded-xl text-xs outline-none focus:border-[#0c5836] shadow-2xs"
          >
            <option value="default">Default Order</option>
            <option value="price-asc">Price: Low &rarr; High</option>
            <option value="price-desc">Price: High &rarr; Low</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </label>
      </div>

      <div>{children}</div>
    </div>
  );
}