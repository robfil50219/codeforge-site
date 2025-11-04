// src/hooks/useGoogleTranslate.ts
/**
 * -------------------------------------------------------
 *  CodeForge Studio — Proprietary Source Code
 *  © 2025 CodeForge Studio Filep. All rights reserved.
 *
 *  This file is part of the CodeForge Studio website.
 *  Unauthorized copying, modification, or distribution
 *  of this file, via any medium, is strictly prohibited.
 *
 *  For licensing or collaboration inquiries:
 *  robert@codeforgestudio.no | https://codeforgestudio.no
 * -------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from "react";

export const LANGUAGE_OPTIONS = [
  { code: "no", label: "Norsk" },
  { code: "sv", label: "Svensk" },
  { code: "da", label: "Dansk" },
  { code: "fi", label: "Finsk" },
  { code: "en", label: "Engelsk" },
] as const;

export type GoogleLanguageCode = (typeof LANGUAGE_OPTIONS)[number]["code"];

declare global {
  interface Window {
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
          ): unknown;
        };
      };
    };
    googleTranslateElementInit?: () => void;
    __cfsGoogleTranslateInitCallbacks__?: Array<() => void>;
    __cfsGoogleTranslateLoadPromise__?: Promise<void>;
    __cfsGoogleTranslateInstance__?: unknown;
    __cfsGoogleTranslateReady__?: boolean;
  }
}

const SCRIPT_ID = "google-translate-script";
const SCRIPT_SRC =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
const TRANSLATE_CONTAINER_ID = "google_translate_container";
const SELECT_SELECTOR = "select.goog-te-combo";
const INCLUDED_LANGUAGES = LANGUAGE_OPTIONS.filter((lang) => lang.code !== "no")
  .map((lang) => lang.code)
  .join(",");

const ensureHiddenContainer = () => {
  if (typeof document === "undefined") return;
  let container = document.getElementById(TRANSLATE_CONTAINER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = TRANSLATE_CONTAINER_ID;
    container.style.position = "fixed";
    container.style.bottom = "0";
    container.style.right = "0";
    container.style.width = "0";
    container.style.height = "0";
    container.style.opacity = "0";
    container.style.pointerEvents = "none";
    container.style.zIndex = "-1";
    container.style.visibility = "hidden";
    document.body.appendChild(container);
  }
};

const enforceNoBanner = () => {
  if (typeof document === "undefined") return;
  const bannerFrame = document.querySelector("iframe.goog-te-banner-frame");
  if (bannerFrame && bannerFrame.parentElement) {
    bannerFrame.parentElement.removeChild(bannerFrame);
  }
  const balloonFrame = document.querySelector("iframe.goog-te-balloon-frame");
  if (balloonFrame && balloonFrame.parentElement) {
    balloonFrame.parentElement.removeChild(balloonFrame);
  }
  const banner = document.querySelector(".goog-te-banner");
  if (banner && banner.parentElement) {
    banner.parentElement.removeChild(banner);
  }
  if (document.body && document.body.style.top && document.body.style.top !== "0px") {
    document.body.style.top = "0px";
  }
  const html = document.documentElement;
  if (html && html.style.top && html.style.top !== "0px") {
    html.style.top = "0px";
  }
};

const instantiateTranslateElement = () => {
  if (typeof window === "undefined") return;
  if (window.__cfsGoogleTranslateInstance__) return window.__cfsGoogleTranslateInstance__;
  const TranslateElement = window.google?.translate?.TranslateElement;
  if (!TranslateElement) return null;
  ensureHiddenContainer();
  window.__cfsGoogleTranslateInstance__ = new TranslateElement(
    {
      pageLanguage: "no",
      includedLanguages: INCLUDED_LANGUAGES,
      autoDisplay: false,
    },
    TRANSLATE_CONTAINER_ID,
  );
  return window.__cfsGoogleTranslateInstance__;
};

const waitForSelectElement = (): Promise<HTMLSelectElement> =>
  new Promise((resolve) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      resolve({} as HTMLSelectElement);
      return;
    }
    const attempt = () => {
      const select = document.querySelector<HTMLSelectElement>(SELECT_SELECTOR);
      if (select) {
        resolve(select);
      } else {
        window.setTimeout(attempt, 50);
      }
    };
    attempt();
  });

const ensureGoogleTranslateReady = async () => {
  if (typeof window === "undefined") return;
  if (window.__cfsGoogleTranslateReady__) return;
  if (window.__cfsGoogleTranslateLoadPromise__) {
    await window.__cfsGoogleTranslateLoadPromise__;
    return;
  }

  window.__cfsGoogleTranslateLoadPromise__ = new Promise<void>((resolve, reject) => {
    const finish = () => {
      try {
        instantiateTranslateElement();
        waitForSelectElement().then(() => {
          window.__cfsGoogleTranslateReady__ = true;
          resolve();
        });
      } catch (error) {
        window.__cfsGoogleTranslateLoadPromise__ = undefined;
        reject(error instanceof Error ? error : new Error("Google Translate init failed"));
      }
    };

    if (window.google?.translate?.TranslateElement) {
      finish();
      return;
    }

    window.__cfsGoogleTranslateInitCallbacks__ =
      window.__cfsGoogleTranslateInitCallbacks__ ?? [];
    window.__cfsGoogleTranslateInitCallbacks__!.push(finish);

    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        window.__cfsGoogleTranslateInitCallbacks__?.forEach((callback) => callback());
      };
    }

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.defer = true;
    script.onerror = () => {
      window.__cfsGoogleTranslateLoadPromise__ = undefined;
      reject(new Error("Failed to load Google Translate script"));
    };
    document.body.appendChild(script);
  });

  await window.__cfsGoogleTranslateLoadPromise__;
};

export function useGoogleTranslate() {
  const [ready, setReady] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<GoogleLanguageCode>("no");
  const pendingLanguageRef = useRef<GoogleLanguageCode | null>(null);

  const applyLanguage = useCallback((code: GoogleLanguageCode) => {
    const select = document.querySelector<HTMLSelectElement>(SELECT_SELECTOR);
    if (!select) return;
    const targetValue = code === "no" ? "" : code;
    if (select.value !== targetValue) {
      select.value = targetValue;
    }
    const event = new Event("change", { bubbles: true });
    select.dispatchEvent(event);
    setCurrentLanguage(code);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    ensureGoogleTranslateReady()
      .then(() => {
        if (cancelled) return;
        setReady(true);
      })
      .catch((error) => {
        console.warn("Google Translate failed to initialise", error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new MutationObserver(() => {
      enforceNoBanner();
    });
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }
    enforceNoBanner();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (pendingLanguageRef.current) {
      applyLanguage(pendingLanguageRef.current);
      pendingLanguageRef.current = null;
    }
  }, [ready, applyLanguage]);

  useEffect(() => {
    if (!ready) return;
    const select = document.querySelector<HTMLSelectElement>(SELECT_SELECTOR);
    if (!select) return;
    const handleChange = () => {
      const value = select.value as GoogleLanguageCode | "";
      const next = value === "" ? "no" : value;
      setCurrentLanguage(next);
    };
    select.addEventListener("change", handleChange);
    return () => select.removeEventListener("change", handleChange);
  }, [ready]);

  const changeLanguage = useCallback(
    (code: GoogleLanguageCode) => {
      if (!ready) {
        pendingLanguageRef.current = code;
        return;
      }
      applyLanguage(code);
    },
    [ready, applyLanguage],
  );

  return {
    ready,
    currentLanguage,
    changeLanguage,
    languages: LANGUAGE_OPTIONS,
  };
}
