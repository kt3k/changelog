---
date: 2026-10-13
repo: oven-sh/bun
size: L
title: "JSONL fix, formatter/lint gains, TLS hardening"
excerpt: "Major fixes landed for Bun.JSONL, bun fmt/lint, TLS/socket behavior, and a Linux arm64 startup crash; plus several stability test cleanups."
commits: 20
authors: [Jarred-Sumner, dylan-conway, sosukesuzuki, robobun]
commit_authors: {"281698a": Jarred-Sumner, "c69a636": Jarred-Sumner, "9bcbf1e": Jarred-Sumner, "40e0351": Jarred-Sumner, "5ee74f0": sosukesuzuki, "fefca5b": Jarred-Sumner, "1480cbe": Jarred-Sumner, "cd91b5b": Jarred-Sumner, "1c10257": Jarred-Sumner, "110efa0": dylan-conway}
---

### **Bun.JSONL no longer repeats values or misreports read offsets** (281698a)
Fixes a regression where a delimiter or closing bracket immediately after a value could cause `Bun.JSONL.parseChunk`/`parse` to return the same value again and report an incorrect `read` position. The added tests cover blank lines, UTF-16/byte-offset cases, and cached JSON shapes.

### **`bun fmt` now formats Svelte components itself** (c69a636)
Adds native `.svelte` formatting support so Bun no longer depends on Prettier plus `prettier-plugin-svelte` for this case. That removes a setup/runtime dependency and makes formatter behavior more self-contained.

### **TLS/HTTPS no longer spin or drop peer responses after rejected sends** (9bcbf1e, fefca5b)
Fixes a busy-loop/close-handling bug in the TLS send path where a rejected write could leave sockets open while nothing drained, especially in pipelined `node:https` cases. Related `node:tls`/`node:net` changes now preserve a peer’s early response and surface rejected-send context into drain callbacks so writes fail and close in the right order.

### **`bun lint`/`bun fmt` config and CI are now wired through Bun itself** (40e0351, cd91b5b, 1c10257)
Bun’s lint/format tooling picked up native ESLint-plugin loading from `bunfig.toml`, improved error reporting, and CI/doc updates to run the repo’s own formatter and linter. This broadens first-class configuration support and removes more reliance on external toolchain behavior.

### **`bun check` now matches `tsc` better on tricky generics** (1480cbe)
Fixes several differential type-checking cases and a `-b` scenario with many small projects, bringing Bun’s checker closer to TypeScript on edge-case generic inference and project graph handling.

### **Native stream readers now allocate based on remaining blob size** (5ee74f0)
Optimizes byte-backed streams so they pull only the bytes left in the blob instead of over-allocating large slabs. This reduces wasted memory/copying for `Response.body`, `Request.body`, and `Blob.stream()` consumers.

### **Linux arm64 startup crash fixed when the kernel misreports SVE2** (110efa0)
Avoids selecting Highway’s SVE2 path unless the base SVE capability is also present, preventing SIGILL on affected Linux arm64 kernels and VMs. This is a startup reliability fix for a real platform compatibility issue.

### Other misc changes
- Fixed a Windows-specific lint rule-docs test.
- Pruned and reclassified flaky test entries; several flaky tests were stabilized.
- Replaced a Verdaccio-based registry test harness with a Bun.serve-backed one.
- Adjusted CI docs and setup details around formatter/linter commands.
- Small internal test/offline-networking fixes and dependency/version bumps.
