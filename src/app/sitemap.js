import { getDishes } from "@/lib/dishes";
import { toSlug } from "./menu/slug";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap() {
  const siteUrl = getSiteUrl();
  const dishes = await getDishes();

  // 1. Static public routes
  const staticRoutes = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 2. Dynamic dish routes derived from authentic dishes data
  const dishRoutes = dishes.map((dish) => ({
    url: `${siteUrl}/menu/${toSlug(dish.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Note: All private, authenticated, and administrative routes are STRICTLY EXCLUDED:
  // - /orders and /orders/* (requires authenticated customer session)
  // - /checkout and /checkout/success (requires active order flow)
  // - /staff and /staff/* (strictly restricted to staff role)
  // - /cart (client session-specific)
  // - /api/* (backend API route handlers)

  return [...staticRoutes, ...dishRoutes];
}
