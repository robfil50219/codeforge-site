import { useEffect, useState } from "react";

export type SiteOptions = {
  brand: string;
  email: string;
  social?: { github?: string; linkedin?: string; x?: string };
};

export function useWpOptions() {
  const [data, setData] = useState<SiteOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const BASE = import.meta.env.VITE_API_BASE.replace("/wp-json", "");
    setLoading(true);
    fetch(`${BASE}/wp-json/codeforge/v1/options`)
      .then(r => (r.ok ? r.json() : Promise.reject(r)))
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}