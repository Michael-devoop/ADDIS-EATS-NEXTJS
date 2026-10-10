import { Suspense } from "react";
import { getDishes } from "@/lib/dishes";
import MenuSearch from "@/components/menu/MenuSearch";
import PagedDishList from "@/components/menu/PagedDishList";
import MenuSkeleton from "@/components/menu/MenuSkeleton";

export const metadata = {
  title: "Full Menu & Specials",
  description: "Explore the complete Addis Eats menu featuring authentic wats, sizzling tibs, vegetarian fasting platters, and natural juices.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Full Menu & Specials | Addis Eats",
    description: "Explore the complete Addis Eats menu featuring authentic wats, sizzling tibs, vegetarian fasting platters, and natural juices.",
    url: "/menu",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Addis Eats Full Menu & Specials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Menu & Specials | Addis Eats",
    description: "Explore the complete Addis Eats menu featuring authentic wats, sizzling tibs, vegetarian fasting platters, and natural juices.",
    images: ["/opengraph-image"],
  },
};

export default async function MenuPage() {
  const limit = 4;
  const allDishes = await getDishes();
  const total = allDishes.length;
  const totalPages = Math.ceil(total / limit);

  const initialPagedData = {
    dishes: allDishes.slice(0, limit),
    total,
    page: 1,
    totalPages,
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      <div className="border-b border-[#eae8e1] pb-5">
        <span className="text-xs font-black uppercase tracking-widest text-[#0c5836]">
          Highland Culinary Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl text-[#111827] font-black tracking-tight mt-1">
          Addis Eats Menu &amp; Specials
        </h1>
        <p className="text-[#6b7280] text-xs sm:text-sm mt-1">
          Search dishes live by name or browse authenticated highland specialties with instant caching.
        </p>
      </div>

      <MenuSearch />

      <Suspense fallback={<MenuSkeleton />}>
        <PagedDishList initialData={initialPagedData} />
      </Suspense>
    </div>
  );
}