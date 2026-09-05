# VoltageOS Website

Public site for [VoltageOS](https://github.com/VoltageOS) — landing page and the
device catalogue, each card linking straight to its latest build. Vite + React 18
+ TypeScript, static build, no backend of our own.

## Quickstart

Node `^20.0.0 || >=22.0.0`.

```sh
npm ci          # install from the lockfile
npm run dev     # dev server
npm run build   # tsc -b && vite build -> dist/
npm run lint    # eslint .
npm run preview # serve the built dist/
```

## Device and build data

The device list is a hand-maintained registry in `src/lib/devices.ts`, keyed by
lowercase codename. Those keys are the join key for the OTA feed and the bundled
device image — renaming one drops the device from the grid.

Build metadata is fetched in the browser, one request per codename, from the
VoltageOS OTA vendor repo (branch `17`):

```
https://raw.githubusercontent.com/VoltageOS/android_vendor_voltageota/refs/heads/17/<codename>.json
```

Polled every 5 minutes — matching the CDN's own `max-age=300`, so a tighter poll
would only re-read the HTTP cache — and cached in `sessionStorage` per tab. A
codename with no JSON on that branch 404s and is left out of the grid.

## Deploy

Vercel, serving the static `dist/`. `vercel.json` holds the SPA rewrite, the
response headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`, `X-Frame-Options`), and immutable caching for `/assets/`.

## Security

Report vulnerabilities via [SECURITY.md](SECURITY.md).

## License

[Apache-2.0](LICENSE).
