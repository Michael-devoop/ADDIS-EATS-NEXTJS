export default function LoginLoading() {
  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl border border-[#eae8e1] p-8 shadow-xs space-y-6 animate-pulse">
        {/* Icon placeholder */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-[#eae8e1]" />
        </div>

        {/* Heading placeholder */}
        <div className="space-y-2 flex flex-col items-center">
          <div className="h-7 w-64 bg-[#eae8e1] rounded-lg" />
          <div className="h-3 w-48 bg-[#eae8e1] rounded" />
        </div>

        {/* Email input placeholder */}
        <div className="space-y-1.5">
          <div className="h-3 w-24 bg-[#eae8e1] rounded" />
          <div className="h-12 w-full bg-[#faf9f5] border border-[#eae8e1] rounded-2xl" />
        </div>

        {/* Password input placeholder */}
        <div className="space-y-1.5">
          <div className="h-3 w-16 bg-[#eae8e1] rounded" />
          <div className="h-12 w-full bg-[#faf9f5] border border-[#eae8e1] rounded-2xl" />
        </div>

        {/* Button placeholder */}
        <div className="h-12 w-full bg-[#0c5836]/20 rounded-2xl" />

        {/* Demo accounts placeholder */}
        <div className="pt-4 border-t border-[#eae8e1] space-y-2">
          <div className="h-3 w-40 bg-[#eae8e1] rounded" />
          <div className="h-12 w-full bg-[#faf9f5] border border-[#eae8e1] rounded-xl" />
          <div className="h-12 w-full bg-[#faf9f5] border border-[#eae8e1] rounded-xl" />
          <div className="h-12 w-full bg-[#faf9f5] border border-[#eae8e1] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
