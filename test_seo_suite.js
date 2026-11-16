const fs = require('fs');
const path = require('path');

console.log('=== STARTING COMPLETE SEO & SITE AUDIT SUITE ===\n');

let errors = [];
let warnings = [];
let checkedFiles = 0;

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory() && file !== '.git' && file !== 'node_modules') {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles('.');
console.log(`Found ${htmlFiles.length} HTML files across project.\n`);

htmlFiles.forEach(file => {
  checkedFiles++;
  const content = fs.readFileSync(file, 'utf8');
  const fileDir = path.dirname(file);

  // 1. Title & Meta Description Check
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push(`[${file}] Missing or empty <title> tag.`);
  }

  const metaDescMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (!metaDescMatch || !metaDescMatch[1].trim()) {
    errors.push(`[${file}] Missing or empty meta description.`);
  }

  // 2. Canonical tag check
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    errors.push(`[${file}] Missing canonical link tag.`);
  }

  // 3. Open Graph check
  if (!content.includes('og:title') || !content.includes('og:image')) {
    warnings.push(`[${file}] Missing complete Open Graph tags.`);
  }

  // 3b. Google Tag Manager check
  if (!content.includes('GTM-MQ2N999C')) {
    errors.push(`[${file}] Missing Google Tag Manager script in <head>.`);
  }
  if (!content.includes('ns.html?id=GTM-MQ2N999C')) {
    errors.push(`[${file}] Missing Google Tag Manager noscript in <body>.`);
  }

  // 4. H1 check
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (!h1Matches) {
    if (!file.includes('404.html') && !file.includes('thank-you.html')) {
      errors.push(`[${file}] Missing <h1> heading.`);
    }
  } else if (h1Matches.length > 1) {
    warnings.push(`[${file}] Multiple <h1> tags detected (${h1Matches.length}).`);
  }

  // 5. Schema JSON-LD Validation
  const schemaRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = schemaRegex.exec(content)) !== null) {
    try {
      JSON.parse(match[1]);
    } catch (e) {
      errors.push(`[${file}] Invalid JSON in JSON-LD script block: ${e.message}`);
    }
  }

  // 6. Check Local Links and Assets
  const hrefMatches = content.match(/href=["']([^"'#:]+)["']/gi) || [];
  hrefMatches.forEach(hm => {
    let raw = hm.replace(/href=["']/i, '').replace(/["']$/, '');
    if (raw && !raw.startsWith('tel:') && !raw.startsWith('mailto:') && !raw.startsWith('http') && !raw.startsWith('//')) {
      // clean query params & decode URL encoding
      const cleanHref = decodeURIComponent(raw.split('?')[0]);
      const targetPath = path.resolve(fileDir, cleanHref);
      // check if it's a directory (clean URL) e.g. delhi/
      if (fs.existsSync(targetPath)) {
        // ok
      } else if (fs.existsSync(targetPath + '.html')) {
        // ok
      } else if (fs.existsSync(path.join(targetPath, 'index.html'))) {
        // ok
      } else {
        errors.push(`[${file}] Broken internal link: "${raw}" -> resolved: "${targetPath}"`);
      }
    }
  });

  const srcMatches = content.match(/src=["']([^"']+)["']/gi) || [];
  srcMatches.forEach(sm => {
    let raw = sm.replace(/src=["']/i, '').replace(/["']$/, '');
    if (raw && !raw.startsWith('http') && !raw.startsWith('data:') && !raw.startsWith('//')) {
      const cleanSrc = decodeURIComponent(raw.split('?')[0]);
      const targetPath = path.resolve(fileDir, cleanSrc);
      if (!fs.existsSync(targetPath)) {
        errors.push(`[${file}] Missing local asset file: "${raw}" -> resolved: "${targetPath}"`);
      }
    }
  });
});

console.log(`Audited ${checkedFiles} HTML files.`);

// 7. Sitemap verification
if (fs.existsSync('sitemap.xml')) {
  const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');
  const locMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g) || [];
  console.log(`Sitemap contains ${locMatches.length} URLs.`);
} else {
  errors.push('sitemap.xml not found!');
}

// 8. robots.txt verification
if (fs.existsSync('robots.txt')) {
  const robotsContent = fs.readFileSync('robots.txt', 'utf8');
  if (!robotsContent.includes('sitemap.xml')) {
    warnings.push('robots.txt does not mention sitemap.xml');
  }
  if (!robotsContent.includes('llms.txt')) {
    warnings.push('robots.txt does not mention llms.txt');
  }
} else {
  errors.push('robots.txt not found!');
}

// 9. LLMs verification
if (!fs.existsSync('llms.txt')) errors.push('llms.txt not found!');
if (!fs.existsSync('llms-full.txt')) errors.push('llms-full.txt not found!');

console.log('\n=== AUDIT RESULTS ===');
console.log(`Total Errors: ${errors.length}`);
console.log(`Total Warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.log('\nERRORS:');
  errors.forEach(e => console.log('  ❌ ' + e));
}

if (warnings.length > 0) {
  console.log('\nWARNINGS:');
  warnings.forEach(w => console.log('  ⚠️ ' + w));
}

if (errors.length === 0) {
  console.log('\n✅ ALL CRITICAL CHECKS PASSED PERFECTLY!');
}
