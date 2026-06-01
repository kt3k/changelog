---
date: 2026-05-31
repo: pnpm/pnpm
period: weekly
slug: 2026-W22
period_label: "May 25–31, 2026"
size: L
title: "pnpm adds server-accelerated installs, tighter integrity, and registry parity"
excerpt: "This week brought pnpr server mode, stricter tarball integrity, remote tarball installs, and a big wave of workspace/registry parity work."
commits: 55
---

### Major install-engine advances
**Server-accelerated installs via `pnprServer`** — pnpm can now offload resolution and missing-file calculation to a `pnpr` server, then link `node_modules` locally from the server-produced lockfile. This is the week’s biggest performance-oriented change.

**Remote tarball direct deps now work end to end** — Non-registry HTTPS tarball dependencies can now be resolved, hashed, and recorded correctly in the lockfile, closing a long-standing install gap.

**Lockfile-only installs and filtering flags land** — `--lockfile-only` now works for both `install` and `add`, and new `--filter` / `--filter-prod` selectors begin threading workspace scoping through the CLI.

**Project lifecycle scripts run during install** — `preinstall`, `install`, `postinstall`, `prepare`, and `postprepare` are now executed in pacquet installs, bringing behavior closer to pnpm proper.

### Registry, publish, and trust hardening
**Tarball integrity is now enforced more strictly** — Install now fails closed on lockfile tarball-integrity mismatches by default, with `--update-checksums` as the explicit opt-in path to refresh hashes. Publish also verifies uploaded tarballs against declared integrity before accepting them.

**Registry auth and persistence got real-world behavior** — The mock registry now persists users to htpasswd-style storage and tokens to SQLite with hashed secrets and metadata, making auth flows survive restarts.

**Registry parity and compatibility improved** — pnpm-registry/pnpr gained request logging, ping/auth/profile endpoints, package ACL policy checks, and browser 2FA-compatible dist-tag writes.

**Scoped publish access is preserved correctly** — Scoped packages without an explicit `publishConfig.access` no longer get forced to public on publish.

### Workspace resolution and dependency layout parity
**Hoisting, dedupe, and workspace knobs are being ported** — Fresh installs now work with `nodeLinker: hoisted`, new hoisting limits were added, and pacquet picked up `packageExtensions`, `injectWorkspacePackages`, `preferWorkspacePackages`, `dedupeDirectDeps`, `dedupeInjectedDeps`, `dedupePeers`, `excludeLinksFromLockfile`, and `peersSuffixMaxLength` support.

**Resolution policy settings are honored** — Network config, resolution mode, release-age behavior, and trust-scale handling for staged publishes are now wired through, reducing pnpm-vs-pacquet behavior drift.

**Peer and workspace edge cases were fixed** — A hanging aliased peer install, an inconsistent diamond-shaped peer resolution case, and negated workspace globs were all corrected.

### Other misc changes
- `pnpm-registry` was renamed to `pnpr` across crates, env vars, and workflows
- Test infra switched from external registry-mock to an in-repo registry
- Default lockfile reuse behavior improved when `pnpm-lock.yaml` is missing but `node_modules/.pnpm/lock.yaml` still fits
- Dependency bumps, CI/pre-push cleanup, release housekeeping, and docs/license updates for the new `pnpr`/`pnpm-agent` licensing boundary
