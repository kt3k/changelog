---
date: 2026-11-07
repo: oven-sh/bun
size: L
title: "Bun lands rewritten AOT compiler and hardened downloads"
excerpt: "Major AOT compiler plumbing arrives, alongside build-time integrity checks for downloaded toolchain artifacts."
commits: 2
authors: [Jarred-Sumner, dylan-conway]
commit_authors: {"2596ac5": Jarred-Sumner, "7ca0042": dylan-conway}
---

**Rewritten ahead-of-time compiler lands on the Bun side** (2596ac5)
Bun now includes the new AOT lowering pipeline that the engine-side rewrite reads: it writes the program for scan/link/walk, copies captured values into closures when safe, joins straight-line blocks, and handles CommonJS/ES module graphs. This is a substantial compiler refactor that underpins the rewritten ahead-of-time compiler work and comes with new bench tooling plus expanded AOT docs.

**Verify xwin archives before unpacking** (7ca0042)
The Windows sysroot bootstrap now checks the downloaded xwin tarball's sha256 before extraction, stores the cache under a hash-qualified directory, and rejects non-Linux hosts with a clearer error path. The same shared sha256 helper is reused for Ninja downloads, reducing the chance of a poisoned or corrupted build artifact slipping through.

### Other misc changes
- Updated completion/docs/snippets for the new AOT compiler flow.
- Added build/test coverage around pack/publish and download retry behavior.
- Misc build script and config tweaks, plus minor ignore-list updates.
