---
date: 2026-06-21
repo: denoland/deno
period: weekly
slug: 2026-W25
period_label: "Jun 15–21, 2026"
size: L
title: "Deno expands desktop packaging, test control, and Node compat"
excerpt: "Desktop installers arrive for Linux and Windows, tests get retries/sharding/snapshots, and Node/npm compatibility keeps improving."
commits: 102
---

### **Desktop app packaging becomes a first-class CLI feature**
Deno desktop broadened rapidly this week: it landed as a new app-builder command, gained `.deb` and `.rpm` outputs for Linux, and added Windows `.msi` installers. The packaging flow now covers macOS, Linux, and Windows with Rust-based authoring and CI/runtime support, making Deno a more complete desktop distribution story.

### **The test runner and Node test polyfill get much more capable**
`deno test` picked up retries, repeats, sharding, and built-in snapshot testing with `--update-snapshots`, giving teams better tools for flaky or large suites. On the Node side, `node:test` now handles unhandled rejections, timeouts, hook ordering, and `mock.module()`, closing several compatibility gaps with newer Node behavior.

### **CLI and task workflows move closer to npm parity**
`deno task` gained `--if-present`, `--jobs`/`--concurrency`, and fuller npm lifecycle/process env vars, while `deno run`/`package.json` scripts now behave more like npm scripts. Local package workflows also improved with `deno link`/`unlink`, bare-specifier resolution for linked packages, and better hints when workspace or linked imports are misspelled.

### **Performance and startup work land across runtime and tooling**
This week brought meaningful startup wins, including a faster `deno run` hot path, lazy-loading refinements that cut measured startup time, and residual code caching for Node bootstrap modules. macOS binaries also switched to chained fixups for faster launch, and `deno upgrade` now streams zstd delta patches to reduce memory spikes.

### **Networking, permissions, and runtime correctness tighten up**
Connection setup now uses Happy Eyeballs for faster dual-stack dialing, `deno serve` exits cleanly on signals, and several permission checks were made more accurate for network and proxy requests. Other notable fixes include safer socket shutdown, better HTTP/2 behavior, preserved async context in Node callbacks, and a stable `--unsafe-proto` escape hatch for prototype access.

### **Node/npm compatibility keeps filling in edge cases**
Compatibility improvements touched `node:http`, `node:net`, `node:child_process`, `util.styleText`, AsyncLocalStorage, Node-API v10, and package/bin resolution. Deno also now warns on `engines` mismatches during install, seeds `deno.lock` from npm/pnpm/bun lockfiles, and symlinks workspace npm members into root `node_modules` correctly.

### Other misc changes
- `Deno.watchFs` gained an `ignore` option and Jupyter now surfaces cell errors
- Coverage can enforce minimum thresholds and merges URL variants correctly
- Desktop/runtime unpacking, snapshotting, and install/update edge cases were fixed
- Internal CLI parsing was split toward a new parser crate, laying groundwork for replacing clap
