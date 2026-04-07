# Go Ads-Free Landing Page Bundle

A self-contained HTML/CSS/JS bundle for the Shark Tank Blog "Go Ads-Free" landing page.

## Structure

```
go-ads-free-bundle/
├── index.html                  Main landing page
├── README.md                   This file
└── assets/
    ├── css/
    │   └── landing.css         All page styles (self-contained)
    ├── js/
    │   ├── landing.js          Page interactivity (CTAs, scroll, sticky bar)
    │   └── go-ad-free.js       Payment popup widget (4-screen flow)
    └── images/
        ├── hero-stage.jpg      Hero background (Shark Tank stage)
        ├── founders-stories.jpg Context section background
        └── shark_logo.jpeg     Site logo
```

## How to use

1. **Open `index.html` directly** in any browser — no build step required.
2. **Or deploy** the entire `go-ads-free-bundle/` folder to any static host (GitHub Pages, Netlify, Vercel, S3, etc.).

## What's inside

### Landing page sections (in order)

1. **Top Nav** — Logo + "Go Ads-Free" CTA
2. **Hero** — Full-screen stage image, headline, primary CTA, strikethrough pricing
3. **Value Strip** — 3 icons (No ads, Faster pages, No interruptions)
4. **Comparison** — Side-by-side article mockups (With Ads vs Ad-Free) + bullet comparison
5. **Pricing Card** — $25 → $20 yearly with "save $5" badge and benefits
6. **Context** — Founders image with overlay and supporting copy
7. **Final CTA** — Closing pitch
8. **Sticky CTA Bar** — Slides up after 60% scroll

### External dependencies (loaded via CDN)

- **Google Fonts** — Newsreader (serif headings) + Inter (body)
- **Font Awesome 6.5.1** — icons

No build tools, no frameworks, no npm. Pure HTML/CSS/vanilla JS.

### Interactive behavior

- Any element with class `js-open-payment` opens the payment widget (`window.gafOpenPopup`)
- `.js-scroll-down` smoothly scrolls to the value strip
- Sticky bar appears once user scrolls past 60% of viewport height

### Payment widget

`go-ad-free.js` provides a 4-screen modal:
1. Amount selection
2. Google sign-in
3. Payment method (bank transfer, card, Apple Pay, Google Pay, PayPal, Venmo)
4. Success confirmation with shareable certificate

The script is loaded with `data-delay="99999" data-poll="0"` to disable its automatic ad-injection scanner — only the popup function is exposed.

## Colors

- Primary (warm orange): `#d97706`
- Foreground: `#1e293b`
- Muted: `#64748b`
- Background: `#ffffff`
- Secondary: `#f8fafc`

## Responsive

Optimized for mobile-first with breakpoints at 640px and 420px.
