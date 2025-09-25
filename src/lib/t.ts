// src/lib/t.ts
// Minimal i18n helper used instead of react-i18next.
// Looks up strings in the Norwegian bundle and returns them as-is.
// Supports dot-path keys like "about.heading" and also arrays/objects.

import { NO } from "../copy/no"; // adjust only if your file lives elsewhere

// Optional options shape (kept for call-site compatibility)
export type TOptions = {
  returnObjects?: boolean;
};

// Safe dot-path getter: "a.b.c" -> obj[a]?.b?.c
function getFromPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>(
    (acc, k) => (acc && typeof acc === "object" && k in (acc as Record<string, unknown>)
      ? (acc as Record<string, unknown>)[k]
      : undefined),
    obj
  );
}

export function useTranslation() {
  const t = <T = string>(key: string, _opts?: TOptions): T => {
    // touch the param to avoid eslint no-unused-vars without changing behavior
    void _opts;

    const val = getFromPath(NO, key);
    // If not found, fall back to the key (typed to T).
    return (val as T) ?? (key as unknown as T);
  };

  // Tiny shim so existing code can read current lang
  const i18n = { language: "no" as const };

  return { t, i18n };
}