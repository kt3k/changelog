---
date: 2026-07-19
repo: pnpm/pnpm
period: weekly
slug: 2026-W29
period_label: "Jul 13–19, 2026"
size: L
title: "pnpm hardens release flow while closing install parity gaps"
excerpt: "Release publishing was reworked and many install/resolution edge cases were fixed, while the Rust CLI gained more native commands and parity."
commits: 147
---

### **Release flow and publishing were substantially reworked**
pnpm moved changelog composition to publish time, unifying native release/versioning across TS, Rust, and pnpr and dropping `@changesets/cli`. The release pipeline also got stronger checks: tarballs are verified against built sources before publish, GitHub release notes are generated from pending changelog data, and multi-tag publishes are scoped to the right product and commit. README metadata now ships again, and pack/publish handling was tightened to better match npm.

### **Rust CLI parity expanded across several commands**
Pacquet gained native implementations for `clean`, `purge`, `owner`/`owners`, `licenses`, and `install-test`/`it`, plus deprecate/undeprecate and star/stars/unstar workflows. `pnpm setup` and `self-update` were also fixed to behave correctly in the native path, including verifying newly installed binaries before switching and keeping lockfile pins aligned with resolved versions.

### **Install, resolver, and lockfile correctness got a big pass**
A large set of fixes landed around dependency resolution and frozen installs: multi-selector `add` now carries all selectors through, `pnpm add`/`update` respect minimum release age, exact version pins survive updates, git specifiers and symlinked lockfiles are handled more safely, and workspace importer drift is detected earlier. Peer dependency handling was broadened to accept scheme-carrying specifiers, optional peers now hoist correctly, and fresh installs enforce engine constraints more consistently.

### **Windows and filesystem behavior improved noticeably**
Several Windows-specific install failures were fixed, especially around scoped symlink paths, global virtual store links, and junction creation under contention. pnpm also hardened repeat-install freshness checks, repaired dangling parent junctions, and improved handling of cached reparse points so installs are less likely to break or leave stale links behind.

### **Performance, caching, and networking fixes**
`pnpm add` now resolves multiple selectors concurrently, metadata caching was tightened to reduce memory retention, and resolver flows were made more resilient when cached packuments disappear after 304 responses. On macOS, DNS resolution now respects scoped DNS/VPN setups, and proxy/auth handling was cleaned up so registry and token configuration flows are more reliable.

### **Other misc changes**
- Reporter prompts and install stats rendering were fixed for better interactive output
- `pnpm run --sequential` returned and regex script ordering became deterministic
- `pnpm clean`/`purge` protections now prevent deleting virtual-store data outside the project root
- CI, release automation, lockfile metadata, docs/help text, and test-fixture updates
