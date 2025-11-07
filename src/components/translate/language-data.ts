export const LANGUAGE_OPTIONS = [
  { code: "no", label: "Norsk" },
  { code: "en", label: "English" },
  { code: "sv", label: "Svenska" },
  { code: "da", label: "Dansk" },
  { code: "fi", label: "Suomi" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
] as const;

export type LanguageCode = (typeof LANGUAGE_OPTIONS)[number]["code"];

export const BASE_LANGUAGE: LanguageCode = "no";

const SUPPORTED_CODES = new Set<LanguageCode>(
  LANGUAGE_OPTIONS.map((option) => option.code),
);

const GOOGLE_COOKIE = "googtrans";

const decodeMaybeEncoded = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const parseLanguageFromValue = (value?: string | null): LanguageCode | null => {
  if (!value) return null;
  const decoded = decodeMaybeEncoded(value);
  const segments = decoded.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  const target = segments[segments.length - 1]?.toLowerCase();
  if (!target) return null;
  return SUPPORTED_CODES.has(target as LanguageCode) ? (target as LanguageCode) : null;
};

const readCookieLanguage = (): LanguageCode | null => {
  if (typeof document === "undefined" || !document.cookie) return null;
  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${GOOGLE_COOKIE}=`));
  if (!match) return null;
  const value = match.substring(match.indexOf("=") + 1);
  return parseLanguageFromValue(value);
};

const readStorageLanguage = (getter: () => string | null): LanguageCode | null => {
  try {
    return parseLanguageFromValue(getter());
  } catch {
    return null;
  }
};

export const detectPersistedLanguage = (): LanguageCode => {
  const fromCookie = readCookieLanguage();
  if (fromCookie) return fromCookie;

  const fromLocal = readStorageLanguage(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage?.getItem(GOOGLE_COOKIE) ?? null;
  });
  if (fromLocal) return fromLocal;

  const fromSession = readStorageLanguage(() => {
    if (typeof window === "undefined") return null;
    return window.sessionStorage?.getItem(GOOGLE_COOKIE) ?? null;
  });
  if (fromSession) return fromSession;

  return BASE_LANGUAGE;
};

export const isSupportedLanguage = (
  code: string | null | undefined,
): code is LanguageCode => {
  if (!code) return false;
  return SUPPORTED_CODES.has(code as LanguageCode);
};
