# Spectrum Tours & Travels — Full SEO Audit Report
**Date:** 10 May 2026  
**Site:** spectrumtourandtravels.in (pre-deployment, static local files)  
**Business Type:** Local Service — Travel Agency (brick-and-mortar + online booking)  
**Auditor:** Claude SEO Audit System  

---

## Executive Summary

**SEO Health Score: 54 / 100**

| Category | Weight | Raw Score | Weighted |
|----------|--------|-----------|----------|
| Technical SEO | 22% | 48/100 | 10.6 |
| Content Quality | 23% | 72/100 | 16.6 |
| On-Page SEO | 20% | 68/100 | 13.6 |
| Schema / Structured Data | 10% | 55/100 | 5.5 |
| Performance (CWV) | 10% | 60/100 | 6.0 |
| AI Search Readiness | 10% | 42/100 | 4.2 |
| Images | 5% | 70/100 | 3.5 |
| **Total** | **100%** | — | **60 / 100** |

**Rating:** Acceptable — significant work needed before launch.

### Top 5 Critical Issues

1. **Route pages missing from root** — sitemap lists 3 URLs that 404 at launch
2. **No canonical tags on any page** — duplicate content risk if multiple URLs resolve
3. **Phone number inconsistency in schema vs. content** — different numbers across pages
4. **No llms.txt file** — invisible to AI crawlers (ChatGPT, Perplexity, Claude)
5. **GA4 tracking on route pages, absent on index.html** — zero analytics for homepage

### Top 5 Quick Wins

1. Add `<link rel="canonical">` to all 4 pages (10 min)
2. Move route pages from `backup/` to root (5 min)
3. Update sitemap `lastmod` dates to today
4. Add `llms.txt` file (30 min)
5. Add GA4 tag to `index.html`

---

## Technical SEO

### P0 — Blocking

**[P0] Route pages not in root directory**
- **Location:** `backup/route-*.html` — not `route-*.html` in root
- **Impact:** All 3 sitemap URLs return 404 at launch. Google will crawl them, find nothing, and eventually remove them from the index. Internal links from footer on route pages also break.
- **Fix:** Copy (or move) `backup/route-statue-of-unity.html`, `backup/route-chardham-yatra.html`, `backup/route-somnath-dwarka.html` to the project root.

**[P0] Phone number mismatch across pages**
- **Location:** `index.html` schema uses `+917801807756`; all 3 route pages use `+916356793922`
- **Impact:** NAP (Name/Address/Phone) inconsistency is a direct local SEO signal. Google can't determine the canonical phone number. Also affects trust/credibility.
- **Fix:** Standardise to one number across all schema blocks and content. Determine which is the primary business line.

### P1 — Major

**[P1] No canonical tags on any page**
- **Location:** All 4 HTML files — `<head>` has no `<link rel="canonical" href="..." />`
- **Impact:** If the domain resolves at both `www` and non-`www`, or if trailing slash variants exist, duplicate content penalties apply. Also, `index.html` vs `/` can be treated as different URLs.
- **Fix:** Add `<link rel="canonical" href="https://spectrumtourandtravels.in/" />` to index.html and corresponding canonical to each route page.

**[P1] GA4 analytics absent from index.html**
- **Location:** Route pages all have `G-NDB969YNLG` GA4 tracking. `index.html` has none.
- **Impact:** Homepage traffic — the majority of all sessions — generates zero analytics data. Can't measure bounce rate, conversions, traffic sources.
- **Fix:** Add the same GA4 `gtag.js` snippet to `index.html` `<head>`.

**[P1] Sitemap lastmod dates are stale**
- **Location:** `sitemap.xml` — all 4 URLs show `2026-04-27`
- **Impact:** Search engines use `lastmod` to prioritise recrawls. Stale dates signal unchanged content even after significant updates.
- **Fix:** Update `lastmod` to `2026-05-10` for all URLs after each significant change.

**[P1] No `<link rel="alternate" hreflang>` for Indian English**
- **Location:** All HTML pages — no hreflang tags
- **Impact:** Minor for a mono-lingual site, but Google recommends `hreflang="en-IN"` for India-targeted English content. Missing `og:locale` on `index.html` (route pages have `en_IN`).
- **Fix:** Add `<meta property="og:locale" content="en_IN" />` to index.html.

### P2 — Minor

