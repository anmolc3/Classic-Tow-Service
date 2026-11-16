const fs = require('fs');
const path = require('path');
const {
  BASE_URL, PHONE_DISPLAY, PHONE_TEL, WA_LINK, EMAIL,
  ADDRESS_STREET, ADDRESS_CITY, ADDRESS_STATE, ADDRESS_POSTAL,
  CITIES, SERVICES
} = require('./seo-data');

// Common HTML partials generator
function getHead({ title, description, canonical, rel = '', schema = [] }) {
  const schemaMarkup = schema.map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#FFD600" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${BASE_URL}/og-image.jpg" />
  <meta property="og:image:secure_url" content="${BASE_URL}/og-image.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Classic Tow Service - 24/7 Roadside Assistance & Towing in Delhi NCR" />
  <meta property="og:site_name" content="Classic Tow Service" />
  <meta property="og:locale" content="en_IN" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${BASE_URL}/og-image.jpg" />

  <!-- Favicon & Fonts -->
  <link rel="icon" href="${rel}Classic%20Tow%20logo.webp" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

  <!-- Stylesheet -->
  <link rel="stylesheet" href="${rel}style.css" />

  <!-- Structured Data -->
${schemaMarkup}
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <!-- Top Bar -->
  <div class="top-bar" role="banner" aria-label="Contact information">
    <div class="container top-bar__inner">
      <span class="top-bar__badge">
        <span class="badge-text-full">24/7 Towing &amp; Roadside Assistance</span>
        <span class="badge-text-short">24/7 Towing &amp; RSA</span>
      </span>
      <div class="top-bar__contacts">
        <a href="tel:${PHONE_TEL}" class="top-bar__link top-bar__link--phone" aria-label="Call Classic Tow Service">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
          ${PHONE_DISPLAY}
        </a>
        <a href="mailto:${EMAIL}" class="top-bar__link top-bar__link--email" aria-label="Email Classic Tow Service">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
          ${EMAIL}
        </a>
      </div>
    </div>
  </div>

  <!-- Sticky Header -->
  <header class="site-header" id="site-header">
    <div class="container site-header__inner">
      <a href="${rel}index.html" class="site-header__logo" aria-label="Classic Tow Service – Home">
        <img src="${rel}classic%20tow%20logo%20without%20text.webp" alt="Classic Tow Service Logo" width="44" height="44" />
        <div class="logo-wrap">
          <span class="logo-text"><span class="logo-classic">Classic</span> Tow <span>Service</span></span>
          <span class="logo-subline">Operated by <strong class="logo-rsa">RSA Crane Service</strong></span>
        </div>
      </a>

      <button class="hamburger" id="hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="primary-nav">
        <span></span><span></span><span></span>
      </button>

      <nav class="primary-nav" id="primary-nav" aria-label="Primary navigation">
        <ul class="nav-list" role="list">
          <li class="nav-item"><a href="${rel}index.html" class="nav-link">Home</a></li>
          <li class="nav-item"><a href="${rel}about-us.html" class="nav-link">About Us</a></li>
          <li class="nav-item nav-item--dropdown">
            <a href="${rel}services.html" class="nav-link nav-dropdown-btn" aria-haspopup="true" aria-controls="services-dropdown">Services</a>
            <ul class="nav-dropdown" id="services-dropdown" role="list">
              <li><a href="${rel}car-towing.html">Car Towing</a></li>
              <li><a href="${rel}bike-towing.html">Bike Towing</a></li>
              <li><a href="${rel}zero-degree-flatbed-towing.html">Zero Degree Flatbed Towing</a></li>
              <li><a href="${rel}food-truck-towing.html">Food Truck Towing</a></li>
              <li><a href="${rel}heavy-towing.html">Heavy Towing</a></li>
              <li><a href="${rel}breakdown-accident-recovery.html">Breakdown &amp; Accident Recovery</a></li>
              <li><a href="${rel}scrap-vehicle-towing.html">Scrap Vehicle Towing</a></li>
              <li><a href="${rel}rsa-assistance.html">RSA Assistance</a></li>
            </ul>
          </li>
          <li class="nav-item active"><a href="${rel}locations.html" class="nav-link active">Locations</a></li>
          <li class="nav-item"><a href="${rel}contact-us.html" class="nav-link">Contact Us</a></li>
        </ul>
      </nav>

      <a href="tel:${PHONE_TEL}" class="btn btn--accent site-header__cta" aria-label="Call Classic Tow Service now">
        Call Now
      </a>
    </div>
  </header>
`;
}

function getFooter({ rel = '' }) {
  return `
  <!-- Footer -->
  <footer class="site-footer" id="site-footer">
    <div class="container site-footer__inner">
      <div class="footer-col footer-col--brand">
        <a href="${rel}index.html" class="footer-logo" aria-label="Classic Tow Service – Home">
          <img src="${rel}classic%20tow%20logo%20without%20text.webp" alt="Classic Tow Service Logo" width="48" height="48" loading="lazy" />
          <div class="logo-wrap">
            <span class="logo-text"><span class="logo-classic">Classic</span> Tow <span>Service</span></span>
            <span class="logo-subline">Operated by <strong class="logo-rsa">RSA Crane Service</strong></span>
          </div>
        </a>
        <p class="footer-tagline">
          24/7 towing and emergency vehicle recovery across Delhi NCR. Certified flatbed towing, heavy commercial wreckers, and roadside assistance.
        </p>
        <div class="footer-badges">
          <span class="footer-badge">24/7 Available</span>
          <span class="footer-badge">Delhi NCR Wide</span>
          <span class="footer-badge">Zero-Degree Flatbed</span>
        </div>
      </div>

      <div class="footer-col footer-col--links">
        <h3 class="footer-col__heading">Quick Links</h3>
        <ul class="footer-nav" role="list">
          <li><a href="${rel}index.html">Home</a></li>
          <li><a href="${rel}about-us.html">About Us</a></li>
          <li><a href="${rel}services.html">All Services</a></li>
          <li><a href="${rel}locations.html">Service Areas &amp; Locations</a></li>
          <li><a href="${rel}contact-us.html">Contact Us</a></li>
          <li><a href="${rel}privacy-policy.html">Privacy Policy</a></li>
          <li><a href="${rel}terms-and-conditions.html">Terms &amp; Conditions</a></li>
        </ul>
      </div>

      <div class="footer-col footer-col--services">
        <h3 class="footer-col__heading">Our Services</h3>
        <ul class="footer-nav" role="list">
          <li><a href="${rel}car-towing.html">Car Towing</a></li>
          <li><a href="${rel}bike-towing.html">Bike Towing</a></li>
          <li><a href="${rel}zero-degree-flatbed-towing.html">Zero Degree Flatbed Towing</a></li>
          <li><a href="${rel}food-truck-towing.html">Food Truck Towing</a></li>
          <li><a href="${rel}heavy-towing.html">Heavy Towing</a></li>
          <li><a href="${rel}breakdown-accident-recovery.html">Breakdown &amp; Accident Recovery</a></li>
          <li><a href="${rel}scrap-vehicle-towing.html">Scrap Vehicle Towing</a></li>
          <li><a href="${rel}rsa-assistance.html">RSA Assistance</a></li>
        </ul>
      </div>

      <div class="footer-col footer-col--locations">
        <h3 class="footer-col__heading">Service Locations</h3>
        <ul class="footer-nav" role="list">
          <li><a href="${rel}delhi/index.html">Delhi Towing</a></li>
          <li><a href="${rel}noida/index.html">Noida Towing</a></li>
          <li><a href="${rel}gurugram/index.html">Gurugram Towing</a></li>
          <li><a href="${rel}greater-noida/index.html">Greater Noida Towing</a></li>
          <li><a href="${rel}ghaziabad/index.html">Ghaziabad Towing</a></li>
          <li><a href="${rel}meerut/index.html">Meerut Towing</a></li>
          <li><a href="${rel}hapur/index.html">Hapur Towing</a></li>
          <li><a href="${rel}delhi-ncr/index.html">Delhi NCR Towing</a></li>
        </ul>
      </div>

      <div class="footer-col footer-col--contact">
        <h3 class="footer-col__heading">Contact Us</h3>
        <address class="footer-nap">
          <p>
            <strong>Classic Tow Service</strong><br />
            ${ADDRESS_STREET}<br />
            ${ADDRESS_CITY}, ${ADDRESS_STATE} – ${ADDRESS_POSTAL}
          </p>
          <p>
            <a href="tel:${PHONE_TEL}" aria-label="Call Classic Tow Service">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              ${PHONE_DISPLAY}
            </a>
          </p>
          <p>
            <a href="mailto:${EMAIL}" aria-label="Email Classic Tow Service">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
              ${EMAIL}
            </a>
          </p>
          <p>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            Available 24 Hours / 7 Days
          </p>
        </address>
        <p class="footer-partner">
          <span>In technical collaboration with:</span>
          <a href="https://rsacraneservice.com/" target="_blank" rel="noopener noreferrer" class="inline-link" aria-label="Visit RSA Crane Service website">RSA Crane Service</a>
        </p>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom__inner">
        <p>&copy; 2024 Classic Tow Service. All rights reserved.</p>
        <nav aria-label="Legal links">
          <a href="${rel}privacy-policy.html">Privacy Policy</a>
          <a href="${rel}terms-and-conditions.html">Terms &amp; Conditions</a>
          <a href="${rel}locations.html">Coverage Directory</a>
        </nav>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp Speed Dial -->
  <div class="whatsapp-fab" id="whatsapp-fab">
    <div class="whatsapp-fab__menu" id="whatsapp-fab-menu" role="menu" aria-hidden="true">
      <a id="floating-location" class="whatsapp-fab__action floating-location" href="${WA_LINK}" onclick="sendLocationOnWhatsApp(event)" aria-label="Send your location on WhatsApp" role="menuitem" tabindex="-1">
        <span class="whatsapp-fab__label">Send Location</span>
        <div class="whatsapp-fab__icon-wrap">
          <img src="${rel}WhatsApp%20Location%20Sharing%20Icon.webp" alt="Send Location on WhatsApp" width="48" height="48" loading="eager" />
        </div>
      </a>
      <a id="floating-whatsapp" class="whatsapp-fab__action floating-whatsapp" href="${WA_LINK}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Classic Tow Service on WhatsApp" role="menuitem" tabindex="-1">
        <span class="whatsapp-fab__label">Chat on WhatsApp</span>
        <div class="whatsapp-fab__icon-wrap">
          <img src="${rel}WhatsApp%20Tow%20Truck%20Icon%20for%20floating%20whatsapp.webp" alt="WhatsApp Tow Truck Icon" width="48" height="48" loading="eager" />
        </div>
      </a>
    </div>

    <button class="whatsapp-fab__btn" id="whatsapp-fab-btn" aria-label="WhatsApp quick actions" aria-expanded="false" aria-controls="whatsapp-fab-menu" title="WhatsApp Assistance">
      <span class="whatsapp-fab__pulse" aria-hidden="true"></span>
      <svg class="whatsapp-fab__icon-wa" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.306A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.049-1.106l-.29-.173-3.005.788.803-2.927-.19-.302A7.952 7.952 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
      <span class="whatsapp-fab__plus-badge" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </span>
    </button>
  </div>

  <!-- Back to top -->
  <button class="back-to-top" id="back-to-top" aria-label="Back to top" title="Back to top">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>
  </button>

  <script src="${rel}script.js" defer></script>
</body>
</html>
`;
}

// Generate the Master Locations Hub Page
function generateLocationsHub() {
  const title = "Towing Service Areas & Locations in Delhi NCR | Classic Tow Service";
  const description = "Comprehensive 24/7 towing coverage across Delhi NCR, Delhi, Noida, Greater Noida, Ghaziabad, Gurugram, Meerut, and Hapur. Rapid flatbed and heavy recovery dispatch.";
  const canonical = `${BASE_URL}/locations.html`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": canonical }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": ["AutomotiveBusiness", "LocalBusiness"],
      "name": "Classic Tow Service - Service Areas",
      "url": canonical,
      "telephone": PHONE_TEL,
      "email": EMAIL,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": ADDRESS_STREET,
        "addressLocality": ADDRESS_CITY,
        "addressRegion": ADDRESS_STATE,
        "postalCode": ADDRESS_POSTAL,
        "addressCountry": "IN"
      },
      "areaServed": CITIES.map(c => ({ "@type": "City", "name": c.name }))
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Which cities are covered by Classic Tow Service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Classic Tow Service provides 24/7 coverage across Delhi, Noida, Greater Noida, Ghaziabad, Gurugram, Meerut, Hapur, and the entire National Capital Region (Delhi NCR), including all arterial expressways."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can a tow truck reach an expressway breakdown?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our units are stationed near key expressway entry points along the Delhi-Meerut Expressway, Yamuna Expressway, NH-48, and Peripheral Expressways, allowing typical arrival times between 20 and 35 minutes."
          }
        },
        {
          "@type": "Question",
          "name": "Can you tow vehicles between different NCR cities?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we specialize in both local roadside assistance and long-distance intercity vehicle transport between any two points across Delhi, Uttar Pradesh, and Haryana."
          }
        }
      ]
    }
  ];

  const cityCardsHtml = CITIES.map(c => `
    <article class="service-card location-card" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--clr-accent);">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 0.75rem;">
          <h2 style="font-size: 1.5rem; margin:0;"><a href="${c.slug}/index.html" style="color:var(--clr-primary); text-decoration:none;">${c.name} Towing</a></h2>
          <span style="background:var(--clr-accent); color:var(--clr-primary); font-size:0.75rem; font-weight:700; padding:0.25rem 0.5rem; border-radius:4px; text-transform:uppercase;">24/7 Active</span>
        </div>
        <p style="color:var(--clr-text-muted); font-size:0.95rem; line-height:1.5; margin-bottom:1rem;">${c.heroSubtitle}</p>
        
        <h4 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--clr-primary); margin-bottom:0.5rem;">Key Sectors &amp; Areas:</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1.25rem;">
          ${c.localities.slice(0, 8).map(loc => `<span style="background:#f1f5f9; color:#334155; font-size:0.8rem; padding:0.2rem 0.5rem; border-radius:4px;">${loc}</span>`).join('')}
          <span style="background:#e2e8f0; color:#475569; font-size:0.8rem; padding:0.2rem 0.5rem; border-radius:4px;">+${c.localities.length - 8} more</span>
        </div>

        <h4 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--clr-primary); margin-bottom:0.5rem;">Dedicated Services in ${c.name}:</h4>
        <ul style="list-style:none; padding:0; margin:0 0 1.5rem 0; font-size:0.9rem;">
          <li style="margin-bottom:0.35rem;"><a href="${c.slug}/food-truck-towing.html" style="color:var(--clr-primary); font-weight:600; text-decoration:none;">🚚 Food Truck Towing in ${c.name} &rarr;</a></li>
          <li style="margin-bottom:0.35rem;"><a href="${c.slug}/heavy-towing.html" style="color:var(--clr-primary); font-weight:600; text-decoration:none;">🏗️ Heavy Vehicle Towing in ${c.name} &rarr;</a></li>
          <li style="margin-bottom:0.35rem;"><a href="${c.slug}/accident-recovery.html" style="color:var(--clr-primary); font-weight:600; text-decoration:none;">🚨 Accident Recovery in ${c.name} &rarr;</a></li>
        </ul>
      </div>

      <div style="display:flex; gap:0.5rem; border-top:1px solid #e2e8f0; padding-top:1rem;">
        <a href="${c.slug}/index.html" class="btn btn--outline btn--sm" style="flex:1; text-align:center;">Explore ${c.name}</a>
        <a href="tel:${PHONE_TEL}" class="btn btn--accent btn--sm" style="flex:1; text-align:center;">Call Now</a>
      </div>
    </article>
  `).join('\n');

  const html = `${getHead({ title, description, canonical, rel: '', schema })}
  <!-- Breadcrumbs -->
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <div class="container">
      <ol class="breadcrumbs__list">
        <li><a href="index.html">Home</a></li>
        <li aria-hidden="true">›</li>
        <li aria-current="page">Service Areas &amp; Locations</li>
      </ol>
    </div>
  </nav>

  <main id="main-content">
    <!-- Hero -->
    <section class="hero hero--service">
      <div class="hero__bg-image">
        <img src="Classic%20Tow%20Service%20Flatbed%20Rescue.webp" alt="Classic Tow Service coverage across Delhi NCR" width="1200" height="600" loading="eager" />
        <div class="hero__overlay"></div>
      </div>
      <div class="container hero__content">
        <div class="hero__badge hero__badge--rating" aria-label="Rated 4.9 out of 5 stars on Google">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <span class="score"><strong>4.9</strong>/5</span>
          <span class="divider" aria-hidden="true">•</span>
          <span class="badge-label">Verified Regional Towing Network</span>
        </div>
        <h1 class="hero__title">Towing Service Areas &amp; Locations Across Delhi NCR</h1>
        <p class="hero__subtitle">24/7 emergency roadside dispatch, zero-degree flatbed recovery, and heavy wrecker logistics covering 8 major regional hubs and all interconnecting national expressways.</p>
        <div class="hero__ctas">
          <a href="tel:${PHONE_TEL}" class="btn btn--primary btn--lg">Call Dispatch: ${PHONE_DISPLAY}</a>
          <a href="${WA_LINK}" class="btn btn--whatsapp-location btn--lg" onclick="sendLocationOnWhatsApp(event)">
            <span>Send Location on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Regional Directory Grid -->
    <section class="section">
      <div class="container">
        <div class="section-header" style="text-align:center; max-width:800px; margin:0 auto 3rem auto;">
          <span class="section-tag" style="background:var(--clr-accent); color:var(--clr-primary); font-weight:700; padding:0.35rem 0.75rem; border-radius:4px; font-size:0.85rem; text-transform:uppercase;">Primary Coverage Hubs</span>
          <h2 style="font-size:2.25rem; color:var(--clr-primary); margin:0.75rem 0;">Explore Our Local Towing Operations</h2>
          <p style="color:var(--clr-text-muted); font-size:1.05rem;">Choose your city or transit corridor below for localized service details, verified landmark response points, sector listings, and dedicated service pages.</p>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.75rem;">
          ${cityCardsHtml}
        </div>
      </div>
    </section>

    <!-- Highway Transit Corridors -->
    <section class="section" style="background:#f8fafc; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0;">
      <div class="container">
        <div class="section-header" style="text-align:center; max-width:800px; margin:0 auto 2.5rem auto;">
          <h2 style="font-size:2rem; color:var(--clr-primary);">Arterial Expressways &amp; Highway Corridors</h2>
          <p style="color:var(--clr-text-muted);">High-speed breakdown clearance and emergency accident recovery stationed across major transit routes.</p>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
          <div style="background:#fff; padding:1.5rem; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05); border-left:4px solid var(--clr-accent);">
            <h3 style="font-size:1.2rem; margin-top:0;">Delhi-Meerut Expressway (DME)</h3>
            <p style="font-size:0.9rem; color:#475569;">14-lane high-speed expressway clearance covering Ghazipur, Indirapuram, Dasna, and Meerut Partapur interchange.</p>
          </div>
          <div style="background:#fff; padding:1.5rem; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05); border-left:4px solid var(--clr-accent);">
            <h3 style="font-size:1.2rem; margin-top:0;">Yamuna Expressway</h3>
            <p style="font-size:0.9rem; color:#475569;">Rapid 24/7 recovery from Pari Chowk Greater Noida toward Jewar Airport corridor and Agra transit.</p>
          </div>
          <div style="background:#fff; padding:1.5rem; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05); border-left:4px solid var(--clr-accent);">
            <h3 style="font-size:1.2rem; margin-top:0;">NH-48 (Delhi-Gurugram Corridor)</h3>
            <p style="font-size:0.9rem; color:#475569;">Airport corridor, Dhaula Kuan, CyberHub, Rajiv Chowk, Kherki Daula toll, and Manesar IMT.</p>
          </div>
          <div style="background:#fff; padding:1.5rem; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05); border-left:4px solid var(--clr-accent);">
            <h3 style="font-size:1.2rem; margin-top:0;">Peripheral Expressways (KMP &amp; KGP)</h3>
            <p style="font-size:0.9rem; color:#475569;">Bypass long-haul commercial truck recovery, multi-axle trailer winching, and industrial machinery transport.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQs -->
    <section class="section">
      <div class="container" style="max-width:900px;">
        <h2 style="font-size:2rem; text-align:center; color:var(--clr-primary); margin-bottom:2rem;">Frequently Asked Questions About Our Service Areas</h2>
        <div class="faq-list">
          <div class="faq-item" style="margin-bottom:1.5rem; border:1px solid #e2e8f0; border-radius:8px; padding:1.25rem;">
            <h3 style="font-size:1.15rem; color:var(--clr-primary); margin-top:0;">Which cities are covered by Classic Tow Service?</h3>
            <p style="color:#475569; margin-bottom:0; line-height:1.6;">Classic Tow Service provides 24/7 coverage across Delhi, Noida, Greater Noida, Ghaziabad, Gurugram, Meerut, Hapur, and the entire National Capital Region (Delhi NCR), including all arterial expressways.</p>
          </div>
          <div class="faq-item" style="margin-bottom:1.5rem; border:1px solid #e2e8f0; border-radius:8px; padding:1.25rem;">
            <h3 style="font-size:1.15rem; color:var(--clr-primary); margin-top:0;">How quickly can a tow truck reach an expressway breakdown?</h3>
            <p style="color:#475569; margin-bottom:0; line-height:1.6;">Our units are stationed near key expressway entry points along the Delhi-Meerut Expressway, Yamuna Expressway, NH-48, and Peripheral Expressways, allowing typical arrival times between 20 and 35 minutes.</p>
          </div>
          <div class="faq-item" style="border:1px solid #e2e8f0; border-radius:8px; padding:1.25rem;">
            <h3 style="font-size:1.15rem; color:var(--clr-primary); margin-top:0;">Can you tow vehicles between different NCR cities?</h3>
            <p style="color:#475569; margin-bottom:0; line-height:1.6;">Yes, we specialize in both local roadside assistance and long-distance intercity vehicle transport between any two points across Delhi, Uttar Pradesh, and Haryana.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency CTA -->
    <section class="section" style="background:var(--clr-primary); color:#fff; text-align:center; padding:4rem 0;">
      <div class="container" style="max-width:800px;">
        <h2 style="font-size:2.25rem; color:#fff; margin-bottom:1rem;">Need Immediate Towing Assistance Anywhere in Delhi NCR?</h2>
        <p style="font-size:1.15rem; color:#cbd5e1; margin-bottom:2rem;">Our 24/7 dispatch control room is ready to mobilize the nearest flatbed or heavy wrecker to your exact location right now.</p>
        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
          <a href="tel:${PHONE_TEL}" class="btn btn--accent btn--lg">Call +91 96542 84747</a>
          <a href="${WA_LINK}" class="btn btn--outline btn--lg" style="color:#fff; border-color:#fff;" onclick="sendLocationOnWhatsApp(event)">Share Live Location on WhatsApp</a>
        </div>
      </div>
    </section>
  </main>
