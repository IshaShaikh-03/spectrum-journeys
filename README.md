<div align="center">

  <img src="https://img.shields.io/badge/Spectrum%20Tours-🚗-e8a838?style=for-the-badge&labelColor=111111" alt="Spectrum Tours & Travels" />

  # Spectrum Tours & Travels

  **A conversion-ready, mobile-first travel agency website — built to turn visitors into bookings.**

  <p align="center">
    <a href="https://www.spectrumtourandtravels.in">
      <img src="https://img.shields.io/badge/Live%20Site-spectrumtourandtravels.in-e8a838?style=flat-square&logo=google-chrome&logoColor=white&labelColor=111111" alt="Live Site" />
    </a>
    <a href="https://github.com/IshaShaikh-03/spectrum-journeys/commits/main">
      <img src="https://img.shields.io/github/last-commit/IshaShaikh-03/spectrum-journeys?style=flat-square&color=e8a838&labelColor=111111" alt="Last Commit" />
    </a>
    <img src="https://img.shields.io/badge/Version-v2.2.1-e8a838?style=flat-square&labelColor=111111" alt="Version" />
    <img src="https://img.shields.io/badge/Stack-Vanilla%20HTML%2FCSS%2FJS-e8a838?style=flat-square&labelColor=111111" alt="Vanilla Stack" />
  </p>

</div>

---

## ⚡ Overview

**Spectrum Tours & Travels** is a premium travel agency based in Ahmedabad, Gujarat — serving customers since 2010 with a fleet of Tempo Travellers, Innova SUVs, and Luxury Buses.