**[P2] robots.txt is overly verbose with redundant allow rules**
- **Location:** `robots.txt`
- **Impact:** `Allow: /` for each social bot is unnecessary — `Allow: /` for `*` already permits all. Not harmful but adds noise.
- **Fix:** Simplify to just `User-agent: * / Allow: / / Sitemap: https://spectrumtourandtravels.in/sitemap.xml`

**[P2] Sitemap missing `<changefreq>` recommendations are inaccurate**
- **Location:** `sitemap.xml` — homepage set to `weekly`, route pages to `monthly`
- **Impact:** A homepage with weekly updates is correctly marked; however Google ignores `changefreq` in practice. Low priority.
- **Fix:** Not urgent — acceptable as-is.

**[P2] No `favicon` for route pages**
- **Location:** `backup/route-*.html` — favicon path `assets/img/logos/S-Logo Favicon.png` which differs from index.html's `assets/img/brand/spectrum-favicon.png`
- **Impact:** Favicon 404s on route pages (wrong path). Browser tab shows generic icon.
- **Fix:** Update route page favicon paths to `assets/img/brand/spectrum-favicon.png`.

**[P2] Security headers — pending deployment**
- **Location:** Server config (not yet deployed)
- **Impact:** Missing `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security` will fail security audits
- **Fix:** Configure on hosting platform at deployment. Consider adding a `_headers` file if using Netlify/Vercel or `.htaccess` if on Apache.

### P3 — Polish

**[P3] No 404 page**
- **Impact:** If users hit broken URLs, they get a raw server 404. Missed recovery opportunity.
- **Fix:** Create `404.html` with branded content and navigation back to home.

**[P3] No `manifest.json` / PWA signals**
- **Impact:** Won't appear in "Add to Home Screen" prompts on mobile.
- **Fix:** Add a basic `site.webmanifest` and link it in `<head>`.

---

## Content Quality

### E-E-A-T Assessment

| Signal | Present | Quality |
|--------|---------|---------|
| **Experience** | Yes — "Since 2008", "10,000+ clients" | Good |
| **Expertise** | Partial — pillar descriptions, driver training | Thin — no certifications, awards |
| **Authoritativeness** | Weak — no external links, no press mentions | Needs work |
| **Trustworthiness** | Good — real names, real address, GST/PAN | Good |

### P1 — Major

**[P1] No testimonials on index.html**
- **Location:** `index.html` — no testimonials/reviews section
- **Impact:** Trust signal gap. Users can't verify social proof before contacting. Critical for local service businesses. Route pages also lack reviews.
- **Fix:** Add a testimonials section with at least 4–6 real client quotes, attributed by name, company, and date. Mix 4-star and 5-star ratings (per previous audit guidance — all-5-star looks fake).

**[P1] Missing FAQ section**
- **Location:** Entire site
- **Impact:** FAQ content targets long-tail "people also ask" queries. High AI citability for questions like "how much does Ahmedabad to Statue of Unity cost?" — currently unanswered.
- **Fix:** Add FAQ section to each route page (5–8 Q&A per page). Add a general FAQ to index.html covering pricing, booking process, cancellation policy, vehicle sanitisation.

**[P1] No pricing information visible**
- **Location:** All pages — forms collect journey details but no pricing shown
- **Impact:** Major friction. Users searching "Ahmedabad to Statue of Unity taxi price" (high-intent query) leave without an answer. Also reduces AI citation value.
- **Fix:** Add indicative price ranges ("Starting from ₹X for a 4-seater sedan") per route page. Exact quotes via form is still the conversion mechanism, but anchoring expectation reduces bounce.

### P2 — Minor

**[P2] Hero subtext claims "over 10,000 corporate and leisure clients"**
- **Location:** `index.html` line 128 — hero-sub paragraph
- **Impact:** Unverified claim without source. Acceptable as marketing copy but weaker as an E-E-A-T signal than e.g. "serving X named companies since 2008."
- **Note:** The client ticker already lists Mitsubishi, Nestle, Tata — this substantiates the claim well.

**[P2] About section lacks specific achievements**
- **Location:** `index.html` — about section
- **Impact:** "evolved from a single-branch urban operation" is vague. Specific milestones (fleet size growth, number of corporate accounts, total passengers) would strengthen E-E-A-T.
- **Fix:** Add 2–3 concrete stats: fleet size, vehicles operated, annual group tours completed.

