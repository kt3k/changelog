---
date: 2026-08-31
repo: jsr-io/jsr
period: monthly
slug: 2026-08
period_label: "August 2026"
size: L
title: "Security, publishing, and docs UX got a major upgrade"
excerpt: "August brought a security fix, faster dependency/doc paths, better publishing reliability, and broader metadata/search improvements."
commits: 55
---

### Security and edge protection
**Hardened docs rendering and provenance verification** — Fixed provenance validation to check the published manifest digest correctly, and tightened the docs-page CSP to block a `javascript:` iframe execution bypass.

**Moved scraping defenses to the edge, then rolled them back** — Anti-scraping protection briefly moved from the load balancer Worker into Cloudflare WAF to block bots earlier, but was reverted when account permissions didn’t support the new setup.

### Publishing, OIDC, and registry behavior
**Publishing became more reliable** — Stale `processing` publishes are now failed and retried immediately instead of getting stuck for 30 minutes, and oversized package metadata no longer wedges publish tasks on PostgreSQL index limits.

**Trusted publishing and auth got broader support** — GitHub Enterprise Cloud OIDC issuers are now validated correctly, and the publish-auth flow was refactored around reusable provider abstractions for future expansion.

**Self-hosted JSRs can fall back to another registry** — Added fallback registry support plus dependency-graph and publish-time resolution updates, making self-hosted deployments more practical.

### Search, dependency graphs, and metadata
**Search and package analytics became richer** — Package search gained a filter panel, runtime and minimum-score filters, and yanked-only packages are hidden from results. Dependent counts now include npm-compatible packages, and package metadata now exposes linked GitHub repositories.

**Dependency graph generation got much faster** — The `/dependencies/graph` endpoint now rebuilds from stored publish-time metadata instead of downloading transitive modules on demand, cutting request cost and latency significantly.

**Score metadata is more accurate** — Docs scoring no longer penalizes re-exports, overload implementation signatures, or JSON modules, and staff can now recompute stale score metadata for published versions.

### Docs and source experience
**Docs and source pages were polished and expanded** — Markdown source views can render HTML preview/code toggles, docs pages show documented-symbol counts, usage snippets are more version-aware, and `deno create` is advertised where applicable.

**Docs rendering and caching improved** — Upstream `deno_doc`/`deno_graph` bumps landed, symbol listings were capped to avoid oversized responses, and immutable docs/source assets now flow through an object cache to reduce storage latency.

### Support ticketing and email
**Inbound support mail was brought into the ticket system** — JSR now handles inbound email as tickets, with attachments, threading, internal notes, canned replies, and better reply/claim flows.

**Email delivery failure handling was fixed** — Missing sender config no longer produces a false success; failures are recorded properly so retries and sweeps can recover them.

### Other misc changes
- SPDX license-list data was refreshed.
- Navbar, theme toggling, package pages, and downloads received small UI polish.
- Terraform, CI caching, and build plumbing were updated.
- Telemetry and search-tracking privacy cleanup landed.
- Various correctness fixes for timestamps, manifests, type rewrites, and cached responses.
