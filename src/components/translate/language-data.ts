export const LANGUAGE_OPTIONS = [
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "da", label: "Dansk", flag: "🇩🇰" },
  { code: "fi", label: "Suomi", flag: "🇫🇮" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
] as const;

export type LanguageCode = (typeof LANGUAGE_OPTIONS)[number]["code"];

export const BASE_LANGUAGE: LanguageCode = "no";
export const LANGUAGE_STORAGE_KEY = "cfs-language";
export const LANGUAGE_CHANGE_EVENT = "cfs-language-change";

type NavigationLabels = {
  home: string;
  menu: string;
  closeMenu: string;
  services: string;
  pricing: string;
  about: string;
  contact: string;
  backgroundOn: string;
  backgroundOff: string;
  useLightTheme: string;
  useDarkTheme: string;
};

export const NAVIGATION_LABELS: Record<LanguageCode, NavigationLabels> = {
  no: {
    home: "Til forsiden",
    menu: "Meny",
    closeMenu: "Lukk meny",
    services: "Tjenester",
    pricing: "Priser",
    about: "Om oss",
    contact: "Kontakt",
    backgroundOn: "Interaktiv bakgrunn: På",
    backgroundOff: "Interaktiv bakgrunn: Av",
    useLightTheme: "Bruk lys modus",
    useDarkTheme: "Bruk mørk modus",
  },
  en: {
    home: "Home",
    menu: "Menu",
    closeMenu: "Close menu",
    services: "Services",
    pricing: "Pricing",
    about: "About",
    contact: "Contact",
    backgroundOn: "Interactive background: On",
    backgroundOff: "Interactive background: Off",
    useLightTheme: "Use light mode",
    useDarkTheme: "Use dark mode",
  },
  sv: {
    home: "Till startsidan",
    menu: "Meny",
    closeMenu: "Stäng menyn",
    services: "Tjänster",
    pricing: "Priser",
    about: "Om oss",
    contact: "Kontakt",
    backgroundOn: "Interaktiv bakgrund: På",
    backgroundOff: "Interaktiv bakgrund: Av",
    useLightTheme: "Använd ljust läge",
    useDarkTheme: "Använd mörkt läge",
  },
  da: {
    home: "Til forsiden",
    menu: "Menu",
    closeMenu: "Luk menu",
    services: "Tjenester",
    pricing: "Priser",
    about: "Om os",
    contact: "Kontakt",
    backgroundOn: "Interaktiv baggrund: Til",
    backgroundOff: "Interaktiv baggrund: Fra",
    useLightTheme: "Brug lys tilstand",
    useDarkTheme: "Brug mørk tilstand",
  },
  fi: {
    home: "Etusivulle",
    menu: "Valikko",
    closeMenu: "Sulje valikko",
    services: "Palvelut",
    pricing: "Hinnat",
    about: "Meistä",
    contact: "Yhteystiedot",
    backgroundOn: "Interaktiivinen tausta: Päällä",
    backgroundOff: "Interaktiivinen tausta: Pois",
    useLightTheme: "Käytä vaaleaa tilaa",
    useDarkTheme: "Käytä tummaa tilaa",
  },
  de: {
    home: "Zur Startseite",
    menu: "Menü",
    closeMenu: "Menü schließen",
    services: "Leistungen",
    pricing: "Preise",
    about: "Über uns",
    contact: "Kontakt",
    backgroundOn: "Interaktiver Hintergrund: Ein",
    backgroundOff: "Interaktiver Hintergrund: Aus",
    useLightTheme: "Hellen Modus verwenden",
    useDarkTheme: "Dunklen Modus verwenden",
  },
  fr: {
    home: "Accueil",
    menu: "Menu",
    closeMenu: "Fermer le menu",
    services: "Services",
    pricing: "Tarifs",
    about: "À propos",
    contact: "Contact",
    backgroundOn: "Arrière-plan interactif : Activé",
    backgroundOff: "Arrière-plan interactif : Désactivé",
    useLightTheme: "Utiliser le mode clair",
    useDarkTheme: "Utiliser le mode sombre",
  },
  es: {
    home: "Inicio",
    menu: "Menú",
    closeMenu: "Cerrar menú",
    services: "Servicios",
    pricing: "Precios",
    about: "Nosotros",
    contact: "Contacto",
    backgroundOn: "Fondo interactivo: Activado",
    backgroundOff: "Fondo interactivo: Desactivado",
    useLightTheme: "Usar modo claro",
    useDarkTheme: "Usar modo oscuro",
  },
};

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
  const fromPreference = readStorageLanguage(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage?.getItem(LANGUAGE_STORAGE_KEY) ?? null;
  });
  if (fromPreference) return fromPreference;

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

export const persistLanguage = (code: LanguageCode) => {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  } catch {
    /* ignore unavailable storage */
  }
};

export const clearPersistedLanguage = () => {
  try {
    window.localStorage.removeItem(LANGUAGE_STORAGE_KEY);
  } catch {
    /* ignore unavailable storage */
  }
};

export const isSupportedLanguage = (
  code: string | null | undefined,
): code is LanguageCode => {
  if (!code) return false;
  return SUPPORTED_CODES.has(code as LanguageCode);
};
