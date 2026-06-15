---
date: 2026-06-14
repo: pnpm/pnpm
period: weekly
slug: 2026-W24
period_label: "Jun 8–14, 2026"
size: L
title: "pnpm hardens supply chain and accelerates installs"
excerpt: "A week of security hardening, pacquet parity work, faster installs, and new publish/link capabilities."
commits: 93
---

### **Security and trust boundaries tightened**
pnpm added several defenses around untrusted inputs and artifact execution: Node.js runtime downloads are now signature-verified, package-manager bootstrap metadata is hardened against repo-controlled `.npmrc` influence, registry/env expansion is trust-aware, and package binaries are verified before execution. The week also closed traversal/reserved-name issues in global bin handling, staged tarball downloads, hoisted alias joins, and patch removal.

### **pacquet gets much closer to pnpm parity**
pacquet picked up major feature and correctness work: it now supports `configDependencies`, applies overrides during fresh resolution, writes `patchedDependencies` and `pnpmfileChecksum` into lockfiles, and matches pnpm’s runtime dependency formatting more closely. Resolver behavior was also aligned around peer handling, peer context reuse, catalog freshness, deprecated entry reuse, scoped registries, optional/platform metadata, and Windows/musl quirks, reducing lockfile drift and install mismatches.

### **Installs are faster and more flexible**
Several fast paths landed across the installer: cold metadata parsing moved off reactor threads, default network concurrency was raised, repeat installs can restore a missing lockfile from `node_modules`, manifest-mtime checks avoid unnecessary lockfile parsing, and frozen-lockfile verification now runs in parallel with fetch/link work. pnpm also gained `--frozen-store` for read-only package stores, making Nix/OCI-style setups viable.

### **New user-facing flows and CLI improvements**
Recursive publish now supports opt-in `--batch` mode for one-request publishes with all-or-nothing behavior. `pnpm link` gained `--trust-lockfile`, `pnpm view` now shows deprecations and bin info, scoped registry auth can be selected by both URL and package scope, and `pnpm setup` avoids unnecessary `@pnpm/exe` build scripts. A deprecation warning also nudges users away from `$` override references toward catalogs.

### **Platform and stability fixes**
pnpm fixed optional dependency detection when registries omit platform metadata, made Windows command failures exit promptly instead of hanging, preserved executable bits on pacquet copy fallback, and stabilized several lockfile and virtual-store behaviors on Windows. Determinism work also landed for peer dedupe and locked-peer pinning, cutting down on machine-dependent lockfiles and intermittent `dedupe --check` failures.

### Other misc changes
Release metadata and changelog refreshes, CI/test harness tweaks, lint/style cleanup, docs clarifications around store/security assumptions, and assorted dependency bumps and minor internal refactors.
