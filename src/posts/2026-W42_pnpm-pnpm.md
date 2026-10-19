---
date: 2026-10-18
repo: pnpm/pnpm
period: weekly
slug: 2026-W42
period_label: "Oct 12–18, 2026"
size: L
title: "pnpm adds faster Python installs, new registry tooling, and pnpr hardening"
excerpt: "This week brought major Python install speedups, registry account/token commands, pnpr auth/storage/security upgrades, and a wave of resolver fixes."
commits: 195
---

### Major install and resolution improvements
**Python dependency resolution got much faster** — pnpm now uses PEP 658 metadata and parallel index/metadata fetching, cutting wheel downloads and speeding up lockfile generation. Follow-up fixes improved read-ahead error handling and PATH setup for Python backend hooks.

**Installs and repeat-installs were optimized across the board** — daily update checks no longer block installs, store verification overlaps resolution, repeat-install warm-up skips lockfile-reused subtrees, Git refs are memoized per install, and shared store-index reads are less serialized.

**Resolver correctness saw a large round of fixes** — the week tightened peer handling, injected-package and workspace-relative override behavior, frozen-lockfile checks, lockfile reuse, gist dependency resolution, and filtered-install edge cases.

**Install safety was hardened** — pnpm now enforces tarball unpack size limits, records tar hashes instead of relying on registry revisions, and fixes several tarball/registry URL and scoped-registry mismatches.

### New CLI and workspace capabilities
**pnpm gained registry account and token management** — `pnpm profile` and `pnpm token` are now first-class commands for profile settings, 2FA flows, and auth token lifecycle management.

**Workspace config can be split across included files** — `pnpm-workspace.yaml` now supports `include`, making large workspace configs easier to compose and manage.

**Self-update, prune, deploy, and pack flows were polished** — pinned self-updates behave correctly under external managers, `prune` now honors `trustLockfile`, deploy accepts safe `file:` deps outside the lockfile dir, and pack/publish now match npm more closely on ignore rules and junk-file filtering.

### pnpr had a very large feature and hardening week
**pnpr gained production-ready auth and ops features** — browser SSO login, audit logging, metrics, request IDs, health probes, graceful shutdown, rate limits, request timeouts, cache eviction, and provenance/attestation support all landed.

**Storage and registry behavior were significantly expanded** — pnpr introduced a new hosted-store layout with a migration path, added ecosystem path prefixes, implemented ownership/maintainer/tombstone handling, and improved packument caching plus zstd support.

**Security and auth were tightened** — reserved usernames are blocked, token scopes/expiry/read-only access were expanded, auth files get safer permissions, and publish/attachment handling was hardened against edge cases.

### Other misc changes
- Native shim, Windows toolchain, macOS worker, and broken-pipe stability fixes
- Resolver refactors and workspace pipeline cleanup
- Config, docs, CI, and test coverage updates
