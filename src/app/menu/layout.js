import { Suspense } from "react";
import CategoryBar from "./CategoryBar";

export default function MenuLayout({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 max-w-6xl w-full mx-auto">
      <aside className="md:border-r md:border-[#eae8e1] md:pr-6 border-b md:border-b-0 border-[#eae8e1] pb-4 md:pb-0">
        <div className="hidden md:block mb-3 px-1 text-[11px] font-black uppercase tracking-wider text-[#6b7280]">
          Categories
        </div>
        <Suspense
          fallback={
            <div className="flex flex-row md:flex-col gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 w-28 md:w-full bg-[#eae8e1] rounded-2xl animate-pulse"
                />
              ))}
            </div>
          }
        >
          <CategoryBar
            categories={["All", "Starters", "Mains", "Desserts", "Drinks"]}
          />
        </Suspense>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}