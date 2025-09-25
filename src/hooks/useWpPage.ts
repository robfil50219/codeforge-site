// src/hooks/useWpPage.ts
import { useEffect, useState } from "react";

export type WpPage = {
  title: { rendered: string };
  content: { rendered: string };
  modified: string;
};

export function useWpPage(slug: string) {
  const [page, setPage] = useState<WpPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const API = import.meta.env.VITE_API_BASE; // e.g. https://api.codeforgestudio.no/wp-json
    setLoading(true);
    fetch(`${API}/wp/v2/pages?slug=${slug}&_fields=title,content,modified`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((arr: WpPage[]) => setPage(arr?.[0] ?? null))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [slug]);

  return { page, loading, error };
}