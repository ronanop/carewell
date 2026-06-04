# Care Well Medical Centre

Full-stack clinic website: **Next.js frontend**, **Node API (Hono)**, **PostgreSQL (Prisma)**, and **CMS uploads**.

## Project layout

```
carewellsite/
├── frontend/          # Next.js 14 — pages, admin UI, middleware
├── backend/           # Hono API :4000 — routes, CMS, auth, scripts/
├── db/
│   ├── docker-compose.yml
│   ├── prisma/        # schema + migrations
│   ├── seed/          # legacy URL map, sitemap fixture
│   └── redirects.migration.json
├── uploads/           # CMS media (served via /uploads → API)
├── package.json       # npm workspaces
├── .env.example
└── netlify.toml
```

## Getting started

### Prerequisites

- Node.js **>= 18.17**
- Docker (for local Postgres)

### Install and run

```bash
npm install
cp .env.example .env.local    # fill DATABASE_URL, ADMIN_*, etc.

npm run db:up                 # Postgres on localhost:5433
npm run db:generate
npm run db:migrate

npm run dev:all               # API :4000 + Next :3000
```

- Site: <http://localhost:3000>
- API health: <http://localhost:4000/health>
- Admin: <http://localhost:3000/admin>

`npm run dev:fresh` clears `frontend/.next` then starts both servers (useful on OneDrive-synced folders).

### Environment (`.env.local` at repo root)

| Variable | Purpose |
| -------- | ------- |
| `DATABASE_URL` | PostgreSQL (`postgresql://carewell:carewell@localhost:5433/carewell`) |
| `API_URL` / `API_PORT` | Standalone API (default `http://localhost:4000`) |
| `FRONTEND_URL` | API → Next cache revalidation |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |
| `ADMIN_SESSION_SECRET` / `ADMIN_PASSWORD` | Admin login |
| `SANITY_REVALIDATE_SECRET` | `POST /api/revalidate` after CMS saves |
| `OPENAI_API_KEY` | Skin scan feature |

See `.env.example` for the full list.

## Common scripts

| Script | What it does |
| ------ | ------------- |
| `npm run dev:all` | API + Next together |
| `npm run build` | Production Next build |
| `npm run db:studio` | Prisma Studio |
| `npm run cms:import-sanity` | One-time Sanity → Postgres |
| `npm run cms:import-redirects` | Load `db/redirects.migration.json` into DB |
| `npm run redirects:legacy` | Rebuild migration redirects from seed map |

Maintenance CLIs live under `backend/scripts/`.

## Deploy

- **Frontend**: Netlify / Vercel / Render — set `API_URL` to your hosted API so `/api/*` rewrites work.
- **API**: any Node host — `npm run start -w @carewell/backend` with `DATABASE_URL` and secrets.
- **Database**: managed Postgres; run `npm run db:migrate` in CI or release step.
- **Render Postgres**: use the **Internal** `DATABASE_URL` on the web service at runtime. The production build skips DB-backed static generation when it detects an internal `dpg-*-a` host (build runs outside the private network). CMS/blog/legacy URLs are generated on first request (`revalidate: 60`).

Uploads persist on disk at `uploads/` (mount a volume in production).

## License

See [LICENSE](./LICENSE).
