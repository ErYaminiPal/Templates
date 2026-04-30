# Luxury Jewelry E-commerce HTML Template

> **OORMII** — a premium luxury jewelry e-commerce HTML5 template with 13 fully-designed pages, modern motion, AR try-on, 3D product viewer, and a single-file CSS/JS architecture you can read in an afternoon.

**Perfect for:** jewelry brands · luxury accessories · premium watches · bridal stores · diamond retailers · designer goods · boutique e-commerce · fashion houses

[Live Demo](https://jewellerytemp.netlify.app) · [Styleguide](docs.html) · [Quick Start](#-quick-start)

---

## ✨ Features

### Design
- **Charcoal + Champagne Gold** palette with one-line theme switching (CSS variables)
- **Cormorant Garamond + Italiana + Josefin Sans** type system from Google Fonts
- **Sticky navigation** that stacks under the announcement bar and locks to the top on scroll
- **SVG noise grain overlay** for that 2026 luxury-print feel
- **Smooth scroll-reveal** animations (`reveal`, `reveal-left`, `reveal-right`, `reveal-scale`, `stagger`)
- **Custom dual-layer cursor** with hover/text states (desktop only — auto-disabled on touch)
- **Magnetic buttons** that gently follow the pointer

### Pages (12 total)
| Page | File | Notes |
|------|------|-------|
| Home | `index.html` | Hero slider, mega menu, categories, best-sellers, split banner, craftsmanship, IG grid, video CTA, testimonials, blog teasers, recently-viewed |
| Our Story | `about.html` | Animated counters, vertical timeline, team grid, sustainability split |
| Collections | `collections.html` | Sticky sidebar filters, color swatches, sort + grid/list toggle, pagination |
| Product Detail | `product.html` | Image / 3D / AR viewer tabs, sticky add-to-bag, stock urgency pill, bundle builder, tabbed description |
| Contact | `contact.html` | Floating-label form, info card, dark-styled embedded map |
| Journal | `blog.html` | Featured post, category pills, 9 article grid |
| Article | `blog-post.html` | Long-form layout, blockquote, share row, author card |
| FAQ | `faq.html` | Category-filterable accordion (15 Q&As across 6 categories) |
| Account | `account.html` | Animated login/register tabs, social auth, perks |
| Cart | `cart.html` | Line items, sticky summary, coupon, recommendations |
| Wishlist | `wishlist.html` | localStorage-persisted, empty state, recommendations |
| 404 | `404.html` | Animated gradient numerals |
| Styleguide | `docs.html` | Live design-token & component reference |

### Trendy 2026 Features
- **Quick-view modal** auto-injected into every product card
- **3D product viewer** powered by Three.js (CDN, lazy-loaded only when opened)
- **AR try-on stub** with webcam access + earring overlay (MediaPipe-ready)
- **Sticky add-to-bag bar** that slides up on PDP scroll
- **Bundle builder** ("Complete the Look") with live total + 15% discount
- **Stock urgency pill** with pulse animation
- **Recently viewed** strip — auto-renders from PDP visits via localStorage
- **Wishlist persistence** across pages with nav badge counter

### Performance
- Native `loading="lazy"` + `decoding="async"` on every `<img>`
- `<link rel="preload" as="image" fetchpriority="high">` on the LCP hero
- `<link rel="preconnect">` to Google Fonts and Unsplash CDN
- Three.js + AR libs are CDN-loaded **only on demand**, not page-load
- All animations use GPU-friendly `transform` + `opacity`
- Single `main.css` (~95 KB) and single `main.js` (~42 KB) — no build step
- Image error fallback wired in JS — failed images swap to a placeholder automatically

### Accessibility & Compatibility
- Semantic HTML5 with proper `<nav>`, `<header>`, `<main>`, `<footer>`, `<article>`
- `prefers-reduced-motion` respected on heavy effects
- `(hover: none)` query disables hover-only UX on touch devices
- Larger tap targets and visible product actions on mobile
- All interactive controls keyboard-reachable
- ARIA-friendly button labels, alt text on all images

---

## 🚀 Quick Start

### Run locally
```bash
cd oormii-theme
python3 -m http.server 8000
# open http://localhost:8000
```

Or with Node:
```bash
npx serve oormii-theme
```

### Deploy
Drop the entire `oormii-theme/` folder onto **any static host**:
- Netlify, Vercel, Cloudflare Pages, GitHub Pages
- AWS S3 + CloudFront, traditional Apache/Nginx
- Bundle into a Shopify, WooCommerce, or Headless CMS theme

There's no build step. Edit any `.html` file and refresh.

---

## 🎨 Customization

### Change the entire colour theme — one place

Open `assets/css/main.css` and edit the top block:

```css
:root {
  --gold: #c9a96e;          /* primary accent — buttons, links, highlights */
  --gold-light: #e8d5b0;    /* hover state, decorative accents */
  --gold-dark: #8b6914;     /* light-theme accent */
  --champagne: #d8c39a;
  --cream: #f5f3ee;         /* light text on dark / light section bg */
  --ink: #0d0e11;           /* primary dark — body bg */
  --ink-soft: #181a1f;      /* dark elevation 1 */
  --slate: #2c2e35;          /* dark elevation 2 */
  --mist: #ecebe5;           /* light-theme bg */
  --rose: #e8c4a0;           /* secondary accent */
}
```

**Pre-built palette presets** — paste any of these over the block above:

```css
/* Midnight Navy + Champagne */
:root {
  --gold: #d4b677;
  --ink: #0a0e1a;
  --ink-soft: #131a2e;
  --slate: #2a3349;
}

/* Forest + Gold */
:root {
  --gold: #c9a96e;
  --ink: #0c1410;
  --ink-soft: #15201a;
  --slate: #2a3a30;
}

/* Cream Light Theme — flip body fg/bg */
:root {
  --gold: #8b6914;
  --ink: #2a1810;
  --cream: #faf6f0;
}
body { background: var(--cream); color: var(--ink); }
```

### Replace default images
Default images live in two places:

1. **HTML files** — search for `images.unsplash.com` and replace with your CDN URLs
2. **Hero slides** in `index.html` — search for `hero-slide active`

For best quality, use:
- Hero: 2000 × 1125 (16:9), webp
- Category cards: 800 × 1066 (3:4), webp
- Product cards: 800 × 1066 (3:4), webp
- Blog cards: 800 × 600 (4:3), webp
- Instagram grid: 800 × 800 (1:1), webp

If an image URL fails, it auto-falls-back to a `placehold.co` placeholder so the layout never breaks.

### Logo / brand name
Search-and-replace `OORMII` (caps) and `Oormii` (sentence-case) in all `.html` files.

### Change fonts
Replace the Google Fonts `<link>` and update these tokens:

```css
:root {
  --font-serif: 'Cormorant Garamond', serif;     /* headings, prices */
  --font-display: 'Italiana', serif;             /* large display headlines */
  --font-sans: 'Josefin Sans', sans-serif;       /* body, labels, buttons */
}
```

### Add a new page
1. Copy any existing page as a template (e.g. `about.html` → `lookbook.html`)
2. Update the `<title>`, `<meta description>`, breadcrumb, and `<h1>`
3. Add a link in the nav (`<ul class="nav-links">`) and footer of every page

### Disable / enable feature modules
Each big feature in `assets/js/main.js` is in its own commented section. To disable a feature, comment out the whole block — none of them are mutually dependent. For example, to remove magnetic buttons, find:

```js
/* ---------- MAGNETIC BUTTONS ---------- */
```

…and comment until the next `/* ---------- ... ---------- */`.

---

## 📂 Project Structure

```
oormii-theme/
├── index.html              · Home
├── about.html              · Our Story
├── collections.html        · Shop / category listing
├── product.html            · Single product detail
├── cart.html               · Shopping cart
├── wishlist.html           · Saved items
├── account.html            · Login / register
├── blog.html               · Article listing
├── blog-post.html          · Single article
├── faq.html                · FAQ accordion
├── contact.html            · Contact + map
├── docs.html               · Live styleguide / design-token reference
├── 404.html                · Not-found page
├── README.md               · This file
└── assets/
    ├── css/
    │   └── main.css        · ~95 KB, fully commented design system
    └── js/
        └── main.js         · ~42 KB, single-file vanilla JS
```

No build tools. No dependencies (except Three.js for the 3D viewer, lazy-loaded from CDN only when used).

---

## 🧩 CSS Architecture

The CSS is organised top-to-bottom in this order:

1. **Design tokens** (`:root`) — all colours, fonts, easings
2. **Reset + base** (`body`, `html`, `*`)
3. **Custom cursor**
4. **Loader / scroll progress**
5. **Utility classes** (`.btn-primary`, `.btn-ghost`, `.btn-link`, `.section-title`, `.section-label`)
6. **Layout primitives** (`section`, `.container`, `.page-header`)
7. **Component blocks** (one section per component, with section header comment)
8. **Page-specific blocks** (`/* ===== PAGE-SPECIFIC: ABOUT ===== */` etc.)
9. **Media queries** (1100 / 800 / 500 / `(hover: none)`)
10. **2026 trends block** — grain, magnetic, quick-view, 3D, AR, sticky ATC, bundle, wishlist

Every new component you add: define it under its own `/* ===== NAME ===== */` comment for easy navigation.

---

## ⚡ JS Architecture

`main.js` is a single IIFE that registers every behaviour. Each feature has its own commented section:

```
LOADER · CUSTOM CURSOR · SCROLL PROGRESS + NAV · HERO SLIDER ·
PARTICLE CANVAS · SCROLL REVEAL · SPLIT TEXT · COUNTER ANIMATION ·
MOBILE NAV · CART · TOAST · SEARCH · TESTIMONIALS · NEW ARRIVALS FILTER ·
VIDEO MODAL · NEWSLETTER · PARALLAX HERO · WISHLIST HEART · FAQ ACCORDION ·
BLOG CATEGORY FILTER · PRODUCT TABS · GALLERY THUMBS · QUANTITY · OPTIONS ·
AUTH TABS · FILTER COLLAPSE · GRID/LIST TOGGLE · TILT EFFECT · LAZY LOAD ·
STRUCTURED DATA · IMAGE ERROR FALLBACK · GRAIN OVERLAY · MAGNETIC BUTTONS ·
QUICK VIEW · STICKY ATC · 3D VIEWER · VIEWER TABS · AR TRY-ON ·
BUNDLE BUILDER · RECENTLY VIEWED · INJECT WISHLIST NAV LINK · WISHLIST PERSISTENCE
```

To extend: add a new commented section. Every section is independent and can be removed or re-ordered freely.

---

## 🛠️ Browser Support

| Browser | Version |
|---------|---------|
| Chrome / Edge | last 2 |
| Firefox | last 2 |
| Safari | 14+ |
| iOS Safari | 14+ |
| Chrome Android | last 2 |

The 3D viewer needs WebGL. AR try-on needs HTTPS or `localhost` for `getUserMedia`. Both gracefully degrade if unavailable.

---

## 🌐 Live Demo

After running locally, the home page is the demo. For ThemeForest:

1. Deploy the folder to a free Netlify / Vercel site
2. Use that URL as the **Live Preview** link on your theme listing
3. Optionally, use `docs.html` as a "View styleguide" sub-link

---

## 📝 Changelog

### v1.0.0 — Initial release
- 12 fully-designed pages
- Charcoal + champagne gold theme
- 3D viewer, AR try-on stub, sticky ATC, bundle builder, wishlist
- Mobile + tablet + desktop responsive
- Touch-optimised hover states

---

## 📜 License

This theme uses:
- **Google Fonts** (Open Font License) — bundled via `<link>`
- **Unsplash** photos as default images — attribute or replace before commercial release
- **Three.js** — MIT, lazy-loaded from CDN

The theme code is yours to use under the terms of your ThemeForest licence.

---

## 🙋 Support

Questions, feature requests, or customisation help — open an issue or reach the email in your delivery package.
