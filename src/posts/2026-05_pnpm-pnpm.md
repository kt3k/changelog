---
date: 2026-05-31
repo: pnpm/pnpm
period: monthly
slug: 2026-05
period_label: "May 2026"
size: L
title: "pnpm adds server installs, registry hardening, and workspace parity"
excerpt: "May focused on major install/runtime parity, stricter integrity checks, a new server-assisted mode, and big registry improvements."
commits: 55
---

### **Install engine parity jumps forward**
Pacquet picked up several core pnpm behaviors: fresh installs with `nodeLinker: hoisted`, workspace filters, `--lockfile-only`, lifecycle scripts during install, network config wiring, resolution policy settings, and workspace preference/dedupe knobs. It also gained support for `injectWorkspacePackages`, `packageExtensions`, `excludeLinksFromLockfile`, `dedupePeers`, and peer-suffix length controls, closing many compatibility gaps and changing lockfile/install output for real-world workspaces.

### **New server-assisted install mode**
A new opt-in `pnprServer` mode offloads dependency resolution and missing-file calculation to a `pnpr` server, then links `node_modules` locally from the server-produced lockfile. This is the month’s biggest performance-oriented change and sets up faster installs without changing the final on-disk result.

### **Registry and publish flow become much stricter**
The in-repo registry gained request logging, health checks, ACL/policy enforcement, persistent users/tokens, and tarball integrity verification on publish. On the client side, publish/access handling was fixed for scoped packages, dist-tag writes were made 2FA-compatible, and remote tarball direct dependencies now resolve end to end with proper sha512 integrity recorded.

### **Integrity and trust checks now fail closed**
Install-time tarball integrity mismatches now error by default, with `--update-checksums` as the explicit escape hatch. Trust scoring was also tightened so staged publishes count as the strongest signal, and frozen-lockfile behavior was hardened around remote tarball and registry metadata changes.

### **Correctness fixes for dependency resolution**
Several nasty edge cases were resolved, including hanging aliased peer installs, inconsistent peer resolution in diamond graphs, stale excluded-package metadata, and workspace glob negation parsing. These fixes reduce deadlocks, version drift, and surprising workspace selection behavior.

### **Other misc changes**
Renamed `pnpm-registry` to `pnpr`, moved registry/auth state to disk, replaced the external registry mock with an in-repo fixture, relicensed `pnpm-agent` and `pnpr` under PolyForm Shield, and shipped routine dependency, CI, test, and release housekeeping.
