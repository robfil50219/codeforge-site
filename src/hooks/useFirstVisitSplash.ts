import { useEffect, useRef, useState } from "react";

// Bump when you want everyone to see the splash again after a deploy
const SPLASH_VERSION = "v2";
const KEY = `cfs-saw-splash:${SPLASH_VERSION}`;

export default function useFirstVisitSplash() {
  const [show, setShow] = useState(false);
  const minDone = useRef(false);
  const ready = useRef(false);
  const minTimer = useRef<number | null>(null);
  const maxTimer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Force via ?splash=1 for testing
    const force = new URLSearchParams(window.location.search).get("splash") === "1";

    // Show once per tab unless forced
    if (!force && sessionStorage.getItem(KEY) === "1") return;
    sessionStorage.setItem(KEY, "1");
    setShow(true);

    // Keep visible ~2.4s + fade (component) ≈ 3.0s total
    const minMs = 2400;
    const maxMs = 3400; // hard cutoff

    const done = () => {
      ready.current = true;
      if (minDone.current) setShow(false);
    };

    // Minimum display time
    minTimer.current = window.setTimeout(() => {
      minDone.current = true;
      if (ready.current) setShow(false);
    }, minMs);

    // Never stick
    maxTimer.current = window.setTimeout(done, maxMs);

    // Mark ready when page is usable (won't hide before minMs anyway)
    if (document.readyState === "complete" || document.readyState === "interactive") {
      queueMicrotask(done);
    } else {
      const onLoad = () => done();
      const onDom = () => done();
      window.addEventListener("load", onLoad, { once: true });
      document.addEventListener("DOMContentLoaded", onDom, { once: true });
      return () => {
        window.removeEventListener("load", onLoad);
        document.removeEventListener("DOMContentLoaded", onDom);
        if (minTimer.current) clearTimeout(minTimer.current);
        if (maxTimer.current) clearTimeout(maxTimer.current);
      };
    }

    return () => {
      if (minTimer.current) clearTimeout(minTimer.current);
      if (maxTimer.current) clearTimeout(maxTimer.current);
    };
  }, []);

  return show;
}