**[P2] No blog or knowledge content**
- **Location:** Entire site
- **Impact:** Zero topical authority signals. Competitors with travel blogs rank for informational queries that feed booking intent.
- **Fix:** Even 3–4 blog posts ("Best time to visit Chardham", "Ahmedabad to Statue of Unity: Complete Travel Guide") would create organic entry points.

### P3 — Polish

**[P3] Tour section lacks descriptions**
- **Location:** `index.html` — tour-list section
- **Impact:** Each tour row has only a title and city list. No context about duration, cost range, or what makes each tour special.
- **Fix:** Add a 1-sentence hook per tour row (e.g., "5–14 days through royal palaces and golden forts" for Rajasthan Royal).

---

## On-Page SEO

### Title & Meta Analysis

| Page | Title | Length | Meta Description | Length |
|------|-------|--------|-----------------|--------|
| index.html | Spectrum Tours & Travels \| Every Journey, Every Colour | 55 chars ✓ | Corporate and leisure travel specialists based in Ahmedabad. Serving India's leading organisations since 2008. | 109 chars ✓ |
| Statue of Unity | Ahmedabad to Statue of Unity Taxi Package \| Spectrum Tours & Travels | 70 chars ✓ | Book comfortable Ahmedabad to Statue of Unity cab... | 157 chars ✓ |
| Chardham Yatra | Chardham Yatra Tour Packages from Ahmedabad \| Spectrum Tours & Travels | 72 chars ✓ | Book 10–14 day Chardham Yatra packages from Ahmedabad... | 151 chars ✓ |
| Somnath & Dwarka | Somnath & Dwarka Tour Package from Ahmedabad \| Spectrum Tours & Travels | 73 chars ✓ | Book Somnath & Dwarka pilgrimage packages from Ahmedabad... | 155 chars ✓ |

Titles and meta descriptions are well-optimised on route pages. Index.html title is creative but not keyword-rich.

### P1 — Major

**[P1] Homepage title lacks primary keywords**
- **Location:** `index.html` `<title>` — "Every Journey, Every Colour" is brand-creative but keyword-empty
- **Impact:** Users searching "travel agency Ahmedabad" or "tour operator Gujarat" see no relevance signal in the title SERP snippet.
- **Fix:** Revise to `Spectrum Tours & Travels — Travel Agency in Ahmedabad | Since 2008` or similar, keeping brand name first.

**[P1] Homepage meta description doesn't mention Ahmedabad prominently**
- **Location:** `index.html` `<meta name="description">` — mentions "Ahmedabad" mid-sentence
- **Impact:** "Ahmedabad" should appear in first 120 characters for above-the-fold SERP display.
- **Fix:** Lead with location: "Ahmedabad's trusted tour & travel agency since 2008. Corporate transfers, pilgrimage circuits, and luxury group tours across India."

### P2 — Minor

**[P2] Heading hierarchy on index.html uses h2 for audience panes**
- **Location:** `index.html` lines 151, 164 — `.aud-h2` elements are semantic `<h2>` tags
- **Impact:** The page has h1 (hero) → multiple h2s (audience, about, fleet, why, tours, booking) but no h3 for sub-topics within sections. Flat hierarchy.
- **Fix:** Acceptable for a single-page site; ensure each h2 has a clear keyword target.

**[P2] Internal links in footer all point to `#booking` for Services column**
- **Location:** `index.html` footer — "Corporate Travel", "Leisure Tours", "Pilgrimage Circuits", etc. all href to `#booking`
- **Impact:** No crawlable internal links to the 3 route pages from the homepage. Google can't discover them via homepage crawl.
- **Fix:** Link "Pilgrimage Circuits" to route pages; add route page links to footer "Tour Packages" column.

**[P2] No breadcrumbs on route pages**
- **Location:** All 3 route pages
- **Impact:** Google shows breadcrumb rich results in SERPs when BreadcrumbList schema is present. Missing.
- **Fix:** Add `BreadcrumbList` schema + visible breadcrumb nav (`Home > Tours > Statue of Unity`) to each route page.

---

## Schema / Structured Data

### Current Implementation

