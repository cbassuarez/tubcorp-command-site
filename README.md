# TubCorp Command Site

Fictional inworld TubCorp command network website for THE TUB.

## Stack

- Vite + React + React Router + TypeScript
- Tailwind CSS
- Framer Motion
- funky-shadow
- heerich
- lucide-react
- Vitest + RTL + Playwright

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Tests

```bash
npm run test
npm run test:e2e
```

## Environment

Use `.env.local` for runtime links/telemetry:

```bash
VITE_TELEMETRY_MODE=simulated
VITE_TELEMETRY_URL=https://example.com/telemetry
VITE_COMPANION_IOS_URL=https://apps.apple.com/app/id000000000
VITE_COMPANION_TESTFLIGHT_URL=https://testflight.apple.com/join/XXXXXX
```

- `VITE_TELEMETRY_MODE=simulated|remote`
- In `remote` mode, telemetry is polled from `VITE_TELEMETRY_URL`.
- If missing/unreachable, status degrades to truthful `MISSING/STANDBY`.

## GitHub Pages Deployment

Workflow: `.github/workflows/deploy-pages.yml`

1. Push to `main`.
2. In repository settings:
   - Pages -> Source: **GitHub Actions**
3. The workflow builds and publishes `dist/`.

SPA deep-link support is handled with `public/404.html` redirect + `index.html` query restoration script.

