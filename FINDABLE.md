# Making Addis Eats Findable — SEO, Metadata & Structured Data Report (Day 44)

## Project Overview

This documentation details the complete SEO, OpenGraph social sharing, structured data, canonical link management, and sitemap generation architecture built for **Addis Eats** on Next.js 16 with the App Router.

The goal was to transform Addis Eats from an unindexed web app into a fully findable, indexable, and richly shareable platform whose links preview with high fidelity across social platforms, messaging apps (WhatsApp, Telegram, iMessage, Twitter/X), and search engines.

---

## 1. Requirements Implementation Matrix

| Requirement | Implementation File(s) | Verification Details |
| :--- | :--- | :--- |
| **`metadataBase` & Title Template** | [`src/app/layout.js`](./src/app/layout.js) | Configured `metadataBase: new URL(siteUrl)` and `title: { default: "...", template: "%s \| Addis Eats" }`. Automatically converts all relative paths to absolute URLs across metadata tags. |
| **Distinct Human-Readable Description on Every Route** | `layout.js`, `menu/page.js`, `cart/layout.js`, `checkout/page.js`, `checkout/success/page.js`, `orders/page.js`, `orders/[id]/page.js`, `login/page.js`, `staff/page.js` | Audited and verified. Zero duplicated descriptions across any route. |
| **`generateMetadata` on Dish Route** | [`src/app/menu/[slug]/page.jsx`](./src/app/menu/[slug]/page.jsx) | Dynamically queries the dish database and derives `title`, unique `description`, canonical URL, and specific OpenGraph/Twitter image links. |
| **Site-Wide OpenGraph Image (1200 × 630)** | [`src/app/opengraph-image.jsx`](./src/app/opengraph-image.jsx) | Dynamic 1200 × 630 PNG card rendered with `ImageResponse` featuring Ethiopian culinary branding, badges, and delivery highlights. |
| **Per-Dish OpenGraph Image (1200 × 630)** | [`src/app/menu/[slug]/opengraph-image.jsx`](./src/app/menu/[slug]/opengraph-image.jsx) | Dynamic 1200 × 630 PNG card customized with dish name, category pill, price in Birr/ETB, organic seal, and dispatch delivery promise. |
| **`MenuItem` JSON-LD Structured Data** | [`src/app/menu/[slug]/page.jsx`](./src/app/menu/[slug]/page.jsx) | Injects Schema.org `MenuItem` JSON-LD with exact `name`, `price`, `priceCurrency: "ETB"`, `availability`, and seller information matching the visible page. |
| **Dynamic `app/sitemap.js`** | [`src/app/sitemap.js`](./src/app/sitemap.js) | Dynamically generated from real dishes; strictly includes public routes and excludes private/authenticated pages (`/orders`, `/checkout`, `/staff`). |
| **Search Engine Directives (`app/robots.js`)** | [`src/app/robots.js`](./src/app/robots.js) | Disallows private routes (`/orders/`, `/checkout/`, `/staff/`, `/api/`, `/cart/`) and references the dynamic sitemap index. |
| **Canonical URLs for Query Routes** | `menu/page.js`, `checkout/success/page.js`, `login/page.js`, `menu/[slug]/page.jsx` | Fixed canonical URLs consolidate ranking equity and avoid duplicate content indexing when `?page=`, `?search=`, or `?next=` are passed. |

---

## 2. Check Yourself — Architectural Verification & Evidence

### 1. Does the page source show absolute URLs in every `og:image` tag?
> **Answer**:  
> **Yes.** In Next.js App Router, setting `metadataBase: new URL("https://addis-eats.vercel.app")` in the root layout instructs the metadata resolver to automatically convert all relative image paths and dynamic `opengraph-image` routes to absolute URLs.
> 
> In the rendered HTML document `<head>`, the tags appear as:
> ```html
> <meta property="og:image" content="https://addis-eats.vercel.app/opengraph-image" />
> <meta property="og:image:width" content="1200" />
> <meta property="og:image:height" content="630" />
> <meta name="twitter:image" content="https://addis-eats.vercel.app/opengraph-image" />
> ```
> And on a dish detail route (e.g. `/menu/doro-wat`):
> ```html
> <meta property="og:image" content="https://addis-eats.vercel.app/menu/doro-wat/opengraph-image" />
> ```
> Social crawlers (WhatsApp, Telegram, Slack, Twitter/X, LinkedIn) strictly require absolute URLs (`https://...`), or link previews fail to render. This requirement is 100% satisfied.

---

### 2. Do two different dish pages have two different descriptions?
> **Answer**:  
> **Yes.** Dish page descriptions are derived dynamically from the dish record in `src/lib/dishes.js` via `generateMetadata`:
> 
> - **Doro Wat (`/menu/doro-wat`)**:
>   ```
>   "The crown jewel of Ethiopian cuisine: slow-cooked chicken drumstick simmered for hours in rich caramelized onion berbere sauce."
>   ```
> - **Shiro Tegabino (`/menu/shiro-tegabino`)**:
>   ```
>   "Sun-dried chickpea flour whipped with garlic, ginger, and berbere, slow-simmered and served bubbling hot in an earthen clay pot."
>   ```
> - **Steak & Fries (`/menu/steak-and-fries`)**:
>   ```
>   "Tender cubes of premium grass-fed Ethiopian beef flash-seared with niter kibbeh, garlic, and served with rustic fries."
>   ```
> 
> Each dish displays its own handcrafted description, maximizing click-through rates (CTR) from search engine results and social previews.