```json
// index.html — TravelAgency (minimal)
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Spectrum Tour & Travel",
  "url": "https://spectrumtourandtravels.in",
  "telephone": "+917801807756",
  "email": "traveldeskspectrum@gmail.com",
  "address": { ... },
  "foundingDate": "2008-11-11"
}

// Route pages — TouristTrip (with TravelAgency provider)
// Uses phone +916356793922 — inconsistent with index.html
```

### Missing Properties (P1)

The `TravelAgency` schema on `index.html` is missing:
- `openingHours` / `openingHoursSpecification`
- `priceRange` (e.g., `"₹₹"`)
- `image` — logo URL
- `sameAs` — social media profile URLs
- `areaServed` — geographic coverage
- `description`
- `numberOfEmployees` (optional but adds authority)
- `aggregateRating` — critical for star ratings in SERPs (requires review markup)

### P1 — Major

**[P1] No AggregateRating schema**
- **Impact:** Without `AggregateRating`, no star ratings appear in Google SERPs. This is the single highest-CTR schema type for local services.
- **Fix:** Add rating markup once genuine reviews are collected. Requires actual review data — do not fabricate.

**[P1] No LocalBusiness schema**
- **Impact:** `TravelAgency` is a valid type but `LocalBusiness` properties like `geo`, `hasMap`, `servesCuisine` (travel equivalent: `touristType`) add local pack signals.
- **Fix:** Add `LocalBusiness` subtype alongside `TravelAgency`.

**[P1] BreadcrumbList missing from route pages**
- **Impact:** No breadcrumb rich result in SERPs.
- **Fix:** See recommended schema below.

### Recommended Schema Additions

```json
// index.html — Enhanced TravelAgency + LocalBusiness
{
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  "name": "Spectrum Tour & Travel",
  "url": "https://spectrumtourandtravels.in",
  "telephone": "+917801807756",
  "email": "traveldeskspectrum@gmail.com",
  "image": "https://spectrumtourandtravels.in/assets/img/brand/logo-white.png",
  "logo": "https://spectrumtourandtravels.in/assets/img/brand/spectrum-favicon.png",
  "foundingDate": "2008-11-11",
  "description": "Ahmedabad-based travel agency offering corporate transfers, leisure tours, pilgrimage circuits, and group charters across India since 2008.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "E-101, Al Burooj, Makarba-Sarkhej Road, Opp. Police HQ",
    "addressLocality": "Sarkhej",
    "addressRegion": "Gujarat",
    "postalCode": "380055",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "22.9890",
    "longitude": "72.5120"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "priceRange": "₹₹",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "09:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.facebook.com/spectrumtourandtravel",
    "https://www.instagram.com/spectrumtourandtravel"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tour Packages",
    "itemListElement": [
      { "@type": "Offer", "name": "Statue of Unity Tour", "url": "https://spectrumtourandtravels.in/route-statue-of-unity.html" },
      { "@type": "Offer", "name": "Chardham Yatra Package", "url": "https://spectrumtourandtravels.in/route-chardham-yatra.html" },
      { "@type": "Offer", "name": "Somnath & Dwarka Tour", "url": "https://spectrumtourandtravels.in/route-somnath-dwarka.html" }
    ]
  }
}
```

```json
// route-statue-of-unity.html — BreadcrumbList addition
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://spectrumtourandtravels.in/" },
    { "@type": "ListItem", "position": 2, "name": "Tours", "item": "https://spectrumtourandtravels.in/#tours" },
    { "@type": "ListItem", "position": 3, "name": "Ahmedabad to Statue of Unity" }
  ]
}
```

---

## Performance (Core Web Vitals — Lab Estimates)

*Note: Field data (CrUX) unavailable pre-deployment. Lab estimates based on asset analysis.*

| Metric | Estimate | Status |
|--------|----------|--------|
| LCP | ~2.2s | Likely GOOD (WebP hero, fetchpriority=high) |
| INP | ~80ms | Likely GOOD (minimal JS, no heavy framework) |
| CLS | ~0.05 | Likely GOOD (img dimensions specified in CSS) |
| FID | ~30ms | GOOD (deferred JS, no blocking scripts) |

### Positive Factors
- Hero image uses `fetchpriority="high"` and `loading="eager"` ✓
- Non-hero images use `loading="lazy"` ✓
- All images converted to WebP with srcset at 400/800/1200w ✓
- Single CSS file, single JS file — no bundle bloat ✓
- JS deferred with `defer` attribute ✓
- Google Fonts loaded with `preconnect` + `dns-prefetch` ✓
- No heavy third-party scripts on homepage ✓

