// src/App.tsx
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
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
// import Work from "./components/Work";
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

function Home() {
  const site = "CodeForge Studio";
  const title = `Design & build modern web apps • ${site}`;
  const desc =
    "We craft fast, accessible, and beautiful front-ends with modern web technologies.";

  return (
    <>
      {/* SEO / social meta */}
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href="https://www.codeforgestudio.no/" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content="https://www.codeforgestudio.no/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />

      {/* PAGE CONTENT */}
      <Hero />
      <Services />
      {/* <Work /> */}
      <Pricing />
      <About />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        {/* Background canvas behind everything */}
        <BallpitBackground />

        {/* Foreground app content */}
        <div className="relative z-10 min-h-screen flex flex-col text-slate-900 dark:text-[#F6FAFA]">
          <ScrollToTop />

          {/* Glass header + bubble nav */}
          <Navbar />

          {/* Cookie / consent */}
          <ConsentBanner />

          {/* Main content.
             pt-16 = space for sticky header (h-16).
             pb-24 = space above floating bubble nav on mobile.
             md:pb-0 = remove extra bottom padding on desktop,
                       because bubble nav is hidden there.
          */}
          <main className="flex-1 pt-16 pb-24 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}