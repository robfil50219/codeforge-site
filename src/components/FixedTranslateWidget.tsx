import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";
import useConsent from "../hooks/useConsent";
import {
  BASE_LANGUAGE,
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_OPTIONS,
  clearPersistedLanguage,
  detectPersistedLanguage,
  isSupportedLanguage,
  persistLanguage,
  type LanguageCode,
} from "./translate/language-data";

const SCRIPT_ID = "cfs-google-translate-script";
const CONTAINER_ID = "cfs-google-translate";

function getCookieDomains() {
  const hostname = window.location.hostname;
  const isIpAddress = /^[\d.:]+$/.test(hostname);
  if (!hostname || hostname === "localhost" || isIpAddress) return [""];
  const parentDomain = hostname.split(".").slice(-2).join(".");
  return Array.from(
    new Set(["", hostname, `.${hostname}`, `.${parentDomain}`]),
  );
}

function clearGoogleTranslateState(baseLang: string) {
  try {
    const domains = getCookieDomains();
    const paths = ["/", window.location.pathname || "/"];
    domains.forEach((domain) => {
      paths.forEach((path) => {
        const domainPart = domain ? `;domain=${domain}` : "";
        document.cookie = `googtrans=/auto/${baseLang};expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}${domainPart}`;
        document.cookie = `googtrans=/${baseLang}/${baseLang};expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}${domainPart}`;
        document.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}${domainPart}`;
      });
    });
    try {
      localStorage.removeItem("googtrans");
    } catch {
      /* ignore */
    }
    try {
      sessionStorage.removeItem("googtrans");
    } catch {
      /* ignore */
    }
    if (window.location.hash.startsWith("#googtrans")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  } catch {
    // ignore errors cleaning translation state
  }
}

function setGoogleTranslateState(code: LanguageCode) {
  const value = `/${BASE_LANGUAGE}/${code}`;
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  for (const domain of getCookieDomains()) {
    const domainPart = domain ? `;domain=${domain}` : "";
    document.cookie =
      `googtrans=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax${domainPart}`;
  }

  try {
    localStorage.setItem("googtrans", value);
  } catch {
    /* ignore unavailable storage */
  }
  try {
    sessionStorage.setItem("googtrans", value);
  } catch {
    /* ignore unavailable storage */
  }
}

function removeGoogleTranslateUi() {
  document.getElementById(CONTAINER_ID)?.replaceChildren();
  document
    .querySelectorAll(
      ".goog-te-banner-frame, .goog-te-menu-frame, iframe.skiptranslate",
    )
    .forEach((element) => element.remove());
  document.documentElement.style.removeProperty("margin-top");
  document.body.style.removeProperty("top");
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages?: string;
              autoDisplay?: boolean;
            },
            elementId: string,
          ): void;
        };
      };
    };
    __cfsTranslateSetLanguage?: (code: string) => void;
    __cfsGetCurrentLanguage?: () => LanguageCode | null;
  }
}

type FixedTranslateWidgetProps = {
  floating?: boolean;
  className?: string;
  compact?: boolean;
};

export default function FixedTranslateWidget({
  floating = false,
  className,
  compact = false,
}: FixedTranslateWidgetProps) {
  const hasInitRef = useRef(false);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const selectCleanupRef = useRef<(() => void) | null>(null);
  const consent = useConsent();

  const [isOpen, setIsOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState<LanguageCode>(
    detectPersistedLanguage,
  );

  const notifyLanguageChange = useCallback((code: LanguageCode) => {
    setCurrentCode(code);
    window.dispatchEvent(
      new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: { code } }),
    );
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const selectLanguage = useCallback(
    (code: LanguageCode, opts?: { focusTrigger?: boolean; closeMenu?: boolean }) => {
      persistLanguage(code);
      if (code === BASE_LANGUAGE) {
        clearGoogleTranslateState(BASE_LANGUAGE);
      } else {
        setGoogleTranslateState(code);
      }
      notifyLanguageChange(code);
      if (opts?.closeMenu !== false) closeMenu();
      if (opts?.focusTrigger !== false) triggerRef.current?.focus();
      window.setTimeout(() => window.location.reload(), 50);
    },
    [closeMenu, notifyLanguageChange],
  );

  useEffect(() => {
    if (typeof window === "undefined" || consent !== "accepted") {
      const translatorWasLoaded =
        document.getElementById(SCRIPT_ID) !== null ||
        window.google?.translate?.TranslateElement !== undefined;
      removeGoogleTranslateUi();

      clearGoogleTranslateState(BASE_LANGUAGE);
      clearPersistedLanguage();
      setCurrentCode(BASE_LANGUAGE);

      if (translatorWasLoaded) {
        window.location.reload();
      }
      return;
    }

    const preferredLanguage = detectPersistedLanguage();
    setCurrentCode(preferredLanguage);
    if (preferredLanguage !== BASE_LANGUAGE) {
      setGoogleTranslateState(preferredLanguage);
    }

    window.__cfsTranslateSetLanguage = (code: string) => {
      if (!isSupportedLanguage(code)) return;
      selectLanguage(code, { focusTrigger: false });
    };
    window.__cfsGetCurrentLanguage = detectPersistedLanguage;

    const instantiate = () => {
      if (hasInitRef.current) return;
      const google = window.google?.translate?.TranslateElement;
      if (!google) return;
      hasInitRef.current = true;
      new google(
        {
          pageLanguage: "no",
          includedLanguages: "no,en,sv,da,fi,de,fr,es",
          autoDisplay: false,
        },
        CONTAINER_ID,
      );

      const decorate = (tries = 0) => {
        const select = document.querySelector<HTMLSelectElement>(
          `#${CONTAINER_ID} select.goog-te-combo`,
        );
        if (!select) {
          if (tries < 10) window.setTimeout(() => decorate(tries + 1), 100);
          return;
        }

        selectCleanupRef.current?.();
        selectRef.current = select;

        select.style.position = "absolute";
        select.style.opacity = "0";
        select.style.pointerEvents = "none";
        select.style.width = "0";
        select.style.height = "0";

        const handleChange = () => {
          const rawNext = select.value || preferredLanguage;
          const next = isSupportedLanguage(rawNext) ? rawNext : BASE_LANGUAGE;
          notifyLanguageChange(next);
        };

        select.setAttribute("aria-hidden", "true");
        select.addEventListener("change", handleChange);
        handleChange();

        selectCleanupRef.current = () =>
          select.removeEventListener("change", handleChange);
      };

      decorate();
    };

    window.googleTranslateElementInit = instantiate;

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
      instantiate();
    }

    return () => {
      hasInitRef.current = false;
      selectRef.current = null;
      removeGoogleTranslateUi();
      if (window.googleTranslateElementInit === instantiate) {
        delete window.googleTranslateElementInit;
      }
      selectCleanupRef.current?.();
      selectCleanupRef.current = null;
      if (window.__cfsTranslateSetLanguage) {
        delete window.__cfsTranslateSetLanguage;
      }
      if (window.__cfsGetCurrentLanguage) {
        delete window.__cfsGetCurrentLanguage;
      }
    };
  }, [consent, notifyLanguageChange, selectLanguage]);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (!containerRef.current?.contains(target)) {
        closeMenu();
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    const menu = menuRef.current;
    if (isOpen && menu) {
      const firstButton = menu.querySelector<HTMLButtonElement>("button");
      firstButton?.focus();
    }
  }, [isOpen]);

  const handleItemKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectLanguage(LANGUAGE_OPTIONS[index].code);
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const buttons = menuRef.current?.querySelectorAll<HTMLButtonElement>("button");
        const nextIndex = (index + 1) % LANGUAGE_OPTIONS.length;
        buttons?.[nextIndex]?.focus();
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const buttons = menuRef.current?.querySelectorAll<HTMLButtonElement>("button");
        const nextIndex =
          (index - 1 + LANGUAGE_OPTIONS.length) % LANGUAGE_OPTIONS.length;
        buttons?.[nextIndex]?.focus();
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        triggerRef.current?.focus();
      }
    },
    [closeMenu, selectLanguage],
  );

  if (consent !== "accepted") return null;

  const currentLanguage =
    LANGUAGE_OPTIONS.find((option) => option.code === currentCode) ?? LANGUAGE_OPTIONS[0];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center",
        floating && "fixed bottom-6 right-6 z-50 max-md:bottom-4 max-md:right-4",
        className,
      )}
    >
      <button
        type="button"
        data-testid="desktop-language-toggle"
        ref={triggerRef}
        className={cn(
          "surface-chip nav-chip translate-button text-heading",
          compact ? "translate-button--compact" : "px-3 py-1.5",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={
          currentLanguage?.label ?? "Velg språk"
        }
        title={
          currentLanguage?.label ?? "Velg språk"
        }
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setIsOpen(true);
          }
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen((open) => !open);
          }
        }}
      >
        {compact ? (
          <>
            <span className="translate-button__flag" aria-hidden="true">
              {currentLanguage.flag}
            </span>
            <span className="translate-button__code notranslate" translate="no">
              {currentCode.toUpperCase()}
            </span>
          </>
        ) : (
          <span className="translate-button__label notranslate" translate="no">
            {currentLanguage.label}
          </span>
        )}
        <ChevronDown className="translate-button__arrow" data-open={isOpen} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="listbox"
          className="translate-menu"
          aria-activedescendant={`cfs-lang-${currentCode}`}
        >
          {LANGUAGE_OPTIONS.map((option, index) => (
            <button
              key={option.code}
              data-testid={`desktop-language-${option.code}`}
              type="button"
              role="option"
              aria-selected={currentCode === option.code}
              tabIndex={0}
              id={`cfs-lang-${option.code}`}
              className={cn(
                "translate-menu__item",
                currentCode === option.code && "translate-menu__item--active",
              )}
              onClick={() => selectLanguage(option.code)}
              onKeyDown={(event) => handleItemKeyDown(event, index)}
            >
              <span className="translate-menu__flag" aria-hidden="true">
                {option.flag}
              </span>
              <span className="notranslate" translate="no">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}

      <div id={CONTAINER_ID} className="translate-select-wrapper" />
    </div>
  );
}