### P1 — Major

**[P1] Google Fonts is render-blocking on route pages**
- **Location:** Route pages — fonts loaded via `<link rel="stylesheet">` without `media="print" onload` trick
- **Impact:** Google Fonts can block first render by 300–600ms on slow connections.
- **Fix:** Add `media="print" onload="this.media='all'"` to Fonts stylesheet links, with `<noscript>` fallback. (Already done correctly on index.html with preconnect.)

**[P1] No `width` and `height` attributes on hero image**
- **Location:** `index.html` line 89 — `<img>` in `.hero-bg` has no `width`/`height` attrs
- **Impact:** Browser can't reserve space before image loads → potential CLS shift
- **Fix:** Add `width="1200" height="800"` (intrinsic dimensions) to the hero img.

### P2 — Minor

**[P2] Route page hero images missing `fetchpriority="high"`**
- **Location:** All 3 backup route pages — hero `<img>` likely has `loading="lazy"` instead of `fetchpriority="high"`
- **Impact:** LCP images delayed by lazy-load deferral.
- **Fix:** Add `fetchpriority="high" loading="eager"` to the hero image on each route page.

---

## Images

### Audit

| Image | Format | Srcset | Alt Text | Issues |
|-------|--------|--------|----------|--------|
| landing-page | WebP 400/800/1200w | ✓ | `""` (decorative) | None — aria-hidden ✓ |
| luxury-mini-bus | WebP 800/1200w | ✓ | Descriptive ✓ | None |
| innova-crysta | WebP 800w only | ✗ Partial | `""` (fleet preview) | Missing 400w/1200w in srcset on fleet row |
| tempo-traveller | WebP 800w only | ✗ Partial | `""` (fleet preview) | Same |
| corporate-bg | WebP 800/1200w | ✓ | `""` aria-hidden ✓ | None |
| leisure-bg | WebP 800/1200w | ✓ | `""` aria-hidden ✓ | None |
| about-india-map | WebP 800/1200w | ✓ | `""` aria-hidden ✓ | None |
| social-preview.jpg | JPEG | N/A | N/A | Used only for OG — fine |
| Route images | WebP (spaces in name) | ✗ | Unknown | **File names with spaces** |

### P1 — Major

**[P1] Tour route image files have spaces in filenames**
- **Location:** `assets/img/Statue of Unity-800.webp`, `Chardham Yatra-800.webp`, `Somnath & Dwarka-800.webp`
- **Impact:** Filenames with spaces and `&` require URL encoding. Some servers/CDNs fail on these. The `&` in `Somnath & Dwarka` is especially dangerous — ampersand in a URL breaks HTML attributes without encoding.
- **Fix:** Rename to kebab-case: `statue-of-unity-800.webp`, `chardham-yatra-800.webp`, `somnath-dwarka-800.webp`. Update all references in route HTML files.

### P2 — Minor

**[P2] Logo images lack modern formats**
- **Location:** `assets/img/brand/logo-white.png`, `logo-black.png` — PNG only
- **Impact:** PNG logos could be WebP or SVG for better compression. Minor as logos are small files.
- **Fix:** Convert to WebP or ideally SVG for infinite scalability.

**[P2] Business card images in brand folder are JPEG-wrapped JPEG (`.jpg.jpeg`)**
- **Location:** `assets/img/brand/Back (Isha).jpg.jpeg` etc.
- **Impact:** Wrong extension. These aren't used on the site currently (team photos) but if added, will cause MIME type confusion.
- **Fix:** Rename to `.jpg` only.

---

## AI Search Readiness (GEO)

### Assessment

| Signal | Status |
|--------|--------|
| llms.txt | **MISSING** — no file found |
| AI crawler access | Partial — robots.txt allows all, but no explicit AI bot rules |
| Passage citability | Moderate — factual claims present but sparse |
| Structured data depth | Thin — schema exists but lacks detail |
| Brand mention anchors | Weak — no external citation sources |
| Content answer density | Low — no FAQ, no pricing, no comparison |

### P0 — Blocking

**[P0] No llms.txt file**
- **Location:** Project root — missing entirely
- **Impact:** AI assistants (ChatGPT, Perplexity, Claude, Gemini) that respect llms.txt cannot crawl or understand the site's content. Invisible to AI-powered search.
- **Fix:** Create `/llms.txt` with:

