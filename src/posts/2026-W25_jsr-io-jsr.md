---
date: 2026-06-21
repo: jsr-io/jsr
period: weekly
slug: 2026-W25
period_label: "Jun 15–21, 2026"
size: L
title: "Security hardening, Algolia search migration, and richer analytics"
excerpt: "JSR tightened provenance and auth flows, migrated search to Algolia, and added user-agent capture to download analytics."
commits: 8
---

### **Security and frontend hardening**
JSR shipped several defense-in-depth fixes this week: provenance verification now validates the DSSE signature and binds it to the linked GitHub repo, OAuth state is tied to the initiating user, and the frontend adds CSP/hardening headers. Manifest caching was also adjusted to avoid stale edge responses hiding fresh releases.

### **Search infrastructure moved to Algolia**
The search stack was migrated from Orama to Algolia across frontend, backend config, Terraform, and CI. After the cutover, scope queries were normalized so `scope:@std` and `scope:std` behave the same, and ranking was tuned to prefer `scope` over `name` again, restoring more relevant package results.

### **Telemetry and analytics improvements**
OpenTelemetry export was reduced to 5% sampling to cut volume while preserving complete sampled traces, with errors and warnings still always exported. Download analytics also started recording user-agent strings for both metadata and npm tarball requests, improving source attribution and client analysis.

### **Other misc changes**
- Dependency and crate version bumps
- Updated module graph error messages for newer Deno parsing output
- Added `unstable_css_imports: false` to analysis paths
- Search workflow, CI, and docs updates for the Algolia migration
