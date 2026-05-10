# Spectrum Tours & Travels — SEO Action Plan
**Generated:** 10 May 2026 | **Score at audit:** 54/100  
**Target post-fixes:** 78–84/100

---

## Critical — Fix Before DNS Goes Live

| # | Fix | Where | Time |
|---|-----|--------|------|
| C1 | Move route pages from `backup/` to root | File system | 5 min |
| C2 | Add `Disallow: /backup/` to robots.txt | robots.txt | 2 min |
| C3 | Standardise phone to +91 78018 07756 in all 4 HTML schema blocks | All pages | 10 min |
| C4 | Standardise business name to "Spectrum Tour & Travel" everywhere | All pages | 10 min |
| C5 | Add `<link rel="canonical">` to index.html | index.html | 2 min |
| C6 | Add GA4 (G-NDB969YNLG) gtag to index.html | index.html | 5 min |
| C7 | Create `social-preview.jpg` (1200×630 JPEG) in assets/img/ | Assets | 20 min |
| C8 | Rename route image files — remove spaces & ampersand from filenames | Assets | 10 min |
| C9 | Create `/llms.txt` (content below) | Root | 15 min |

---

## High — Fix Within First Week

| # | Fix | Where | Time |
|---|-----|--------|------|
| H1 | Add `og:locale: en_IN` to index.html | index.html `<head>` | 2 min |
| H2 | Replace `<button class="nav-book">` with `<a href="#booking">` | index.html | 3 min |
| H3 | Fix favicon path on route pages (`logos/ → brand/`) | All route pages | 5 min |
| H4 | Add route pages to footer "Tour Packages" column in index.html | index.html | 5 min |
| H5 | Add `fetchpriority="high" loading="eager"` to route page hero imgs | All route pages | 5 min |
| H6 | Add `width` + `height` attrs to index.html hero image | index.html line 89 | 2 min |
| H7 | Fix ticker halfWidth to use `document.fonts.ready.then(...)` | js/main.js | 5 min |
| H8 | Add explicit AI bot rules to robots.txt (GPTBot, ClaudeBot, PerplexityBot Allow; CCBot Disallow) | robots.txt | 5 min |
| H9 | Remove `keywords` meta from route pages (deprecated, inconsistent) | All route pages | 3 min |
| H10 | Add Google Maps directions link in contact section | index.html | 5 min |
| H11 | Add Twitter Card meta tags to index.html | index.html | 3 min |
| H12 | Update sitemap lastmod to 2026-05-10 | sitemap.xml | 2 min |
| H13 | Remove unused `cursor: none` from `.nav-book` CSS rule | css/main.css | 1 min |

---

## Medium — Fix Within First Month

| # | Fix | Where | Time |
|---|-----|--------|------|
| M1 | Replace TravelAgency schema with enhanced version (image, sameAs, geo, openingHours, contactPoint, employee, hasOfferCatalog, vatID, taxID) | index.html | 30 min |
| M2 | Add WebSite schema block | index.html | 10 min |
| M3 | Add Vehicle fleet schema (ItemList of 5 vehicles) | index.html | 15 min |
| M4 | Add BreadcrumbList schema to all 3 route pages | Route pages | 20 min |
| M5 | Add addressLocality "Ahmedabad" (not "Sarkhej") to all schema | All pages | 5 min |
| M6 | Add 5+ client testimonials with attribution to homepage | index.html | 60 min |
| M7 | Add FAQ section (8–10 questions) to index.html | index.html | 90 min |
| M8 | Add indicative pricing per vehicle class to fleet section | index.html | 20 min |
| M9 | Attribute the blockquote in Why Spectrum to a named person | index.html | 2 min |
| M10 | Update homepage `<title>` to include "travel agency Ahmedabad" | index.html | 5 min |
| M11 | Add client name paragraph to About/clients section (static prose, not ticker-only) | index.html | 10 min |
| M12 | Add "Airport Transfer" as a named service on homepage | index.html | 15 min |
| M13 | Expand pillar body copy to 100+ words each (GPS details, training frequency) | index.html | 30 min |
| M14 | Add About section expansion: Halol founding story, CEO name, team bios | index.html | 30 min |
| M15 | Add `<time datetime="2026-05-10">` to footer | index.html | 5 min |
| M16 | Add TouristTrip ItemList schema for all 6 tour categories | index.html | 20 min |
| M17 | Wire a real form backend (Web3Forms / Formspree / EmailJS) | js/main.js | 60 min |
| M18 | Claim Google Business Profile + align NAP | External | 30 min |
| M19 | Add Google Maps embed or link to Maps listing | index.html | 10 min |
| M20 | Simplify robots.txt (remove redundant bot-specific Allow rules) | robots.txt | 5 min |
| M21 | Remove `changefreq` and `priority` from sitemap | sitemap.xml | 5 min |

