---
date: 2026-10-31
repo: pnpm/pnpm
period: monthly
slug: 2026-10
period_label: "October 2026"
size: L
title: "pnpm’s October: safer installs, faster resolution, bigger plumbing"
excerpt: "October brought major install and resolver hardening, remote caching, new toolchain/package commands, plus a big pnpr expansion."
commits: 766
---

### Major install, resolver, and workspace correctness work
**Install behavior got much stricter and more reliable.** pnpm fixed a long list of edge cases around frozen/filtered/hoisted installs, repeat-install freshness, workspace peer resolution, injected packages, deploy, prune, and `pnpm run`/`exec` plumbing. Notable fixes included preserving workspace packages during filtered hoisted installs, keeping catalog and patched dependency data intact, relinking missing `workspace:`/`link:` deps, honoring `verifyDepsBeforeRun` with forwarded config flags, and making repeat installs notice more of the settings and inputs that affect reuse.

**The resolver and lockfile logic were hardened across many paths.** Changes tightened config dependency handling, `minimumReleaseAge`, catalog pruning, `file:` and gist resolution, registry alias normalization, tarball URL validation, package selector behavior, and peer/provider reuse. Several fixes also reduced false lockfile mismatches and stale fast-path decisions.

**Store and filesystem correctness improved.** pnpm landed repairs for global virtual store slots, store prune safety, symlink/hardlink edge cases, Windows/macOS filesystem quirks, and more deterministic deploy/install file writes. It also added safer handling for unreadable workspace settings, symlinked `node_modules`, and stale `.bin` shims.

### Performance and install throughput
**Metadata, repeat installs, and bin linking got faster.** pnpm reduced redundant packument work, memoized Git lookups, overlapped store verification with resolution, skipped unnecessary warm-up and resolution passes, and sped up `.bin` creation by precalculating package bin metadata. Large workspaces should see less wasted I/O and process overhead.

**Loaded-linker and cache paths were optimized.** The experimental loaded linker got correctness fixes and support for real projects, while install and resolver paths were tuned to reuse cached metadata, avoid reprocessing completed work, and reduce repeated filesystem traversal.

### New capabilities and CLI surface
**New package-management commands and protocols landed.** pnpm gained first-class `profile` and `token` commands, `--env-file` support, `tool:` protocol support for managed runtimes, and Rust toolchain provisioning via `pnpm add rust` / `pnpx --package=rust@<channel>`. It also added support for `pnpm login` / `dist-tag` OIDC flows and improved `self-update` handling for externally managed installs.

**Global and workspace flows became more flexible.** `--workspace-concurrency Infinity` works again, `failIfNoMatch` can come from workspace config, `pnpm setup` and self-update flows were made more robust, and global installs now use the global virtual store more consistently.

### Security and networking hardening
**Several security fixes landed in install, prune, and publish paths.** The month included credential-leak fixes on redirects, stricter tarball and lockfile validation, path traversal protections in the global virtual store and store prune, audit/provenance/auth hardening, and local patches for vulnerable transitive dependencies. pnpm also tightened registry and proxy handling for bootstrap, audit signatures, and tar registry downloads.

**Network behavior improved under real-world registry setups.** pnpm now handles TLS-close edge cases, registry redirects, per-registry concurrency, conditional revalidation, and uncacheable metadata better. That should reduce failures and repeated downloads on mirrored or proxied registries.

### pnpr grew into a much larger registry platform
**pnpr saw the biggest expansion of the month.** It added admin APIs for users, teams, rules, owners, tokens, audit logs, metrics, request IDs, health probes, cache controls, OIDC/browser login, provenance and audit endpoints, and multiple storage/layout overhauls. Several changes also improved cacheability, request coalescing, auth backends, and deployment guidance, turning pnpr into a much more capable hosted-registry system.

### Other misc changes
- Pack/publish/deploy file-selection parity work, including ignore rules, brace expansion, nested ignores, and symlink handling.
- Cargo and Python flows got meaningful upgrades, including faster Python metadata resolution, better Cargo update behavior, and more reliable runtime/toolchain handling.
- Numerous Windows/macOS compatibility fixes, CI/workflow updates, docs cleanup, and release-management changes.
