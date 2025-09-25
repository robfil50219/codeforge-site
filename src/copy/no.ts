// src/copy/no.ts

export const NO = {
  // ---------- Brand / Nav ----------
  brand: "CodeForge Studio",
  nav: {
    services: "Tjenester",
    pricing: "Priser",
    about: "Om oss",
    contact: "Kontakt",
  },

  // ---------- Hero ----------
  hero: {
    title: "Design og bygg moderne nettløsninger",
    tagline: "Nettsteder som er raske og ser skarpe ut.",
    blurb:
      "Vi lager raske og pålitelige digitale løsninger med moderne webteknologi — tilpasset dine mål. Fra enkle landingssider til komplette plattformer, har vi fokus på ytelse, tilgjengelighet og design som gjør inntrykk.",
    imageAlt: "Utviklere som samarbeider foran en skjerm",
    imageCaption: "Sanntidsgrensesnitt, ryddig arkitektur og pikselperfekte detaljer",
    ctaServices: "Se tjenester",
    ctaWork: "Se arbeid",
  },

  // ---------- Services ----------
  services: {
    heading: "Tjenester",
    sub: "Vi tilbyr moderne webløsninger som dekker dine behov.",
    primary: {
      uiux: {
        title: "UI/UX-design",
        blurb: "Brukersentrert design som er lett å forstå og bruke.",
        points: [
          "Designsystem og stilguide",
          "Wireframes og prototyper",
          "Visuelt design og interaksjon",
        ],
      },
      frontend: {
        title: "Frontend-utvikling",
        blurb: "Rask og moderne utvikling med React og TypeScript.",
        points: [
          "Komponentbasert arkitektur",
          "Integrasjon mot API og CMS",
          "God struktur og vedlikeholdbar kode",
        ],
      },
      perf: {
        title: "Ytelse og tilgjengelighet",
        blurb: "Vi bygger løsninger som virker for alle – og laster lynraskt.",
        points: [
          "Core Web Vitals-forbedringer",
          "WCAG-tilpasninger",
          "Måling, innsikt og tiltak",
        ],
      },
    },
    extras: {
      cms: {
        title: "Innhold & CMS",
        blurb: "Sett opp innhold dere kan styre selv.",
        points: ["Headless CMS", "WordPress/Sanity/Strapi", "Rolle- og innholdsmodeller"],
      },
      responsive: {
        title: "Responsiv & mobil",
        blurb: "Design som fungerer på alle skjermstørrelser.",
        points: ["Mobil-først", "Fleksible grids og bilder", "Touch-vennlige mønstre"],
      },
      quality: {
        title: "Kvalitet & sikkerhet",
        blurb: "Lever med trygghet og gode rutiner.",
        points: ["Typesikkerhet og linting", "Automatiserte sjekker", "Best practice-herding"],
      },
    },
    process: {
      title: "Vår prosess",
      steps: [
        { step: "1. Utforsk", text: "Mål, målgruppe og omfang." },
        { step: "2. Design", text: "Flyt, wireframes og UI." },
        { step: "3. Bygg", text: "Utvikling, test og lansering." },
      ],
      // Objektform som noen av komponentene også støtter
      details: {
        "1": {
          title: "Utforskning & plan",
          body:
            "Vi avklarer mål, målgruppe og suksesskriterier, og definerer omfang og tidslinje før vi starter design.",
        },
        "2": {
          title: "Design & prototyping",
          body:
            "Vi lager brukerflyt, skisser og visuelt uttrykk. Du får klikkbare prototyper som vi justerer sammen.",
        },
        "3": {
          title: "Bygg, test & lanser",
          body:
            "Vi implementerer UI, kobler innhold og API-er, tester ytelse/tilgjengelighet – og lanserer trygt.",
        },
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
      blurb: "Lanser en ryddig én-siders nettside.",
      features: [
        "1 landingsside",
        "Responsiv + grunnleggende SEO",
        "Kontaktskjema eller e-post-CTA",
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
        "Integrasjoner (skjema, CMS, e-post)",
        "Ytelses- og tilgjengelighetssjekk",
      ],
    },
    custom: {
      name: "Skreddersøm",
      price: "Tilbud",
      blurb: "For avanserte behov eller løpende arbeid.",
      features: [
        "Avanserte funksjoner og integrasjoner",
        "E-handel, innlogging, dashboards",
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

  // ---------- About ----------
  about: {
    sectionLabel: "Om oss",
    alt: "Robert Filep",
    heading: "Bygger rene, raske og brukervennlige digitale løsninger",
    copy:
      "Jeg er Robert Filep, frontend-utvikler og grunnlegger av CodeForge Studio. Jeg designer og bygger moderne nettsider og applikasjoner med fokus på ytelse, tilgjengelighet og detaljer — fra enkle sider til komplette plattformer.",
    highlights: [
      "Ytelse først",
      "Tilgjengelig som standard",
      "Moderne teknologistack",
      "Pikselperfekt gjennomføring",
    ],
    tech: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "TailwindCSS",
      "Vite",
      "WordPress",
      "Firebase",
      "REST & GraphQL APIs",
    ],
  },

  // ---------- Contact ----------
  contact: {
    heading: "La oss bygge noe bra",
    copy:
      "Fortell om mål, tidslinje og budsjett. Jeg svarer med en plan og neste steg.",
    email: "E-post",
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
      email: "E-post",
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
        email: "Skriv inn en gyldig e-post.",
        message: "Skriv inn en melding.",
      },
    },
  },

  // ---------- Privacy ----------
  privacy: {
    heading: "Personvernerklæring",
    intro:
      "Ditt personvern er viktig. Her forklarer vi hvordan vi behandler data.",
    lastUpdated: "Sist oppdatert",
    back: "Tilbake til forsiden",
  },

  // ---------- Terms ----------
  terms: {
    heading: "Vilkår og betingelser",
    intro:
      "Disse vilkårene forklarer hvordan du kan bruke nettstedet og tjenestene våre.",
    lastUpdated: "Sist oppdatert",
    back: "Tilbake til forsiden",
  },

  // ---------- Footer ----------
  footer: {
    navLabel: "Bunnmeny",
    connect: "Kontakt",
    rights: "Alle rettigheter forbeholdt.",
    privacy: "Personvern",
    terms: "Vilkår",
  },

  // ---------- Consent ----------
  consent: {
    title: "Informasjonskapsler og personvern",
    text:
      "Denne nettsiden bruker informasjonskapsler for å sikre at du får den beste opplevelsen.",
    learnMore: "Les mer",
    actions: {
      accept: "Godta alle",
      reject: "Avvis ikke-essensielle",
    },
    manage: "Administrer informasjonskapsler",
  },
  // ---------- Arbeid ----------
work: {
  heading: "Arbeid",
  sub: "Et utvalg prosjekter vi har laget.",
  view: "Se prosjekt",
  cards: {
    dashboard: {
      title: "Dashboard",
      blurb: "Analyse og innsikt i sanntid.",
      tags: ["React", "TypeScript", "Charts"],
    },
    landing: {
      title: "Landingsside",
      blurb: "Konverterende kampanjeside.",
      tags: ["Next.js", "TailwindCSS", "SEO"],
    },
    storefront: {
      title: "Nettbutikk",
      blurb: "Komplett e-handel med WooCommerce.",
      tags: ["WordPress", "WooCommerce", "API"],
    },
    docs: {
      title: "Dokumentasjon",
      blurb: "Ryddige guider og komponentbibliotek.",
      tags: ["Markdown", "Docs", "Designsystem"],
    },
  },
},
  // ---------- Misc ----------
  loading: "Laster …",
} as const;

export default NO;