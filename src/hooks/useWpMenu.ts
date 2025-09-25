import { useEffect, useMemo, useState } from "react";

export type MenuItem = {
  id: number;
  title: string;
  url: string;
  parent: number;
  order: number;
  target?: string | null;
};

type HookState = {
  items: MenuItem[];
  loading: boolean;
  error: unknown;
};

export function useWpMenu(locationOrSlug: string, opts?: { fallbackSlug?: string }) {
  const [state, setState] = useState<HookState>({
    items: [],
    loading: true,
    error: null,
  });

  const base = useMemo(() => {
    if (!import.meta.env.VITE_API_BASE) {
      console.warn("VITE_API_BASE is missing");
      return "";
    }
    return import.meta.env.VITE_API_BASE.replace("/wp-json", "");
  }, []);

  useEffect(() => {
    if (!base) return;

    const ac = new AbortController();
    const urlPrimary = `${base}/wp-json/codeforge/v1/menu/${locationOrSlug}`;
    const urlFallback = opts?.fallbackSlug
      ? `${base}/wp-json/codeforge/v1/menu/${opts.fallbackSlug}`
      : null;

    setState((s) => ({ ...s, loading: true, error: null }));

    const fetchOnce = (url: string) =>
      fetch(url, { signal: ac.signal }).then(async (r) => {
        if (!r.ok) {
          const body = await r.text().catch(() => "");
          throw new Error(`HTTP ${r.status} ${r.statusText} – ${body || url}`);
        }
        return (await r.json()) as MenuItem[];
      });

    (async () => {
      try {
        let items = await fetchOnce(urlPrimary);
        // if location not found (404) and we have a fallback slug, try that
        if ((!items || items.length === 0) && urlFallback) {
          items = await fetchOnce(urlFallback);
        }
        setState({ items, loading: false, error: null });
      } catch (err) {
        // still resolve with empty items so UIs can render fallbacks
        setState({ items: [], loading: false, error: err });
      }
    })();

    return () => ac.abort();
  }, [base, locationOrSlug, opts?.fallbackSlug]);

  return state;
}