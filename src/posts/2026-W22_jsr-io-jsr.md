---
date: 2026-05-31
repo: jsr-io/jsr
period: weekly
slug: 2026-W22
period_label: "May 25–31, 2026"
size: L
title: "JSR shifts frontend to Workers and expands CDN caching"
excerpt: "Frontend migrated to Cloudflare Workers, docs rendering was fixed under Vite, and CDN caching was added to key read and sitemap endpoints."
commits: 9
---

### Frontend platform shift
**Vite-based Fresh migration** — The frontend build/dev stack moved to Vite, updating Fresh/Preact tooling, asset locations, and Docker/type configs to support the new pipeline.

**Frontend cut over to a Cloudflare Worker** — The JSR frontend now runs as its own Cloudflare Worker behind a service binding, removing the old public Cloud Run hop and paving the way for retirement of the legacy deployment.

### Caching and load-shedding improvements
**Per-IP frontend rate limiting** — The frontend proxy now rate-limits by `CF-Connecting-IP` before proxying to Cloud Run, returning 429s for scraper-heavy bursts while falling open in local/direct access.

**CDN caching for hot read paths** — `GET /users/:id`, `GET /users/:id/scopes`, and sitemap endpoints now emit cacheable responses so Cloudflare can absorb repeated reads and crawler traffic.

**Publish-time CDN purge for package manifests** — Package and npm version manifest writes now purge affected CDN objects after upload, helping keep `deno add`, `deno install`, and manifest resolution fast without stale metadata.

### Fixes and correctness
**Docs page lookup fixed under Vite** — Docs pages now resolve markdown from the docs directory directly, restoring `/docs/*` routes after the frontend build change.

**Staff detection in IAM checks corrected** — IAM scope evaluation now properly distinguishes omitted users from explicit `null`, fixing authorization behavior for staff/sudo/admin checks.

### Other misc changes
- Rate-limit thresholds were tuned upward after the initial rollout
- CI/build wiring updated for the new frontend layout and worker deployment
- Architecture/docs updated to reflect the new deployment model
- E2E coverage added for docs rendering
