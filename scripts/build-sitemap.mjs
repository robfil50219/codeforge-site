/**
 * -------------------------------------------------------
 *  CodeForge Studio — Sitemap Generator (Auto)
 *  © 2025 CodeForge Studio Filep. All rights reserved.
 *
 *  This script automatically finds .tsx pages and creates
 *  a sitemap at /public/sitemap.xml for SEO and indexing.
 * -------------------------------------------------------
 */

import fs from "fs";
import path from "path";
import { SitemapStream, streamToPromise } from "sitemap";

// Base URL of your site (no trailing slash)
const siteUrl = "https://codeforgestudio.no";

// Folder containing your React pages
const pagesDir = path.resolve("./src");

// Helper: recursively scan for .tsx files
function getAllRoutes(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes = routes.concat(getAllRoutes(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      // Skip non-page files
      if (
        entry.name.toLowerCase().includes("component") ||
        entry.name.toLowerCase().includes("ui") ||
        entry.name.toLowerCase().includes("error") ||
        entry.name.toLowerCase().includes("layout")
      ) {
        continue;
      }

      // derive route from file path
      const relative = path.relative(pagesDir, fullPath);
      let urlPath = "/" + relative.replace(/\\/g, "/").replace(/index\.tsx$/, "").replace(/\.tsx$/, "");
      if (urlPath.endsWith("/")) urlPath = urlPath.slice(0, -1);
      routes.push({ url: urlPath || "/", changefreq: "monthly", priority: 0.7 });
    }
  }

  return routes;
}

// Static custom sections
const staticSections = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/#about", changefreq: "monthly", priority: 0.8 },
  { url: "/#services", changefreq: "monthly", priority: 0.8 },
  { url: "/#contact", changefreq: "monthly", priority: 0.8 },
  { url: "/pricing", changefreq: "monthly", priority: 0.6 },
  { url: "/privacy", changefreq: "yearly", priority: 0.5 },
];

// Combine static + discovered routes
const allRoutes = [...staticSections, ...getAllRoutes(pagesDir)];

// Build sitemap stream
const sitemap = new SitemapStream({ hostname: siteUrl });

// Ensure public folder exists
if (!fs.existsSync("./public")) fs.mkdirSync("./public", { recursive: true });

// Write sitemap
(async () => {
  try {
    allRoutes.forEach((route) => sitemap.write(route));
    sitemap.end();

    const xml = await streamToPromise(sitemap);
    fs.writeFileSync("./public/sitemap.xml", xml.toString());

    console.log(`✅ sitemap.xml generated with ${allRoutes.length} routes at public/sitemap.xml`);
  } catch (err) {
    console.error("❌ Failed to generate sitemap:", err);
    process.exit(1);
  }
})();