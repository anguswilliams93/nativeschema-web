# CLAUDE.md — nativeschema-web

Native Schema marketing site (`nativeschema.com`). Next.js 16 / React 19 / Tailwind CSS v4, deployed on Vercel. **50-50 co-owned business** (Angus + Di). Uses Google Ads for lead acquisition — do not change page titles, headings, or meta descriptions without considering SEO/ad quality-score impact.

## Stack & commands

```bash
npm run dev        # localhost:3000
npm run build      # primary gate — must pass before deploy
npm run lint       # ESLint (eslint-config-next)
```

No tests. No bun — uses **npm** (not bun like the zerobi website).

## Architecture

```
app/                    # Next.js App Router
  page.tsx              # Composes all homepage sections in order
  layout.tsx            # Metadata, Geist fonts, ThemeProvider, AdminProvider, StickyNav
  globals.css           # Tailwind v4, theme tokens (oklch)
  api/
    contact/route.ts    # POST — Resend email + Turnstile CAPTCHA
    email/              # (email utility routes)
    booking/            # Booking form API
  contact/page.tsx      # /contact sub-page
  services/             # /services sub-pages
  solutions/            # /solutions sub-pages
  how-we-work/          # /how-we-work sub-page
  industries/           # /industries sub-pages
components/
  *-section.tsx         # One file per homepage section
  animated-section.tsx  # Scroll-triggered reveal wrapper
  stagger-container.tsx # Sequential list reveal
  hero-section.tsx      # Video hero with complex autoplay fallbacks
  admin-provider.tsx    # Inline admin edit context
  admin-login.tsx       # Admin panel
  sticky-nav.tsx        # Navigation
  theme-provider.tsx    # Custom light/dark/system (not next-themes)
  ui/                   # shadcn/ui: button, card, carousel, chart
lib/
  utils.ts              # cn() class merger
  motion.ts             # Shared Motion.dev tokens (EASE_OUT, SPRING, fadeUp, etc.)
```

**Homepage sections (in order):** `HeroSection` → `WhatWeDoSection` → `FeatureCardsSection` → `IndustriesSummarySection` → `ContactSection`

## Key patterns

### All components are `'use client'`
No RSC / `'use server'` directives. Motion.dev animations, state, and browser APIs require client rendering throughout.

### Animation system
Uses `motion/react` (NOT `framer-motion`) with tokens from `lib/motion.ts`:
- `AnimatedSection` — scroll-triggered fade+slide (`direction`: up/down/left/right)
- `StaggerContainer` + `StaggerItem` — sequential list reveal
- `AnimatePresence` in modals for enter/exit
- Tokens: `EASE_OUT`, `SPRING`, `DURATION`, `fadeUp`, `lineReveal`, `staggerParent`, `VIEWPORT`

```tsx
import { fadeUp, VIEWPORT } from '@/lib/motion'
<motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
```

### shadcn/ui
Primary component library — always use it for buttons, cards, dialogs, forms, etc. Add components via:
```bash
npx shadcn@latest add <component>
```
Installed: `button`, `card`, `carousel`, `chart`.

### Theme
- Default: **dark**. Persisted in `localStorage` as key `theme`.
- Brand: **magenta/pink primary** `oklch(0.65 0.28 322)` + **neon green accent** `oklch(0.78 0.24 150)`.
- Dark background: `oklch(0.13 0.005 280)` (deep charcoal).
- Fonts: Geist Sans (`--font-geist-sans`) + Geist Mono (`--font-geist-mono`) via `next/font/google`.

### Contact form
`POST /api/contact` — Cloudflare Turnstile verification → Resend team notification + Resend hosted-template confirmation to lead → best-effort push to bd-worker. Env vars:
- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `CONTACT_RECIPIENT` (defaults to `angus@nativeschema.com,di@nativeschema.com`)
- `RESEND_LEAD_TEMPLATE_ID`
- `NS_BD_WORKER_URL` — bd-worker `/leads/bd` endpoint (via cloudflared). **Leave unset** to disable the push.
- `NS_BD_WORKER_SECRET` — `X-BD-Secret` header value, must match `BD_LEAD_SECRET` in `server/.env.prod`

**BD-worker push** (`lib/bd-push.ts`) — self-gated on the two `NS_BD_WORKER_*` vars. On a successful contact form submission the lead is POSTed to the bd-worker which runs the intake workflow (research brief + questionnaire draft). The push is best-effort and never blocks the form response. `host` is derived from the submitter's email domain; `note` is composed from company + service + message. See `.env.local.example`.

## Google Ads considerations

Native Schema runs Google Ads driving traffic to this site. Before changing:
- **Page titles / `<title>` tags** — affect ad quality score
- **H1/H2 headings on landing pages** — keyword relevance
- **`/contact` page or contact section** — conversion goal; don't break the form flow
- **Core Web Vitals** — LCP, CLS, INP directly affect Ad Rank; keep the hero video loading path fast

## Admin / inline editing

`AdminProvider` + `AdminLogin` enable inline content editing in production. The `EditableText` component wraps editable strings. Don't remove or bypass these without discussion.

## Path aliases

All imports use `@/` (maps to project root):
```tsx
import { cn } from '@/lib/utils'
import { AnimatedSection } from '@/components/animated-section'
```

## Deployment

Vercel. `npm run build` must pass locally before pushing. No CI/CD pipeline beyond Vercel's automatic deploys on push to `main`.
