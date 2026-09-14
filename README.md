# D1LANDANDHOUSE — Public Website

Next.js 14 (App Router) public-facing site. Consumes `d1-landandhouse-backend`'s
public API (`/api/v1/public/*`). Theme: black / white / red (see `src/styles/tokens.css`).

## Setup

```bash
npm install
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_URL at the backend
npm run dev                         # http://localhost:3000
```

Run the backend first (`d1-landandhouse-backend`, `npm run seed && npm run dev`) so there's
sample data to render.

## MVP scope

Home, property listing (with filters), property detail (with lead form + JSON-LD),
project listing/detail, contact page. No bilingual UI switch yet (data is bilingual-ready,
`th`/`en`, but only `th` is rendered), no customer accounts, no saved search, no
articles/blog, no page-builder-driven home page (sections are hardcoded for now — see
`d1-landandhouse-backend`'s README for the matching backend simplifications).

## Branches

`main` (production) / `staging` / `dev` (default working branch).
