---
date: 2026-10-25
repo: denoland/deno
period: weekly
slug: 2026-W43
period_label: "Oct 19–25, 2026"
size: M
title: "Deno tightens TLS and Brotli validation, adds npm cache resilience"
excerpt: "This week brought security hardening in TLS and Brotli, plus npm install caching improvements and a few runtime/install fixes."
commits: 11
---

### Security hardening in TLS and Brotli
**TLS trust store updated to drop compromised eMudhra CAs** — Deno now distrusts affected certificate authorities, tightening certificate verification for impacted connections.

**`brotliDecompressSync` now rejects malformed input** — Sync Brotli decompression now errors on invalid streams instead of returning partial output, matching the async path and improving Node compatibility and safety.

### Runtime and installer robustness
**Op contexts stay alive through isolate teardown** — A core lifetime bug was fixed so op contexts remain valid until V8 isolate disposal fully completes, avoiding shutdown-time use-after-free hazards.

**npm linking validates package names more safely** — The installer now validates link names separately from path construction, making symlink creation more robust across hoisted and local installs.

### npm install caching and release workflow tweaks
**Lockfile copies are now persisted under `node_modules`** — npm installs cache a filtered lockfile copy in `node_modules`, helping reuse packages when the workspace lockfile is missing and improving install/script resilience.

**Release automation now reads Cloudflare zone ID from secrets** — The CDN purge step in release promotion was switched to secret-backed configuration for tighter handling of deployment data.

### Other misc changes
- Bumped `rustls` and `quinn-proto`, plus related Cargo.lock refreshes.
- Forwarded the v2.9.8 release commit to `main` and refreshed generated CI/version metadata.
- Added `lts` to `deno upgrade` usage text.
- Disabled recurring Slack reports for ecosystem/node compat workflows.
