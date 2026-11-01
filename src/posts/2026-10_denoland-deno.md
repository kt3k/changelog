---
date: 2026-10-31
repo: denoland/deno
period: monthly
slug: 2026-10
period_label: "October 2026"
size: L
title: "Security hardening, npm speedups, and checker rollback"
excerpt: "October focused on TLS/security fixes, faster and safer npm installs, and a rollback to the in-process TypeScript checker."
commits: 24
---

### Security and runtime hardening
**TLS trust and decompression safeguards** — Deno removed compromised eMudhra CAs from its trust store, tightening certificate validation for affected connections. It also made `brotliDecompressSync` fail on malformed input instead of returning partial output, aligning it with the async path and fixing a security-relevant compatibility bug.

**Safer core/runtime lifetimes** — Several low-level runtime issues were tightened up, including keeping op contexts alive until isolate teardown to avoid shutdown lifetime hazards and hardening `napi_create_dataview` against overflow edge cases. Core primordials coverage was also expanded for `SharedArrayBuffer`-related access.

### npm and package-management improvements
**Faster installs and better metadata fetching** — npm resolution now more intelligently uses abbreviated packuments when safe, reducing registry payloads without breaking minimumDependencyAge behavior. Deno also started persisting a filtered lockfile copy inside `node_modules`, making package reuse faster and more resilient when the workspace lockfile is missing.

**Installer correctness fixes** — The npm installer now validates package link names more carefully, and related cache/path plumbing was refactored to support the new metadata selection flow. These changes improve robustness across hoisted and local install scenarios.

### Tooling, compatibility, and workflow changes
**TypeScript checker rollback** — Deno reverted the native tsc migration and restored the in-process TypeScript checker as the default for `deno check`, bringing back the previous behavior for watch mode, docs validation, and diagnostics/spec outputs.

**Node compatibility and developer ergonomics** — Work also landed to improve Node assert formatting, ignore N-API return values after exceptions, fix completion for bare `deno run` scripts in zsh, and reduce allocations on hot paths by reusing shared empty option objects.

### Deploy and release updates
**Deployment schema gains new limits** — Deploy config now supports explicit build timeouts and runtime memory limits, with a deprecated snake_case alias retained for compatibility.

**Release automation tightened** — Release promotion now reads the Cloudflare zone ID from secrets instead of vars, and the upgrade/help text was updated to include `lts`.

### Other misc changes
- Fetch/networking fixes, including an idle-connection cleanup issue in the hyper stack.
- Node/TLS certificate fixture updates and assorted OpenSSL-aligned X.509 handling changes.
- Dependency bumps and lockfile refreshes across rustls, quinn-proto, xxhash-rust, brotli, and TLS/crypto packages.
- CI/workflow cleanup, including disabling recurring Slack reports for some compatibility jobs.
