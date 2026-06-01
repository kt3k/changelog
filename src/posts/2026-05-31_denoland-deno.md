---
date: 2026-05-31
repo: denoland/deno
size: L
title: "Compile gets bundling; Node compat widens"
excerpt: "Deno adds experimental compile bundling plus several Node-compat fixes, including new builtins, export conditions, and subprocess behavior."
commits: 24
authors: [divybot, bartlomieju, fibibot, lunadogbot]
commit_authors: {"3393603": fibibot, "8589480": divybot, "d11c5d0": divybot, "0d99a42": divybot, "4ec12da": bartlomieju, "4937b0e": lunadogbot, "e832fa7": bartlomieju, "e3a9cc5": divybot, "847e6a9": divybot, "fb5ad03": divybot, "2dde118": divybot, "7085ad4": divybot, "17e4d5e": divybot, "b4cdf8e": divybot, "5c6094e": divybot, "902ba73": divybot, "7b5bada": divybot}
---

### **Experimental `deno compile --bundle` ships a smaller entrypoint** (4ec12da)
`deno compile` can now bundle the entrypoint with esbuild before embedding it, instead of packing the full `node_modules` tree. That should cut binary size and startup cost for many apps, though it’s explicitly experimental because dynamic import/require cases still aren’t fully handled.

### **`deno compile` stops failing on embedded assets with unresolved imports** (e832fa7)
Files passed through `--include` are now treated as best-effort embedded assets instead of strict graph roots, so unresolved imports inside pre-bundled JS, Wasm, or JSON no longer break compilation. This fixes a regression that made some asset-heavy builds impossible.

### **`node:module` gains more of Node’s API surface** (fb5ad03, 2dde118, 902ba73, 8589480)
Deno added `stripTypeScriptTypes`, `findPackageJSON`, `syncBuiltinESMExports`, and the `SourceMap` named export to `node:module`. These additions close compatibility gaps for code that depends on newer or less-common Node module APIs.

### **`node:test` now includes reporters and safer preview behavior** (e3a9cc5, 847e6a9, 7085ad4)
The runtime now exposes `node:test/reporters`, and the REPL preview path was reworked to use V8’s `throwOnSideEffect` probe so evaluating expressions doesn’t accidentally execute them. There’s also a regression lock for `describe.only()` so it won’t trigger a false “only” failure.

### **`deno test` no longer gets killed by stray top-level `Deno.exit()`** (5c6094e)
Calling `Deno.exit()` outside a test body now terminates only the isolate instead of killing the whole test runner process. That prevents buffered results from being lost and fixes cases where failing tests could appear to pass.

### **Classic blob workers and compiled blob URLs work better** (b4cdf8e, 3393603)
Classic blob workers now load their main script directly, and compiled binaries can resolve blob URL modules/worker entrypoints too. These fixes close a couple of long-standing compile/runtime gaps around blob-based workloads.

### **Node resolver and npm handling get compatibility fixes** (0d99a42, 7b5bada, d11c5d0, 4937b0e)
The resolver now honors the `module-sync` export condition, `@latest` can fall back under release-age limits, Windows child_process spawn now respects `windowsHide`, and compile-time npm flattening handles registry sub-paths. Together these address several real-world package and process-compat issues.

### **Native addons get more libuv polyfills** (17e4d5e)
Deno now exports libuv thread and semaphore primitives for native addons that link directly against libuv. That should unblock more Node native extensions that previously died on missing `uv_*` symbols.

### Other misc changes
- Better doc-lint diagnostics for non-ASCII symbols
- `respondWith()` now rejects Response-like objects instead of crashing
- Listener close/accept docs clarified; regression tests added
- `vm.SourceTextModule` default import regression test
- Stronger scrypt regression coverage
- Misc compile/test/spec updates and flaky test marking
