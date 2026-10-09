import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDishes } from "@/lib/dishes";
import { toSlug } from "../slug";
import AddToCartButton from "../AddToCartButton";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ slug: toSlug(dish.name) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dishes = await getDishes();
  const dish = dishes.find((d) => toSlug(d.name) === slug || d.id === slug);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested Ethiopian dish could not be found on the Addis Eats menu.",
    };
  }

  const canonicalPath = `/menu/${toSlug(dish.name)}`;

  return {
    title: dish.name,
    description:
      dish.description ||
      `Order freshly prepared ${dish.name} for ${dish.price} ETB at Addis Eats. Authentic Ethiopian dining made with organic highland ingredients.`,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${dish.name} — Authentic Ethiopian Dining`,
      description:
        dish.description ||
        `Order ${dish.name} fresh for ${dish.price} Birr at Addis Eats.`,
      url: canonicalPath,
      type: "article",
      images: [
        {
          url: `${canonicalPath}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: dish.alt || dish.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dish.name} — Addis Eats`,
      description:
        dish.description ||
        `Order ${dish.name} fresh for ${dish.price} Birr.`,
      images: [`${canonicalPath}/opengraph-image`],
    },
  };
}

export default async function DishPage({ params }) {
  const { slug } = await params;
  const dishes = await getDishes();

  const dish = dishes.find((d) => toSlug(d.name) === slug || d.id === slug);

  if (!dish) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://addis-eats.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description || dish.alt,
    image: `${siteUrl}${dish.image || "/images/shiro.png"}`,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/menu/${toSlug(dish.name)}`,
      seller: {
        "@type": "Restaurant",
        name: "Addis Eats",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Addis Ababa",
          addressCountry: "ET",
        },
      },
    },
    suitableForDiet:
      dish.category === "Starters" && dish.id === "d7"
        ? "https://schema.org/VeganDiet"
        : undefined,
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <Link
          href="/menu"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6b7280] hover:text-[#0c5836] transition-colors"
        >
          <span>&larr;</span>
          <span>Back to Menu</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-[#eae8e1] shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[#faf9f5] p-10 flex flex-col items-center justify-center min-h-[320px] text-center border-b md:border-b-0 md:border-r border-[#eae8e1]">
          <div className="relative w-56 h-56 rounded-3xl overflow-hidden border border-[#eae8e1] shadow-md bg-white">
            <Image
              src={dish.image || "/images/shiro.png"}
              alt={dish.alt || `Authentic plate of ${dish.name} at Addis Eats`}
              fill
              sizes="(max-width: 768px) 224px, 224px"
              className="object-cover"
            />
          </div>
          <span className="mt-4 text-xs font-bold text-[#0c5836] bg-[#e8f5ed] px-3 py-1 rounded-full">
            100% Organic Ingredients
          </span>
        </div>

        <div className="p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0c5836]">
              {dish.category} Specialty
            </span>
            <h1 className="text-3xl font-black text-[#111827] mt-1">
              {dish.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#0c5836]">
                {dish.price}
              </span>
              <span className="text-sm font-bold text-[#6b7280]">Birr / Serving</span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#4b5563] leading-relaxed">
              Authentic recipe prepared fresh to order. Seasoned with traditional Ethiopian spices and natural ingredients.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-[#faf9f5] border border-[#eae8e1] text-xs text-[#374151] space-y-1">
              <div className="font-bold text-[#111827]">Order Highlights:</div>
              <div>⚡ Warm dispatch within 25–35 minutes</div>
              <div>🌿 No artificial preservatives or flavorings</div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#eae8e1] flex flex-col sm:flex-row items-center gap-4">
            <AddToCartButton
              dish={dish}
              className="w-full sm:flex-1 py-3 text-xs font-black uppercase tracking-wider"
            />
            <Link
              href="/cart"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#eae8e1] text-xs font-bold text-center text-[#374151] hover:bg-[#faf9f5] transition"
            >
              View Cart &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}