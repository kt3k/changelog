---
date: 2026-03-06
repo: denoland/deno
size: L
title: "Deno tightens Node compat and dotenv support"
excerpt: "Big Node-compat fixes landed for workers, crypto, fs, stdio, and env-file substitution, plus an npm tarball perf win."
commits: 15
authors: [bartlomieju, dsherret, Tango992, crowlKats]
commit_authors: {"a3c01bd": bartlomieju, "6b73c27": dsherret, "e99c9b9": Tango992, "a6e66a8": bartlomieju, "6d08482": bartlomieju, "885ad24": crowlKats, "dd0728d": bartlomieju, "d26e5c4": bartlomieju}
---

### **Node worker resource limits now match Node.js** (d26e5c4)
Deno now applies `resourceLimits` to worker isolates using V8’s per-field constraints, resolves default values back into the worker state, and installs a near-heap-limit callback to terminate cleanly on OOM instead of crashing the process. This brings `node:worker_threads` much closer to Node’s behavior and unblocks the added compat coverage.

### **Env files now support variable substitution** (e99c9b9)
The dotenv parser was extended to substitute earlier variables while loading `.env`-style files, and the standalone/CLI paths were switched to use the new behavior. That makes `DENO_ENV_FILE` and related env-file loading behave more like Node, including the new test expectations.

### **Crypto gains Triple DES and callable cipher constructors** (6d08482)
`des-ede3-cbc` is now implemented in `ext/node_crypto`, and `Cipheriv`/`Decipheriv` can be invoked without `new` for Node compatibility. The patch also adds stricter argument validation for `createCipheriv`/`createDecipheriv` and updates related crypto tests.

### **Permission audits can now stream to OpenTelemetry** (885ad24)
`DENO_AUDIT_PERMISSIONS` now accepts `otel` in addition to a file path, routing permission access events into the configured OTEL exporter. This turns auditing into a first-class telemetry signal instead of only a JSONL file sink.

### **TTY stdout/stderr are now indestructible** (a6e66a8)
Node-compatible stdio handling was added so libraries that call `destroy()` or `end()` on `process.stdout`/`stderr` no longer break later logging. This fixes a real compat issue with packages like `mute-stream` and prevents `BadResource` failures after stream teardown.

### **npm tarball extraction got faster and simpler** (6b73c27)
Tarball extraction removes folder canonicalization from the hot path and leans on in-memory security checks instead. This reduces work during npm package installs and shaves overhead from a common code path.

### **Filesystem internals were consolidated further** (dd0728d, a3c01bd)
Two more batches of tiny `node:fs` modules were inlined into `fs.ts`, with their promise variants and tests merged into shared files. It’s mostly a refactor, but it reduces module sprawl and keeps the Node polyfill easier to maintain.

### **Other misc changes**
- Support for `capture` normalization in `removeEventListener` options.
- `process.features.openssl_is_boringssl` now reports `true` for Node compat.
- Flaky test fixes and internal `sys_traits` plumbing for dotenv.
- Removed the issue insight GitHub Actions workflow in favor of a separate repo.
- Slack formatting improvements for issue/PR insights output.
- Misc. internal refactors and dependency bumps.
