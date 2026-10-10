/**
 * Utility to resolve the canonical site URL dynamically.
 * Prioritizes custom environment variable, then Vercel system production URLs,
 * falling back to the deployed Vercel domain.
 */
export function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl && envUrl.trim()) {
    const trimmed = envUrl.trim().replace(/\/$/, "");
    return trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "https://addis-eats-nextjs-cyan.vercel.app";
}
