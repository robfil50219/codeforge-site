import assert from "node:assert/strict";
import fs from "node:fs/promises";
import test from "node:test";
import { createSitemapXml, SITE_ROUTES } from "./build-sitemap.mjs";

test("sitemap contains only public React routes", async () => {
  const xml = await createSitemapXml();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    ([, location]) => location,
  );

  assert.deepEqual(
    SITE_ROUTES.map(({ url }) => url),
    ["/", "/privacy", "/terms"],
  );
  assert.deepEqual(locations, [
    "https://codeforgestudio.no/",
    "https://codeforgestudio.no/privacy",
    "https://codeforgestudio.no/terms",
  ]);
  assert.doesNotMatch(xml, /components|NotFound|#|wp-sitemap/);
});

test("Netlify serves every application route through React Router", async () => {
  const redirects = await fs.readFile(
    new URL("../public/_redirects", import.meta.url),
    "utf8",
  );

  assert.match(redirects, /^\/\*\s+\/index\.html\s+200$/m);
  assert.doesNotMatch(redirects, /\/404\.html\s+404/);
});
