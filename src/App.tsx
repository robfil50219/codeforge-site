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

function Home() {
  const title = "CodeForge Studio – Moderne frontend, design og webutvikling";
  const desc =
    "CodeForge Studio bygger raske, moderne og visuelt skarpe nettsider med fokus på ytelse, tilgjengelighet og brukervennlighet.";
  const url = "https://codeforgestudio.no/";

  return (
    <>
      {/* Minimal SEO for now (keeps lints happy) */}
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* PAGE CONTENT */}
      <Hero />
      <Services />
      <Pricing />
      <About />
      <Contact />
    </>
  );
}

export default function App() {
  const showSplash = useFirstVisitSplash();

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

  return (
    <BrowserRouter>
      <ErrorBoundary>
        {/* Background canvas behind everything */}
        <BallpitBackground />

        {/* React splash overlay */}
        {showSplash && <Splash />}

        {/* Foreground app content */}
        <div
          className="relative z-10 flex flex-col text-slate-900 dark:text-[#F6FAFA]"
          style={{ minHeight: "var(--app-height)" }}
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