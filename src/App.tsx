/**
 * -------------------------------------------------------
 *  CodeForge Studio — Proprietary Source Code
 *  © 2025 CodeForge Studio Filep. All rights reserved.
 *
 *  For licensing or collaboration inquiries:
 *  robert@codeforgestudio.no | https://codeforgestudio.no
 * -------------------------------------------------------
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";

import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ConsentBanner from "./components/ConsentBanner";
import ScrollToTop from "./components/ScrollToTop";
import BallpitBackground from "./components/BallpitBackground";

import Splash from "./components/Splash";
import useFirstVisitSplash from "./hooks/useFirstVisitSplash";

// ✅ Extend Window here so we can use window.__BALLPIT_DISABLED without `any`
declare global {
  interface Window {
    __BALLPIT_DISABLED?: boolean;
  }
}

function Home() {
  const title = "CodeForge Studio – Moderne frontend, design og webutvikling";
  const desc =
    "CodeForge Studio bygger raske, moderne og visuelt skarpe nettsider med fokus på ytelse, tilgjengelighet og brukervennlighet.";
  const url = "https://codeforgestudio.no/";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <Hero />
      <Services />
      <Pricing />
      <About />
      <Contact />
    </>
  );
}

export default function App() {
  // Hook that drives crossfade timing
  const { showSplash, startAppFade } = useFirstVisitSplash();

  // iPad 100vh fix
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.CSS?.supports?.("height: 100svh")) return;
    const setAppHeight = () => {
      document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    setAppHeight();
    window.addEventListener("resize", setAppHeight);
    window.addEventListener("orientationchange", setAppHeight);
    return () => {
      window.removeEventListener("resize", setAppHeight);
      window.removeEventListener("orientationchange", setAppHeight);
    };
  }, []);

  // Keep ballpit mounted from start, but paused & hidden until app fade begins
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Remember user's previous preference
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("cfs-ballpit"); // "static" | "interactive" | null
    } catch {
      // ignore storage errors
    }

    // Force disabled while splash is visible
    window.__BALLPIT_DISABLED = true;
    window.dispatchEvent(new CustomEvent("ballpit-toggle", { detail: { disabled: true } }));

    if (startAppFade) {
      const restoreDisabled = saved === "static";
      window.__BALLPIT_DISABLED = restoreDisabled;
      window.dispatchEvent(
        new CustomEvent("ballpit-toggle", { detail: { disabled: restoreDisabled } }),
      );
    }
  }, [startAppFade]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        {/* Splash overlay on top (handles its own fade timings) */}
        {showSplash && <Splash />}

        {/* Ballpit is mounted from the start so it's ready; visually fades in with app */}
        <div
          style={{
            opacity: startAppFade ? 1 : 0,
            transition: "opacity 420ms ease-out",
          }}
          aria-hidden={!startAppFade}
        >
          <BallpitBackground />
        </div>

        {/* App content: fades in while splash fades out (crossfade) */}
        <div
          className="relative z-10 flex flex-col text-slate-900 dark:text-[#F6FAFA]"
          style={{
            minHeight: "var(--app-height)",
            opacity: startAppFade ? 1 : 0,
            transition: "opacity 1000ms cubic-bezier(.16,1,.3,1)",
            pointerEvents: showSplash ? "none" : "auto",
            overflow: showSplash ? "hidden" : undefined,
          }}
          aria-hidden={showSplash}
        >
          <ScrollToTop />
          <Navbar />
          <ConsentBanner />

          <main
            className="flex-1 pb-24 md:pb-0"
            style={{
              paddingTop: "calc(var(--app-safe-top) + 4rem)",
              paddingBottom: "calc(var(--app-safe-bottom) + 6rem)",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}