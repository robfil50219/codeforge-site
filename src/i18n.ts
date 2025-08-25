// src/i18n.ts
// ---------------------------------------------
// i18next initialization and translation bundles
// ---------------------------------------------

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ---------------------------------------------
// Translation resources (EN + NO)
// Tip: keep keys consistent across languages.
// ---------------------------------------------
const resources = {
  en: {
    translation: {
      // ---------- Global / Navigation ----------
      nav: {
        services: "Services",
        work: "Work",
        pricing: "Pricing",
        about: "About",
        contact: "Contact",
      },

      //--------- Consent ----------

      consent: {
        title: "Cookie Consent",
        text: "This website uses cookies to ensure you get the best experience on our website.",
        learnMore: "Learn more",
        actions: {
          accept: "Accept all cookies",
          reject: "Reject non-essential cookies",
        },
      },

      // ---------- Brand ----------
      brand: "CodeForge Studio",

      // ---------- Hero ----------
      // Keep headline as requested
      hero: {
        title: "Design & build modern web apps",
        tagline: "Websites that feel fast and look sharp.",
        blurb:
          "We design and build modern sites and web apps with React and TypeScript. Clear structure, smooth interactions, and careful attention to detail.",
        ctaServices: "View Services",
        ctaWork: "See Work",
      },

      // ---------- Services ----------
      services: {
        heading: "Services",
        sub: "From idea to launch — design, build, and fine‑tune your site.",
        primary: {
          uiux: {
            title: "UI/UX Design",
            blurb:
              "Clear, modern interfaces that are easy to understand and use.",
            points: [
              "Design systems & style guides",
              "Wireframes and mockups",
              "Clickable prototypes",
            ],
          },
          frontend: {
            title: "Frontend Development",
            blurb:
              "Reliable React + TypeScript builds with clean, maintainable code.",
            points: [
              "Reusable component libraries",
              "API and CMS integration",
              "Routing and state handled",
            ],
          },
          perf: {
            title: "Performance & Accessibility",
            blurb: "Fast, accessible sites that work for everyone.",
            points: [
              "Core Web Vitals improvements",
              "WCAG‑aware design & fixes",
              "Audits with action plans",
            ],
          },
        },
        extras: {
          cms: {
            title: "Content & CMS",
            blurb: "Connect your site to tools your team can edit.",
            points: ["Headless CMS setup", "Markdown/MDX support", "Content models & roles"],
          },
          responsive: {
            title: "Responsive & Mobile",
            blurb: "Looks great on phones, tablets, and large screens.",
            points: ["Mobile‑first layouts", "Flexible grids & images", "Touch‑friendly patterns"],
          },
          quality: {
            title: "Quality & Security",
            blurb: "Confidence to ship, with guardrails in place.",
            points: ["Type safety & linting", "Automated checks", "Best‑practice hardening"],
          },
        },
        process: {
          title: "Process",
          steps: [
            { step: "1. Discover", text: "Goals, audience, scope" },
            { step: "2. Design", text: "Flows, wireframes, UI" },
            { step: "3. Build & Launch", text: "Code, QA, deploy" },
          ],
        },
      },

      // ---------- Work ----------
      work: {
        heading: "Selected Work",
        sub: "A few highlights from recent projects.",
        view: "View project",
        cards: {
          dashboard: {
            title: "Dashboard Pro",
            blurb: "Compact performance dashboards with charts and filters.",
            tags: ["React", "TypeScript", "Vite"],
          },
          landing: {
            title: "Landing Kit",
            blurb: "Conversion‑focused landing pages with simple A/B hooks.",
            tags: ["Tailwind", "Accessibility", "SEO"],
          },
          storefront: {
            title: "Storefront UI",
            blurb: "Fast storefront front‑end with cart and checkout.",
            tags: ["SPA", "State Mgmt", "API"],
          },
          docs: {
            title: "Docs Engine",
            blurb: "Searchable documentation with live code examples.",
            tags: ["MDX", "Search", "Performance"],
          },
        },
      },

      // ---------- Pricing ----------
      pricing: {
        heading: "Project packages",
        sub: "Pick what fits your goals and timeline.",
        starter: {
          name: "Starter",
          price: "€799 / fixed",
          blurb: "Launch a clean one‑page site.",
          features: [
            "1 landing page",
            "Responsive + basic SEO",
            "Contact form or email CTA",
            "Deployed to your host",
          ],
        },
        pro: {
          name: "Pro",
          price: "€2,400 / fixed",
          badge: "Most popular",
          blurb: "A complete multi‑page site with a solid component setup.",
          features: [
            "Up to 6 pages",
            "Design system + components",
            "Integrations (forms, CMS, email)",
            "Performance & accessibility pass",
          ],
        },
        custom: {
          name: "Custom",
          price: "€? / quote",
          blurb: "For complex features or ongoing work.",
          features: [
            "Advanced features & integrations",
            "E‑commerce, auth, dashboards",
            "Roadmap and iterations",
            "Flexible timeline & budget",
          ],
        },
        chooseStarter: "Choose Starter",
        choosePro: "Choose Pro",
        requestQuote: "Request a quote",
        fineprint:
          "Prices are typical starting points. Final quote depends on scope and integrations.",
      },

      // ---------- Contact ----------
      contact: {
        heading: "Let’s build something great",
        copy:
          "Tell me about your goals, timeline, and budget. I’ll reply with a plan and next steps.",
        email: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        start: "Start a project",
        trust: {
          reply: "Replies within 24h",
          location: "Based in Trondheim, Norway",
        },
        ctaTitle: "Ready to start?",
        ctaCopy: "Let’s bring your idea to life with clean, modern code.",
        formTitle: "Send a message",
        formCopy: "Fill out the form and I’ll get back to you shortly.",
        form: {
          name: "Name",
          email: "Email",
          subjectOptional: "Subject (optional)",
          message: "Message",
          send: "Send Message",
          sending: "Sending...",
          success: "Thanks! Your message has been sent.",
          error: "Something went wrong. Please try again later.",
          noSubject: "(no subject)",
          placeholders: {
            name: "Your name",
            email: "you@example.com",
            subject: "How can we help?",
            message: "Write your message here...",
          },
          errors: {
            name: "Please enter your name.",
            email: "Enter a valid email.",
            message: "Please enter a message.",
          },
        },
      },

      // ---------- Footer ----------
      footer: {
        navLabel: "Footer navigation",
        connect: "Connect",
        rights: "All rights reserved.",
        privacy: "Privacy",
        terms: "Terms",
      },

      // ---------- About ----------
      about: {
        sectionLabel: "About",
        alt: "Robert Filep",
        heading: "Building clean, fast, user‑friendly UIs",
        copy:
          "I’m Robert Filep, a front‑end developer and founder of CodeForge Studio. I design and build responsive, accessible interfaces with React + TypeScript. My focus is clear structure, strong performance, and small details that add up.",
        highlights: [
          "Performance‑first mindset",
          "Accessible by default",
          "TypeScript everywhere",
          "Pixel‑perfect execution",
        ],
        tech: ["React", "TypeScript", "TailwindCSS", "Vite"],
      },

      // ---------- Privacy Page ----------
      privacy: {
        heading: "Privacy Policy",
        intro: "Your privacy matters. This page explains how we handle your data.",
        sections: {
          data: {
            title: "Data we collect",
            text:
              "We only collect information you provide when contacting us or starting a project.",
          },
          use: {
            title: "How we use your data",
            text:
              "We use it to respond to inquiries and deliver our services. Nothing more.",
          },
          rights: {
            title: "Your rights",
            text:
              "You can request access, correction, or deletion of your data at any time.",
          },
          cookies: {
            title: "Cookies",
            text:
              "We use minimal cookies for basic functionality and performance insights.",
          },
        },
        contact: "For questions about privacy, please contact us at:",
        back: "Back to home",
      },

      // ---------- Terms Page ----------
      terms: {
        heading: "Terms & Conditions",
        intro:
          "These terms explain how you can use our website and services.",
        sections: {
          usage: {
            title: "Use of service",
            text:
              "Use our services responsibly and in line with applicable laws.",
          },
          payments: {
            title: "Payments & invoicing",
            text:
              "Unless otherwise agreed, invoices are due within 14 days. Some projects require an upfront deposit.",
          },
          ip: {
            title: "Intellectual property",
            text:
              "After full payment, project deliverables belong to you. Our internal tools and libraries remain ours.",
          },
          liability: {
            title: "Limitations of liability",
            text:
              "Services are provided as‑is. We are not liable for indirect or consequential loss.",
          },
        },
        back: "Back to home",
      },
    },
  },

  // ------------------ NORWEGIAN ------------------
  no: {
    translation: {
      // ---------- Global / Navigation ----------
      nav: {
        services: "Tjenester",
        work: "Arbeid",
        pricing: "Priser",
        about: "Om oss",
        contact: "Kontakt",
      },

      // ---------- Consent ----------
      consent: {
        title: "Informasjonskapsler og personvern",
        text: "Denne nettsiden bruker informasjonskapsler for å sikre at du får den beste opplevelsen på vår nettside.",
        learnMore: "Lær mer",
        actions: {
          accept: "Godta alle informasjonskapsler",
          reject: "Avvis ikke-essensielle informasjonskapsler",
        },
      },

      // ---------- Brand ----------
      brand: "CodeForge Studio",

      // ---------- Hero ----------
      hero: {
        title: "Design og bygg moderne nettløsninger",
        tagline: "Nettsteder som er raske og ser skarpe ut.",
        blurb:
          "Vi designer og bygger moderne nettsider og web‑apper med React og TypeScript. Tydelig struktur, smidige interaksjoner og stor vekt på detaljer.",
        ctaServices: "Se tjenester",
        ctaWork: "Se arbeid",
      },

      // ---------- Services ----------
      services: {
        heading: "Tjenester",
        sub: "Fra idé til lansering — vi designer, bygger og finpusser nettsiden.",
        primary: {
          uiux: {
            title: "UI/UX‑design",
            blurb:
              "Tydelige, moderne grensesnitt som er enkle å forstå og bruke.",
            points: [
              "Designsystem og stilguide",
              "Wireframes og skisser",
              "Klikkbare prototyper",
            ],
          },
          frontend: {
            title: "Frontend‑utvikling",
            blurb:
              "Trygg utvikling i React + TypeScript med ryddig og vedlikeholdbar kode.",
            points: [
              "Gjenbrukbare komponenter",
              "Integrasjon mot API og CMS",
              "Routing og state på plass",
            ],
          },
          perf: {
            title: "Ytelse og tilgjengelighet",
            blurb: "Raske, tilgjengelige sider som fungerer for alle.",
            points: [
              "Forbedring av Core Web Vitals",
              "WCAG‑tilpasninger og fixes",
              "Analyser og tiltaksplan",
            ],
          },
        },
        extras: {
          cms: {
            title: "Innhold og CMS",
            blurb: "Koble nettsiden til verktøy dere kan redigere selv.",
            points: [
              "Oppsett av headless CMS",
              "Støtte for Markdown/MDX",
              "Innholdsmodeller og roller",
            ],
          },
          responsive: {
            title: "Responsiv og mobil",
            blurb: "Fungerer på alle skjermstørrelser.",
            points: [
              "Mobil‑først oppsett",
              "Fleksible rutenett og bilder",
              "Berøringsvennlige mønstre",
            ],
          },
          quality: {
            title: "Kvalitet og sikkerhet",
            blurb: "Trygghet i leveranse, med gode rammer.",
            points: [
              "Typesikkerhet og linting",
              "Automatiske sjekker",
              "Sikker praksis",
            ],
          },
        },
        process: {
          title: "Prosess",
          steps: [
            { step: "1. Utforsk", text: "Mål, målgruppe, omfang" },
            { step: "2. Design", text: "Flyt, wireframes, UI" },
            { step: "3. Bygg og lanser", text: "Kode, QA, deploy" },
          ],
        },
      },

      // ---------- Work ----------
      work: {
        heading: "Utvalgt arbeid",
        sub: "Noen høydepunkter fra nyere prosjekter.",
        view: "Se prosjekt",
        cards: {
          dashboard: {
            title: "Dashboard Pro",
            blurb: "Kompakte dashboards med grafer og filtre.",
            tags: ["React", "TypeScript", "Vite"],
          },
          landing: {
            title: "Landing Kit",
            blurb: "Landingssider som konverterer, med enkle A/B‑muligheter.",
            tags: ["Tailwind", "Tilgjengelighet", "SEO"],
          },
          storefront: {
            title: "Storefront UI",
            blurb: "Rask butikkfront med handlekurv og checkout.",
            tags: ["SPA", "State‑håndtering", "API"],
          },
          docs: {
            title: "Docs Engine",
            blurb: "Søkbar dokumentasjon med levende kodeeksempler.",
            tags: ["MDX", "Søk", "Ytelse"],
          },
        },
      },

      // ---------- Pricing ----------
      pricing: {
        heading: "Prosjektpakker",
        sub: "Velg det som passer mål og tidsplan.",
        starter: {
          name: "Start",
          price: "kr 8 500 / fastpris",
          blurb: "Lanser en ryddig én‑siders nettside.",
          features: [
            "1 landingsside",
            "Responsiv + grunnleggende SEO",
            "Kontaktskjema eller e‑post‑CTA",
            "Publisering til din host",
          ],
        },
        pro: {
          name: "Pro",
          price: "kr 25 000 / fastpris",
          badge: "Mest populær",
          blurb: "Flere sider og godt komponentoppsett.",
          features: [
            "Opptil 6 sider",
            "Designsystem + komponenter",
            "Integrasjoner (skjema, CMS, e‑post)",
            "Ytelses‑ og tilgjengelighetssjekk",
          ],
        },
        custom: {
          name: "Skreddersøm",
          price: "kr ? / tilbud",
          blurb: "For avanserte behov eller løpende arbeid.",
          features: [
            "Avanserte funksjoner og integrasjoner",
            "E‑handel, innlogging, dashboards",
            "Roadmap og iterasjoner",
            "Fleksibel tidslinje og budsjett",
          ],
        },
        chooseStarter: "Velg Start",
        choosePro: "Velg Pro",
        requestQuote: "Be om tilbud",
        fineprint:
          "Prisene er typiske utgangspunkt. Endelig tilbud avhenger av omfang og integrasjoner.",
      },

      // ---------- Contact ----------
      contact: {
        heading: "La oss bygge noe bra",
        copy:
          "Fortell om mål, tidslinje og budsjett. Jeg svarer med en plan og neste steg.",
        email: "E‑post",
        github: "GitHub",
        linkedin: "LinkedIn",
        start: "Start et prosjekt",
        trust: {
          reply: "Svarer innen 24 t",
          location: "Basert i Trondheim, Norge",
        },
        ctaTitle: "Klar til å starte?",
        ctaCopy: "La oss gjøre idéen din til virkelighet med moderne kode.",
        formTitle: "Send en melding",
        formCopy: "Fyll ut skjemaet, så tar jeg kontakt.",
        form: {
          name: "Navn",
          email: "E‑post",
          subjectOptional: "Emne (valgfritt)",
          message: "Melding",
          send: "Send melding",
          sending: "Sender …",
          success: "Takk! Meldingen er sendt.",
          error: "Noe gikk galt. Prøv igjen senere.",
          noSubject: "(uten emne)",
          placeholders: {
            name: "Ditt navn",
            email: "du@eksempel.no",
            subject: "Hvordan kan vi hjelpe?",
            message: "Skriv meldingen her …",
          },
          errors: {
            name: "Skriv inn navnet ditt.",
            email: "Skriv inn en gyldig e‑post.",
            message: "Skriv inn en melding.",
          },
        },
      },

      // ---------- Footer ----------
      footer: {
        navLabel: "Bunnmeny",
        connect: "Kontakt",
        rights: "Alle rettigheter forbeholdt.",
        privacy: "Personvern",
        terms: "Vilkår",
      },

      // ---------- About ----------
      about: {
        sectionLabel: "Om oss",
        alt: "Robert Filep",
        heading: "Bygger rene, raske og brukervennlige grensesnitt",
        copy:
          "Jeg er Robert Filep, frontend‑utvikler og grunnlegger av CodeForge Studio. Jeg designer og bygger responsive og tilgjengelige løsninger med React + TypeScript, med fokus på tydelig struktur, god ytelse og detaljer som teller.",
        highlights: [
          "Ytelse først",
          "Tilgjengelig som standard",
          "TypeScript overalt",
          "Pikselperfekt gjennomføring",
        ],
        tech: ["React", "TypeScript", "TailwindCSS", "Vite"],
      },

      // ---------- Personvern (Privacy) ----------
      privacy: {
        heading: "Personvernerklæring",
        intro:
          "Ditt personvern er viktig. Her forklarer vi hvordan vi behandler data.",
        sections: {
          data: {
            title: "Data vi samler inn",
            text:
              "Vi samler bare inn informasjon du gir når du kontakter oss eller starter et prosjekt.",
          },
          use: {
            title: "Hvordan vi bruker data",
            text:
              "Vi bruker den for å svare på henvendelser og levere tjenestene våre. Ikke mer.",
          },
          rights: {
            title: "Dine rettigheter",
            text:
              "Du kan be om innsyn, retting eller sletting av dine data når som helst.",
          },
          cookies: {
            title: "Informasjonskapsler",
            text:
              "Vi bruker et minimum av informasjonskapsler for grunnleggende funksjon og ytelsesinnsikt.",
          },
        },
        contact: "Spørsmål om personvern? Kontakt oss på:",
        back: "Tilbake til forsiden",
      },

      // ---------- Vilkår (Terms) ----------
      terms: {
        heading: "Vilkår og betingelser",
        intro:
          "Disse vilkårene forklarer hvordan du kan bruke nettstedet og tjenestene våre.",
        sections: {
          usage: {
            title: "Bruk av tjenesten",
            text:
              "Bruk tjenestene ansvarlig og i tråd med gjeldende lovverk.",
          },
          payments: {
            title: "Betaling og fakturering",
            text:
              "Med mindre annet er avtalt, forfaller fakturaer innen 14 dager. Noen prosjekter krever forskudd.",
          },
          ip: {
            title: "Immaterielle rettigheter",
            text:
              "Etter full betaling eies leveranser av deg. Våre interne verktøy og biblioteker forblir våre.",
          },
          liability: {
            title: "Ansvarsbegrensning",
            text:
              "Tjenestene leveres «som de er». Vi er ikke ansvarlige for indirekte eller følgeskader.",
          },
        },
        back: "Tilbake til forsiden",
      },
    },
  },
} as const;

// ---------------------------------------------
// i18n setup
// ---------------------------------------------
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "no", // default language (can be changed by detector)
    fallbackLng: "en",
    supportedLngs: ["en", "no"],
    detection: {
      // Order of language detection
      order: ["localStorage", "navigator", "htmlTag", "querystring", "cookie"],
      // Where to cache the user language
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

// Keep <html lang="..."> in sync with current language
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;