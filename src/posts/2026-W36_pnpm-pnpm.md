---
date: 2026-09-06
repo: pnpm/pnpm
period: weekly
slug: 2026-W36
period_label: "Aug 31 – Sep 6, 2026"
size: L
title: "pnpm adds pipeline, multi-ecosystem registries, and speedups"
excerpt: "Major week for pnpm: new CI/task pipeline, Cargo and Python registry support, plus broad install, shim, and resolver fixes."
commits: 180
---

### **Big new surface area for CI and multi-ecosystem workflows**
This week’s biggest change is `pnpm pipeline`, which brings task-graph execution, affected-project selection, caching, cache replay, and run reporting into pnpm’s core workflow tooling. In parallel, pnpr grew into a multi-ecosystem registry server: Cargo and Python registries can now be served, resolved, and published alongside npm, including crash-safe multi-ecosystem publishes and shared Cargo compiler caches.

### **Install, resolve, and workspace performance improved across the board**
A lot of work went into shaving time off large workspace operations. pnpm now parallelizes workspace discovery, lockfile rendering/serialization, freshness checks, importer drift checks, and parts of install tail work; it also avoids redundant relinking, hashing, path normalization, and manifest rereads in warm restores. Several fixes keep repeat installs on the fast path, including local tarballs, warm virtual-store restores, and stale build-marker handling.

### **Registry, auth, and networking behavior got more correct**
pnpm and pnpr now honor URL-scoped auth more consistently across Node, Cargo, and Python downloads, and Linux/Windows networking was adjusted to use system DNS behavior instead of custom resolver paths that caused CI, firewall, or private-DNS problems. Registry parsing and publish flows were also hardened, with better handling for 2FA/OTP unpublish flows, more tolerant manifest decoding, and safer pnpr routing and browser-UI support.

### **Shims, runtime, and script execution were overhauled**
Global runtime and command shims moved toward native executables and dispatcher removal, fixing environment-variable preservation and making upgrades between older pnpm 12 installs and newer releases smoother. Script execution also became more consistent: regexp-selected scripts now run with workspace concurrency, filtered recursive scripts stay in the foreground, and pnpmfile hooks now apply to `run`, `exec`, and `rebuild` as well.

### **Import, audit, deploy, and lockfile correctness fixes**
`pnpm import` is stricter and smarter about source lockfiles, preserving versions and correctly handling workspace imports and configured lockfile directories. `pnpm deploy` gained better workspace/peer handling and a large performance boost from reusing workspace indices. Audit and patching also got important fixes, including safer `audit --fix update` behavior, correct ignored-advisory summaries, and CRLF/zero-context patch handling.

### **Other misc changes**
- `pnpm add` now handles alias-less local, tarball, URL, and protocol-prefixed specs more reliably
- `minimumReleaseAge` explicit configs now default to strict enforcement
- Versioning moved onto the release engine with `pnpm change check`
- Windows/macOS-specific fixes for shims, DNS, setup, symlink handling, and clonefile/import races
- Numerous dependency bumps, docs updates, and test coverage additions
