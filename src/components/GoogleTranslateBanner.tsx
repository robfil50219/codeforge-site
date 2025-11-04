import {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
} from "react";
import cn from "../utils/cn";

type GoogleTranslateElement =
  | undefined
  | {
      translate: {
        TranslateElement: {
          new (
            options: Record<string, unknown>,
            element: string,
          ): void;
          InlineLayout: {
            SIMPLE: unknown;
          };
        };
      };
    };

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: GoogleTranslateElement;
  }
}

const SCRIPT_ID = "google-translate-script";

const LANGUAGES: Array<{ code: string; label: string }> = [
  { code: "", label: "Original (Norsk)" },
  { code: "en", label: "Engelsk" },
  { code: "sv", label: "Svensk" },
  { code: "da", label: "Dansk" },
  { code: "fi", label: "Finsk" },
  { code: "de", label: "Tysk" },
];

function loadTranslateScript(callback: () => void) {
  if (window.google?.translate?.TranslateElement) {
    callback();
    return;
  }

  if (document.getElementById(SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  wrapperClassName?: string;
  placement?: "up" | "down"; // ensures we can pop above the trigger on tighter mobile layouts
};

export default function GoogleTranslateBanner({
  className,
  wrapperClassName,
  onClick,
  type,
  placement = "down",
  ...buttonProps
}: Props) {
  const elementId = useId().replace(/:/g, "_");
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialize = () => {
      const container = document.getElementById(elementId);
      if (!container) return;

      container.innerHTML = "";

      const TranslateElement =
        window.google?.translate?.TranslateElement;
      if (!TranslateElement) {
        return;
      }

      new TranslateElement(
        {
          pageLanguage: "no",
          includedLanguages: "da,de,en,fi,sv",
          autoDisplay: false,
          layout: TranslateElement.InlineLayout.SIMPLE,
        },
        elementId,
      );
    };

    window.googleTranslateElementInit = initialize;
    loadTranslateScript(initialize);
  }, [elementId]);

  useEffect(() => {
    const container = document.getElementById(elementId);
    if (!container) return;

    let cleanup: (() => void) | undefined;

    const applyCombo = () => {
      cleanup?.();

      const combo =
        document.querySelector<HTMLSelectElement>("select.goog-te-combo");
      if (!combo) {
        cleanup = undefined;
        return;
      }

      combo.style.opacity = "0";
      combo.style.position = "absolute";
      combo.style.inset = "0";
      combo.style.width = "100%";
      combo.style.height = "100%";
      combo.style.pointerEvents = "none";
      setCurrentLang(combo.value || "");

      const handleChange = () => {
        setCurrentLang(combo.value || "");
      };
      combo.addEventListener("change", handleChange);
      cleanup = () => combo.removeEventListener("change", handleChange);
    };

    applyCombo();

    const observer = new MutationObserver(applyCombo);
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      cleanup?.();
      observer.disconnect();
    };
  }, [elementId]);

  useEffect(() => {
    if (!open) return;

    const handleClickAway = (event: MouseEvent | FocusEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("focusin", handleClickAway);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("focusin", handleClickAway);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const triggerNativeChange = (target: HTMLSelectElement) => {
    const event = new Event("change", {
      bubbles: true,
      cancelable: true,
    });
    target.dispatchEvent(event);

    if (typeof document.createEvent === "function") {
      const legacy = document.createEvent("HTMLEvents");
      legacy.initEvent("change", true, true);
      target.dispatchEvent(legacy);
    }
  };

  const handleSelect = (code: string) => {
    const combo =
      document.querySelector<HTMLSelectElement>("select.goog-te-combo");
    if (!combo) return;

    combo.value = code;
    triggerNativeChange(combo);
    setCurrentLang(combo.value || "");
    setOpen(false);
  };

  const handleTriggerClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"] =
    (event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      setOpen((prev) => !prev);
    };

  return (
    <div
      ref={wrapperRef}
      data-placement={placement}
      data-open={open ? "true" : "false"}
      className={cn("google-translate-chip", wrapperClassName)}
    >
      <button
        {...buttonProps}
        type={type ?? "button"}
        onClick={handleTriggerClick}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn("google-translate-trigger", className)}
      >
        <span>Velg språk</span>
      </button>

      {open && (
        <div
          className="google-translate-dropdown"
          role="listbox"
          aria-label="Velg språk"
        >
          <div className="google-translate-dropdown__header">
            <span>Velg språk</span>
            <button
              type="button"
              className="google-translate-dropdown__close"
              onClick={() => setOpen(false)}
              aria-label="Lukk språkvalg"
            >
              <span className="google-translate-dropdown__close-icon">×</span>
            </button>
          </div>

          <div className="google-translate-options">
            {LANGUAGES.map((language) => (
              <button
                key={language.code || "default"}
                type="button"
                role="option"
                aria-selected={currentLang === language.code}
                className={cn(
                  "google-translate-option",
                  currentLang === language.code && "is-active",
                )}
                onClick={() => handleSelect(language.code)}
              >
                {language.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div id={elementId} className="google-translate-native" aria-hidden />
    </div>
  );
}