${getFooter({ rel: '' })}`;

  fs.writeFileSync(path.join(__dirname, 'locations.html'), html, 'utf8');
  console.log('Generated: locations.html');
}

// Generate the 8 Major City Landing Pages
function generateCityPages() {
  CITIES.forEach(city => {
    const dir = path.join(__dirname, city.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const title = `${city.h1} | 24/7 Flatbed & Recovery | Classic Tow`;
    const description = `${city.heroSubtitle} Professional vehicle recovery, zero-degree flatbeds, heavy towing & RSA in ${city.name}. Call +91 96542 84747.`;
    const canonical = `${BASE_URL}/${city.slug}/`;

    const schema = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": `${BASE_URL}/locations.html` },
          { "@type": "ListItem", "position": 3, "name": city.name, "item": canonical }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": ["AutomotiveBusiness", "LocalBusiness"],
        "name": `Classic Tow Service - ${city.name}`,
        "url": canonical,
        "telephone": PHONE_TEL,
        "email": EMAIL,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": ADDRESS_STREET,
          "addressLocality": ADDRESS_CITY,
          "addressRegion": ADDRESS_STATE,
          "postalCode": ADDRESS_POSTAL,
          "addressCountry": "IN"
        },
        "areaServed": {
          "@type": "City",
          "name": city.name
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": city.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ];

    const landmarksHtml = city.landmarks.map(l => `
      <div style="background:#fff; padding:1.25rem; border-radius:8px; border:1px solid #e2e8f0; box-shadow:0 2px 4px rgba(0,0,0,0.03);">
        <h4 style="font-size:1.1rem; color:var(--clr-primary); margin-top:0; margin-bottom:0.4rem; display:flex; align-items:center; gap:0.5rem;">
          <span style="color:var(--clr-accent-dark); font-size:1.2rem;">📍</span> ${l.name}
        </h4>
        <p style="font-size:0.9rem; color:#475569; margin:0; line-height:1.5;">${l.desc}</p>
      </div>
    `).join('\n');

    const localitiesHtml = city.localities.map(loc => `
      <span style="background:#f1f5f9; color:#1e293b; font-size:0.85rem; padding:0.35rem 0.65rem; border-radius:4px; font-weight:500; border:1px solid #e2e8f0;">${loc}</span>
    `).join('\n');

    const faqsHtml = city.faqs.map(f => `
      <div class="faq-item" style="margin-bottom:1.25rem; border:1px solid #e2e8f0; border-radius:8px; padding:1.25rem; background:#fff;">
        <h3 style="font-size:1.1rem; color:var(--clr-primary); margin-top:0; margin-bottom:0.5rem;">${f.q}</h3>
        <p style="color:#475569; margin:0; line-height:1.6;">${f.a}</p>
      </div>
    `).join('\n');

    const html = `${getHead({ title, description, canonical, rel: '../', schema })}
  <!-- Breadcrumbs -->
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <div class="container">
      <ol class="breadcrumbs__list">
        <li><a href="../index.html">Home</a></li>
        <li aria-hidden="true">›</li>
        <li><a href="../locations.html">Locations</a></li>
        <li aria-hidden="true">›</li>
        <li aria-current="page">${city.name}</li>
      </ol>
    </div>
  </nav>

  <main id="main-content">
    <!-- Hero Section -->
    <section class="hero hero--service">
      <div class="hero__bg-image">
        <img src="../Classic%20Tow%20Service%20Flatbed%20Rescue.webp" alt="Towing Service in ${city.name}" width="1200" height="600" loading="eager" />
        <div class="hero__overlay"></div>
      </div>
      <div class="container hero__content">
        <div class="hero__badge hero__badge--rating" aria-label="Rated 4.9 out of 5 stars on Google">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <span class="score"><strong>4.9</strong>/5</span>
          <span class="divider" aria-hidden="true">•</span>
          <span class="badge-label">Verified Towing in ${city.name}</span>
        </div>
        <h1 class="hero__title">${city.h1}</h1>
        <p class="hero__subtitle">${city.heroSubtitle}</p>
        <div class="hero__ctas">
          <a href="tel:${PHONE_TEL}" class="btn btn--primary btn--lg">Call Dispatch: ${PHONE_DISPLAY}</a>
          <a href="${WA_LINK}" class="btn btn--whatsapp-location btn--lg" onclick="sendLocationOnWhatsApp(event)">
            <span>Send Location on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>

    <!-- City Introduction -->
    <section class="section">
      <div class="container" style="max-width:960px;">
        <div style="background:#f8fafc; border-left:4px solid var(--clr-accent); padding:1.75rem; border-radius:0 8px 8px 0; margin-bottom:2.5rem;">
          <h2 style="font-size:1.6rem; color:var(--clr-primary); margin-top:0;">24/7 Vehicle Recovery Authority in ${city.name}</h2>
          <p style="color:#334155; font-size:1.05rem; line-height:1.7; margin:0;">${city.intro}</p>
        </div>

        <!-- 3 Core Services in City -->
        <h2 style="font-size:2rem; color:var(--clr-primary); margin-bottom:1.5rem; text-align:center;">Primary Towing Services in ${city.name}</h2>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem; margin-bottom:3rem;">
          
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:1.5rem; box-shadow:0 2px 4px rgba(0,0,0,0.04); display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
                <img src="../Food%20Truck%20Towing%20Emblem.png" alt="Food Truck Towing ${city.name}" width="48" height="48" loading="lazy" />
                <h3 style="font-size:1.3rem; margin:0; color:var(--clr-primary);">Food Truck Towing</h3>
              </div>
              <p style="font-size:0.95rem; color:#475569; line-height:1.6; margin-bottom:1rem;">
                Specialized transport for commercial mobile kitchens, catering trailers, and promotional food vehicles across ${city.name}. Zero-degree flatbed loading protects custom undercarriages and internal kitchen equipment.
              </p>
            </div>
            <a href="food-truck-towing.html" class="btn btn--outline btn--sm" style="align-self:flex-start;">Explore ${city.name} Food Truck Towing &rarr;</a>
          </div>

          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:1.5rem; box-shadow:0 2px 4px rgba(0,0,0,0.04); display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
                <img src="../Heavy%20Tow%20Crane%20Emblem.png" alt="Heavy Towing ${city.name}" width="48" height="48" loading="lazy" />
                <h3 style="font-size:1.3rem; margin:0; color:var(--clr-primary);">Heavy Vehicle Towing</h3>
              </div>
              <p style="font-size:0.95rem; color:#475569; line-height:1.6; margin-bottom:1rem;">
                High-tonnage commercial wrecker services for trucks, buses, trailers, and construction carriers throughout ${city.name}. Backed by partner RSA Crane Service for mobile crane lifts and complex rollovers.
              </p>
            </div>
            <a href="heavy-towing.html" class="btn btn--outline btn--sm" style="align-self:flex-start;">Explore ${city.name} Heavy Towing &rarr;</a>
          </div>

          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:1.5rem; box-shadow:0 2px 4px rgba(0,0,0,0.04); display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
                <img src="../Accident%20Recovery%20Tow%20Truck%20Badge.png" alt="Accident Recovery ${city.name}" width="48" height="48" loading="lazy" />
                <h3 style="font-size:1.3rem; margin:0; color:var(--clr-primary);">Accident Recovery</h3>
              </div>
              <p style="font-size:0.95rem; color:#475569; line-height:1.6; margin-bottom:1rem;">
                Emergency roadside extraction, rollover uprighting, and direct transport to authorized workshops or insurance inspection yards across ${city.name} with complete safety care.
              </p>
            </div>
            <a href="accident-recovery.html" class="btn btn--outline btn--sm" style="align-self:flex-start;">Explore ${city.name} Accident Recovery &rarr;</a>
          </div>

        </div>

        <!-- Verified Landmarks Coverage -->
        <h2 style="font-size:1.8rem; color:var(--clr-primary); margin-bottom:1rem;">Emergency Towing Near Key ${city.name} Landmarks</h2>
        <p style="color:#64748b; margin-bottom:1.5rem;">Our GPS-tracked tow trucks maintain regular patrol points near major landmark junctions for rapid highway and arterial access:</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:3rem;">
          ${landmarksHtml}
        </div>

        <!-- Sectors & Localities Served -->
        <h2 style="font-size:1.8rem; color:var(--clr-primary); margin-bottom:1rem;">Areas &amp; Sectors We Serve in ${city.name}</h2>
        <p style="color:#64748b; margin-bottom:1.25rem;">Our 24/7 dispatch reaches all major sectors, commercial zones, and transit corridors across ${city.name}:</p>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:3rem;">
          ${localitiesHtml}
        </div>

        <!-- Highway Transit Routes -->
        <h3 style="font-size:1.3rem; color:var(--clr-primary); margin-bottom:0.75rem;">Major Corridors &amp; Expressways in ${city.name}:</h3>
        <ul style="color:#475569; line-height:1.8; margin-bottom:3rem;">
          ${city.highways.map(h => `<li><strong>${h}</strong> – Dedicated expressway patrol, breakdown clearance, and emergency winching.</li>`).join('\n')}
        </ul>

        <!-- Process -->
        <h2 style="font-size:1.8rem; color:var(--clr-primary); margin-bottom:1.5rem; text-align:center;">How Our ${city.name} Towing Process Works</h2>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-bottom:3rem;">
          <div style="background:#f8fafc; padding:1.25rem; border-radius:6px; border-top:3px solid var(--clr-accent);">
            <strong style="color:var(--clr-primary); font-size:1.1rem; display:block; margin-bottom:0.35rem;">1. Call or WhatsApp</strong>
            <span style="color:#475569; font-size:0.9rem;">Contact our 24/7 dispatch line at ${PHONE_DISPLAY} or tap WhatsApp location share.</span>
          </div>
          <div style="background:#f8fafc; padding:1.25rem; border-radius:6px; border-top:3px solid var(--clr-accent);">
            <strong style="color:var(--clr-primary); font-size:1.1rem; display:block; margin-bottom:0.35rem;">2. Share Location</strong>
            <span style="color:#475569; font-size:0.9rem;">Send your live GPS pin or nearest landmark in ${city.name} with vehicle details.</span>
          </div>
          <div style="background:#f8fafc; padding:1.25rem; border-radius:6px; border-top:3px solid var(--clr-accent);">
            <strong style="color:var(--clr-primary); font-size:1.1rem; display:block; margin-bottom:0.35rem;">3. Instant Quote</strong>
            <span style="color:#475569; font-size:0.9rem;">Receive an upfront, transparent estimate with no hidden surcharges before dispatch.</span>
          </div>
          <div style="background:#f8fafc; padding:1.25rem; border-radius:6px; border-top:3px solid var(--clr-accent);">
            <strong style="color:var(--clr-primary); font-size:1.1rem; display:block; margin-bottom:0.35rem;">4. Safe Transport</strong>
            <span style="color:#475569; font-size:0.9rem;">Our certified driver arrives promptly, safely loads, and hauls your vehicle to destination.</span>
          </div>
        </div>

        <!-- FAQs -->
        <h2 style="font-size:1.8rem; color:var(--clr-primary); margin-bottom:1.5rem; text-align:center;">Frequently Asked Questions in ${city.name}</h2>
        <div class="faq-list" style="margin-bottom:3.5rem;">
          ${faqsHtml}
        </div>
      </div>
    </section>

    <!-- Bottom Emergency CTA -->
    <section class="section" style="background:var(--clr-primary); color:#fff; text-align:center; padding:3.5rem 0;">
      <div class="container" style="max-width:800px;">
        <h2 style="font-size:2.2rem; color:#fff; margin-bottom:1rem;">Stranded in ${city.name}? Call Classic Tow Service 24/7</h2>
        <p style="font-size:1.1rem; color:#cbd5e1; margin-bottom:2rem;">Immediate flatbed and heavy commercial dispatch ready across all sectors of ${city.name}.</p>
        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
          <a href="tel:${PHONE_TEL}" class="btn btn--accent btn--lg">Call ${PHONE_DISPLAY}</a>
          <a href="${WA_LINK}" class="btn btn--outline btn--lg" style="color:#fff; border-color:#fff;" onclick="sendLocationOnWhatsApp(event)">Send GPS Location on WhatsApp</a>
        </div>
      </div>
    </section>
  </main>
