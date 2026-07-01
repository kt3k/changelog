---
date: 2026-06-30
repo: jsr-io/jsr
period: monthly
slug: 2026-06
period_label: "June 2026"
size: L
title: "API split, search overhaul, and security hardening"
excerpt: "June centered on the API worker migration, a search engine swap, stronger provenance/auth checks, and cache/observability fixes."
commits: 37
---

### **API split moved toward a Worker front door**
JSR made the biggest architectural push of the month by introducing a `workers-rs` API Worker, extracting shared wire types into `jsr_types`, and wiring read-only endpoints plus a proxy fallback to the existing compute service. The team also proved Postgres access from the Worker via Hyperdrive and briefly cut over `api.jsr.io` before rolling it back, keeping the new DB/auth plumbing while the front-door swap was refined.

### **Caching and publish reliability were tightened**
Several changes focused on reducing load and fixing stale or hung publication flows. High-traffic docs, source, diff, search, metadata, and download endpoints got longer cache windows and shared cache behavior, 404s were negatively cached, and crawler-heavy docs/diff pages were marked `noindex`. Publish tasks now self-heal if they get stuck, publish-status polling is no longer cached incorrectly, and package metadata invalidation was fixed so new versions appear promptly.

### **Provenance, auth, and frontend hardening improved**
Security-related work strengthened both supply-chain and login flows. Provenance verification now checks DSSE signatures and binds them to the linked GitHub repo, OAuth state is tied to the initiating user, and frontend middleware added CSP-style hardening headers. A cache-related freshness issue around manifests was also reduced to avoid masking newly published versions.

### **Search was migrated to Algolia**
The package search backend moved from Orama to Algolia, with corresponding updates across frontend config, Terraform, GitHub Actions, and reindexing jobs. Follow-up fixes restored expected `scope:` query behavior and ranking, so scoped packages once again surface ahead of lookalike names.

### **Observability and analytics got sharper**
Tracing/export moved to OTLP/HTTP, Cloudflare Worker observability export was enabled, and later OTEL sampling was reduced to 5% while preserving error and warning logs. JSR analytics also started recording user agents for download events, improving traffic analysis.

### **Other misc changes**
- Fixed npm tarball file permissions and README root-relative links.
- Improved frontend accessibility and mobile UX details.
- Added minor CI, Terraform, Docker, and dependency maintenance across the API split and search migration.
