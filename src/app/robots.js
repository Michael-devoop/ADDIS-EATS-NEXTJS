import { getSiteUrl } from "@/lib/site";

export default function robots() {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/orders",
          "/orders/",
          "/checkout",
          "/checkout/",
          "/staff",
          "/staff/",
          "/kitchen",
          "/kitchen/",
          "/api/",
          "/cart",
          "/cart/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
