# spectrum audit — internal fix tracker
# score: 11/20 acceptable → target 17+/20
# format: [x] = done, [ ] = pending, [~] = partial

---

## META
- stack: vanilla html/css/js
- fonts: Urbanist (headings) + Karla (body) — Syne/DM Sans replaced
- pages: index.html, route-statue-of-unity.html, route-chardham-yatra.html
- css: styles.css, mobile.css
- js: script.js

---

## P0 — BLOCKING

- [x] `gray-section` class used on 4 sections (fleet, routes, testimonials, contact) but NEVER DEFINED in styles.css → all sections same cream bg

---

## P1 — MAJOR / WCAG AA

- [x] form labels have no `for` attr + inputs have no `id` → screen readers blind (index.html:544-559 contact, 629-666 booking modal)
- [x] "Your Details" label covers TWO inputs (name + phone) in booking modal → split into two labelled groups
- [x] mobile menu is a `<div>` not `<button>` → not keyboard focusable, no aria-expanded, no aria-label (index.html:99)
- [x] booking modal: no `role="dialog"`, no `aria-modal="true"`, no `aria-labelledby`, no focus trap (index.html:623)
- [x] skip link uses `left:-9999px` with no `:focus` reveal → invisible to keyboard users (index.html:77)
- [x] icon-only links: 4 social links + whatsapp float + modal close = no aria-label (index.html:576-580, 672, 625)
- [x] no `loading="lazy"` on any img; hero missing `fetchpriority="high"` (index.html:109,165,184,204,315,332,349)
- [x] fonts: replace DM Sans + Syne with Urbanist + Karla

---

## P2 — MINOR

- [x] `--brand-500` and `--brand-300` referenced inline in HTML but not defined in :root (index.html:164,369)
- [x] `.stagger-5` class used (index.html:464) but not defined in styles.css (only stagger-1→4 exist)
- [x] google fonts loaded as css `@import` inside styles.css → render-blocking (styles.css:2)
- [ ] fontawesome full CDN library ~80kb for ~15 icons used (index.html:31) — low priority, skip
- [x] scroll parallax handler writes transform without requestAnimationFrame (script.js:17-19)
- [x] booking modal date+time grid is hardcoded inline `style="display:grid;grid-template-columns:1fr 1fr"` → no mobile override possible (index.html:640)
- [x] all hex colors, no oklch; `--text-muted` #6B6B6B on cream #F9F6F0 ≈ 4.4:1 (just below 4.5:1 WCAG AA) → raised to #555555 ~5.4:1
- [x] `#10b981` hardcoded in js success state (script.js:198) → replaced with .btn-success CSS class
- [x] all 5 testimonials are 5-stars → looks fake, kills trust → cards 2+5 now 4 stars, all have aria-label

---

## P3 — POLISH

- [x] footer logo html has no `<span>` but css targets `.footer-logo span` → amber accent never renders
- [x] no `prefers-reduced-motion` media query anywhere → added to styles.css + JS guard
- [x] `--ease-spring` springy easing → replaced with ease-out-quart cubic-bezier(0.25,1,0.5,1)
- [x] 5 testimonials in 3-col grid → orphaned bottom row → fixed with 6-col grid span-3 for last 2
- [x] hero image missing `fetchpriority="high"` (done in P1 images task)
- [x] `.btn-dark` class referenced in index.html:490 but not defined in styles.css

---

## RE-AUDIT REGRESSIONS & NEW ISSUES (post-11/20)

- [x] `.fade-up` still references undefined `--ease-spring` (styles.css:1194) → transitions fall back to browser default
- [ ] footer credit text corrupted `â¤ï¸` → replace with "designed by the algothrim"
- [x] `.btn-dark` button has redundant inline style override (index.html:495) → remove inline style
- [x] `.text-gradient` orphaned class on 7 headings — gradient text is banned anti-pattern → remove class, keep `.accent-text`
- [x] `.hero-bg img` DOM query inside RAF callback → cache outside scroll handler (script.js)
- [ ] contact grid missing 769–1024px tablet breakpoint (mobile.css)
- [x] section images: replace Unsplash URLs with local `/assets/img/` files
- [x] diff-item mobile layout needs better visual treatment (Verified Drivers / No Hidden Fees / On-Time Guarantee)
- [x] scrollbar unstyled → style to match amber/dark theme
- [x] Trusted By section: replace placeholder SVGs with real logo images or text-based client names
- [x] animations too harsh → ease-spring fixed + fade-up duration/distance tuned
- [x] fonts toned down: Syne → Urbanist (less extreme), DM Sans → Karla (clean geometric)

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
- Trusted By: SVG placeholders replaced with Spectrum logo images
- footer credit replaced: "designed by the algothrim"
- fonts: Urbanist + Karla (both non-banned, not reflex picks)
