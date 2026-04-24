# spectrum audit — internal fix tracker
# score: 20/20 ALL PAGES — COMPLETE
# format: [x] = done, [ ] = pending, [~] = partial

---

## META
- stack: vanilla html/css/js
- fonts: Jost (headings) + Karla (body)
- pages: index.html, route-statue-of-unity.html, route-chardham-yatra.html, route-somnath-dwarka.html (NEW)
- css: styles.css, mobile.css
- js: script.js

---

## P0 — BLOCKING

- [x] `gray-section` class used on 4 sections but NEVER DEFINED in styles.css
- [x] `var(--surface-off)` undefined — used in `.itinerary-card` background → cards render transparent (route pages) → fixed to `var(--surface-card)`

---

## P1 — MAJOR / WCAG AA

- [x] form labels have no `for` attr + inputs have no `id` → screen readers blind
- [x] "Your Details" label covers TWO inputs in booking modal → split into two labelled groups
- [x] mobile menu is a `<div>` not `<button>` → not keyboard focusable, no aria-expanded
- [x] booking modal: no `role="dialog"`, no `aria-modal`, no `aria-labelledby`, no focus trap
- [x] skip link uses `left:-9999px` with no `:focus` reveal → invisible to keyboard users
- [x] icon-only links: social links + whatsapp float + modal close = no aria-label
- [x] no `loading="lazy"` on any img; hero missing `fetchpriority="high"`
- [x] fonts: replace DM Sans + Syne → now Jost + Karla
- [x] OG image URLs contain literal spaces and `&` — social crawlers fail to load preview images (all route pages) → URL-encoded

---

## P2 — MINOR

- [x] `--brand-500` and `--brand-300` referenced inline in HTML but not defined in :root
- [x] `.stagger-5` class used but not defined in styles.css
- [x] google fonts loaded as css `@import` → render-blocking → preconnect + `<link>`
- [x] fontawesome full CDN library ~80kb for ~15 icons used → replaced with icons.css (25 inline SVG icons, ~9kb, no CDN)
- [x] scroll parallax handler writes transform without requestAnimationFrame
- [x] booking modal date+time grid hardcoded inline style → `.booking-datetime-grid` class
- [x] `--text-muted` #6B6B6B on cream ≈ 4.4:1 (below WCAG AA) → raised to #555555
- [x] `#10b981` hardcoded in JS success state → replaced with `.btn-success` CSS class
- [x] all 5 testimonials 5-stars → looks fake → cards 2+5 now 4 stars
- [x] Chardham sidebar inline styles (font-size, color, margin on `<p>` and bullet icons) → extracted to CSS classes

---

## P3 — POLISH

- [x] footer logo html missing `<span>` for amber accent
- [x] no `prefers-reduced-motion` media query → added to styles.css + JS guard
- [x] `--ease-spring` → replaced with `--ease-out` cubic-bezier(0.25,1,0.5,1)
- [x] 5 testimonials in 3-col grid → orphaned row → fixed with 6-col grid span-3 for last 2
- [x] `.btn-dark` class referenced but not defined in styles.css
- [x] `.hero--route { min-height: 55vh }` → `55svh` for mobile chrome awareness

---

## RE-AUDIT REGRESSIONS & NEW ISSUES (post-11/20 index.html)

- [x] `.fade-up` still references undefined `--ease-spring` → `var(--ease-out)`
- [x] footer credit `â¤ï¸` (encoding corruption) → "designed by the algothrim"
- [x] `.btn-dark` redundant inline style override → removed
- [x] `.text-gradient` orphaned on 7 headings — banned anti-pattern → removed
- [x] `.hero-bg img` DOM query inside RAF callback → cached outside scroll handler
- [x] contact grid missing 769–1024px tablet breakpoint → added to mobile.css
- [x] section images: Unsplash URLs → local `/assets/img/` files
- [x] diff-item mobile layout improved
- [x] scrollbar unstyled → styled to amber/dark theme
- [x] Trusted By: placeholder SVGs → real client text names
- [x] animations too harsh → easing fixed, fade-up tuned
- [x] fonts: Urbanist → Jost (wider premium geometric, not in reflex list)

---

## ROUTE PAGE REBUILD (new — all 3 pages)

