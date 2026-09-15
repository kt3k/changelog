---
date: 2026-09-14
repo: oven-sh/bun
size: L
title: "Bun hardens streams, bundler, and stack traces"
excerpt: "Major fixes for QUIC, shell errors, stream memory, bundler splitting, and several crashers in error/stack handling."
commits: 49
authors: [robobun, Jarred-Sumner, steipete, dylan-conway]
commit_authors: {"5041715": robobun, "9675412": robobun, "90fba66": robobun, "c00dd11": robobun, "8f499ee": robobun, "2d89eb8": robobun, "6764ffc": robobun, "90ed911": robobun, "0b7b77e": robobun, "b786d9b": robobun, "c9bdae4": steipete, "2f09e6d": dylan-conway, "04823d8": robobun, "9598dcb": robobun, "6e1eefa": robobun, "d513feb": robobun, "f7c1430": robobun, "8dd787c": robobun, "6c45f50": robobun, "d27fef0": robobun, "ae71791": robobun, "8197c98": robobun, "a5e0d87": robobun, "e471c82": robobun, "de28167": robobun, "b820c70": robobun, "731a117": robobun, "3c96edb": robobun, "5fce36e": robobun, "ee7e565": robobun, "fa6fed2": robobun, "44c528d": robobun, "64689a3": Jarred-Sumner, "86771d0": Jarred-Sumner}
---

### **QUIC now handles send failures without spinning** (e471c82)
HTTP/3 packet sending now distinguishes backpressure, oversized datagrams, and other kernel send errors instead of treating them all the same. That prevents the engine from busy-looping on send failures and lets QUIC recover or retire packets correctly.

### **Shell pipelines now unwind correctly on JS exceptions** (d513feb)
When a shell pipeline member throws, Bun now rejects and stops the pipeline instead of leaving subprocesses and pipes alive. This fixes hangs and leaked execution after JS errors in shell expressions.

### **CompressionStream finally honors quality/level options** (c00dd11)
`CompressionStream` now parses and applies a real compression level for brotli, zstd, and zlib formats instead of always using the built-in defaults. That brings the Web API closer to Node behavior and removes a major performance trap for brotli.

### **S3 uploads release buffered data as they go** (a5e0d87)
Streamed S3 writes now drop consumed prefixes of the internal buffer instead of retaining the whole payload in memory until completion. This materially lowers RSS for large uploads and avoids OOMs on memory-constrained processes.

### **Bundler splitting and CJS handling get correctness fixes** (64689a3, 6764ffc, de28167, 0b7b77e)
The bundler got multiple high-impact fixes: chunk-folding now has differential checks, split `import()`/`require()` edges are reported accurately in metafiles, deferred barrel optimization is undone only where needed, and per-chunk renamers stop retaining unnecessary rows. CommonJS default-import wrappers are also preserved when code depends on them as values, fixing observable behavior around property defines, deletes, and frozen modules.

### **Stack traces and error messages stop aborting on long strings** (9598dcb, 04823d8, f7c1430, 8dd787c, d27fef0)
Bun hardened multiple error-path crashers: oversized stack traces and error messages now throw instead of aborting, stack-frame lifetimes are preserved while `Error.prepareStackTrace` runs, `CallSite.getFunction()` no longer hands out unsafe internal functions, and pending exceptions survive GC during stack-trace finalization. Together these close several real crash and memory-corruption cases in error handling.

### **Node compatibility fixes across vm, tls, sqlite, fetch, and streams** (2d89eb8, 8f499ee, c9bdae4, 5fce36e, 5041715, 44c528d, 731a117, fa6fed2, ee7e565, 6c45f50, 3c96edb, b820c70)
This batch tightens Node compatibility in a number of APIs: `node:vm` constructors, TLS peer-reset reporting, worker reuse of custom SQLite libraries, `node-fetch`/`undici` stream completion, reusable response bodies, empty-body `json()`, subclassable `StringDecoder`, `newTarget` handling for several native constructors, and `TextEncoder.encodeInto` typings. There are also related fixes in error-message rendering and cached bytecode plumbing.

### **More reliability fixes in test runner, fs, postgres, and the runtime** (90fba66, 90ed911, 9675412, b786d9b, 6e1eefa, ae71791, 2f09e6d, 86771d0, 8197c98)
Other notable fixes include keeping NAPI envs alive through `bun test`, validating proxied registry origins with the right CA config, matching Node’s behavior when Linux syscalls are unavailable, preserving numeric scale in binary Postgres `NUMERIC` decoding, fixing deep TOML stringify crashes, reducing outdated-command overhead, re-landing build-system checks, and cleaning up worker teardown / TLS-context eviction edge cases.

### Other misc changes
- Docs updates for hot mode, module resolution, node compatibility, and Docker Alpine image
- CSS module export for `view-transition` pseudo-elements
- Minor postgres/sqlite/type-definition/test adjustments
- Misc build, CI, and internal refactors