${getFooter({ rel: '../' })}`;

    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
    console.log(`Generated: ${city.slug}/index.html`);
  });
}

// Generate the 24 Service-City Landing Pages
function generateServiceCityPages() {
  CITIES.forEach(city => {
    const dir = path.join(__dirname, city.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    SERVICES.forEach(service => {
      const fileName = `${service.slug}.html`;
      const filePath = path.join(dir, fileName);
      const title = `${service.name} in ${city.name} | 24/7 Relocation & Recovery | Classic Tow`;
      const description = `Professional ${service.name} in ${city.name}. ${service.summary} Rapid dispatch, certified operators, transparent pricing. Call +91 96542 84747.`;
      const canonical = `${BASE_URL}/${city.slug}/${fileName}`;

      // City-Service specific FAQ customization
      let faqs = [];
      if (service.slug === 'food-truck-towing') {
        faqs = [
          {
            q: `How do you ensure kitchen appliances inside the food truck are not damaged during transport in ${city.name}?`,
            a: `We use zero-degree hydraulic flatbeds that glide down completely parallel to the ground. This eliminates the steep angle of standard ramps, ensuring refrigerators, fryers, exhaust hoods, and gas fittings remain stable and secure without stress.`
          },
          {
            q: `Can you relocate commercial food trucks to event venues or catering festivals in ${city.name}?`,
            a: `Yes, we regularly transport food trucks and customized catering trailers to and from commercial event grounds, corporate parks, and exhibition hubs across ${city.name} and neighboring NCR regions.`
          },
          {
            q: `Do you require propane tanks and water tanks to be emptied before towing in ${city.name}?`,
            a: `For road safety compliance, propane gas cylinders must have their main valves securely shut off and locked. Fresh water and grey water tanks should preferably be drained to lower the center of gravity.`
          },
          {
            q: `What types of commercial food trailers can you haul in ${city.name}?`,
            a: `We haul all configurations: motorized food vans, vintage airstream trailers, square box catering trailers, mobile coffee kiosks, and custom container kitchens.`
          },
          {
            q: `How do you secure low-clearance customized bumpers on food trucks?`,
            a: `Our flatbed deck slides back with a virtually flat approach angle, utilizing heavy-duty soft nylon wheel tie-down straps rather than metal chains to eliminate scratches to custom body wraps or low aero spoilers.`
          }
        ];
      } else if (service.slug === 'heavy-towing') {
        faqs = [
          {
            q: `What commercial vehicles are covered under heavy towing in ${city.name}?`,
            a: `Our heavy towing fleet handles high-tonnage commercial goods vehicles (LCVs, MCVs, HCVs), multi-axle freight trailers, transit buses, interstate coaches, concrete mixers, and construction equipment haulers.`
          },
          {
            q: `Do you disconnect the drive shaft or release air brakes before towing in ${city.name}?`,
            a: `Yes. Our experienced mechanics disconnect the drive axle shaft on commercial trucks before towing to prevent costly differential gear and transmission damage, and connect auxiliary air lines to safely release spring brake lockups.`
          },
          {
            q: `What if an overturned truck or trailer requires a heavy crane lift in ${city.name}?`,
            a: `Through our direct partnership with RSA Crane Service (https://rsacraneservice.com/), we mobilize high-capacity mobile hydraulic cranes on-site for tandem uprighting, load balancing, and heavy winch extractions.`
          },
          {
            q: `Are your heavy wreckers permitted to operate on expressways around ${city.name}?`,
            a: `Yes, our heavy wreckers and commercial recovery operators comply with all regional transport authority safety regulations and express transit clearances across ${city.name} corridors.`
          },
          {
            q: `How is heavy towing pricing calculated in ${city.name}?`,
            a: `Heavy towing costs are based on gross vehicle weight (GVW), whether the vehicle is loaded or unloaded, the distance to destination workshop, and whether crane lift assistance is required. Upfront quotes are provided before dispatch.`
          }
        ];
      } else { // accident-recovery
        faqs = [
          {
            q: `How quickly does Classic Tow Service respond to an accident in ${city.name}?`,
            a: `Accident calls are prioritized with immediate emergency dispatch. Depending on your exact sector or highway landmark in ${city.name}, our recovery team typically arrives within 20 to 35 minutes.`
          },
          {
            q: `Can you transport my damaged vehicle directly to an insurance inspection workshop in ${city.name}?`,
            a: `Yes. We provide direct transportation to any authorized dealer workshop, multi-brand body shop, or insurance survey yard specified by you across ${city.name} or Delhi NCR.`
          },
          {
            q: `How do you recover a vehicle that has rolled over or fallen into a roadside ditch in ${city.name}?`,
            a: `We utilize heavy-duty hydraulic winches, snatch blocks, and synthetic rigging straps to gently upright and extract the vehicle without compounding structural damage, backed by RSA Crane Service for complex ditch recoveries.`
          },
          {
            q: `Do you provide photographic documentation for insurance claims?`,
            a: `Yes. Our team photographs the vehicle condition before loading and upon delivery at the garage, assisting your insurance surveyor with accurate recovery documentation.`
          },
          {
            q: `What safety measures should I take while waiting for the recovery truck in ${city.name}?`,
            a: `Ensure all passengers exit the vehicle safely and stand behind highway crash barriers. Switch on hazard lights, place a reflective warning triangle 30–50 meters behind, and avoid standing in moving traffic lanes.`
          }
        ];
      }

      const schema = [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Locations", "item": `${BASE_URL}/locations.html` },
            { "@type": "ListItem", "position": 3, "name": city.name, "item": `${BASE_URL}/${city.slug}/` },
            { "@type": "ListItem", "position": 4, "name": service.name, "item": canonical }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `${service.name} in ${city.name}`,
          "serviceType": service.serviceType,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Classic Tow Service",
            "telephone": PHONE_TEL,
            "email": EMAIL,
            "url": BASE_URL
          },
          "areaServed": {
            "@type": "City",
            "name": city.name
          },
          "description": `${service.name} across ${city.name}. ${service.summary}`
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        }
      ];

      const faqsHtml = faqs.map(f => `
        <div class="faq-item" style="margin-bottom:1.25rem; border:1px solid #e2e8f0; border-radius:8px; padding:1.25rem; background:#fff;">
          <h3 style="font-size:1.1rem; color:var(--clr-primary); margin-top:0; margin-bottom:0.5rem;">${f.q}</h3>
          <p style="color:#475569; margin:0; line-height:1.6;">${f.a}</p>
        </div>
      `).join('\n');

      const html = `${getHead({ title, description, canonical, rel: '../', schema })}
  <!-- Breadcrumbs -->
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <div class="container">
      <ol class="breadcrumbs__list">
        <li><a href="../index.html">Home</a></li>
        <li aria-hidden="true">›</li>
        <li><a href="../locations.html">Locations</a></li>
        <li aria-hidden="true">›</li>
        <li><a href="index.html">${city.name}</a></li>
        <li aria-hidden="true">›</li>
        <li aria-current="page">${service.name}</li>
      </ol>
    </div>
  </nav>

  <main id="main-content">
    <!-- Hero Section -->
    <section class="hero hero--service">
      <div class="hero__bg-image">
        <img src="../${service.badge}" alt="${service.name} in ${city.name}" width="1200" height="600" loading="eager" />
        <div class="hero__overlay"></div>
      </div>
      <div class="container hero__content">
        <div class="hero__badge hero__badge--rating" aria-label="Rated 4.9 out of 5 stars on Google">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <span class="score"><strong>4.9</strong>/5</span>
          <span class="divider" aria-hidden="true">•</span>
          <span class="badge-label">${service.name} Specialist in ${city.name}</span>
        </div>
        <h1 class="hero__title">${service.name} in ${city.name}</h1>
        <p class="hero__subtitle">${service.summary} Serving all sectors, industrial belts, and connecting expressway corridors in ${city.name}.</p>
        <div class="hero__ctas">
          <a href="tel:${PHONE_TEL}" class="btn btn--primary btn--lg">Call Dispatch: ${PHONE_DISPLAY}</a>
          <a href="${WA_LINK}" class="btn btn--whatsapp-location btn--lg" onclick="sendLocationOnWhatsApp(event)">
            <span>Send Location on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Detailed Content -->
    <section class="section">
      <div class="container" style="max-width:960px;">
        <div style="background:#f8fafc; border-left:4px solid var(--clr-accent); padding:1.75rem; border-radius:0 8px 8px 0; margin-bottom:2.5rem;">
          <h2 style="font-size:1.6rem; color:var(--clr-primary); margin-top:0;">Professional ${service.name} Across ${city.name}</h2>
          <p style="color:#334155; font-size:1.05rem; line-height:1.7; margin:0;">
            Classic Tow Service provides dedicated ${service.name.toLowerCase()} operations throughout ${city.name}. Operating in direct collaboration with RSA Crane Service, our team combines heavy hydraulic recovery equipment, certified rigging professionals, and round-the-clock dispatch to ensure every transport and recovery is completed safely, quickly, and with zero secondary damage.
          </p>
        </div>

        <!-- Technical Capabilities -->
        <h2 style="font-size:1.8rem; color:var(--clr-primary); margin-bottom:1rem;">Technical Equipment &amp; Capabilities in ${city.name}</h2>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem; margin-bottom:3rem;">
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:1.25rem;">
            <strong style="color:var(--clr-primary); font-size:1.1rem; display:block; margin-bottom:0.35rem;">Zero-Degree Loading</strong>
            <p style="font-size:0.9rem; color:#475569; margin:0;">Flatbed hydraulic decks slide down flush with the pavement, preventing underbody damage and bumper scraping.</p>
          </div>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:1.25rem;">
            <strong style="color:var(--clr-primary); font-size:1.1rem; display:block; margin-bottom:0.35rem;">Heavy Winching &amp; Crane Support</strong>
            <p style="font-size:0.9rem; color:#475569; margin:0;">Partnered with RSA Crane Service for high-capacity hydraulic crane lifts, ditch recoveries, and complex rollover uprighting.</p>
          </div>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:1.25rem;">
            <strong style="color:var(--clr-primary); font-size:1.1rem; display:block; margin-bottom:0.35rem;">Commercial Rigging Safety</strong>
            <p style="font-size:0.9rem; color:#475569; margin:0;">Soft synthetic bridle recovery straps, axle slings, and pneumatic air line feeds for secure commercial vehicle towing.</p>
          </div>
        </div>

        <!-- Areas Served in City -->
        <h2 style="font-size:1.8rem; color:var(--clr-primary); margin-bottom:1rem;">Priority Service Sectors for ${service.name} in ${city.name}</h2>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:3rem;">
          ${city.localities.map(l => `<span style="background:#f1f5f9; color:#1e293b; font-size:0.85rem; padding:0.35rem 0.65rem; border-radius:4px; font-weight:500; border:1px solid #e2e8f0;">${l}</span>`).join('\n')}
        </div>

        <!-- FAQs -->
        <h2 style="font-size:1.8rem; color:var(--clr-primary); margin-bottom:1.5rem; text-align:center;">Frequently Asked Questions: ${service.name} in ${city.name}</h2>
        <div class="faq-list" style="margin-bottom:3.5rem;">
          ${faqsHtml}
        </div>

        <!-- Related Services in City -->
        <div style="background:#f8fafc; border-radius:8px; padding:1.5rem; border:1px solid #e2e8f0; margin-bottom:3rem;">
          <h3 style="font-size:1.2rem; color:var(--clr-primary); margin-top:0;">Other Specialized Services in ${city.name}:</h3>
          <ul style="list-style:none; padding:0; margin:0; display:flex; flex-wrap:wrap; gap:1rem;">
            ${SERVICES.filter(s => s.slug !== service.slug).map(s => `
              <li><a href="${s.slug}.html" style="color:var(--clr-primary); font-weight:600; text-decoration:none;">${s.name} in ${city.name} &rarr;</a></li>
            `).join('')}
            <li><a href="index.html" style="color:var(--clr-primary); font-weight:600; text-decoration:none;">All ${city.name} Towing Services &rarr;</a></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Bottom Emergency CTA -->
    <section class="section" style="background:var(--clr-primary); color:#fff; text-align:center; padding:3.5rem 0;">
      <div class="container" style="max-width:800px;">
        <h2 style="font-size:2.2rem; color:#fff; margin-bottom:1rem;">Need ${service.name} in ${city.name}?</h2>
        <p style="font-size:1.1rem; color:#cbd5e1; margin-bottom:2rem;">Contact our 24/7 recovery dispatch center for instant pricing and rapid truck mobilization.</p>
        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
          <a href="tel:${PHONE_TEL}" class="btn btn--accent btn--lg">Call ${PHONE_DISPLAY}</a>
          <a href="${WA_LINK}" class="btn btn--outline btn--lg" style="color:#fff; border-color:#fff;" onclick="sendLocationOnWhatsApp(event)">WhatsApp Dispatch</a>
        </div>
      </div>
    </section>
  </main>
${getFooter({ rel: '../' })}`;

      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`Generated: ${city.slug}/${fileName}`);
    });
  });
}

