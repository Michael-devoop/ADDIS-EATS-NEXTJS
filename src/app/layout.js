import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "../lib/providers";
import CartBadge from "./CartBadge";
import UserMenu from "@/components/auth/UserMenu";
import { getSession } from "@/lib/session";
import "./globals.css";

import { getSiteUrl } from "@/lib/site";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Addis Eats | Authentic Organic Ethiopian Dining & Delivery",
    template: "%s | Addis Eats",
  },
  description: "Experience handcrafted traditional Ethiopian cuisine, fresh wats, sizzling tibs, and natural juices delivered fresh across Addis Ababa.",
  applicationName: "Addis Eats",
  authors: [{ name: "Addis Eats Culinary Kitchen" }],
  generator: "Next.js",
  keywords: [
    "Ethiopian food",
    "Addis Ababa restaurant",
    "Doro Wat",
    "Shiro Tegabino",
    "Tibs",
    "Injera delivery",
    "Organic Ethiopian cuisine",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Addis Eats",
    title: "Addis Eats | Authentic Organic Ethiopian Dining & Delivery",
    description: "Experience handcrafted traditional Ethiopian cuisine, fresh wats, sizzling tibs, and natural juices delivered fresh across Addis Ababa.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Addis Eats — Authentic Organic Ethiopian Dining & Delivery",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Addis Eats | Authentic Organic Ethiopian Dining & Delivery",
    description: "Experience handcrafted traditional Ethiopian cuisine, fresh wats, sizzling tibs, and natural juices delivered fresh across Addis Ababa.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en" className={sansFont.variable}>
      <body className={`${sansFont.className} min-h-screen flex flex-col bg-[#faf9f5] text-[#111827] antialiased`}>
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0c5836] focus:text-white focus:rounded-lg focus:font-bold focus:shadow-lg"
          >
            Skip to main content
          </a>

          <header className="sticky top-0 z-50 bg-white border-b border-[#eae8e1] shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-full bg-[#0c5836] flex items-center justify-center text-white overflow-hidden shadow-xs group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/logo.png"
                    alt="Addis Eats authentic logo"
                    width={40}
                    height={40}
                    sizes="40px"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-2xl tracking-tight text-[#0c5836]">
                    Addis<span className="text-[#10b981]">Eats</span>
                  </span>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-[#6b7280] -mt-1">
                    Fresh Organic Dining
                  </span>
                </div>
              </Link>

              <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-[#374151]">
                <Link href="/" className="hover:text-[#0c5836] transition-colors">
                  Home
                </Link>
                <Link href="/menu" className="hover:text-[#0c5836] transition-colors">
                  Menu &amp; Dishes
                </Link>
                <Link href="/orders" className="hover:text-[#0c5836] transition-colors">
                  My Orders
                </Link>
                {session?.role === "staff" && (
                  <Link
                    href="/kitchen"
                    className="text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-1"
                  >
                    <span>Kitchen Staff</span>
                    <span className="px-1.5 py-0.2 bg-purple-100 rounded text-[10px]">
                      Admin
                    </span>
                  </Link>
                )}
                <Link
                  href="/cart"
                  className="relative flex items-center gap-1.5 hover:text-[#0c5836] transition-colors"
                >
                  <span>Cart</span>
                  <CartBadge />
                </Link>
                <Link href="/checkout" className="hover:text-[#0c5836] transition-colors">
                  Checkout
                </Link>
              </nav>

              <div className="flex items-center gap-4">
                <UserMenu user={session} />

                <Link
                  href="/cart"
                  className="md:hidden relative p-2 text-[#0c5836]"
                  aria-label="View shopping cart"
                >
                  <span className="text-xl" aria-hidden="true">🛒</span>
                  <div className="absolute -top-1 -right-1">
                    <CartBadge />
                  </div>
                </Link>

                <Link
                  href="/menu"
                  className="hidden sm:inline-flex px-6 py-2.5 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-colors hover:shadow-md"
                >
                  Order Now &rarr;
                </Link>
              </div>
            </div>
          </header>

          <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
            {children}
          </main>

          <footer className="mt-20 border-t border-[#eae8e1] bg-white pt-12 pb-8 text-[#4b5563]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-[#eae8e1]">
                <div className="space-y-4">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#0c5836] flex items-center justify-center text-white overflow-hidden">
                      <Image
                        src="/images/logo.png"
                        alt="Addis Eats authentic logo"
                        width={32}
                        height={32}
                        sizes="32px"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-black text-xl tracking-tight text-[#0c5836]">
                      Addis<span className="text-[#10b981]">Eats</span>
                    </span>
                  </Link>
                  <p className="text-xs text-[#6b7280] leading-relaxed">
                    Authentic Ethiopian culinary kitchen delivering warm wats, sizzling tibs, and layered juices across Addis Ababa.
                  </p>
                  <div className="text-xs font-bold text-[#111827]">
                    📞 +251 911 234 567
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#111827]">
                    Navigation
                  </h4>
                  <ul className="space-y-2 text-xs font-medium">
                    <li>
                      <Link href="/" className="hover:text-[#0c5836] transition-colors">
                        Home Page
                      </Link>
                    </li>
                    <li>
                      <Link href="/menu" className="hover:text-[#0c5836] transition-colors">
                        Full Menu &amp; Specials
                      </Link>
                    </li>
                    <li>
                      <Link href="/orders" className="hover:text-[#0c5836] transition-colors">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link href="/cart" className="hover:text-[#0c5836] transition-colors">
                        Order Cart
                      </Link>
                    </li>
                    <li>
                      <Link href="/checkout" className="hover:text-[#0c5836] transition-colors">
                        Fast Checkout
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#111827]">
                    Delivery Hours
                  </h4>
                  <p className="text-xs text-[#6b7280]">
                    Monday – Sunday: <br />
                    <strong className="text-[#111827]">10:00 AM – 10:30 PM</strong>
                  </p>
                  <p className="text-xs text-[#6b7280]">
                    Hot dispatch to: Bole, Kazanchis, Piassa, CMC, Sarbet, and Old Airport.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#111827]">
                    Security Information
                  </h4>
                  <p className="text-xs text-[#6b7280]">
                    Protected routes use server-verified session tokens, narrow-matcher middleware, and ownership validation.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/login"
                      className="text-xs font-bold text-[#0c5836] hover:underline"
                    >
                      Authentication Portal &rarr;
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9ca3af] gap-4">
                <p>
                  &copy; {new Date().getFullYear()} Addis Eats. Built with Next.js App Router (RSC &amp; ISR).
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span>💳 Telebirr</span>
                  <span>💵 Cash on Delivery</span>
                  <span>📱 CBE Birr</span>
                </div>
              </div>
            </div>
          </footer>
        </Providers>

        {/* Third-party Script: Analytics deferred to idle time to eliminate main-thread blocking */}
        <Script
          id="addis-eats-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.__ADDIS_EATS_CONFIG__ = {
                analyticsId: "${process.env.NEXT_PUBLIC_ANALYTICS_ID || 'G-AE99DEMO12'}",
                appUrl: "${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}",
                metricsRecorded: true
              };
            `,
          }}
        />

        {/* Third-party Script: Customer concierge widget deferred to browser idle time with lazyOnload */}
        <Script
          id="addis-eats-concierge-widget"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.__ADDIS_CONCIERGE_LOADED__ = true;
              console.log("[Addis Eats] Concierge and dining assistance widget initialized via lazyOnload strategy.");
            `,
          }}
        />
      </body>
    </html>
  );
}