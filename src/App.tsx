// src/App.tsx
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

// 🎨 Canvas-bakgrunn (ballpit) – ligger BAK innholdet
import BallpitBackground from "./components/BallpitBackground";

function Home() {
  const site = "CodeForge Studio";
  const title = `Design & bygg moderne webapper • ${site}`;
  const desc =
    "Vi bygger raske, tilgjengelige og vakre front-ends med moderne webteknologier.";

  return (
    <>
      {/* Enkel SPA-head (kan byttes til react-helmet-async senere) */}
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
        <ScrollToTop />

        {/* 🎨 Mer synlig ball-bakgrunn. Default layer="behind" (bak innholdet). */}
        <BallpitBackground
          force
          // Litt lysere brand-varianter for mer pop + mørke aksenter:
          colors={["#00A0A0", "#14B8A6", "#06B6D4", "#0F4452", "#001920"]}
          opacity={1}
          shadowBlur={16}
          outlineAlpha={0.3}
          // mouseRadius={180}
          // mouseStrength={0.45}
        />

        {/* Innhold over canvas. Litt mer transparens for å slippe bakgrunnen gjennom. */}
        <div className="relative z-10 min-h-screen flex flex-col bg-white/70 text-slate-900">
          <Navbar />
          <ConsentBanner />

          <main className="flex-1 bg-transparent">
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