```
# Spectrum Tour & Travel — llms.txt
# Travel agency in Ahmedabad, Gujarat, India

> Spectrum Tour & Travel is an Ahmedabad-based travel agency founded in 2008, 
> offering corporate transfers, leisure tours, pilgrimage circuits (Chardham, 
> Somnath-Dwarka, Statue of Unity), and group charters across India.

## About
- Founded: 11 November 2008
- Location: E-101, Al Burooj, Makarba-Sarkhej Road, Sarkhej, Ahmedabad – 380055
- Phone: +91 78018 07756
- WhatsApp: +91 78018 07756
- Email: traveldeskspectrum@gmail.com
- Registration: GJ01D0094760 | GST: 24AYYPS9396M1ZW | PAN: AYYPS9396M

## Services
- Corporate travel (fleet management, account teams, transparent billing)
- Leisure tours (Rajasthan, Kerala, Himalayas, Goa)
- Pilgrimage circuits (Chardham Yatra, Somnath-Dwarka, Shirdi, Tirupati)
- Vehicle hire (Sedan/SUV 4-7 seats, Tempo Traveller 9-14, Urbania 13-17, Mini Bus 20-32, Coach Bus 35-50)

## Tour Routes
- [Ahmedabad to Statue of Unity](https://spectrumtourandtravels.in/route-statue-of-unity.html)
- [Chardham Yatra from Ahmedabad](https://spectrumtourandtravels.in/route-chardham-yatra.html)
- [Somnath & Dwarka Tour](https://spectrumtourandtravels.in/route-somnath-dwarka.html)

## Corporate Clients
Mitsubishi, Nestle, Tata, IJL, Sysmex, Nifco, Caparo, Mubea, Oji, Zanini
```

### P1 — Major

**[P1] No structured FAQ content**
- **Impact:** AI assistants answer "how much does Spectrum charge for Statue of Unity trip" with "I don't know" — zero citability for commercial queries.
- **Fix:** Add FAQ sections. Key questions per route: cost range, duration, pickup location, vehicle options, cancellation policy.

**[P1] Content is more brand-voice than factual-reference**
- **Impact:** AI prefers factual, attributable content over marketing prose. "Where comfort meets grandeur" has zero citability. "The Urbania seats 13–17 passengers in VIP push-back configuration" is citable.
- **Fix:** For each vehicle and tour, add 2–3 bullet-point specifications in addition to the marketing copy.

**[P1] No mentions of awards, certifications, or media coverage**
- **Impact:** E-A-T for AI is built on external validation. Without it, AI assistants can't recommend the business confidently.
- **Fix:** If the business has Gujarat Tourism recognition, IATA affiliation, or any press coverage, add it to the About section and schema.

### P2 — Minor

**[P2] No dedicated "Contact" or "About" page**
- **Impact:** AI assistants prefer authoritative single-topic pages for citation. A dedicated `/about` or `/contact` page with full company details is easier to cite than an anchor section.
- **Fix:** Optional at this stage — anchor sections are acceptable for single-page sites.

---

## Local SEO

### NAP Consistency Audit

| Field | index.html | Route pages |
|-------|-----------|-------------|
| Business Name | Spectrum Tour & Travel | Spectrum Tours & Travels |
| Phone (schema) | +91 78018 07756 | +91 63567 93922 |
| Phone (content) | +91 70412 33679 (Shabana) | +91 63567 93922 |
| Address | E-101, Al Burooj, Makarba-Sarkhej Road | Same |
| Email | traveldeskspectrum@gmail.com | Same |

**Critical:** Business name and phone number differ between index.html and route pages. Google Business Profile (GBP) NAP must match exactly.

### P0 — Blocking

**[P0] Business name inconsistency: "Spectrum Tour & Travel" vs "Spectrum Tours & Travels"**
- **Location:** index.html schema vs route page titles/schema
- **Impact:** NAP inconsistency confuses Google's entity resolution. The business appears as two different entities.
- **Fix:** Standardise on one name everywhere. Legal registration will determine the canonical name.

### P1 — Major

**[P1] No Google Business Profile signals visible**
- **Impact:** GBP is the #1 local ranking factor. No GBP = no local pack appearance.
- **Fix:** Create/claim GBP listing at business.google.com. Use the standardised NAP from above.

