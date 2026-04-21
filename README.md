<div align="center">

  <img src="https://img.shields.io/badge/Spectrum%20Tours-🚗-f97316?style=for-the-badge&labelColor=0f172a" alt="Spectrum Tours & Travels" />

  # Spectrum Tours & Travels

  **A conversion-ready, mobile-first travel agency website — built to turn visitors into bookings.**

  <p align="center">
    <a href="https://www.spectrumtourandtravels.in">
      <img src="https://img.shields.io/badge/Live%20Site-spectrumtourandtravels.in-f97316?style=flat-square&logo=google-chrome&logoColor=white&labelColor=0f172a" alt="Live Site" />
    </a>
    <a href="https://github.com/IshaShaikh-03/spectrum-journeys/commits/main">
      <img src="https://img.shields.io/github/last-commit/IshaShaikh-03/spectrum-journeys?style=flat-square&color=f97316&labelColor=0f172a" alt="Last Commit" />
    </a>
    <a href="https://github.com/IshaShaikh-03/spectrum-journeys">
      <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white&labelColor=0f172a" alt="React 19" />
    </a>
    <a href="https://github.com/IshaShaikh-03/spectrum-journeys">
      <img src="https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0f172a" alt="Tailwind CSS v4" />
    </a>
    <a href="https://github.com/IshaShaikh-03/spectrum-journeys">
      <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript&logoColor=white&labelColor=0f172a" alt="TypeScript" />
    </a>
    <a href="https://github.com/IshaShaikh-03/spectrum-journeys">
      <img src="https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite&logoColor=white&labelColor=0f172a" alt="Vite 7" />
    </a>
  </p>

</div>

---

## ⚡ Overview

**Spectrum Tours & Travels** is a premium travel agency based in Ahmedabad, Gujarat — serving customers since 2010 with a fleet of Tempo Travellers, Innova SUVs, and Luxury Buses.

This website is their complete digital presence, live at **[spectrumtourandtravels.in](https://www.spectrumtourandtravels.in)**: a fast, beautiful, single-page application that showcases the fleet, services, and trust signals — and converts visitors into WhatsApp leads and bookings in under two clicks.

Built from scratch with **React 19**, **Tailwind CSS v4**, and **TypeScript** — zero dependencies for the UI layer, every animation hand-crafted in vanilla CSS.

---

## ✨ Features

- **🎯 Conversion-Optimised UX** — Prominent CTAs, one-click WhatsApp booking, and a guided booking modal that captures lead data instantly.
- **🚗 Interactive Fleet Selector** — Browse Tempo Travellers, SUVs, and Luxury Buses with live price, capacity, and feature previews.
- **✨ Scroll-Reveal Animations** — Every section fades and slides in using a custom `IntersectionObserver` hook — zero libraries.
- **📱 Fully Responsive** — Mobile-first layout using CSS Grid and Flexbox, tested from 320px to 4K.
- **🌙 Premium Dark Sections** — The "Why Us" section, navbar, and footer use a deep `#050d1a` surface with glassmorphic cards.
- **🔍 SEO Ready** — Full meta tag suite, Open Graph, Twitter Card, JSON-LD `TravelAgency` structured data for Google rich results.
- **⚡ Blazing Fast** — Vite 7 + single-file build output. No runtime CSS-in-JS, no style recalculation overhead.
- **♿ Accessible** — Semantic HTML5, ARIA labels, focus-visible ring, skip-to-content implicit structure.

---

## 🗺️ Live Sections

| Section | What it does |
|---|---|
| **Hero** | Full-viewport cinematic hero with animated glass card showing fleet preview |
| **Trust Marquee** | Infinite scrolling trust strip — GPS, Insurance, 24/7 support |
| **Fleet** | Interactive vehicle selector with spec sheet and booking trigger |
| **Services** | 6 service cards — Airport, Outstation, Pilgrimage, Corporate, Wedding, Hills |
| **Why Us** | Dark-mode feature grid with ambient glow effects |
| **Testimonials** | 4-column review carousel with star ratings |
| **CTA** | Full-bleed orange gradient conversion section |
| **Contact** | Dual-column — contact details + inline contact form |
| **Footer** | Sitemap, social links, popular routes, WhatsApp CTA |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript 5.9](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 7](https://vite.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first config, no `tailwind.config.js`) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animations** | Vanilla CSS keyframes + custom `IntersectionObserver` hook |
| **Typography** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (display) + [Inter](https://fonts.google.com/specimen/Inter) (body) |
| **SEO** | Schema.org `TravelAgency` JSON-LD + full Open Graph suite |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IshaShaikh-03/spectrum-journeys.git
   cd spectrum-journeys
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```
   Output goes to `dist/` as a fully self-contained single HTML file (via `vite-plugin-singlefile`).

---

## 📂 Project Structure

```text
spectrum-journeys/
├── public/
│   └── images/              # Vehicle photos, hero background, OG image
├── src/
│   ├── App.tsx              # Entire application — components, data, and layout
│   ├── index.css            # Design system — tokens, keyframes, utilities
│   └── main.tsx             # Entry point
├── index.html               # SEO meta tags, JSON-LD, font preloads
├── vite.config.ts           # Vite + Tailwind plugin + singlefile output
├── tsconfig.json            # TypeScript config
└── package.json
```

> **Note:** All UI components, data arrays, and page sections live in `src/App.tsx` — intentionally co-located for a single-file deployment workflow. No routing required.

---

## 🎨 Design System

All design tokens are defined as CSS custom properties in `src/index.css`:

```css
--brand-500: #f97316;          /* Primary orange */
--surface-950: #050d1a;        /* Deep dark background */
--shadow-brand: 0 8px 32px -4px rgba(249,115,22,0.35);
--shadow-card:  0 4px 24px -4px rgba(0,0,0,0.10);
--transition-base: 0.3s cubic-bezier(.16,1,.3,1);
```

Used directly in Tailwind v4 via the `(--variable-name)` shorthand:
```html
<div class="bg-(--surface-950) shadow-(--shadow-brand)">...</div>
```

---

## 📜 License

This project was designed and developed for **Spectrum Tours & Travels, Ahmedabad**.  
All rights reserved © 2025.

---

<div align="center">
  Designed & developed by <b><a href="https://github.com/TheAlgo7">The Algothrim</a></b>.
</div>