---

### 3. Does your sitemap contain any route that requires signing in?
> **Answer**:  
> **No.** The dynamic sitemap in [`src/app/sitemap.js`](./src/app/sitemap.js) strictly includes only public routes:
> - Root landing page: `https://addis-eats.vercel.app/`
> - Menu catalog: `https://addis-eats.vercel.app/menu`
> - Individual dish pages: `https://addis-eats.vercel.app/menu/[slug]` (for each of the 8 dishes)
> - Authentication portal: `https://addis-eats.vercel.app/login`
> 
> **Private routes strictly excluded from sitemap and disallowed in `robots.js`**:
> - `/orders` (Customer order history requiring active session)
> - `/orders/[id]` (Order tracking requiring record ownership)
> - `/checkout` (Private ordering funnel requiring authenticated session)
> - `/checkout/success` (Transactional order receipt)
> - `/staff` (Internal kitchen dispatch portal requiring staff role)
> - `/cart` (User-specific local cart state)
> - `/api/*` (JSON API endpoints)

---

### 4. Does the JSON-LD price match the price on the page, in ETB?
> **Answer**:  
> **Yes.** On [`src/app/menu/[slug]/page.jsx`](./src/app/menu/[slug]/page.jsx), both the visual DOM and the structured JSON-LD read from the exact same source of truth:
> 
> **Page Render**:
> ```jsx
> <span className="text-3xl font-black text-[#0c5836]">{dish.price}</span>
> <span className="text-sm font-bold text-[#6b7280]">Birr / Serving</span>
> ```
> 
> **JSON-LD Script**:
> ```json
> {
>   "@context": "https://schema.org",
>   "@type": "MenuItem",
>   "name": "Doro Wat",
>   "description": "The crown jewel of Ethiopian cuisine: slow-cooked chicken drumstick simmered for hours in rich caramelized onion berbere sauce.",
>   "image": "https://addis-eats.vercel.app/images/dorowot1.png",
>   "offers": {
>     "@type": "Offer",
>     "price": 850,
>     "priceCurrency": "ETB",
>     "availability": "https://schema.org/InStock",
>     "url": "https://addis-eats.vercel.app/menu/doro-wat"
>   }
> }
> ```
> The price (`850`), currency (`ETB`), and dish name are identical, preventing rich snippet rejection by Google Search Console.

---

### 5. Is there exactly one `h1` on each page, and does it describe the page?
> **Answer**:  
> **Yes.** An exhaustive audit of all application pages confirms semantic HTML hierarchy:
> 
> | Route | `h1` Headline | Purpose & Description |
> | :--- | :--- | :--- |
> | `/` | `SNACK TIME HEALS ALL WOUNDS` | Main brand value proposition and organic dining mission |
> | `/menu` | `Addis Eats Menu` | Explains the live dish selection and catalog |
> | `/menu/[slug]` | `{dish.name}` (e.g. `Doro Wat`) | Clearly designates the individual dish title |
> | `/cart` | `Review Your Order` (or `Your Cart is Currently Empty`) | Describes the ordering stage |
> | `/checkout` | `Complete Your Order` | Focuses customer on delivery and billing details |
> | `/checkout/success` | `Thank You for Your Order!` | Confirms order placement |
> | `/orders` | `My Orders` | Designates customer dining history |
> | `/orders/[id]` | `Order #{order.id}` | Pinpoints the exact order reference being tracked |
> | `/login` | `Sign In to Addis Eats` | Describes the session authentication portal |
> | `/staff` | `Kitchen Staff Dispatch Portal` | Identifies internal kitchen dispatch operations |

---

### 6. Would a link to a dish look worth opening if you saw it in a group chat?
> **Answer**:  
> **Yes.** When a user pastes a link like `https://addis-eats.vercel.app/menu/crispy-sambusa` into WhatsApp, Telegram, or Twitter:
> 1. **Card Visual**: The social crawler fetches [`/menu/[slug]/opengraph-image`](./src/app/menu/[slug]/opengraph-image.jsx), which dynamically generates a crisp 1200 × 630 card with:
>    - Deep forest green background (`#073b22`) with radial emerald lighting.
>    - Bold brand mark `AddisEats` with leaf emblem.
>    - The dish name in bold 64px modern typography.
>    - Category pill (e.g., `STARTERS SPECIALTY`).
>    - Prominent gold badge with price: `100 Birr / ETB`.
>    - Value props: `🌱 100% Organic Highland Spices` and `⚡ Fresh Dispatch within 25–35 Mins`.
> 2. **Text Preview**: The OpenGraph title and human-readable description accurately describe the dish and price.
> 3. Result: The shared link looks like a high-end food delivery app, commanding immediate attention and engagement.

---

## 3. Production Build Validation

The application was validated via production build:
```bash
npm run build
```

Generated routes:
```
Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ƒ /api/orders/[id]
├ ƒ /cart
├ ƒ /checkout
├ ƒ /checkout/success
├ ƒ /login
├ ƒ /menu
├ ƒ /menu/[slug]
├ ƒ /menu/[slug]/opengraph-image   (1200x630 dynamic per-dish OpenGraph)
├ ○ /opengraph-image               (1200x630 site-wide OpenGraph)
├ ƒ /orders
├ ƒ /orders/[id]
├ ○ /robots.txt                    (Static SEO crawler directives)
├ ○ /sitemap.xml                   (Static dynamic sitemap index)
└ ƒ /staff
```
Zero errors, zero broken metadata links, and full conformance with Next.js 16 standards.
