---
date: 2026-07-31
repo: jsr-io/jsr
period: monthly
slug: 2026-07
period_label: "July 2026"
size: M
title: "Security hardening and docs access tightened"
excerpt: "July focused on stronger publish provenance, Turnstile-protected login, and limiting docs/diff/search behavior."
commits: 4
---

### Security and trust improvements
**Publish provenance now binds to the actual tarball bytes**  
Publish records now store the SHA-256 of the uploaded tarball, and provenance verification compares attestation digests against that hash instead of just package name/version. Verification now fails closed if the publish-time hash is missing, closing a mismatch gap.

**Login is now protected by Cloudflare Turnstile**  
The login initiation flow switched to a POST that validates a Turnstile token server-side before creating OAuth state. This removes the old direct-redirect bypass and uses a 303 redirect to preserve the intended browser flow.

### Product surface reduced and constrained
**Docs are limited to the latest release**  
Older version docs now return an error/404-style response, with redirect behavior centralized around the newest published version. This narrows the docs surface to the current release only.

**Diff pages were disabled, and symbol indexing was turned off**  
The diff feature was removed from navigation and routing behind a flag, while keeping the code available for future reactivation. Publishing also stopped sending symbol data to Algolia, reducing search indexing work while that path is disabled.

### Other misc changes
- DB schema and query updates for tarball-hash storage and latest-version lookups
- New API error variants and route guards for the docs/diff changes
- Frontend, config, secrets, and Terraform updates for Turnstile and login UI
- Fixture/test cleanup and minor style/build adjustments
