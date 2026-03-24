# PRD — SARN Landing Page
**Status:** Ready to build
**Stack:** Next.js 15, Framer Motion (existing), anime.js (to add), Grok Imagine API
**Deployed:** Vercel (auto on push to main)

---

## Vision

The landing page is the first impression of SARN as a platform — not a publication, a **system**. The hero communicates that this is intelligence infrastructure, not a blog.

Reference: animejs.com — described as the best landing ever seen. Scroll-triggered, cinematic, each element becomes meaningful on the way down.

---

## Hero Section — F1 Deconstruction Sequence

An F1 car is generated via Grok Imagine (`grok-imagine-image` model, xAI API). On scroll, the car **deconstructs into its numbered component parts**, each flying into position as a labeled node in the SARN architecture diagram.

### Component → System Mapping

| Car Part | SARN Layer | Label |
|----------|------------|-------|
| Engine | TORCS physics sim | Signal Engine |
| Cockpit | UE5 render layer | Visual Layer |
| Wheels | TrendRadar RSS sources | Signal Sources |
| Aero / Wings | GAT graph compression | Signal Compression |
| Electronics | nodebase Inngest workflows | Workflow Orchestration |
| Exhaust | Telegram / output layer | Signal Output |

### Animation Behavior
- **At rest (top of page):** Complete F1 car, photorealistic, static or slow idle animation
- **On scroll:** Parts detach in sequence, float to their architecture positions
- **Each part arrival:** Label fades in, brief pulse effect, connection lines draw between nodes
- **End state:** Full SARN architecture diagram assembled from car parts
- **Scroll back:** Reverse — parts reassemble into the car

### Technical Approach
- SVG layer over the car image — each part gets an ID and clip path
- anime.js for the scroll-driven timeline (lightweight, timeline-based)
- Intersection Observer or GSAP ScrollTrigger for scroll mapping
- Framer Motion can stay for everything else on the page

---

## Content Sections (Below Hero)

### 1. Signal Feed (live)
- Latest 3 signal_run records from Postgres via API route
- Each card: sector, article lead title, timestamp
- Link to `/signal` page for full history

### 2. Latest Articles
- Pull from `/content/racing/*.md` (gray-matter)
- 3 most recent, card layout
- Link to `/racing` index

### 3. Crossover Brief (new)
- Latest `racing-crossover` signal_run
- Show the 3 bridge node titles as teaser cards
- Subtle label: "Today's crossover brief"

### 4. Architecture Overview
- Static version of the deconstruction diagram
- For users who scrolled past the hero or want a reference

### 5. CTA
- "Enter Racing" → `/racing`
- "View Signal" → `/signal`

---

## Image Generation — Grok Imagine

**Prompt direction:**
- Photorealistic F1 car, top-down or dramatic 3/4 angle
- Clean dark background (#0d0e13 or pure black)
- Parts visually distinct with clear separation lines
- No driver, no track — isolated car only
- High contrast, studio lighting

**API:** `grok-imagine-image` model, same xAI key already in `.env.local`

**Output:** PNG, save to `/public/images/f1-hero.png`
**SVG overlay:** Manually trace or auto-trace part boundaries for animation IDs

---

## Design Constraints

- Base color: `#0d0e13`
- Accent: `#b86c2a` (copper)
- Fonts: Syne (headings) + Inter (body) — already installed
- Animation must not block initial paint — lazy load anime.js
- Mobile: deconstruction sequence simplified or replaced with static diagram

---

## Dependencies to Add

```bash
# In sarn-official
bun add animejs
# Optional scroll trigger (if not using Intersection Observer)
bun add gsap
```

---

## Build Order

1. Generate F1 car image via Grok Imagine API
2. Create SVG part overlay with named IDs
3. Build static architecture diagram component
4. Wire anime.js scroll timeline
5. Add live signal feed API route (`/api/signal/latest`)
6. Assemble full page with all content sections
7. Deploy to Vercel

---

## Current State

- `/` homepage exists: hero text, "Enter Racing" CTA, no animation
- `/racing` index: pulls from content folder, 1 article live
- `/signal` page: **not built yet** — needed for signal feed links
- Framer Motion already installed
- anime.js **not yet installed**
- Grok Imagine **not yet integrated**
