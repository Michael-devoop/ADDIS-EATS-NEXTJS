# Addis Eats — Data Fetching Architecture (DATA.md)

This document specifies the exact locations, boundaries, and technical reasoning for where data is fetched across server components, client components, and API routes in the Addis Eats application.

---

## 1. Data Fetching Strategy Matrix

| Data Entity | Fetch Location | Primary Mechanism | State Lifetime & Cache Strategy | Core Architectural Reasoning |
| :--- | :--- | :--- | :--- | :--- |
| **Menu Items** | Server Component (`RSC`) | `getDishes()` in `src/app/menu/page.js` & `src/app/page.js` | Built-in Static & ISR caching; revalidated on demand | Eliminates client fetch waterfalls, guarantees zero-CLS rendering, produces crawlable HTML for search engines, and delivers instant initial page loads. |
| **Order History** | Server Component (`RSC`) | `getOrdersForUser(session.userId)` in `src/app/orders/page.js` | Dynamic RSC with `revalidatePath("/orders")` on mutations | Security & isolation: query is strictly scoped to `session.userId` on the server before HTML leaves the server, preventing data leakage across user boundaries. |
| **Order Status** | Client Component (`useSWR`) | `/api/orders/${orderId}` in `OrderStatus.jsx` | Polled every 5000ms; seeded with server `fallbackData` | Balances near-real-time updates of kitchen preparation and rider dispatch without full-page reloads, while server `fallbackData` eliminates initial loading spinners. |
| **Menu Search** | Client Component (`useSWR`) | `/api/dishes?search=${term}` in `MenuSearch.jsx` | 300ms debounce via `useDebounce`; `keepPreviousData: true` | Eliminates excessive server load by firing only after user pauses typing; preserves previous result view while fetching to prevent UI flicker. |
| **Cart Data** | Client Storage & Context | `CartProvider` (`React Context` + `localStorage`) | Persistent client state across page transitions and browser reloads | Sub-millisecond optimistic mutations (adding/removing items) with immediate UI badge response; independent of network latency or auth state until checkout. |

---

## 2. In-Depth Architectural Reasoning

### 1. Menu Items (Server Component Fetching)
- **Where**: `src/app/menu/page.js`, `src/app/page.js`, and `src/app/menu/[slug]/page.jsx`.
- **How**: Direct server-side invocation of `getDishes()` inside async React Server Components.
- **Why Server-Side**:
  - The restaurant menu changes infrequently (seasonal specials, price updates).
  - Pre-rendering dishes directly into static HTML ensures that web crawlers index rich dish metadata and schema without requiring client JavaScript execution.
  - Generates zero client-side layout shift (CLS = 0) and zero First Contentful Paint delay because the browser parses fully populated dish cards in the initial HTML stream.

### 2. Order History (Server Component Scoped to Session)
- **Where**: `src/app/orders/page.js` and `src/app/kitchen/page.js`.
- **How**: `const session = await getSession(); const userOrders = getOrdersForUser(session.userId);`.
- **Why Server-Side**:
  - Personal dining records contain sensitive customer delivery addresses, phone numbers, and expenditure amounts.
  - By performing the database/record lookup inside the React Server Component, the user's ID is retrieved directly from the verified cryptographic session cookie (`session.userId`) rather than trusting any client-supplied request query parameters.
  - Server actions (`placeOrder`, `cancelOrder`) execute `revalidatePath("/orders")` and `revalidatePath("/kitchen")`, triggering atomic server re-renders when orders change.

### 3. Order Status (Polled Client Fetching with SWR)
- **Where**: `src/components/orders/OrderStatus.jsx` mounted within `src/app/orders/[id]/page.js`.
- **How**: `useSWR('/api/orders/' + orderId, fetcher, { fallbackData: initialOrder, refreshInterval: 5000, dedupingInterval: 2000 })`.
- **Why Client Polling**:
  - Order progression transitions through discrete statuses (`received` → `preparing` → `out_for_delivery` → `delivered`).
  - Polling at a steady 5-second cadence gives customers a live tracking experience without the infrastructure complexity and persistent socket overhead of WebSockets.
  - Crucially, the page passes `fallbackData: initialOrder` retrieved on the server during the initial SSR pass. SWR mounts immediately populated with valid data, avoiding awkward loading skeletons or empty states.

### 4. Menu Search (Debounced Client SWR)
- **Where**: `src/components/menu/MenuSearch.jsx`.
- **How**: Custom hook `useDebounce(searchTerm, 300)` generating a conditional SWR key `/api/dishes?search=${debouncedTerm}`.
- **Why Client Debouncing**:
  - Instant client search feedback requires typing interactivity.
  - Debouncing by 300ms delays the API request until the user pauses, collapsing what would be 8 separate requests down to 1 single request.
  - If the search box is cleared, the SWR key becomes `null`, instantly halting network calls.
  - `keepPreviousData: true` keeps the existing list on-screen while new filtered results are resolving in the background.

### 5. Cart Data (Client-Side State & LocalStorage)
- **Where**: `src/lib/providers.js` (`CartProvider`), `CartBadge.jsx`, and `AddToCartButton.jsx`.
- **How**: React Context with state synced to browser `window.localStorage`.
- **Why Client Storage**:
  - Cart interactions require instantaneous sub-16ms feedback (clicking "Add to Cart" increments quantities with zero network latency).
  - Preserves user selections across full browser reloads, network disconnects, or tab closures before checkout.
  - Prevents premature database writes or anonymous cart record pollution on the server; items are submitted to the server in a single atomic transaction only upon final checkout submission via the `placeOrder` server action.
