import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";
import {
  LANGUAGE_OPTIONS,
  type LanguageCode,
} from "./translate/language-data";

const SCRIPT_ID = "cfs-google-translate-script";
const CONTAINER_ID = "cfs-google-translate";

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
    __cfsGetCurrentLanguage?: () => string | null;
  }
}

type FixedTranslateWidgetProps = {
  floating?: boolean;
  className?: string;
};

export default function FixedTranslateWidget({
  floating = false,
  className,
}: FixedTranslateWidgetProps) {
  const hasInitRef = useRef(false);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const selectCleanupRef = useRef<(() => void) | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState<LanguageCode>("no");

  const notifyLanguageChange = useCallback((code: LanguageCode) => {
    setCurrentCode(code);
    window.dispatchEvent(
      new CustomEvent("cfs-language-change", { detail: { code } }),
    );
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const selectLanguage = useCallback(
    (code: LanguageCode, opts?: { focusTrigger?: boolean; closeMenu?: boolean }) => {
      const select = selectRef.current;
      if (!select) return;
      select.value = code;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      if (opts?.closeMenu !== false) closeMenu();
      if (opts?.focusTrigger !== false) triggerRef.current?.focus();
    },
    [closeMenu],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

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
          const next = (select.value || "no") as LanguageCode;
          const allowed = LANGUAGE_OPTIONS.some((option) => option.code === next);
          notifyLanguageChange(allowed ? next : "no");
        };

        select.setAttribute("aria-hidden", "true");
        select.addEventListener("change", handleChange);
        handleChange();

        selectCleanupRef.current = () =>
          select.removeEventListener("change", handleChange);

        window.__cfsTranslateSetLanguage = (code: string) => {
          const allowed = LANGUAGE_OPTIONS.some((option) => option.code === code);
          if (!allowed) return;
          select.value = code;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        };

        window.__cfsGetCurrentLanguage = () => select.value || "no";
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
      if (window.googleTranslateElementInit === instantiate) {
        delete window.googleTranslateElementInit;
      }
      selectCleanupRef.current?.();
      if (window.__cfsTranslateSetLanguage) {
        delete window.__cfsTranslateSetLanguage;
      }
      if (window.__cfsGetCurrentLanguage) {
        delete window.__cfsGetCurrentLanguage;
      }
    };
  }, [notifyLanguageChange]);

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
        ref={triggerRef}
        className="surface-chip nav-chip translate-button px-3 py-1.5 text-heading"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
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
        <span className="translate-button__label notranslate" translate="no">
          {LANGUAGE_OPTIONS.find((option) => option.code === currentCode)?.label ??
            "Velg språk"}
        </span>
        <ChevronDown
          className="translate-button__arrow"
          data-open={isOpen}
          aria-hidden="true"
        />
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
