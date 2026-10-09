export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://addis-eats.vercel.app";

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
