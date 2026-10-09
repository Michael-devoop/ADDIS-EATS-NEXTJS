import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-12 text-center bg-white rounded-3xl border border-[#eae8e1] p-8">
      <div className="w-14 h-14 mx-auto rounded-full bg-[#faf9f5] border border-[#eae8e1] flex items-center justify-center text-2xl mb-3">
        🍽️
      </div>
      <h2 className="text-xl font-black text-[#111827] mb-1">
        Dish Not Found
      </h2>
      <p className="text-xs text-[#6b7280] mb-5 max-w-sm mx-auto">
        We couldn&apos;t find that dish on our current seasonal menu.
      </p>
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all"
      >
        <span>&larr;</span>
        <span>Back to Menu</span>
      </Link>
    </div>
  );
}