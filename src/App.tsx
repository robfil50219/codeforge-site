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
  const title = "CodeForge Studio – Moderne frontend, design og webutvikling";
  const desc =
    "CodeForge Studio bygger raske, moderne og visuelt skarpe nettsider med fokus på ytelse, tilgjengelighet og brukervennlighet.";
  const url = "https://codeforgestudio.no/";
  const ogImage = "https://codeforgestudio.no/og-image.jpg";

  return (
    <>
      {/* SEO / social meta */}
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content="index,follow" />
      <meta
        name="keywords"
        content="CodeForge Studio, CodeForgeStudio, codeforgestudio.no, webutvikling, frontend, design, Ranheim, Trondheim"
      />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured data (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": site,
          // 👇 Teach Google the no-space brand variant and the domain
          "alternateName": ["CodeForgeStudio", "codeforgestudio.no"],
          "url": url,
          "logo": "https://codeforgestudio.no/logo.png",
          "email": "robert@codeforgestudio.no",
        })}
      </script>

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
          <Navbar />
          <ConsentBanner />

          <main className="flex-1 pt-16 pb-24 md:pb-0">
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
