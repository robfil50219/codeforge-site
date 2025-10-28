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

import BallpitBackground from "./components/BallpitBackground";

function Home() {
  const site = "CodeForge Studio";
  const title = `Design & build modern web apps • ${site}`;
  const desc =
    "We craft fast, accessible, and beautiful front-ends with modern web technologies.";

  return (
    <>
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
        {/* Background canvas lives at z-0 */}
        <BallpitBackground />

        {/* Everything else sits above it */}
        <div className="relative z-10 min-h-screen flex flex-col text-slate-900">
          <ScrollToTop />
          <Navbar />
          <ConsentBanner />

          {/* Keep main transparent so sections decide their own bg */}
          <main className="flex-1">
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