"use client";

export default function Error({ error, reset }) {
  return (
    <div className="max-w-md mx-auto py-16 text-center">
      <div className="bg-white rounded-3xl border border-[#eae8e1] p-8 sm:p-10 shadow-xs">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-2xl mb-4">
          ⚠️
        </div>
        <span className="text-[11px] font-black uppercase tracking-widest text-red-600">
          Encountered An Issue
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-[#111827] mt-1 mb-2">
          Something went wrong
        </h2>
        <p className="text-xs text-[#6b7280] mb-6 leading-relaxed">
          {error.message || "An unexpected error occurred while loading this page."}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all hover:shadow-md cursor-pointer"
        >
          Try Again &rarr;
        </button>
      </div>
    </div>
  );
}