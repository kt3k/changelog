---
date: 2026-06-14
repo: jsr-io/jsr
period: weekly
slug: 2026-W24
period_label: "Jun 8–14, 2026"
size: M
title: "API caching tightened as publish pipeline self-heals"
excerpt: "A week of CDN/cache hardening and publish reliability fixes, plus a brief API cutover attempt that was rolled back."
commits: 10
---

### API delivery hardening
**Broader caching for hot API routes** — High-traffic read endpoints got longer cache lifetimes, including package lists, metadata, versions, docs/source/search, downloads, diffs, and global stats. The goal was to cut backend load while preserving cache busting around writes.

**Docs and diff crawling pressure reduced** — The frontend started marking per-symbol docs and diff pages as `noindex`, sharing more cacheable responses across callers, and applying short negative caching for 404s. Tracing and request plumbing were also improved so the real caller shows up in API logs.

**Observability cleanup** — API traces now export logs to Grafana via OTLP, and 4xx responses are reported as `ok` rather than `error`, making operational alerts more accurate.

### Publish reliability fixes
**Stranded publish tasks now requeue themselves** — The publish system now detects stale tasks stuck in `processing` or `processed` and requeues them, recovering from interrupted publishes that could leave metadata incomplete or versions hidden from the resolver.

**Publish status and metadata cache bugs fixed** — Dynamic auth and publish-status endpoints were switched to `no-store`, and the CDN cache key was adjusted so purges target the public URL. That should eliminate hung publish polling and make freshly published package metadata appear immediately.

### API cutover attempt and rollback
**New API Worker front-door was tried, then reverted** — The repo briefly switched api.jsr.io to a new workers-rs `api` Worker with DB client-certificate support and deployment wiring, but the traffic swap was rolled back the same day. The database auth groundwork stayed in place, but the new front-door path wasn’t ready.

### Other misc changes
- CI, Terraform, and load-balancer wiring updates for the API split
- Cache write-path and middleware/proxy plumbing fixes
- Minor docs, architecture wording, and instrumentation attribute cleanups
