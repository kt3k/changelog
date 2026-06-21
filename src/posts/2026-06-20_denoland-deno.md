---
date: 2026-06-20
repo: denoland/deno
size: L
title: "Test, install, and runtime fixes land"
excerpt: "Built-in snapshot testing, node:test mocks, lockfile seeding, and several bug/perf fixes ship in one busy day."
commits: 18
authors: [bartlomieju, nathanwhitbot, mturac, littledivy, lowlighter, divybot, petamoriken]
commit_authors: {"5967471": divybot, "9855054": bartlomieju, "1a62c3c": bartlomieju, "2ac9a90": bartlomieju, "e38a472": bartlomieju, "e8a9000": lowlighter, "0b96ea9": mturac, "717715a": nathanwhitbot, "dcfb5ed": bartlomieju, "73ba7ce": nathanwhitbot}
---

### **Built-in snapshot testing for `deno test`** (2ac9a90)
`deno test` now supports `t.assertSnapshot(actual, options?)` plus a first-class `--update-snapshots`/`-u` flag. Snapshots use the same `__snapshots__/<test file>.snap` format as `@std/testing/snapshot`, making migration from userland snapshot helpers straightforward.

### **`node:test` gains `mock.module()` support** (e38a472)
Deno's Node compatibility layer now implements `mock.module(specifier, options)` for swapping modules during tests, including ESM `import()` and CJS `require()` paths. The mock context can be restored explicitly and integrates with broader mock reset/restore flows, matching newer Node behavior.

### **`deno install` can seed from `bun.lock`** (1a62c3c)
First-run `deno install` now recognizes a sibling `bun.lock` and can seed `deno.lock` from it, extending the importer chain after npm and pnpm lockfiles. This makes Deno easier to adopt in Bun-based repos without a manual lockfile conversion step.

### **PnPM lock seeding now handles workspaces and `catalog:` deps** (dcfb5ed)
The pnpm importer now walks every importer instead of only the root, so workspace member dependencies are preserved when seeding `deno.lock`. It also resolves pnpm catalog entries, avoiding incomplete or empty seeded locks in monorepos that rely on cataloged versions.

### **Coverage now merges hash/query variants of the same module** (e8a9000)
`deno coverage` now normalizes `file:`, `http:`, and `https:` URLs by stripping search params and fragments before merging ranges. That fixes duplicate partial entries when the same source is loaded as `mod.ts`, `mod.ts?x`, or `mod.ts#y`.

### **`node:test` hook ordering and error handling fixed** (9855054)
The Node test polyfill now runs `before()`/`after()` hooks once per context in the right places, instead of leaking them across subtests. This also improves failure behavior around nested subtests and aligns Deno more closely with Node's hook semantics.

### **Workspace npm members now link into root `node_modules` by name** (717715a)
Workspace members that are themselves npm packages are now symlinked into the root `node_modules` using their real package name. That unblocks external Node tools that resolve through `node_modules` and previously couldn't find bare workspace members.

### **`deno update --lockfile-only` gets stale-cache protection** (73ba7ce)
The outdated/update flow now refetches npm metadata for packages that may move within their existing version ranges, instead of trusting stale cached packuments. This closes a case where `deno outdated` reported an update but `--lockfile-only` failed to advance the lockfile.

### **`node:child_process` IPC no longer panics on empty buffers** (5967471)
Sending zero-length `Buffer`s or typed arrays over advanced IPC no longer crashes the runtime during deserialization. Empty-backed `ArrayBuffer`s are now handled safely instead of unwrapping a null backing store.

### **`deno pack` surfaces slow type diagnostics** (0b96ea9)
Pack now keeps slow type-check diagnostics visible instead of hiding them, which should make packaging failures and type issues easier to diagnose.

### Other misc changes
- Lazy-loading and startup/perf work for `node:buffer`, `node:timers`, and macOS frameworks
- Test fixture/version bumps and test flake annotations
- Smaller install, doctest, and node-worker behavior fixes