// Generate llms.txt & llms-full.txt
function generateLLMsFiles() {
  const llmsSummary = `# Classic Tow Service - AI Knowledge Directory (llms.txt)

> Classic Tow Service is a premier 24/7 towing, roadside assistance, and vehicle recovery service operating across the National Capital Region (Delhi NCR) in technical collaboration with RSA Crane Service (https://rsacraneservice.com/).

## Core Business Information
- **Business Name**: Classic Tow Service
- **Operated By**: RSA Crane Service
- **24/7 Hotline**: ${PHONE_DISPLAY} (tel:${PHONE_TEL})
- **WhatsApp Dispatch**: ${WA_LINK}
- **Email**: ${EMAIL}
- **Headquarters Address**: ${ADDRESS_STREET}, ${ADDRESS_CITY}, ${ADDRESS_STATE} – ${ADDRESS_POSTAL}, India
- **Primary Service Regions**: Delhi, Noida, Greater Noida, Ghaziabad, Gurugram (Gurgaon), Meerut, Hapur, and Delhi NCR
- **Canonical Website**: ${BASE_URL}/

## Primary Services Provided
1. **Food Truck Towing**: Commercial fleet relocation, food truck transportation, heavy mobile kitchen hauling, commercial trailer relocation with zero-degree flatbeds.
2. **Heavy Towing**: High-tonnage commercial vehicle towing, heavy-duty wrecker services, crane lift recovery, commercial truck recovery, industrial vehicle transportation with partner RSA Crane Service.
3. **Accident Recovery**: Emergency roadside extraction, rollover uprighting, ditch winching, damaged vehicle transportation, direct garage drop-off, insurance claims documentation support.
4. **Car Towing**: Zero-degree flatbed towing for luxury cars, electric vehicles, sedans, and SUVs.
5. **Bike Towing**: Safe motorcycle and two-wheeler transport with specialized wheel harnesses.
6. **Roadside Assistance (RSA)**: Battery jump-start, flat tyre changes, emergency fuel delivery, and lockout support.

## Key Service Areas & Landing Pages
- **Coverage Directory Hub**: ${BASE_URL}/locations.html
- **Delhi Towing**: ${BASE_URL}/delhi/
  - Food Truck: ${BASE_URL}/delhi/food-truck-towing.html
  - Heavy Towing: ${BASE_URL}/delhi/heavy-towing.html
  - Accident Recovery: ${BASE_URL}/delhi/accident-recovery.html
- **Noida Towing**: ${BASE_URL}/noida/
  - Food Truck: ${BASE_URL}/noida/food-truck-towing.html
  - Heavy Towing: ${BASE_URL}/noida/heavy-towing.html
  - Accident Recovery: ${BASE_URL}/noida/accident-recovery.html
- **Gurugram Towing**: ${BASE_URL}/gurugram/
  - Food Truck: ${BASE_URL}/gurugram/food-truck-towing.html
  - Heavy Towing: ${BASE_URL}/gurugram/heavy-towing.html
  - Accident Recovery: ${BASE_URL}/gurugram/accident-recovery.html
- **Greater Noida Towing**: ${BASE_URL}/greater-noida/
  - Food Truck: ${BASE_URL}/greater-noida/food-truck-towing.html
  - Heavy Towing: ${BASE_URL}/greater-noida/heavy-towing.html
  - Accident Recovery: ${BASE_URL}/greater-noida/accident-recovery.html
- **Ghaziabad Towing**: ${BASE_URL}/ghaziabad/
  - Food Truck: ${BASE_URL}/ghaziabad/food-truck-towing.html
  - Heavy Towing: ${BASE_URL}/ghaziabad/heavy-towing.html
  - Accident Recovery: ${BASE_URL}/ghaziabad/accident-recovery.html
- **Meerut Towing**: ${BASE_URL}/meerut/
  - Food Truck: ${BASE_URL}/meerut/food-truck-towing.html
  - Heavy Towing: ${BASE_URL}/meerut/heavy-towing.html
  - Accident Recovery: ${BASE_URL}/meerut/accident-recovery.html
- **Hapur Towing**: ${BASE_URL}/hapur/
  - Food Truck: ${BASE_URL}/hapur/food-truck-towing.html
  - Heavy Towing: ${BASE_URL}/hapur/heavy-towing.html
  - Accident Recovery: ${BASE_URL}/hapur/accident-recovery.html
- **Delhi NCR Regional**: ${BASE_URL}/delhi-ncr/
  - Food Truck: ${BASE_URL}/delhi-ncr/food-truck-towing.html
  - Heavy Towing: ${BASE_URL}/delhi-ncr/heavy-towing.html
  - Accident Recovery: ${BASE_URL}/delhi-ncr/accident-recovery.html
`;

  const llmsFull = `# Classic Tow Service - Comprehensive AI & LLM Knowledge Base (llms-full.txt)

## 1. Entity & Brand Identity
- **Legal / Operational Entity**: Classic Tow Service
- **Parent / Operating Alliance**: Operated by RSA Crane Service (Official site: https://rsacraneservice.com/)
- **Category**: Automotive Emergency Services, Commercial Towing, Roadside Assistance & Heavy Vehicle Recovery
- **Hotline**: ${PHONE_DISPLAY}
- **WhatsApp Location Dispatch**: ${WA_LINK}
- **Official Address**: ${ADDRESS_STREET}, ${ADDRESS_CITY}, ${ADDRESS_STATE} – ${ADDRESS_POSTAL}, India
- **Operating Hours**: 24 Hours a Day, 7 Days a Week, 365 Days a Year (including national holidays and weekends)
- **Geographic Coverage**: Delhi NCT, Delhi NCR, Gurugram (Gurgaon), Noida, Greater Noida, Ghaziabad, Meerut, Hapur, Faridabad, and all connecting expressways.

## 2. Technical Fleet & Operational Capabilities
Classic Tow Service operates a diverse modern fleet designed for high-precision recovery:
- **Zero-Degree Hydraulic Flatbed Trucks**: The entire flatbed slides back and tilts completely flush with the ground (0° incline angle). This eliminates bumper scraping, frame contact, and drivetrain friction, making it the safest solution for luxury sedans (Mercedes-Benz, BMW, Audi, Porsche, Jaguar), low-ground-clearance sports cars, electric vehicles (EVs), and commercial food trucks with customized skirting.
- **Heavy Commercial Wreckers**: High-tonnage recovery vehicles equipped with telescoping underlift booms, heavy recovery winches, and auxiliary pneumatic air line connections to release the casualty vehicle's spring brakes. Used for commercial freight trucks (LCVs and HCVs), buses, multi-axle trailers, transit mixers, and industrial machinery haulers.
- **Mobile Hydraulic Crane Units (via RSA Crane Service)**: Through an official partnership with RSA Crane Service, Classic Tow Service deploys heavy mobile hydraulic cranes for severe rollover recovery, deep ditch or culvert extraction, and industrial heavy equipment hoisting.
- **Compact Wheel-Lift Wreckers**: Low-profile tow trucks tailored for tight basement parking lots, multi-level car parks, and narrow urban streets where full-size flatbed trucks cannot enter.

## 3. Core Service Deep Dives

### A. Food Truck Towing & Mobile Kitchen Relocation
- **Vehicles Handled**: Motorized food trucks, vintage airstream trailers, box catering trailers, commercial coffee kiosks, and mobile promotional kitchens.
- **Technical Protocols**: 
  1. Inspection and locking of main valves on all propane gas tanks.
  2. Complete water tank drainage to stabilize the vehicle's center of gravity.
  3. Securing internal refrigeration, grills, fryers, and heavy kitchen appliances.
  4. Zero-degree flatbed loading to safeguard fragile commercial exhaust hoods and custom aerodynamic fiberglass body kits.
  5. Soft wheel tie-down strapping without frame-damaging metal chains.

### B. Heavy Commercial Towing
- **Vehicles Handled**: Multi-axle commercial trucks, tractor-trailers, container carriers, interstate luxury buses, transit mixers, dumpers, and industrial generators.
- **Technical Protocols**:
  1. Drive axle shaft extraction prior to towing to prevent severe transmission and differential gearing wear.
  2. Auxiliary pneumatic air lines connected to the casualty truck's air tanks to unlock spring safety brakes.
  3. Heavy underlift wheel grids rated for high axle tonnages.
  4. On-site coordination with RSA Crane Service mobile cranes for rolled-over or jackknifed tractor-trailers.

### C. Accident Recovery & Collision Extraction
- **Capabilities**: 24/7 emergency response on national expressways, rollover uprighting, ditch/culvert winching, damaged wheel extraction, and direct transport to authorized body shops.
- **Technical Protocols**:
  1. Scene safety, hazard triangle placement, and high-visibility traffic signaling.
  2. Fluid spill containment and battery terminal disconnection to prevent vehicle fires.
  3. Gentle synthetic strap winching to prevent compounding chassis or structural frame distortion.
  4. Full pre-loading and post-delivery photographic documentation for insurance surveyors.

## 4. Regional Coverage Directory & Highways
1. **Delhi (NCT)**: Connaught Place, Okhla Industrial Area, Aerocity, Dwarka, Karol Bagh, Rohini, Saket, Vasant Kunj, Mayur Vihar, Nehru Place, Mundka. Highways: Outer Ring Road, Ring Road, NH-48, DME entry, Mathura Road.
2. **Noida**: Sectors 1 through 150, including Sector 18 commercial hub, Sector 62 & 63 IT & industrial parks, Sector 137/142 expressway belt, Sector 150. Highways: Noida-Greater Noida Expressway, DND Flyway, FNG corridor.
3. **Gurugram (Gurgaon)**: DLF Cyber City, Golf Course Road, Sohna Road, Udyog Vihar, IMT Manesar, Sector 29. Highways: NH-48 (Delhi-Jaipur Expressway), KMP Expressway, Dwarka Expressway.
4. **Greater Noida**: Pari Chowk, Knowledge Park (1–4), Ecotech industrial zones, Surajpur, Kasna. Highways: Yamuna Expressway, Eastern Peripheral Expressway interchange.
5. **Ghaziabad**: Indirapuram, Vaishali, Vasundhara, Raj Nagar Extension, Sahibabad Industrial Area, Mohan Nagar, Vijay Nagar (ABES College corridor). Highways: NH-9 / NH-24, Delhi-Meerut Expressway (DME), Hindon Elevated Road.
6. **Meerut**: Partapur Industrial Area, Modipuram, Pallavpuram, Meerut Bypass (NH-58), Delhi Road. Highways: Delhi-Meerut Expressway (Section 4), Meerut Bypass.
7. **Hapur**: Pilkhuwa handloom & industrial hub, Babugarh, Garhmukteshwar (Brijghat), Dhaulana Industrial Area. Highways: NH-9 corridor, Hapur Bypass.
8. **Delhi NCR (Regional)**: Full inter-city connectivity across Delhi, Uttar Pradesh, and Haryana.
`;

  fs.writeFileSync(path.join(__dirname, 'llms.txt'), llmsSummary, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'llms-full.txt'), llmsFull, 'utf8');
  console.log('Generated: llms.txt & llms-full.txt');
}