- [x] missing Google Fonts on route pages → Jost + Karla added
- [x] old favicon `/favicon.svg` → `assets/img/logos/S-Logo Favicon.png`
- [x] old `<i>` + text logo in header → image logo with `.logo-img` class
- [x] mobile menu `<div>` → `<button>` with aria-expanded, aria-label, aria-controls
- [x] nav missing `id` for aria-controls → `id="main-nav"` added
- [x] no skip link → `<a href="#main-content" class="skip-link">` added
- [x] no `<main>` landmark → `<main id="main-content">` added
- [x] hero: `<div class="hero-bg"></div>` empty → real `<img>` with local asset + fetchpriority
- [x] `class="text-gradient"` on h1 span — BANNED → removed, using `.accent-text`
- [x] `border-left: 4px solid var(--brand-500)` on itinerary cards — BANNED → replaced with full-border `.itinerary-card`
- [x] undefined classes: `relative z-10`, `hero-cta`, `btn-lg`, `btn-outline` → all removed
- [x] `color: var(--text-main)` undefined token → using `var(--text-secondary)`
- [x] `color: #666` hardcoded → using tokens
- [x] fake phone `+91 98765 12345` (4+ instances) → `+91 63567 93922`
- [x] fake email `info@spectrumtourandtravels.in` → `traveldeskspectrum@gmail.com`
- [x] fake address `Bodakdev, Ahmedabad` → `E-101, Al Burooj, Makarba–Sarkhej Road, Sarkhej, Ahmedabad – 380055`
- [x] footer text-only logo `Spectrum` → full logo image with `.footer-logo-img`
- [x] footer social links: no aria-label → all aria-labels added
- [x] footer icons: no aria-hidden → aria-hidden="true" on all decorative icons
- [x] footer credit `Designed with ❤️...` → "designed by the algothrim"
- [x] booking modal missing from route pages → full modal HTML included on each page
- [x] Schema.org: added TouristTrip structured data on all route pages
- [x] `route-somnath-dwarka.html` did not exist → created from scratch
- [x] Somnath route card on index.html linked to `#booking` → now links to `route-somnath-dwarka.html`
- [x] footer "Tour Packages" column added on all route pages linking all 3 routes

---

## ANTI-PATTERN LOG (do NOT implement these patterns)
- gradient text via background-clip:text → BANNED
- border-left/right > 1px as accent stripe → BANNED
- glassmorphism decoratively → overused
- spring/bounce easing → dated
- icon circle above every heading → AI slop
- hero metric grid (4 big numbers) → AI slop template
- identical card grids repeated 4x → AI slop
- all-5-star testimonials → breaks trust
- DM Sans + Syne → both in reflex reject list
- Urbanist → too simple, rejected by client
- Jost → APPROVED, currently in use

---

## FIX LOG
- gray-section defined → cream sections now visually distinct
- all form labels wired to inputs via for/id
- booking modal split "Your Details" label into name + phone
- mobile menu converted to <button> with aria-expanded/controls
- modal role="dialog" + aria-modal + aria-labelledby + focus trap added
- skip link :focus reveal added
- all icon-only elements get aria-label or aria-hidden
- lazy loading on all non-hero images
- brand-300/500 defined in :root
- stagger-5 defined
- @import → preconnect + <link> in <head>
- scroll RAF with pending-flag pattern
- booking datetime inline style → .booking-datetime-grid class
- text-muted contrast raised #6B6B6B → #555555
- success state JS color → .btn-success CSS class
- testimonials: 2 cards dropped to 4-star; all get aria-label
- footer-logo span added for amber accent
- prefers-reduced-motion CSS + JS guard added
- --ease-spring → --ease-out cubic-bezier(0.25,1,0.5,1)
- testimonial 6-col grid fix (last 2 cards span 3)
- .btn-dark defined in styles.css
- .fade-up --ease-spring reference fixed → var(--ease-out)
- btn-dark inline style removed
- text-gradient class removed from all headings
- hero-bg img DOM query cached outside RAF
- all 6 section images replaced with local /assets/img/ files
- diff-item mobile layout improved
- scrollbar styled to amber/dark theme
- Trusted By: SVG placeholders replaced with client name text spans
- footer credit: "designed by the algothrim"
- fonts: Jost + Karla (premium geometric pairing, both non-banned)
- route pages: complete rebuild (see ROUTE PAGE REBUILD section above)
- var(--surface-off) → var(--surface-card) in .itinerary-card
- OG image URLs URL-encoded on all route pages
- Chardham sidebar inline styles → CSS classes
- hero--route min-height 55vh → 55svh
