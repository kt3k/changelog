---
date: 2026-05-31
repo: pnpm/pnpm
period: monthly
slug: 2026-05
period_label: "May 2026"
size: L
title: "Major install-engine and supply-chain hardening month"
excerpt: "pnpm added audit signature checks, safer publish/auth flows, and a huge wave of install-engine, registry, and parity work."
commits: 498
---

### **Supply-chain and release hardening**
May brought several high-impact security and release improvements: `pnpm audit signatures` now verifies registry ECDSA signatures, release artifacts moved to macOS-native signing, and provenance attestation was added for published binaries. The month also tightened publish/auth flows with trusted publishing precedence, scoped registry correctness, tarball integrity enforcement, Git-hosted tarball checks, and safer registry/server behavior across the new in-repo registry stack.

### **Install engine parity took a big leap**
The biggest story of the month was the ongoing Rust install-engine work in pacquet. It gained lifecycle script execution, bin linking, side-effects cache read/write, patched dependency handling, hoisted installs, workspace-wide installs, lockfile generation, workspace state persistence, `nodeLinker` support, offline/prefer-offline, lockfile-only mode, filtered installs, and a growing set of pnpm-compatible config knobs. By month end, installs could even be offloaded to a `pnprServer` in an opt-in server-accelerated mode.

### **Resolver, lockfile, and workspace correctness kept filling gaps**
A lot of pnpm behavior was restored or tightened: peer resolution, optional dependencies, workspace protocol handling, package extensions, dedupe rules, catalog/override support, runtime specifiers, git/tarball/file/link resolution, injected workspace deps, and modules-manifest handling. Lockfile behavior also became stricter and more faithful, with better freshness checks, verification caching, `minimumReleaseAge` enforcement, integrity requirements, CRLF-safe parsing, and better handling of combined v11 lockfiles.

### **CLI and user-facing command parity expanded**
Several missing or regressed commands and flags were fixed or added, including `pnpm bugs`, native `pnpm pkg`, `pnpm stage`, `pnpm repo`, scoped login, improved `pnpm view`, `pnpm publish --json`, `pnpm dlx` build approval, and multiple fixes for `ci`, `clean`, `fetch`, `pack`, `self-update`, and global installs. Reporter output and NDJSON events were also expanded so external tooling can consume pnpm-shaped logs more reliably.

### **Network, registry, and Windows compatibility improved**
The fetch/auth stack got more enterprise-friendly with proxy/TLS/auth fixes, safer tarball fetching, registry alias handling, GitLab/Azure DevOps compatibility fixes, and better config loading from env and `.npmrc`. On Windows, the month addressed alias executables, node-gyp permissions, temp-path quirks, symlink behavior, CRLF lockfiles, and several path/drive-root edge cases.

### **Other misc changes**
- More consistent config handling for overrides, minimumReleaseAge, workspace settings, and env vars
- Better self-update behavior and package-manager version policy handling
- Test infrastructure refactors, including the new in-repo registry and registry-server renames
- Numerous CI, workflow, docs, and dependency maintenance updates