This website is their complete digital presence, live at **[spectrumtourandtravels.in](https://www.spectrumtourandtravels.in)**: a fast, beautiful, single-page website that showcases the fleet, services, and trust signals — and converts visitors into WhatsApp leads and bookings in under two clicks.

Built with **zero framework overhead** — pure Vanilla HTML, CSS, and JavaScript. No React, no build step, no bundler. Just fast, clean code deployed directly to Vercel.

---

## ✨ Features

- **🎯 Conversion-Optimised UX** — Sticky mobile CTA bar (Call Now + WhatsApp), one-click booking modal, and prominent inline quotes.
- **🚗 Premium Fleet Showcase** — Browse Innova SUVs, Sedans, Tempo Travellers, and Luxury Mini Buses with live price, capacity, and feature chips.
- **✨ Scroll-Reveal Animations** — Every section fades and slides in using a custom `IntersectionObserver` — zero libraries.
- **📱 Fully Responsive** — Complete mobile layout overhaul. Tested from 320px to 4K. Isolated in `mobile.css`, desktop untouched.
- **🌙 Premium Dark Sections** — Stats ribbon, "How it Works" journey steps, CTA strip, and Testimonial cards all use deep charcoal surfaces.
- **🔍 SEO Ready** — Full meta tag suite, Open Graph, Twitter Card, JSON-LD `TravelAgency` structured data for Google rich results.
- **⚡ Zero Build Step** — Open `index.html`, done. Deployed to Vercel as a static site.
- **♿ Accessible** — Semantic HTML5, ARIA labels, focus-visible outlines, skip-to-content link.

---

## 🗺️ Live Sections

| Section | What it does |
|---|---|
| **Hero** | Full-viewport dark hero with left-aligned headline, animated badge, and stacked CTAs |
| **Trust Marquee** | Infinite scrolling strip — Verified Drivers, Clean & Sanitized, No Hidden Costs |
| **Stats Ribbon** | 4 key stats on a dark background — 15+ years, 50+ vehicles, 10K+ clients, 24/7 |
| **Fleet** | Vehicle cards with image, capacity chips, price badges, and quote CTA |
| **Routes & Packages** | Popular route cards with pricing and itinerary teasers |
| **Services** | 6 service cards — Airport, Outstation, Pilgrimage, Corporate, Wedding, Sightseeing |
| **How it Works** | 3-step dark journey grid with numbered badges and icon circles |
| **Testimonials** | Dark card grid with star ratings, quotes, and author avatars |
| **CTA Strip** | Two-column dark/amber strip with large phone number and free quote action |
| **Contact** | Bento-style layout — 3 info cards stacked left + full contact form right |
| **Footer** | Sitemap, social links, contact details, copyright |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | Semantic HTML5 |
| **Styling** | Vanilla CSS with CSS Custom Properties (design tokens) |
| **Mobile** | Dedicated `mobile.css` — media queries isolated from desktop styles |
| **Interactivity** | Vanilla JavaScript (ES6+) — no frameworks |
| **Icons** | [Font Awesome 6](https://fontawesome.com/) (CDN) |
| **Typography** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (display) + [Inter](https://fonts.google.com/specimen/Inter) (body) |
| **SEO** | Schema.org `TravelAgency` JSON-LD + full Open Graph suite |
| **Hosting** | [Vercel](https://vercel.com/) — static deployment, zero config |

---

## 🚀 Getting Started

No build step required. Just serve the files.

### Option 1 — Open directly

```bash
# Clone the repo
git clone https://github.com/IshaShaikh-03/spectrum-journeys.git
cd spectrum-journeys

# Open in browser
start index.html   # Windows
open index.html    # macOS
```

### Option 2 — Local dev server (recommended for live reload)

```bash
# Using Python
python -m http.server 8080

# Using Node (npx)
npx serve .
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📂 Project Structure

```text
spectrum-journeys/
├── index.html                  # Full single-page markup + JSON-LD SEO
├── styles.css                  # Design system — tokens, layout, all desktop styles
├── mobile.css                  # Mobile overrides only (≤768px, ≤480px)
├── script.js                   # Interactivity — modal, nav, scroll reveal, form
├── route-chardham-yatra.html   # Route detail page: Chardham Yatra
├── route-statue-of-unity.html  # Route detail page: Statue of Unity
└── README.md
```

> **Architecture note:** All responsive styles live exclusively in `mobile.css` and are never mixed into `styles.css`. Desktop styles in `styles.css` are never touched by mobile changes.

---

## 🎨 Design System

All design tokens are defined as CSS custom properties at the top of `styles.css`:

```css
/* Brand */
--brand-primary:   #E8A838;   /* Warm Amber Gold */
--brand-secondary: #D4922A;   /* Deeper amber for hover states */

/* Surfaces */
--surface-light:   #F5F0E8;   /* Warm off-white page background */
--surface-card:    #FFFFFF;   /* Light section cards */
--surface-mid:     #1F1F1F;   /* Dark charcoal — testimonials, stats, how-it-works */
--surface-dark:    #111111;   /* Deep black — hero, CTA strip, footer */

/* Typography */
--text-primary:    #111111;   /* Body text on light surfaces */
--text-inverse:    #FFFFFF;   /* Text on dark surfaces */
--text-muted:      #888888;   /* Subdued labels */
--text-inverse-muted: #A3A3A3;
```

---

## 📋 Changelog

### v2.2.1 — 2026-04-22
- fix: revert testimonial cards to dark charcoal background (`--surface-mid`)

### v2.2.0 — 2026-04-22
- feat: complete mobile responsive overhaul — all sections now stack gracefully on ≤768px
- fix: eliminated horizontal scrolling on mobile (overflow-x hidden)
- fix: nav hamburger menu properly isolated, desktop "Get a Quote" hidden on mobile
- fix: WhatsApp float hidden on mobile (sticky CTA bar takes priority)
- fix: contact bento box collapses to single column on mobile
- fix: stats grid goes 2-col on tablet, 1-col on small phones
- fix: footer columns stack with proper spacing and bottom padding for sticky bar
- fix: removed conflicting 768px block from `styles.css` — all mobile rules in `mobile.css`

### v2.1.0 — 2026-04-22
- feat: premium "Soft Premium Light" design system — Warm Amber-Gold palette, CSS tokens
- feat: hero section — cinematic dark background, animated badge, left-aligned copy
- feat: trust marquee — infinite scroll animation strip
- feat: stats ribbon — dark surface with large numerals
- feat: fleet cards — image, capacity chips, price badges
- feat: route/packages section with detailed cards
- feat: services grid — 6 service cards with icon circles
- feat: "How it Works" — dark 3-step journey with numbered badges
- feat: testimonials — dark card grid with star ratings and author avatars
- feat: CTA split strip — dark/amber two-column layout
- feat: contact bento box — info cards + inline form
- feat: sticky mobile CTA bar — Call Now + WhatsApp
- feat: booking modal — full quote capture form
- fix: hero subtitle left-aligned via targeted CSS rule
- fix: marquee strip no longer floats as plain paragraph
- fix: footer visible, footer columns responsive

### v2.0.0 — 2026-04-21
- refactor: full migration from React 19 + Tailwind v4 + Vite to Vanilla HTML/CSS/JS
- reason: eliminated build complexity, layout regressions from Tailwind v4 migration, and deployment friction

---

## 📜 License

This project was designed and developed for **Spectrum Tours & Travels, Ahmedabad**.  
All rights reserved © 2026.

---

<div align="center">
  Designed & developed by <b><a href="https://github.com/TheAlgo7">The Algothrim</a></b>.
</div>