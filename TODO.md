# ✅ Classic Tow Service — Pre-Launch TODO

> Complete every item below before going live at https://classictowservice.com

---

## 1. 🗂️ Content Placeholders — ✅ COMPLETED

All content placeholders have been fully populated across all pages:

| Placeholder | Value Populated | Where used |
|---|---|---|
| `[CITY]` | `Ghaziabad` | Page titles, H1s, meta descriptions, schema |
| `[SERVICE AREAS]` | `Ghaziabad, Noida, Greater Noida & Delhi NCR` | Homepage, services pages, footer |
| `[FULL ADDRESS]` | `Near ABES Engineering College, Vijay Nagar` | Footer, Contact page, Schema JSON-LD |
| `[STATE]` | `Uttar Pradesh` | Schema, Contact page |
| `[PINCODE]` | `201009` | Schema, Contact page |
| `[OPENING HOURS]` | `Open 24/7` | Contact page, Schema, footer |
| `[GOOGLE MAPS EMBED URL]` | Official Google Maps Embed (`pb=!1m18!...`) | contact-us.html |

---

## 2. 🖼️ Missing Images

Add the following images to the project root (or an `/images/` subfolder):

| Filename | Ideal size | Description |
|---|---|---|
| `car-towing.jpg` | 800×530px | Flatbed truck towing a car on a city road |
| `bike-towing.jpg` | 800×530px | Motorcycle/scooter loaded on a tow vehicle |
| `food-truck-towing.jpg` | 800×530px | Food truck or mini-truck being towed |
| `heavy-towing.jpg` | 800×530px | Heavy-duty crane or truck towing a large vehicle |
| `accident-recovery.jpg` | 800×530px | Damaged vehicle being lifted/recovered at accident scene |
| `scrap-towing.jpg` | 800×530px | Old/scrap vehicle being hauled away |
| `rsa-assistance.jpg` | 800×530px | Roadside assistance — tyre change, jumpstart, fuel |
| `about-hero.jpg` | 1200×600px | Team photo or branded truck on the road |
| `team.jpg` | 800×530px | Team members, ideally in uniform or beside a truck |

> **Tip:** Convert all images to WebP at the target dimensions for best performance.  
> An OG/social share image at **1200×630px** in WebP is also recommended for each page.

---

## 3. 📌 Existing Images — Rename to Remove Spaces

Filenames with spaces can cause URL encoding issues. Rename before deploying:

| Current filename | Suggested rename |
|---|---|
| `Classic Tow logo.PNG` | `classic-tow-logo.png` |
| `Classic Tow Service Flatbed Rescue.png` | `classic-tow-flatbed-rescue.png` |
| `unnamed 2.webp` | `gallery-2.webp` |
| `unnamed 3.webp` | `gallery-3.webp` |
| `unnamed 4.webp` | `gallery-4.webp` |
| `truck image.webp` | `truck-image.webp` |
| `truck towing black suv.webp` | `truck-towing-black-suv.webp` |
| `truck towing blue car.webp` | `truck-towing-blue-car.webp` |
| `truck towing white bolera.webp` | `truck-towing-white-bolero.webp` |

> Update all `src` and `url()` references in HTML and CSS after renaming.

---

## 4. 📋 Forms

- [ ] Sign up at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) and get an endpoint URL
- [ ] Set `action="https://formspree.io/f/XXXXXXXX"` (or Web3Forms equivalent) on **contact form** and **quote form**
- [ ] Add a hidden `redirect` field pointing to `https://classictowservice.com/thank-you.html`
- [ ] Test form submissions end-to-end

---

## 5. 📊 Analytics & Ads Tracking

- [ ] Create a Google Analytics 4 property → get Measurement ID (`G-XXXXXXXXXX`)
- [ ] Create a Google Ads account / conversion actions → get Conversion ID (`AW-XXXXXXXXX`)
- [ ] Add the following to `<head>` on every page (replace IDs):

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

- [ ] Uncomment conversion event lines in `script.js` and fill in Conversion IDs

---

## 6. 🗺️ Google Maps Embed

1. Go to [Google Maps](https://maps.google.com) → search your business address
2. Click **Share → Embed a map → Copy HTML**
3. Extract only the `src="..."` URL from the `<iframe>` tag
4. Paste it as the `src` of the map iframe in `contact-us.html`

---

## 7. 🌐 Hosting & Deployment

- [ ] **Clean URLs**: Configure server to serve `about-us.html` at `/about-us` (remove `.html` extension)
  - Netlify: add `_redirects` file or `netlify.toml` with `[[redirects]]`
  - Apache: add `.htaccess` with `RewriteRule` for clean URLs
- [ ] **HTTPS**: Ensure SSL certificate is active (Netlify/Vercel provide this automatically)
- [ ] **www vs non-www canonicalization**: Choose one and redirect the other (301)
  - Netlify: set in Domain Settings → Primary domain
  - Apache/Nginx: add redirect rule in `.htaccess` / server config
- [ ] **Custom domain**: Point DNS A/CNAME records to hosting provider
- [ ] Test redirect chains: HTTP → HTTPS, non-www → www (or vice versa)

---

## 8. 🔍 Google Search Console

- [ ] Add and verify property at [Google Search Console](https://search.google.com/search-console)
- [ ] Submit sitemap: `https://classictowservice.com/sitemap.xml`
- [ ] Request indexing for key pages
- [ ] Monitor Coverage, Core Web Vitals, and Mobile Usability reports post-launch

---

## 9. ⚖️ Legal Review

- [ ] Have **Privacy Policy** (`privacy-policy.html`) reviewed by a qualified legal professional
- [ ] Have **Terms & Conditions** (`terms-and-conditions.html`) reviewed by a qualified legal professional
- [ ] Ensure cookie consent banner matches actual cookie/tracking usage

---

## 10. 🏷️ Schema / Structured Data

- [ ] Verify `LocalBusiness` JSON-LD schema on every page — fill in all `[PLACEHOLDER]` values
- [ ] Add `@type: "Service"` schema on each individual service page
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## 11. ⚡ Performance

- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on the live homepage — target 90+ mobile score
- [ ] Add `width` and `height` attributes to all `<img>` tags to prevent layout shift (CLS)
- [ ] Lazy-load below-the-fold images with `loading="lazy"`
- [ ] Minify `style.css` and `script.js` for production

---

## 12. 🤝 Partner Link Verification

- [ ] Confirm RSA Crane Service partnership link is correct: https://rsacraneservice.com/
- [ ] Confirm Google Business profile link is correct: https://share.google/3KyztTMB3RGbmOBe1
- [ ] Add Google Business profile link to footer and contact page

---

*Last updated: 2026-11-12*
