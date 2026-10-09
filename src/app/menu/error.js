"use client";

export default function Error({ error, reset }) {
  return (
    <div className="py-12 text-center bg-white rounded-3xl border border-[#eae8e1] p-8">
      <div className="w-14 h-14 mx-auto rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-xl mb-3">
        ⚠️
      </div>
      <h2 className="text-lg font-black text-[#111827] mb-1">
        Error Loading Menu Dishes
      </h2>
      <p className="text-xs text-[#6b7280] mb-5 max-w-sm mx-auto">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer"
      >
        Retry Loading &rarr;
      </button>
    </div>
  );
}