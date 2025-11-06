import { useEffect, useRef, useState } from "react";

const KEY = "cfs-saw-splash";

export default function useFirstVisitSplash() {
  const [show, setShow] = useState(false);
  const minDone = useRef(false);
  const ready = useRef(false);
  const minTimer = useRef<number | null>(null);
  const maxTimer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // show only on first visit per tab
    if (sessionStorage.getItem(KEY) === "1") return;
    sessionStorage.setItem(KEY, "1");
    setShow(true);

    const minMs = 700;
    const maxMs = 2200;

    const done = () => {
      ready.current = true;
      if (minDone.current) setShow(false);
    };

    // minimum display time
    minTimer.current = window.setTimeout(() => {
      minDone.current = true;
      if (ready.current) setShow(false);
    }, minMs);

    // absolute cutoff
    maxTimer.current = window.setTimeout(done, maxMs);

    // hide when page is ready
    if (document.readyState === "complete" || document.readyState === "interactive") {
      queueMicrotask(done);
    } else {
      window.addEventListener("load", done, { once: true });
      document.addEventListener("DOMContentLoaded", done, { once: true });
    }

    return () => {
      if (minTimer.current) clearTimeout(minTimer.current);
      if (maxTimer.current) clearTimeout(maxTimer.current);
      window.removeEventListener("load", done);
      document.removeEventListener("DOMContentLoaded", done);
    };
  }, []);

  return show;
}