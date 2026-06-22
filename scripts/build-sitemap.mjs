import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SitemapStream, streamToPromise } from "sitemap";

export const SITE_URL = "https://codeforgestudio.no";

export const SITE_ROUTES = [
  { url: "/", changefreq: "weekly", priority: 1 },
  { url: "/privacy", changefreq: "yearly", priority: 0.5 },
  { url: "/terms", changefreq: "yearly", priority: 0.5 },
];

export async function createSitemapXml() {
  const sitemap = new SitemapStream({ hostname: SITE_URL });
  SITE_ROUTES.forEach((route) => sitemap.write(route));
  sitemap.end();
  return (await streamToPromise(sitemap)).toString();
}

export async function writeSitemap(
  outputPath = path.resolve("public/sitemap.xml"),
) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, await createSitemapXml(), "utf8");
  return outputPath;
}

const currentFile = fileURLToPath(import.meta.url);
const executedFile = process.argv[1] ? path.resolve(process.argv[1]) : "";

if (currentFile === executedFile) {
  try {
    const outputPath = await writeSitemap();
    console.log(
      `sitemap.xml generated with ${SITE_ROUTES.length} routes at ${outputPath}`,
    );
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    process.exitCode = 1;
  }
}
