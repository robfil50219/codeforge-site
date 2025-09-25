import { useEffect, useState } from "react";

/** WordPress “rendered” string wrapper */
export type WpRendered = { rendered: string };

/** Generic WP Page type with optional ACF payload */
export type WpPage<TAcf = unknown> = {
  id: number;
  slug: string;
  title: WpRendered;
  content: WpRendered;
  modified: string;
  acf?: TAcf;
};

/**
 * Fetch a single WP Page by slug.
 * - Pass a type argument to get typed `page.acf` (e.g. useWpPage<MyAcf>("pricing"))
 * - Uses VITE_API_BASE, e.g. https://api.codeforgestudio.no/wp-json
 */
export function useWpPage<TAcf = unknown>(slug: string) {
  const [page, setPage] = useState<WpPage<TAcf> | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "";
    // Ask only for the fields we use (faster)
    const url = `${BASE}/wp/v2/pages?slug=${encodeURIComponent(
      slug
    )}&_fields=id,slug,title,content,modified,acf`;

    let alive = true;
    setLoading(true);

    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((arr: WpPage<TAcf>[]) => {
        if (!alive) return;
        const p = (Array.isArray(arr) && arr[0]) || undefined;
        setPage(p as WpPage<TAcf> | undefined);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  return { page, loading, error };
}