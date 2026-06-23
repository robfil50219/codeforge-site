/* eslint-disable react-refresh/only-export-components -- JSX utility, not a Fast Refresh boundary */
import { Fragment, type ReactNode } from "react";

const TOKENS = [
  "CodeForge Studio",
  "CodeForgeStudio",
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "TailwindCSS",
  "WordPress",
  "Sanity",
  "Strapi",
  "Firebase",
  "REST",
  "GraphQL",
  "Netlify",
  "GitHub",
  "LinkedIn",
  "CMS",
];

const NORMALIZED = TOKENS.map((token) => token.toLowerCase());
const ESCAPED = TOKENS.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const TOKEN_REGEX = new RegExp(
  `([\\s\\u00A0]*(?:${ESCAPED.join("|")})[\\s\\u00A0]*)`,
  "gi",
);

export function renderBrandSafe(text: string | null | undefined): ReactNode {
  if (!text) return text ?? null;
  const parts = text.split(TOKEN_REGEX);
  return parts.map((part, index) => {
    if (!part) return null;
    const matchIndex = NORMALIZED.findIndex(
      (token) => token === part.trim().toLowerCase(),
    );
    if (matchIndex !== -1) {
      return (
        <span key={`brand-${index}`} className="notranslate" translate="no">
          {part}
        </span>
      );
    }
    return <Fragment key={`text-${index}`}>{part}</Fragment>;
  });
}

export const BRAND_TOKENS = TOKENS;
