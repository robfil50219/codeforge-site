// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      nav: {
        services: "Services",
        work: "Work",
        pricing: "Pricing",
        about: "About",
        contact: "Contact",
      },
      brand: "CodeForge Studio",
      hero: {
        title: "Design & build modern web apps",
        tagline: "Your partner in modern frontend development",
        blurb:
          "We craft fast, accessible, and beautiful front-ends with React and TypeScript. Clean code, crisp UX, shipped with care.",
        ctaServices: "View Services",
        ctaWork: "See Work",
      },
      services: {
        heading: "Services",
        sub: "Design, build, and polish. From idea to production-ready front-ends.",
        primary: {
          uiux: {
            title: "UI/UX Design",
            blurb:
              "Simple, modern interfaces that put the user first and feel great to use.",
            points: ["Design systems", "Wireframes & mockups", "Interactive prototypes"],
          },
          frontend: {
            title: "Frontend Development",
            blurb:
              "Production-ready React + TypeScript with clean, maintainable structure.",
            points: ["Component libraries", "API integration", "Routing & state"],
          },
          perf: {
            title: "Performance & Accessibility",
            blurb:
              "Fast, inclusive experiences that score well and work for everyone.",
            points: ["Core Web Vitals", "WCAG best practices", "Audit & fixes"],
          },
        },
        extras: {
          cms: {
            title: "CMS & Content",
            blurb: "Hook your UI up to content that’s easy to edit.",
            points: ["Headless CMS", "Markdown/MDX", "Content modeling"],
          },
          responsive: {
            title: "Responsive & Mobile",
            blurb: "Looks sharp on every device, from phones to 4K monitors.",
            points: ["Mobile-first", "Adaptive layouts", "Touch interactions"],
          },
          quality: {
            title: "Quality & Security",
            blurb: "Confidence to ship, with checks and guardrails in place.",
            points: ["Type safety", "Lint & tests", "Best-practice hardening"],
          },
        },
        process: {
          title: "Process",
          steps: [
            { step: "1. Discover", text: "Goals, audience, scope" },
            { step: "2. Design", text: "Flows, wireframes, UI" },
            { step: "3. Build & Ship", text: "Code, QA, deploy" },
          ],
        },
      },
      work: {
        heading: "Selected Work",
        sub: "A few highlights from recent projects.",
        view: "View project",
        cards: {
          dashboard: {
            title: "Dashboard Pro",
            blurb: "Analytics dashboard with charts, filters, and real-time data.",
            tags: ["React", "TypeScript", "Vite"],
          },
          landing: {
            title: "Landing Kit",
            blurb: "High-conversion landing page with A/B testing hooks.",
            tags: ["Tailwind", "Accessibility", "SEO"],
          },
          storefront: {
            title: "Storefront UI",
            blurb: "Fast e-commerce front-end with cart and checkout.",
            tags: ["SPA", "State Mgmt", "API"],
          },
          docs: {
            title: "Docs Engine",
            blurb: "Searchable docs site with live code examples.",
            tags: ["MDX", "Search", "Perf"],
          },
        },
      },
      pricing: {
        heading: "Project packages",
        sub: "From quick launches to full-scale platforms — choose the path that fits your goals.",

        // Tiers (now fully translatable)
        starter: {
          name: "Starter",
          price: "€799 / fixed",
          blurb: "Launch a clean one-pager.",
          features: [
            "1 landing page",
            "Responsive + basic SEO",
            "Contact form or mailto CTA",
            "Deployed to your host"
          ]
        },
        pro: {
          name: "Pro",
          price: "€2,400 / fixed",
          badge: "Most popular",
          blurb: "Full site + components.",
          features: [
            "Up to 6 pages",
            "Design system + components",
            "Integrations (forms, CMS, email)",
            "Performance & accessibility pass"
          ]
        },
        custom: {
          name: "Custom",
          price: "€? / quote",
          blurb: "Complex or ongoing work.",
          features: [
            "Advanced features / integrations",
            "E-commerce, auth, dashboards",
            "Roadmap & iterations",
            "Flexible timeline & budget"
          ]
        },

        chooseStarter: "Choose Starter",
        choosePro: "Choose Pro",
        requestQuote: "Request a quote",
        fineprint:
          "Prices are typical starting points. Final quote depends on scope and integrations.",
      },
      contact: {
        heading: "Let’s build something great",
        copy:
          "Tell me about your project — goals, timeline, and budget. I’ll follow up with a plan and next steps.",
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
      },
      about: {
        sectionLabel: "About",
        alt: "Robert Filep",
        heading: "Building clean, fast, user-friendly UIs",
        copy:
          "I’m Robert Filep, a front-end developer and founder of CodeForge Studio. I design and build responsive, accessible interfaces with React + TypeScript and a strong eye for detail.",
        highlights: [
          "Performance-first mindset",
          "Accessible by default",
          "TypeScript everywhere",
          "Pixel-perfect execution",
        ],
        tech: ["React", "TypeScript", "TailwindCSS", "Vite"],
      },
    },
  },
  no: {
    translation: {
      nav: {
        services: "Tjenester",
        work: "Arbeid",
        pricing: "Priser",
        about: "Om oss",
        contact: "Kontakt",
      },
      brand: "CodeForge Studio",
      hero: {
        title: "Design og bygg moderne nettløsninger",
        tagline: "Din partner for moderne frontend-utvikling",
        blurb:
          "Vi leverer raske, tilgjengelige og vakre front-ends med React og TypeScript. Ren kode, tydelig UX, levert med omtanke.",
        ctaServices: "Se tjenester",
        ctaWork: "Se arbeid",
      },
      services: {
        heading: "Tjenester",
        sub: "Design, bygg og finpuss. Fra idé til produksjonsklare løsninger.",
        primary: {
          uiux: {
            title: "UI/UX-design",
            blurb: "Enkle, moderne grensesnitt som setter brukeren først.",
            points: ["Designsystemer", "Wireframes og skisser", "Interaktive prototyper"],
          },
          frontend: {
            title: "Frontend-utvikling",
            blurb: "Produksjonsklar React + TypeScript med ryddig struktur.",
            points: ["Komponentbibliotek", "API-integrasjon", "Routing og state"],
          },
          perf: {
            title: "Ytelse og tilgjengelighet",
            blurb: "Raske, inkluderende opplevelser som fungerer for alle.",
            points: ["Core Web Vitals", "WCAG-praksis", "Analyse og forbedringer"],
          },
        },
        extras: {
          cms: {
            title: "CMS og innhold",
            blurb: "Koble UI til innhold som er lett å redigere.",
            points: ["Headless CMS", "Markdown/MDX", "Innholdsmodellering"],
          },
          responsive: {
            title: "Responsiv og mobil",
            blurb: "Ser skarpt ut på alle enheter, fra mobil til 4K.",
            points: ["Mobil-først", "Adaptive layouts", "Berøringsinteraksjoner"],
          },
          quality: {
            title: "Kvalitet og sikkerhet",
            blurb: "Trygghet i leveranse, med kontroller og sikring.",
            points: ["Typesikkerhet", "Lint og tester", "Best practice-herding"],
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
      work: {
        heading: "Utvalgt arbeid",
        sub: "Noen høydepunkter fra nyere prosjekter.",
        view: "Se prosjekt",
        cards: {
          dashboard: {
            title: "Dashboard Pro",
            blurb: "Analyse-dashbord med grafer, filtre og sanntidsdata.",
            tags: ["React", "TypeScript", "Vite"],
          },
          landing: {
            title: "Landing Kit",
            blurb: "Landingsside med A/B-testing og høy konvertering.",
            tags: ["Tailwind", "Tilgjengelighet", "SEO"],
          },
          storefront: {
            title: "Storefront UI",
            blurb: "Rask e-handel frontend med handlekurv og checkout.",
            tags: ["SPA", "State-håndtering", "API"],
          },
          docs: {
            title: "Docs Engine",
            blurb: "Søkbare dokumenter med levende kodeeksempler.",
            tags: ["MDX", "Søk", "Ytelse"],
          },
        },
      },
      pricing: {
        heading: "Prosjektpakker",
        sub: "Fra raske lanseringer til fulle plattformer — velg det som passer dine mål.",

        starter: {
          name: "Start",
          price: "kr 8 500 / fastpris",
          blurb: "Lanser en ren én-siders side.",
          features: [
            "1 landingsside",
            "Responsiv + grunnleggende SEO",
            "Kontaktskjema eller e-post-CTA",
            "Publisert til din host"
          ]
        },
        pro: {
          name: "Pro",
          price: "kr 25 000 / fastpris",
          badge: "Mest populær",
          blurb: "Full nettside + komponenter.",
          features: [
            "Opptil 6 sider",
            "Designsystem + komponenter",
            "Integrasjoner (skjema, CMS, e-post)",
            "Ytelses- og tilgjengelighetsjekk"
          ]
        },
        custom: {
          name: "Skreddersøm",
          price: "kr ? / tilbud",
          blurb: "Komplekst eller løpende arbeid.",
          features: [
            "Avanserte funksjoner / integrasjoner",
            "E-handel, innlogging, dashboards",
            "Roadmap og iterasjoner",
            "Fleksibel tidslinje og budsjett"
          ]
        },

        chooseStarter: "Velg Start",
        choosePro: "Velg Pro",
        requestQuote: "Be om tilbud",
        fineprint:
          "Prisene er typiske utgangspunkt. Endelig tilbud avhenger av omfang og integrasjoner.",
      },
      contact: {
        heading: "La oss bygge noe bra",
        copy:
          "Fortell om prosjektet — mål, tidslinje og budsjett. Jeg følger opp med plan og neste steg.",
        email: "E-post",
        github: "GitHub",
        linkedin: "LinkedIn",
        start: "Start et prosjekt",
        trust: {
          reply: "Svarer innen 24t",
          location: "Basert i Trondheim, Norge",
        },
        ctaTitle: "Klar til å starte?",
        ctaCopy: "La oss gjøre idéen din til virkelighet med ren, moderne kode.",
      },
      about: {
        sectionLabel: "Om oss",
        alt: "Robert Filep",
        heading: "Bygger rene, raske og brukervennlige grensesnitt",
        copy:
          "Jeg er Robert Filep, frontend-utvikler og grunnlegger av CodeForge Studio. Jeg designer og bygger responsive og tilgjengelige løsninger med React + TypeScript, med fokus på detaljer.",
        highlights: [
          "Ytelse først-tankesett",
          "Tilgjengelig som standard",
          "TypeScript overalt",
          "Pikselperfekt gjennomføring",
        ],
        tech: ["React", "TypeScript", "TailwindCSS", "Vite"],
      },
    },
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "no",
    fallbackLng: "en",
    supportedLngs: ["en", "no"],
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "querystring", "cookie"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;