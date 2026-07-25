---
date: 2026-07-24
repo: oven-sh/bun
size: L
title: "Bun lands major Node compat and bug fixes"
excerpt: "WebCrypto v26 support, node:test run() semantics, and multiple fixes in fetch, WebSocket, spawn, HTTP, and the bundler."
commits: 34
authors: [robobun, cirospaciari, Jarred-Sumner]
commit_authors: {"27b2df9": robobun, "028f7a3": robobun, "50bb3bd": cirospaciari, "051952d": cirospaciari, "d978f40": robobun, "8d324e3": robobun, "cd5f03b": robobun, "32c3b62": robobun}
---

**WebCrypto grows Node v26.3.0 support, including post-quantum algorithms** (50bb3bd)
Adds ML-DSA, ML-KEM, and ChaCha20-Poly1305 support plus raw key import/export and `toCryptoKey` paths, along with broader SubtleCrypto surface parity. This is a substantial compatibility jump for apps relying on newer Node crypto APIs.

**`node:test` now implements `run()` and v26.3.0 skip/todo behavior** (051952d)
Bun’s test runner was brought much closer to Node’s current semantics, including `run()` option validation and stream behavior. That should make test orchestration and cross-runtime expectations significantly more reliable.

**Bundler fixes invalid CJS-to-ESM output for unbraced control-flow bodies** (27b2df9)
The CJS-to-ESM rewrite now tracks when it is inside a single-statement `if`/`else`/`while`/`do` body so it won’t emit nested `export {}` there. This fixes a real syntax error that could break bundles for packages like uglify-js.

**WebSocket upgrades now validate the opening handshake correctly** (8d324e3)
`server.upgrade()` now checks `Upgrade`, `Sec-WebSocket-Key`, and `Sec-WebSocket-Version` instead of accepting any GET with a 24-byte key. That closes a protocol-compliance hole and prevents bogus requests from being upgraded.

**HTTP/3 POSTs are deferred until the crypto stream can flush the TLS Finished** (d978f40)
The H3 client no longer writes request headers and body from `on_stream_open`; it waits for `on_stream_writable` and prioritizes the handshake crypto stream first. This addresses a flaky cold-connection hang that could deadlock early HTTP/3 POSTs in CI.

**`fetch()` now preserves latin-1 header bytes on the wire** (cd5f03b)
Request headers are isomorphic-encoded instead of UTF-8 re-encoded, matching Fetch spec behavior and Node/undici. This fixes interoperability for non-ASCII header values like `café`.

**`Bun.spawn` tightens invalid timeout and signal options** (32c3b62)
`timeout: NaN` now throws instead of silently disabling the timer, and `killSignal: 0` is rejected up front. These validations make misconfigured spawns fail fast instead of behaving inconsistently.

**`FileSink` now settles pending writes on close/end paths** (028f7a3)
Synchronous flush/close arms now resolve or reject any backpressured `write()` promise instead of orphaning it. This fixes a class of hangs and double-reporting bugs in file sink shutdown.

### Other misc changes
- Borrow-check cleanup and lifetime simplifications across bundler, HTTP, watcher, install, and parser code.
- Dead-code removals in analytics, clap, picohttp, perf, create command, and related crates.
- CLI/install/test maintenance: dependency resolution, glob matching, registry handling, and assorted regression test updates.
- Platform/runtime hygiene: iostream ban in release builds, `$vm` removal from release, resolver root-path panic fix, YAML/parser/NAPI/compile-target correctness fixes.
