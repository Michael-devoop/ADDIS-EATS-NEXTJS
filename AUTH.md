# Addis Eats — Authentication & Defense Architecture (AUTH.md)

This document specifies the multi-layered security architecture of Addis Eats, detailing each protected route, its defensive layers, and the empirical outcomes of the three security attacks.

---

## Protected & Public Routes Matrix

| Route | Layer 1: Middleware | Layer 2: Server Component Render | Layer 3: Action / Handler Check | What Each Layer Proves |
| :--- | :--- | :--- | :--- | :--- |
| **`/menu`** | Unrestricted; bypassed by matcher | Public RSC; renders cached dishes with canonical tag | Read-only public API endpoints (`/api/dishes`) | Proves public catalog is discoverable by crawlers and visitors without authentication overhead. |
| **`/orders`** | Intercepts unauthenticated visitors; redirects to `/login?next=/orders` | Awaits `getSession()`; queries strictly scoped to `session.userId` | `GET /api/orders` asserts session and filters records by `session.userId` | Even if middleware is bypassed or URL parameters are manipulated, orders are strictly isolated to the authenticated session owner. |
| **`/orders/[id]`** | Intercepts unauthenticated visitors; preserves route in `next` | Awaits `getSession()`; checks `order.userId === session.userId` or `role === "staff"`; throws `notFound()` on mismatch | `GET /api/orders/[id]` validates ownership, returning `403` or `404` for unauthorized users | Prevents ID enumeration attacks; guessing another user's order ID returns an honest 404 rather than leaking private delivery data. |
| **`/checkout`** | Intercepts unauthenticated visitors; redirects to `/login?next=/checkout` | Awaits `getSession()`; verifies session before rendering form shell | `placeOrder` server action verifies session and stamps `userId: session.userId` | Prevents anonymous order submission; guarantees that every created order is bound to a verified customer session. |
| **`/kitchen`** | Blocks non-staff users with HTTP `403 Forbidden` | Verifies `session.role === "staff"`; renders server-side 403 refusal if unauthorized | `cancelOrder` permits staff override only after validating `role === "staff"` | Proves kitchen dispatch is not merely hidden from UI menus, but actively refused on the server at every layer. |
| **`/staff`** | Blocks non-staff users with HTTP `403 Forbidden` | Verifies `session.role === "staff"`; renders server-side 403 refusal if unauthorized | `cancelOrder` permits staff override only after validating `role === "staff"` | Provides synchronized administrative overview of all customer orders. |

---

## Defensive Layers Explained

1. **Layer 1: Narrow-Matcher Middleware (`src/middleware.js`)**
   - **Narrow Matcher**: `matcher: ["/orders/:path*", "/checkout/:path*", "/staff/:path*"]`.
   - **Proof**: It executes strictly for private routes and **never** intercepts static assets, images (`.png`, `.svg`), public menu pages, or cart operations.
   - **Function**: Stops unauthenticated traffic at the edge and securely captures the original destination URL.

2. **Layer 2: Server Component Verification (Defense-in-Depth)**
   - Every private page component (`/orders`, `/orders/[id]`, `/checkout`, `/staff`) calls `await getSession()` during server rendering.
   - **Proof**: If middleware is disabled, misconfigured, or bypassed during testing, the page itself halts rendering and redirects or returns an HTTP 403/404.

3. **Layer 3: Server Action & Query Scoping**
   - Data queries in `/orders` do **not** accept a user ID from query parameters or request bodies; they retrieve data exclusively using `session.userId`.
   - Every mutating action (`placeOrder`, `cancelOrder`) verifies active session credentials and validates record ownership before writing.

---

## The Three Attacks

### Attack 1: Calling a Server Action from the Console While Signed Out
- **Vector**: An unauthenticated attacker directly invokes `cancelOrder("order-demo-1")` via the browser console or a raw POST request.
- **Outcome**: The action refuses execution and returns:
  ```json
  { "error": "Unauthorized: You must be signed in to cancel an order." }
  ```
- **Line That Stopped It**:
  `src/app/actions.js`:
  ```javascript
  if (!session) {
    return { error: "Unauthorized: You must be signed in to cancel an order." };
  }
  ```

### Attack 2: Signing in as One Account and Calling an Action with Another Account's Order ID
- **Vector**: Attacker signs in as `user-1` (Abebe Kebede) and invokes `cancelOrder("order-demo-2")` (which is owned by `user-2` Almaz Haile).
- **Outcome**: The action inspects the record owner, detects a user ID mismatch, and returns:
  ```json
  { "error": "Forbidden: You do not own this order." }
  ```
- **Line That Stopped It**:
  `src/app/actions.js`:
  ```javascript
  if (order.userId !== session.userId && session.role !== "staff") {
    return { error: "Forbidden: You do not own this order." };
  }
  ```

### Attack 3: Crafting a Sign-in Link with `next` Pointing at an External Site (Open Redirect)
- **Vector**: Attacker sends a phishing link:
  `http://localhost:3000/login?next=https://malicious-phishing-site.com` or `http://localhost:3000/login?next=//evil.com`.
- **Outcome**: The `sanitizeNextUrl` function analyzes the parameter, rejects absolute URLs and protocol-relative prefixes, and safely falls back to `/`. The user remains securely on the legitimate application.
- **Line That Stopped It**:
  `src/lib/session.js`:
  ```javascript
  if (
    trimmed.startsWith("/") &&
    !trimmed.startsWith("//") &&
    !trimmed.includes("://") &&
    !trimmed.includes("\\")
  ) {
    return trimmed;
  }
  return "/";
  ```

---

## Security Verification Checklist

- **Can any script on your page read the session cookie?**
  No. The session cookie is issued with `httpOnly: true`. `document.cookie` in browser devtools cannot read or access the session token.
- **Does the orders page work if you change the id in the URL to someone else’s?**
  No. Changing `/orders/order-demo-1` to `/orders/order-demo-2` while signed in as `user-1` results in an honest 404 (Not Found).
- **Does middleware run on your image files?**
  No. The middleware matcher is strictly configured for `["/orders/:path*", "/checkout/:path*", "/staff/:path*"]`.
- **Is the staff link merely hidden, or actually refused server-side?**
  Actually refused server-side. Non-staff users accessing `/staff` receive an HTTP 403 Forbidden response from both middleware and server-side page rendering.
- **Is your signing secret absent from client JavaScript?**
  Yes. Server secrets are loaded through `process.env` without `NEXT_PUBLIC_` prefixes, preventing inclusion in browser client bundles.
