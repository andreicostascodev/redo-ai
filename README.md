# Redo.Ai — AI Marketing Content Generator

Turn any product into high-converting marketing content in seconds.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Claude AI](https://img.shields.io/badge/Claude-Sonnet_4-orange)

---

## What It Does

Describe your product → Get:
- **Product Description** — persuasive, benefit-focused, conversion-optimized
- **3 Ad Copies** — platform-specific for TikTok, Instagram, Facebook
- **5 Social Post Ideas** — scroll-stopping hooks with CTAs
- **1 Brand Slogan** — memorable, repeatable, packaging-ready

With **4 tone modes**: Luxury · Casual · Aggressive · Minimalist

---

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url> redo-ai
cd redo-ai
npm install
```

### 2. Add Your API Key

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get a key at: https://console.anthropic.com/

### 3. Run Dev Server

```bash
npm run dev
```

Open http://localhost:3000

---

## Project Structure

```
redo-ai/
├── app/
│   ├── layout.tsx              # Root layout, metadata, fonts
│   ├── page.tsx                # Landing page (/)
│   ├── globals.css             # Tailwind + custom styles
│   ├── generator/
│   │   └── page.tsx            # Generator page (/generator)
│   └── api/
│       └── generate/
│           └── route.ts        # AI API endpoint (server-side)
├── components/
│   ├── ui/
│   │   ├── ai-prompt-box.tsx   # Full-featured prompt input
│   │   ├── shining-text.tsx    # Shimmer loading text
│   │   └── copy-button.tsx     # Click-to-copy utility
│   ├── landing-page.tsx        # Hero + features landing
│   ├── generator-page.tsx      # Main product page
│   ├── output-section.tsx      # Tabbed output display
│   └── tone-selector.tsx       # Tone picker cards
├── lib/
│   ├── utils.ts                # cn() class merge helper
│   └── prompts.ts              # AI system prompts + types
├── tailwind.config.ts          # Custom theme
├── components.json             # shadcn/ui config
├── package.json
└── .env.local.example          # API key template
```

---

## Architecture

```
[User Input]
    │
    ▼
[/generator page]  ──  tone + description
    │
    ▼
[POST /api/generate]  ──  server-side route
    │
    ▼
[Claude API]  ──  system prompt from lib/prompts.ts
    │
    ▼
[Structured JSON]  ──  product_description, ad_copies, social_posts, slogan
    │
    ▼
[Output Section]  ──  tabbed UI with copy buttons
```

**Key design decisions:**
- API key stays server-side (never exposed to browser)
- Input refinement: if product description is <5 words, AI asks clarifying questions first
- All output is structured JSON — parsed and displayed in typed components
- Tone is injected into the prompt per-request, not hardcoded

---

## The Prompt Engine

The system prompt lives in `lib/prompts.ts`. It's the brain of the product.

**Frameworks used:**
- AIDA (Attention → Interest → Desire → Action) for descriptions
- PAS (Problem → Agitate → Solution) for ad copies
- Hook → Value → CTA for social posts

**Tone modes** are described in the prompt with brand references:
- Luxury → Aesop, Le Labo
- Casual → Glossier
- Aggressive → DTC gym brands
- Minimalist → Muji, Apple

**Banned phrases** prevent generic AI copy:
- "game-changer", "look no further", "in today's world", etc.

---

## Components

### `ai-prompt-box.tsx`
Full-featured input with:
- Auto-resizing textarea
- Image upload via drag/drop, paste, or click
- Voice recording UI
- Search / Think / Canvas mode toggles
- Animated send button states

### `shining-text.tsx`
Gradient shimmer text animation for loading states. Uses Framer Motion.

### `tone-selector.tsx`
4-card grid with icons, descriptions, and active state. Controlled component.

### `output-section.tsx`
4-tab display: Description, Ad Copies (3 platforms), Social Posts (5), Slogan.
Each section has a copy-to-clipboard button.

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Add `ANTHROPIC_API_KEY` in Vercel dashboard → Settings → Environment Variables.

### Other platforms

Works on any Node.js host that supports Next.js:
- Railway
- Render
- AWS Amplify
- Self-hosted with `npm run build && npm start`

---

## Phase 2 Roadmap

- [ ] Supabase auth (email + Google)
- [ ] Save generation history per user
- [ ] Credit system (3 free, then paid)
- [ ] Stripe integration for Pro plan
- [ ] Export to PDF / share link
- [ ] Multi-language output
- [ ] Image generation for social posts (via DALL-E or Flux)

---

## Tech Stack

| Layer       | Tool                    | Why                                    |
|-------------|-------------------------|----------------------------------------|
| Framework   | Next.js 14 (App Router) | Full-stack React, API routes, SSR      |
| Language    | TypeScript              | Type safety for prompts and API        |
| Styling     | Tailwind CSS            | Rapid iteration, custom design system  |
| Components  | shadcn/ui structure     | Composable, customizable, no lock-in   |
| Animation   | Framer Motion           | Smooth page transitions, micro-UX      |
| AI          | Claude Sonnet 4         | Best quality/speed ratio for copy      |
| Icons       | Lucide React            | Consistent, lightweight                |

---

## License

MIT — build whatever you want with it.
