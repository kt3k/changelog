---
date: 2026-06-19
repo: denoland/deno
size: L
title: "Deno gets faster, smarter tasking"
excerpt: "New Linux desktop installers, lockfile seeding from npm/pnpm, task concurrency flags, and multiple runtime/perf fixes landed."
commits: 13
authors: [bartlomieju, nathanwhitbot, crowlKats, littledivy]
commit_authors: {"818af9c": crowlKats, "7b73526": nathanwhitbot, "b95c621": bartlomieju, "4c74594": bartlomieju, "2c40806": bartlomieju, "678e1ae": bartlomieju, "32fbf2c": bartlomieju, "bb74540": nathanwhitbot, "150d784": bartlomieju, "bf3e0bc": bartlomieju, "dbffba8": littledivy, "fb197b5": nathanwhitbot, "1e9ce15": nathanwhitbot}
---

### **Deno desktop can now emit .deb and .rpm installers** (818af9c)
`deno desktop` now supports Linux package outputs in addition to `.dmg` and `.AppImage`, with `.deb`/`.rpm` selected by the `--output` extension or config. The implementation wraps the same staged Linux app tree in pure Rust, so it can cross-compile from non-Linux hosts as long as the target is Linux.

### **`deno task` gains `--jobs` / `--concurrency`** (b95c621)
Task execution can now be capped with `--jobs`, short `-j`, or the `--concurrency` alias, overriding `DENO_JOBS`. This makes workspace and dependency-parallel task runs controllable from the CLI instead of only via environment configuration.

### **`deno remove --global` becomes a true uninstall alias** (2c40806)
`deno remove` now accepts `--global`/`-g` and routes to the same global uninstall path as `deno uninstall --global`. That fixes the mismatch between the natural symmetric command spelling and the prior behavior, which errored out.

### **`deno install` can seed `deno.lock` from npm and pnpm lockfiles** (150d784, 678e1ae)
First-time local `deno install` now imports pinned dependency state from either `package-lock.json` or `pnpm-lock.yaml` when no `deno.lock` exists. This preserves version and integrity data during migrations from npm or pnpm instead of starting from an empty lockfile.

### **Residual ES module code caching now covers Node bootstrap modules** (fb197b5, 7b73526)
V8 code-cache reads for lazy-loaded ESM residuals were routed through the shared module-loader path, closing a gap that left worker bootstraps recompiling Node-related modules cold. The follow-up extends caching to the remaining `lazy_loaded_esm` set, improving startup and worker initialization performance.

### **Lazy snapshot leakage is now actively guarded** (dbffba8)
The snapshot builder now asserts that the expected set of lazy modules remains unchanged, failing the build if new eager imports pull lazy Node bootstrap code back into the startup path. That protects the startup win from regressions that would otherwise be easy to miss.

### **`Deno.test.*` sub-methods are no-ops under `deno run`** (bb74540)
Calling `Deno.test`/`Deno.bench` sub-methods during `deno run` now does nothing instead of behaving like runnable test registration. This aligns runtime behavior with the fact that the command is not executing the test harness.

### **`deno remove`/task parsing moves to the new CLI parser engine** (bf3e0bc)
The zero-cost CLI parser foundation landed, adding the static command/arg tables, parse engine, and clap-free error handling. This is a major internal step toward replacing clap and sets up the rest of the CLI migration.

### Other misc changes
- Docs: consolidated `Deno.bundle` reference categories (4c74594)
- CI/test: skipped `npm/playwright_compat` on windows-aarch64 (32fbf2c)
- Minor worker bootstrap tweak for Node web-worker separation (1e9ce15)