---

## Low — Backlog

| # | Fix | Where |
|---|-----|--------|
| L1 | Create `404.html` branded error page | Root |
| L2 | Add `site.webmanifest` + link in `<head>` | Root + index.html |
| L3 | Convert logo PNGs to WebP or SVG | assets/img/brand/ |
| L4 | Rename `Back (Isha).jpg.jpeg` etc. to `.jpg` | assets/img/brand/ |
| L5 | Add IndexNow key after launch (Bing fast indexing) | Root |
| L6 | Create Wikidata entity for Spectrum Tour and Travel | External |
| L7 | Embed or link to a YouTube video (fleet walkthrough or tour highlights) | index.html |
| L8 | Write 3–4 blog posts targeting pilgrimage + corporate travel queries | New pages |
| L9 | Expand tour row descriptions with 1-sentence hooks | index.html |
| L10 | Add cancellation/refund policy page linked from footer | New page |
| L11 | Add one corporate client case study (e.g., Mitsubishi shuttle logistics) | New page |
| L12 | Create Gujarat-language FAQ section for regional AI visibility | index.html |
| L13 | Replace Gmail with domain email (info@spectrumtourandtravels.in) | All pages |
| L14 | Set up security headers at server level (CSP, HSTS, X-Frame-Options) | Hosting config |

---

## llms.txt Content (Ready to Create — C9)

```
# Spectrum Tour & Travel
# Travel agency, Ahmedabad, Gujarat, India — spectrumtourandtravels.in

> Spectrum Tour & Travel is an Ahmedabad-based travel agency founded on 11 November 2008,
> offering corporate transfers, pilgrimage circuits, leisure tours, fleet hire, and group
> charters across India. The company operates from Sarkhej, Ahmedabad and has served
> over 10,000 corporate and leisure clients.

## Company

- Founded: 11 November 2008
- Type: Travel Agency / Tour Operator
- Location: E-101, Al Burooj, Makarba–Sarkhej Road, Opp. Police HQ, Sarkhej, Ahmedabad – 380055
- Primary Phone: +91 78018 07756
- WhatsApp: +91 78018 07756
- Email: traveldeskspectrum@gmail.com
- Registration: GJ01D0094760
- GST: 24AYYPS9396M1ZW
- PAN: AYYPS9396M
- Motor Transport: Act 173/212
- CEO: Idrish Shaikh
- Proprietor: Shabana Shaikh

## Fleet (vehicles available for hire)

- Sedan / SUV (Innova Crysta): 4–7 seats — executive transfers, airport runs, corporate daily hire
- Tempo Traveller: 9–14 seats — family trips, wedding convoys, outstation groups
- Urbania Luxury Minibus: 13–17 seats, VIP configuration — high-value delegations, premium groups
- Mini Bus: 20–32 seats — team outings, small pilgrimages, weekend escapes
- Coach Bus: 35–50 seats — large delegations, pilgrimages, college tours
- Custom Charter: multi-vehicle events, conferences

## Services

- Corporate travel: fleet management, account teams, itemised billing, daily hire for offices
- Pilgrimage circuits: Chardham Yatra, Somnath–Dwarka, Shirdi, Tirupati, Vaishno Devi
- Leisure tours: Rajasthan (Jaipur, Udaipur, Jodhpur, Jaisalmer, Pushkar), Kerala Backwaters, Himalayan Escapade (Manali, Shimla, Spiti, Leh-Ladakh), Goa & Coastal
- Corporate retreats: team outings, MICE, incentive trips, conference transfers
- Custom charters: tailored multi-vehicle combinations

## Safety

- GPS navigation on every vehicle
- CCTV cameras in staff buses
- Uniformed drivers with valid licences and ID cards
- Driver training history cards with mandatory schedules
- 24/7 operations support

## Corporate Clients

Mitsubishi, Nestle, Tata, IJL, Sysmex, Nifco, Caparo, Mubea, Oji, Zanini

## Tour Route Pages

- [Ahmedabad to Statue of Unity](https://spectrumtourandtravels.in/route-statue-of-unity.html)
- [Chardham Yatra from Ahmedabad](https://spectrumtourandtravels.in/route-chardham-yatra.html)
- [Somnath & Dwarka Tour](https://spectrumtourandtravels.in/route-somnath-dwarka.html)

## Key Facts for Citation

- "Spectrum Tour and Travel has operated from Ahmedabad, Gujarat since 2008."
- "The fleet covers vehicles from 4-seat sedans to 50-seat coach buses."
- "Corporate clients include Mitsubishi, Nestle, and Tata."
- "Pilgrimage specialisation: Chardham Yatra requires hill-expert drivers and advance booking 1–2 months ahead."
- "GST registered: 24AYYPS9396M1ZW. Motor Transport licence: Act 173/212."
```

