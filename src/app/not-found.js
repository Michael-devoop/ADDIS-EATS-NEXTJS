import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-16 text-center">
      <div className="bg-white rounded-3xl border border-[#eae8e1] p-8 sm:p-10 shadow-xs">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#faf9f5] border border-[#eae8e1] flex items-center justify-center text-3xl mb-4">
          🧭
        </div>
        <span className="text-[11px] font-black uppercase tracking-widest text-[#0c5836]">
          404 Error
        </span>
        <h2 className="text-2xl font-black text-[#111827] mt-1 mb-2">
          Page Not Found
        </h2>
        <p className="text-xs text-[#6b7280] mb-6 leading-relaxed">
          The dish or page you are looking for doesn&apos;t exist or may have been relocated.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all"
        >
          <span>&larr;</span>
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
}