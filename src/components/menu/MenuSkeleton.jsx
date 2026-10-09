export default function MenuSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading menu dishes">
      {/* Top count indicator skeleton */}
      <div className="flex justify-between items-center text-xs">
        <div className="h-4 w-48 bg-[#eae8e1] rounded-md animate-pulse" />
        <div className="h-4 w-16 bg-[#eae8e1] rounded-md animate-pulse" />
      </div>

      {/* Grid of 4 dish cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex gap-4 items-center p-4 bg-white border border-[#eae8e1] rounded-2xl shadow-xs"
          >
            {/* Image thumbnail skeleton */}
            <div className="w-20 h-20 rounded-xl bg-[#eae8e1] shrink-0 animate-pulse" />

            {/* Content text skeleton */}
            <div className="flex-1 min-w-0 space-y-2.5">
              <div className="flex justify-between items-start gap-2">
                <div className="h-4 w-32 bg-[#eae8e1] rounded animate-pulse" />
                <div className="h-4 w-14 bg-[#eae8e1] rounded-full animate-pulse" />
              </div>
              <div className="h-4 w-20 bg-[#eae8e1] rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination buttons skeleton */}
      <div className="flex justify-center items-center gap-3 pt-4 border-t border-[#eae8e1]">
        <div className="h-8 w-24 bg-[#eae8e1] rounded-xl animate-pulse" />
        <div className="h-4 w-12 bg-[#eae8e1] rounded animate-pulse" />
        <div className="h-8 w-20 bg-[#eae8e1] rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