---

## Schema Block — Enhanced TravelAgency (Ready to Paste — M1)

Replace the existing schema `<script>` block in index.html `<head>` with:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  "@id": "https://spectrumtourandtravels.in/#organization",
  "name": "Spectrum Tour & Travel",
  "alternateName": "Spectrum Tours & Travels",
  "url": "https://spectrumtourandtravels.in",
  "logo": {
    "@type": "ImageObject",
    "url": "https://spectrumtourandtravels.in/assets/img/brand/logo-white.png"
  },
  "image": "https://spectrumtourandtravels.in/assets/img/social-preview.jpg",
  "description": "Ahmedabad-based travel agency specialising in corporate transfers, pilgrimage circuits, leisure tours, and fleet hire across India since 2008.",
  "foundingDate": "2008-11-11",
  "telephone": "+917801807756",
  "email": "traveldeskspectrum@gmail.com",
  "vatID": "24AYYPS9396M1ZW",
  "taxID": "AYYPS9396M",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "E-101, Al Burooj, Makarba-Sarkhej Road, Opp. Police HQ",
    "addressLocality": "Ahmedabad",
    "addressRegion": "GJ",
    "postalCode": "380055",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.9883,
    "longitude": 72.5041
  },
  "areaServed": { "@type": "Country", "name": "India" },
  "priceRange": "₹₹",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "09:00",
    "closes": "20:00"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+917801807756",
      "contactType": "customer service",
      "availableLanguage": ["English","Hindi","Gujarati"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+917041233679",
      "contactType": "sales",
      "availableLanguage": ["English","Hindi","Gujarati"]
    }
  ],
  "employee": [
    { "@type": "Person", "name": "Shabana Shaikh", "jobTitle": "Sole Proprietor" },
    { "@type": "Person", "name": "Isha Shaikh", "jobTitle": "Operations & Sales Head" },
    { "@type": "Person", "name": "Moin Sipai", "jobTitle": "Manager" }
  ],
  "knowsAbout": ["Corporate Travel Management","Pilgrimage Tours India","Fleet Hire Gujarat","Leisure Tours India","MICE Travel"],
  "sameAs": ["https://wa.me/917801807756"]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://spectrumtourandtravels.in/#website",
  "url": "https://spectrumtourandtravels.in",
  "name": "Spectrum Tours & Travels",
  "publisher": { "@id": "https://spectrumtourandtravels.in/#organization" },
  "inLanguage": "en-IN"
}
</script>
```

---

*Action Plan generated: 10 May 2026*