// Generate complete updated sitemap.xml
function generateSitemap() {
  const rootPages = [
    { url: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { url: `${BASE_URL}/about-us.html`, priority: '0.8', changefreq: 'monthly' },
    { url: `${BASE_URL}/services.html`, priority: '0.9', changefreq: 'weekly' },
    { url: `${BASE_URL}/locations.html`, priority: '0.95', changefreq: 'weekly' },
    { url: `${BASE_URL}/contact-us.html`, priority: '0.8', changefreq: 'monthly' },
    { url: `${BASE_URL}/car-towing.html`, priority: '0.8', changefreq: 'monthly' },
    { url: `${BASE_URL}/bike-towing.html`, priority: '0.8', changefreq: 'monthly' },
    { url: `${BASE_URL}/zero-degree-flatbed-towing.html`, priority: '0.85', changefreq: 'monthly' },
    { url: `${BASE_URL}/food-truck-towing.html`, priority: '0.85', changefreq: 'monthly' },
    { url: `${BASE_URL}/heavy-towing.html`, priority: '0.85', changefreq: 'monthly' },
    { url: `${BASE_URL}/breakdown-accident-recovery.html`, priority: '0.85', changefreq: 'monthly' },
    { url: `${BASE_URL}/scrap-vehicle-towing.html`, priority: '0.8', changefreq: 'monthly' },
    { url: `${BASE_URL}/rsa-assistance.html`, priority: '0.8', changefreq: 'monthly' },
    { url: `${BASE_URL}/privacy-policy.html`, priority: '0.3', changefreq: 'yearly' },
    { url: `${BASE_URL}/terms-and-conditions.html`, priority: '0.3', changefreq: 'yearly' }
  ];

  const cityPages = CITIES.map(c => ({
    url: `${BASE_URL}/${c.slug}/`,
    priority: '0.9',
    changefreq: 'weekly'
  }));

  const serviceCityPages = [];
  CITIES.forEach(c => {
    SERVICES.forEach(s => {
      serviceCityPages.push({
        url: `${BASE_URL}/${c.slug}/${s.slug}.html`,
        priority: '0.85',
        changefreq: 'weekly'
      });
    });
  });

  const allUrls = [...rootPages, ...cityPages, ...serviceCityPages];
  const now = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
  console.log(`Generated: sitemap.xml with ${allUrls.length} total URLs.`);
}

// Generate updated robots.txt
function generateRobotsTxt() {
  const robots = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml

# LLM & AI Knowledge Files
Allow: /llms.txt
Allow: /llms-full.txt
`;

  fs.writeFileSync(path.join(__dirname, 'robots.txt'), robots, 'utf8');
  console.log('Generated: robots.txt');
}

// Run all generators
console.log('--- STARTING GENERATION ---');
generateLocationsHub();
generateCityPages();
generateServiceCityPages();
generateLLMsFiles();
generateSitemap();
generateRobotsTxt();
console.log('--- GENERATION COMPLETE ---');
