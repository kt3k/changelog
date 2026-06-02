---
date: 2026-03-26
repo: denoland/deno
size: L
title: "Deno fixes standalone args, TTY, and crypto edge cases"
excerpt: "A strong day of bug fixes spanning compiled binaries, Windows TTY behavior, publish type checking, and a timing-safe crypto comparison."
commits: 7
authors: [bartlomieju, marvinhagemeister, majiayu000]
commit_authors: {"7250271": majiayu000, "522e071": bartlomieju, "5950fb4": marvinhagemeister, "eb43657": bartlomieju, "3f67ba9": bartlomieju, "d043fd6": bartlomieju, "6a66ea5": bartlomieju}
---

### **Compiled standalone binaries now preserve argv correctly** (6a66ea5, 522e071)
Standalone binaries now set `process.argv[1]` to the executable path, and relaunching CLIs no longer leak that path back into user arguments. This fixes broken argument parsing for self-spawning tools like `@google/gemini-cli` and aligns compiled-binary argv behavior with Node expectations.

### **Windows TTY input/output is rewritten to match libuv** (eb43657)
The Windows `node:tty` path was reworked to restore libuv-like behavior across console mode, raw mode, line mode, and input encoding. This addresses interactive regressions after the earlier tty rewrite, especially around returning from raw mode and handling special keys and Unicode input.

### **`deno publish` now sees `compilerOptions.types` ambient types** (5950fb4)
Type checking during publish now includes `compilerOptions.types` imports without pulling `tsconfig` file entries into the publish graph. That fixes cases like Vite's `import.meta.hot` not type-checking, while still keeping publish input filtering intact.

### **HTTP OTel error handling avoids consuming the same external twice** (3f67ba9)
`op_http_metric_handle_otel_error` now clones the external handle instead of taking ownership of it. This fixes a use-after-take / panic path when both tracing and metrics are enabled and an `onError` handler throws.

### **Secret key equality is now constant-time** (d043fd6)
`KeyObjectHandle::Secret` comparisons switched from normal byte equality to `subtle::ConstantTimeEq`. That closes a potential timing side-channel in `key.equals()` for secret keys.

### **`fs.Dir` now supports disposal protocols** (7250271)
`Dir` implements both `Symbol.dispose` and `Symbol.asyncDispose`, so directory handles can participate in `using` / `await using`. This brings the Node fs polyfill in line with modern resource-management patterns.

### Other misc changes
- Standalone compile tests expanded for argv behavior and self-relaunch cases.
- Windows tty regression tests added for Ctrl-C, raw mode toggling, line mode, arrow keys, and Unicode output.
- Publish type-checking regression tests added for `compilerOptions.types`.
- OTel HTTP regression test added for the double-error path.
- Unit tests added for disposable `fs.Dir`.
- Minor lint-plugin allowance update for `ext/node/polyfills/process.ts`.
