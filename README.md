# Addis Eats — Full-Stack Advanced Next.js Capstone (Day 45)

**Context**: Day 45 of Module 3 (Frontend: React & Next.js) for the CodeOps Full Stack program at IBT College Canada.  
**Core Goal**: Transition "Addis Eats" into a fully secured, high-performance, live, and discoverable production application with authentication, live data fetching, and verified metrics.

---

## 🚀 Live Deployed Application

- **Live Production URL**: [https://addis-eats.vercel.app](https://addis-eats.vercel.app)
- **Capstone GitHub Repository**: [https://github.com/Michaelabebe/IBT](https://github.com/Michaelabebe/IBT)
- **Module Path**: `sq2-michael-abebe/module-03-react-nextjs/Days/Day_45/addis_eats`

---

## 📚 Comprehensive Documentation Deliverables

As required by the Day 45 Capstone criteria, this project features three exhaustive architectural documentation reports:

1. 🛡️ **[AUTH.md](./AUTH.md)** — **Authentication, Authorization & Defense Architecture** (30%):
   - Route protection matrix for `/menu`, `/orders`, `/checkout`, `/kitchen`, and `/staff`.
   - Three defensive layers: Edge Middleware (`src/middleware.js`), Server Component verification (RSC), and Server Actions/Route Handlers.
   - Empirical proof of three blocked attacks (unauthenticated action calls, cross-tenant ID tampering, and open redirects).

2. ⚡ **[DATA.md](./DATA.md)** — **Data Fetching Architecture (Server & Client)** (20%):
   - Detailed specification of where and why data is fetched across 5 core entities:
     - **Menu items**: Server Component (RSC) with static caching.
     - **Order history**: Server Component strictly scoped to `session.userId`.
     - **Order status**: Polled client fetching via SWR (5s cadence) seeded with server `fallbackData`.
     - **Menu search**: Debounced client input (300ms) with SWR conditional fetching.
     - **Cart data**: Persistent client-side state (`React Context` + `localStorage`).

3. 🏎️ **[PERF.md](./PERF.md)** — **Performance Budget & Measured Improvements** (20%):
   - Official Performance Budget targets and audit table:
     - **Lighthouse Performance Score**: &ge; 90 (Achieved **98 / 100**)
     - **Largest Contentful Paint (LCP)**: &lt; 2.5s (Achieved **0.8s**)
     - **Cumulative Layout Shift (CLS)**: &lt; 0.1 (Achieved **0.001**)
     - **First Load JS**: &lt; 120 kB (Achieved **84.2 kB**)
     - **Largest Image Size**: &lt; 150 kB (Achieved **38.4 kB** via `sharp` AVIF/WebP)
     - **Total Blocking Time (TBT)**: &lt; 200ms (Achieved **0 ms** via `lazyOnload`)

4. 🔍 **[FINDABLE.md](./FINDABLE.md)** — **Metadata, Previews & Discovery** (15%):
   - `metadataBase` production URL setup.
   - Dynamic OpenGraph preview images generated at 1200 &times; 630 (`next/og`).
   - Schema.org `MenuItem` JSON-LD structured data matching visible UI.
   - Dynamic sitemap (`sitemap.js`) and robots configuration (`robots.js`).

---

## 🛠️ Verification & Local Run

```bash
# 1. Install dependencies (including production sharp image engine)
npm install

# 2. Build production bundle (Turbopack)
npm run build

# 3. Start local production server
npm run start
# App is available at http://localhost:3000
```
