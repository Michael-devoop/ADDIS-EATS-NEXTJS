export default function Loading() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-full border-3 border-[#e8f5ed] border-t-[#0c5836] animate-spin mb-4" />
      <span className="text-xs font-bold uppercase tracking-widest text-[#0c5836]">
        Addis Eats
      </span>
      <p className="text-xs text-[#6b7280] mt-1">
        Preparing fresh content…
      </p>
    </div>
  );
}