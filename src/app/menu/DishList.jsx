import Link from "next/link";
import Image from "next/image";
import { toSlug } from "./slug";
import AddToCartButton from "./AddToCartButton";

export default function DishList({ dishes }) {
  if (!dishes || dishes.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-[#eae8e1] p-8">
        <span className="text-4xl block mb-2">🍽️</span>
        <h3 className="text-base font-extrabold text-[#111827]">
          No Dishes Found
        </h3>
        <p className="text-xs text-[#6b7280] mt-1">
          Try selecting another category or resetting filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dishes.map((dish) => (
        <div
          key={dish.id}
          className="bg-white rounded-2xl border border-[#eae8e1] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#e8f5ed] text-[#0c5836]">
                {dish.category}
              </span>
              <span className="text-xs font-bold text-[#6b7280]">
                🌿 Organic
              </span>
            </div>

            <div className="relative h-44 w-full bg-[#faf9f5] rounded-xl overflow-hidden mb-4">
              <Image
                src={dish.image || "/images/shiro.png"}
                alt={dish.alt || `Authentic Ethiopian ${dish.name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h3 className="font-extrabold text-base text-[#111827] group-hover:text-[#0c5836] transition-colors">
              <Link href={`/menu/${toSlug(dish.name)}`}>
                {dish.name}
              </Link>
            </h3>
            <p className="text-xs text-[#6b7280] mt-1">
              Freshly prepared with authentic ingredients.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-[#eae8e1] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#9ca3af] block">Price</span>
              <span className="text-base font-black text-[#0c5836]">{dish.price} Birr</span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/menu/${toSlug(dish.name)}`}
                className="text-xs font-bold text-[#6b7280] hover:text-[#0c5836] transition-colors"
              >
                Details &rarr;
              </Link>
              <AddToCartButton dish={dish} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}