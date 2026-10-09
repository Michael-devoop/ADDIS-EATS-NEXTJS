import MenuSkeleton from "@/components/menu/MenuSkeleton";

export default function Loading() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      <div>
        <div className="h-8 w-60 bg-[#eae8e1] rounded-lg animate-pulse mb-2" />
        <div className="h-4 w-96 bg-[#eae8e1] rounded-md animate-pulse" />
      </div>

      {/* Search bar skeleton */}
      <div className="h-12 w-full bg-[#eae8e1] rounded-2xl animate-pulse" />

      {/* Dish list skeleton */}
      <MenuSkeleton />
    </div>
  );
}