// src/utils/images.ts

// Shape WP/ACF usually returns for an Image field (return type = "Array")
export type AcfImage =
  | {
      url?: string;
      sizes?: Record<string, string | undefined>;
    }
  | string
  | null
  | undefined;

/**
 * Pick the best URL from an ACF image object.
 * Falls back to .url, and returns undefined if nothing is usable.
 */
export function pickImageUrl(
  img: AcfImage,
  preferred: string[] = ["medium_large", "large", "full", "medium", "thumbnail"]
): string | undefined {
  if (!img) return undefined;

  // If the field is set to return just the URL
  if (typeof img === "string") return img;

  // If it's an object (return type "Array"/object in ACF)
  const url = img.url;
  const sizes = img.sizes ?? {};

  for (const key of preferred) {
    const sized = sizes[key];
    if (typeof sized === "string" && sized.length > 0) return sized;
  }

  return url;
}