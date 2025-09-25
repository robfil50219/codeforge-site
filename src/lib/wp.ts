const API = import.meta.env.VITE_API_BASE;

async function wp<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// Example endpoints
export const getPosts = (limit = 5) =>
  wp(`/wp/v2/posts?per_page=${limit}&_fields=id,slug,title,excerpt`);

type WPPage = {
  id: number;
  slug: string;
  title: unknown;
  content: unknown;
};

export const getPageBySlug = (slug: string) =>
  wp<WPPage[]>(`/wp/v2/pages?slug=${slug}&_fields=id,slug,title,content`).then(
    (r) => r[0]
  ); 