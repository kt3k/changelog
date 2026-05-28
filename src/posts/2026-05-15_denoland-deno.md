---
date: 2026-05-15
repo: denoland/deno
size: L
title: "Deno lands TLS, WASI, and perf_hooks gains"
excerpt: "Major Node compatibility work: a new WASI polyfill, perf_hooks histograms, TLS/HTTPS fixes, plus key bug and perf improvements."
commits: 17
authors: [bartlomieju, divybot, lunadogbot, nathanwhitbot, fibibot, amyssnippet]
commit_authors: {"3333711": bartlomieju, "1d8465f": nathanwhitbot, "1bf75fb": bartlomieju, "fb16718": divybot, "3090d6f": bartlomieju, "32878db": fibibot, "52627b5": bartlomieju, "bb4fe6c": divybot, "be72317": divybot, "52616e8": divybot, "b049dfc": bartlomieju, "2cd5aac": divybot, "2aeca4a": bartlomieju, "4be991e": lunadogbot, "f7de8c5": amyssnippet, "4a489d8": lunadogbot}
---

**Implement `node:wasi` polyfill** (be72317)
Adds a full `node:wasi` implementation, including the WASI preview1 ABI, filesystem-backed path operations, and permissions checks. This unlocks a major missing Node compatibility surface for WASI apps and tests.

**Add `perf_hooks.createHistogram()` and histogram classes** (32878db)
`node:perf_hooks` now exports `createHistogram(options)` plus the `Histogram` / `RecordableHistogram` types Node expects. That closes a compatibility gap and enables the perf-hooks histogram test suite.

**Fix TLS CA handling and related Node compat gaps** (1d8465f)
Improves CA certificate selection, `getCACertificates()` behavior, and SecureContext CA mutation to better match Node, including system/default/bundled/extra store combinations. It also tightens several TLS edge cases like protocol-method errors, ALPN `setKeyCert()`, and ticket key plumbing.

**Revert the experimental module loader hooks stack** (3333711)
Backs out the recently added loader-hooks stack so only the stable `module.registerHooks()` pieces can be relaunched separately. This removes a large amount of loader plumbing and avoids carrying the more complex deprecated `module.register()` path.

**Fix ESM/CJS `process.nextTick` ordering** (3090d6f)
Adjusts module evaluation so microtasks queued during top-level ESM run before `process.nextTick`, matching Node, and preserves CJS entrypoint ordering by draining nextTicks at the end of main loading. This is a subtle but user-visible runtime semantics fix.

**Add `node:tls`/`https` compatibility fixes** (1bf75fb, bb4fe6c, 52616e8)
These commits round out Node compatibility for HTTPS agent connection forms, TLS handshake timeout propagation, legacy stream/_tls_wrap deprecation warnings, `module.parent`, and `internal/js_stream_socket`. Together they unblock several compat tests and make built-in module behavior closer to upstream Node.

**Fix `node:fs.openAsBlob()` clone semantics** (2cd5aac)
Marks file-backed blobs so `structuredClone(await fs.openAsBlob(path))` now fails with the expected `DataCloneError` instead of succeeding. This aligns Deno with Node’s behavior for file-backed blobs.

**Improve WebCrypto key import validation** (4a489d8)
Adds length checks for raw and JWK imports of X25519/X448/Ed25519 keys before they reach the key store. That prevents later panics and turns malformed keys into the expected `DataError`.

**Optimize `TextEncoder.encodeInto()`** (b049dfc)
Changes `encodeInto()` to return packed read/written counts from the op, avoiding the shared out-buffer on the fast path. The fallback preserves correctness for large results, and the change is reported as about a 12% short-string speedup.

### Other misc changes
- Bug fix: cleared immediates now emit `destroy` for async hooks (52627b5)
- Bug fix: directory imports now surface `ERR_UNSUPPORTED_DIR_IMPORT` instead of raw OS errors (fb16718)
- Bug fix: `crypto.subtle.digest()` gains SHA3-256/384/512 support (2aeca4a)
- Bug fix: raw key length validation for X25519/X448/Ed25519 import paths (4a489d8)
- Bug fix: `createHistogram`/perf hooks types updated for bigint max values (32878db)
- Task completion support for recursive workspace tasks (f7de8c5)
- `deno_graph` bumped to 0.108.2 to fix WASM multi-value return typings (4be991e)
- Dependency and test expectation updates across Node/WebCrypto/compat suites