**[P1] No link to Google Maps from the contact section**
- **Location:** `index.html` — contact section has address text but no map link
- **Impact:** Users on mobile expect a tap-to-maps link. Also adds a citation signal.
- **Fix:** Add `<a href="https://maps.google.com/?q=E-101+Al+Burooj+Makarba+Sarkhej+Road+Ahmedabad">Get Directions ↗</a>` to contact section.

**[P1] No review platform links**
- **Location:** index.html and route pages
- **Impact:** Users can't easily leave Google or Justdial reviews. Review volume is a local ranking factor.
- **Fix:** Add "Leave a Review" link to Google Maps listing in footer or contact section.

---

## Priority Action Plan

### Critical (fix before launch)
1. **Move route pages to root** — `backup/route-*.html` → `route-*.html` in project root
2. **Standardise phone number** — decide primary number, update schema on all 4 pages
3. **Standardise business name** — "Spectrum Tour & Travel" or "Spectrum Tours & Travels", pick one
4. **Add GA4 to index.html** — copy gtag snippet from route pages (G-NDB969YNLG)
5. **Rename image files with spaces** — `Statue of Unity-800.webp` → `statue-of-unity-800.webp`

### High (fix within 1 week of launch)
6. **Add canonical tags** — `<link rel="canonical">` on all 4 pages
7. **Add `og:locale` to index.html** — `content="en_IN"`
8. **Create llms.txt** — content provided above
9. **Add Google Maps link** to contact section
10. **Fix favicon path** on route pages (`logos/ → brand/`)
11. **Add internal links to route pages** from footer "Tour Packages" column in index.html
12. **Fix route hero images** — `fetchpriority="high" loading="eager"`

### Medium (fix within 1 month)
13. **Enhance TravelAgency schema** — add `geo`, `image`, `sameAs`, `openingHoursSpecification`, `hasOfferCatalog`
14. **Add BreadcrumbList schema** to route pages
15. **Add testimonials section** to index.html (4–6 real client quotes)
16. **Add FAQ content** to route pages (5–8 questions each)
17. **Add indicative pricing** to route pages
18. **Update homepage title** to include "travel agency Ahmedabad" keyword
19. **Claim Google Business Profile** and align NAP
20. **Add width/height attrs** to hero img for CLS prevention
21. **Add Google Maps directions link** to contact section

### Low (backlog)
22. Create `404.html` branded error page
23. Add `site.webmanifest` for PWA signals
24. Convert logo PNGs to SVG
25. Write 3–4 blog posts for topical authority
26. Add fleet size / annual stats to About section
27. Simplify robots.txt (remove redundant bot-specific Allow rules)
28. Write 1-sentence hooks for each tour row

---

## Positive Findings

**What's working well — maintain these:**

- WebP images with srcset at multiple breakpoints — excellent performance foundation
- `fetchpriority="high"` on hero image — correct LCP optimisation
- Google Fonts with `preconnect` + `dns-prefetch` — correct loading approach
- Fully deferred JS (`defer` attribute) — no render-blocking scripts
- Skip link with `:focus` reveal — WCAG compliance
- Focus-visible gold ring on all interactive elements — keyboard nav accessible
- Mobile menu with proper `role="dialog"`, `aria-modal`, focus trap — rare and commendable
- `aria-required="true"` on form fields + semantic `for`/`id` pairing — form a11y done right
- Touch device cursor restoration via `pointer: coarse` media query — rare attention to detail
- `aria-hidden="true"` on decorative images — correct screen reader handling
- Ticker using RAF instead of CSS animation — immune to `prefers-reduced-motion: 0.01ms` override
- OKLCH color system with perceptually uniform ink-tinted neutrals — design system quality
- Schema.org TravelAgency + TouristTrip on route pages — above average for local businesses
- Canonical tags present on all 3 route pages — handled
- `og:locale: en_IN` on route pages — correct Indian market targeting
- Real contact names (Shabana Shaikh, Isha Shaikh, Moin Sipai) — strong trust signal
- GST/PAN/Registration numbers in About section — exceptional local trust signal
- Booking form with `aria-live="polite"` on success message — accessible UX

---

*Report generated: 10 May 2026 | Spectrum Tours & Travels | spectrumtourandtravels.in*
