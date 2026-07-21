---
date: 2026-07-20
repo: denoland/deno
size: L
title: "Deno hardens loaders, cache, and HTTP/2"
excerpt: "JSON module mismatches, persistent web cache storage, inspector console bridging, and HTTP/2 backpressure got major fixes."
commits: 21
authors: [nathanwhit, bartlomieju, crowlbot, Hixie, wilkmaciej, divybot, akazwz]
commit_authors: {"2652840": nathanwhit, "9049005": nathanwhit, "e0431ff": nathanwhit, "01c89b8": nathanwhit, "19c7442": nathanwhit, "e471f87": nathanwhit, "8fd04bc": bartlomieju, "5419c02": wilkmaciej, "13ce29b": Hixie, "191a0cb": bartlomieju, "f2ac97c": bartlomieju, "530c088": divybot, "57e67f1": akazwz, "4feb77b": crowlbot, "ac57574": crowlbot, "d7fbd3d": Hixie, "f9ea4e8": bartlomieju, "39f0c9d": crowlbot, "b939e9e": nathanwhit, "f6b2b65": bartlomieju}
---

### **JSON imports are now enforced in both directions** (e0431ff)
`FsModuleLoader` now rejects files that don’t actually resolve to JSON when a JSON module is requested, closing the reverse mismatch that could previously return JavaScript for a JSON import. That makes loader behavior consistent and surfaces a clearer `TypeError` with the real module type and specifier.

### **Resolver loader now blocks non-JSON sources for `type: "json"`** (9049005)
The loader path now checks that modules requested with `type: "json"` really resolve to JSON media, including prepared modules and npm/BYONM loading. This fixes an inconsistency where JavaScript could slip through a JSON import and adds a targeted regression for that mismatch.

### **Cache API storage moves under origin data** (01c89b8)
Web Cache data is no longer stored in a temp directory; it now lives beneath Deno’s origin-data location with per-origin hashed subdirectories. That makes Cache API state persistent in the expected place and tightens the filesystem handling around redirected cache paths.

### **HTTP/2 writes now apply real backpressure** (19c7442)
Node-compatible HTTP/2 stream writes are now queued and completed only after nghttp2 actually frames the bytes, so `Http2Stream.write()` can correctly signal backpressure. The change also cancels queued writes when a stream is destroyed, preventing unbounded native buffering.

### **N-API external string finalizers are synchronized** (e471f87)
External string cleanup was reworked into a single synchronized registry that preserves the right callback/hint pair for each V8 resource and safely handles teardown races. This closes a class of use-after-free and wrong-finalizer issues for external strings.

### **Local `.wasm` imports now type-check correctly** (8fd04bc)
`deno check` and `sync-types` now include local `file://` wasm modules, generating declarations and wiring them into the temporary tsconfig so relative wasm imports resolve. This fixes the spurious “Cannot find module” error for typed local wasm exports.

### **Late-opened inspectors now receive console output** (5419c02)
The main runtime now always bridges `console` into the inspector, instead of only doing so when `--inspect*` was set at startup. That restores `Runtime.consoleAPICalled` events for sessions opened later via `node:inspector` or SIGUSR1, matching worker behavior and improving the debugger experience.

### **`deno fmt` preserves embedded CSS indentation** (13ce29b)
Formatting for multiline embedded CSS custom properties is now stable, preventing indentation churn in formatted output. This is a narrow but user-visible formatting fix.

### **`jsr:` entrypoints now discover config files** (191a0cb)
Entry-point resolution now finds the appropriate config file for `jsr:`-based runs, fixing cases where dependency-age and config discovery logic disagreed. That makes `deno run` behavior more predictable for JSR entrypoints.

### **Outdated/npm updates stop downgrading on stale cache** (f2ac97c)
The lockfile update flow now avoids downgrading packages when the npm cache is stale. That prevents a subtle but important regression in update behavior and keeps dependency resolution moving forward.

### **The extensionless-CJS guard is now tested** (530c088)
Added coverage for the resolver’s extensionless CommonJS binary guard. This is test-only validation of an existing internal rule.

### **React Router desktop HMR is enabled** (57e67f1)
The desktop framework path now enables `--hmr` for React Router. This is a small feature toggle change with limited surface area.

### **DNS queries retry after per-attempt timeout** (4feb77b)
The Node-compatible DNS layer now retries queries when an individual attempt times out. This improves reliability under transient resolver slowness.

### **CI disk usage is reduced before deno_core tests** (ac57574)
The CI workflow now frees disk space before the `deno_core` test job. This is a build/infrastructure tweak to reduce job failures from storage pressure.

### **Type-only dependencies are retained in outdated lockfiles** (d7fbd3d)
The outdated/update flow now keeps type-only dependencies in the lockfile instead of dropping them. This fixes an important dependency-graph edge case for projects that rely on type-only JSR packages.

### **Hot internal hash maps switch to FxHash** (f9ea4e8)
Several frequently used internal maps and sets were migrated to `FxHash`-based hashing for faster lookups. This is a performance-oriented refactor across resolver, checker, and npm-resolution code paths.

### **N-API async sends are canceled after close** (2652840)
Async `uv` work now stops dispatching once a handle is closed, preventing callbacks from racing teardown. That protects against late work running on already-closed native state.

### **npm test registry tolerates malformed advisories bodies** (39f0c9d)
The test npm registry now accepts a bad advisories request body without failing the test harness. This is a test-server robustness fix.

### **Published source rewrites are more tightly constrained** (b939e9e)
The publish/unfurl pipeline got a substantial rewrite to limit when generated source paths are rewritten. That reduces the risk of publishing incorrect or over-transformed source references.

### **Per-file check tsconfigs now live in temp** (f6b2b65)
`deno check` now writes its per-file tsconfig to the system temp directory instead of the project root. This avoids polluting repositories with generated config files.

### Other misc changes
- Dependency bumps and lockfile updates
- CI/build tweaks and workflow edits
- Test-only harness updates and new regression fixtures
- Small internal refactors and helper cleanups
