# Bani Adam Afandi — Portfolio (Next.js 16)

## Stack (installed)
- Next 16.3 App Router, React 19.2, TS, Tailwind v4, framer-motion 13, three + r3f v9 + drei v10, lucide-react.

## Next 16 rules
- Turbopack build; `next build` runs no lint (`npm run lint` separate).
- `data-scroll-behavior="smooth"` on `<html>` keeps in-page smooth scroll.
- ASP async: `await params`.
- Client comps need `'use client'`.

## Files
- `lib/data.ts` — all profile content (server).
- `app/layout.tsx` — metadata, Geist fonts, dark theme.
- `app/page.tsx` — server, composes sections.
- `app/globals.css` — @theme tokens (bg/accent/card/line/muted).
- `components/` — Navbar(client), Reveal(client), Scene(client 3D), Hero, About, Skills(client bars), Projects, Services, Contact, Footer.

## Sections
Navbar → Hero(3D) → About(bio+stats) → Skills(3 cards, bars) → Projects(6 grid, hover) → Services(4) → Contact(CTA+WA+email) → Footer.

## Quality gates
- Dark theme, #6ee7b7 accent, Bahasa Indonesia UI text, group Mobile-first, CWV: dpr cap on 3D, dynamic-import Scene (ssr:false), reduced-motion respect, Suspense fallback.
- `npm run build` zero errors; `npm run lint` clean.