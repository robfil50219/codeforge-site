import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'node:fs';


const HOSTNAME = process.env.SITE_URL ?? 'https://codeforgestudio.no';

// List ONLY real routes (sections on the same page don't need entries)
const routes = [
  '/',          // home
  '/contact',   // direct link to contact page/route
  // Add more when you create real routes:
  // '/services', '/pricing', '/about'
];

const now = new Date();
const stream = new SitemapStream({ hostname: HOSTNAME });
const write = createWriteStream('./dist/sitemap.xml');

stream.pipe(write);

// Home gets higher priority / change frequency
stream.write({ url: '/', changefreq: 'weekly', priority: 1.0, lastmod: now });

// The rest are monthly with slightly lower priority
routes
  .filter((url) => url !== '/')
  .forEach((url) => stream.write({ url, changefreq: 'monthly', priority: 0.7, lastmod: now }));

stream.end();

write.on('finish', () => {
  console.log('✅ sitemap.xml generated at dist/sitemap.xml');
});
write.on('error', (err) => {
  console.error('❌ Failed to write sitemap:', err);
  process.exit(1);
});