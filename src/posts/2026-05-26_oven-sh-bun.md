---
date: 2026-05-26
repo: oven-sh/bun
size: L
title: "SIMD decoding, LTO, and cross-builds land"
excerpt: "Bun added SIMD hex/base64 paths, fixed several correctness bugs, and expanded Linux cross-compilation and LTO support."
commits: 16
---

**Buffer decoding gets faster and more permissive** (2148214, 18b7c95, cab4feb)
Bun now uses SIMD paths for `Buffer.from(..., 'base64'|'base64url')`, `buf.write(..., 'base64'|'base64url')`, and `Buffer.from(..., 'hex')`, including lenient handling of URL-safe alphabet, garbage bytes, and padding behavior. It also speeds up `Buffer.prototype.toString('hex'|'base64')` for large buffers, which should improve common binary/text conversion workloads.

**Cross-language LTO is reworked for Linux** (ec68d39, c78d08f)
The Rust release link now emits fat bitcode with regular-LTO summaries so it can participate in ELF full LTO alongside C/C++ objects, and the build system adds a fix-up CLI to make the Rust bitcode compatible with the linker’s summary checks. Linux aarch64-musl also gets cross-language LTO enabled again now that the old `globalopt` crash workaround is no longer needed.

**Windows can now be cross-compiled from Linux** (4c954ab)
The Buildkite pipeline and Linux builder images were extended to produce Windows x64 and arm64 builds from Linux using an xwin sysroot and the required toolchain bits. This is a major CI/build capability upgrade that validates `bun.exe` cross-builds without waiting on native Windows agents.

**Fetch now waits for TLS identity checks before sending the request** (0974d03)
`fetch()` now parks the connection until `tls.checkServerIdentity` approves the peer certificate, so headers and body are not written prematurely. That fixes certificate-check ordering for redirects and HTTPS proxy flows, and tightens the security semantics around request transmission.

**JS parser and highlighter correctness fixes** (f958cbd, 99f4679, 146afa3)
The lexer restores a SIMD fast path for skipping block comments, the REPL highlighter no longer reads out of bounds on a trailing backslash inside `${...}`, and digit-named modules now get a sanitized auto-generated default export name. These are correctness and crash fixes in user-facing parsing/highlighting paths.

**Bun.serve memory accounting is fixed under load** (19dd34d)
Per-request GC memory accounting was restored for `Bun.serve`, bringing peak RSS back down under HTTP load. This addresses a real regression in memory footprint for simple servers and framework workloads.

**FFI thread-safe callbacks no longer copy JS-thread-owned state off-thread** (9e6a19b)
Threadsafe FFI callback wrappers are now refcounted and carry a cached execution-context ID, avoiding unsafe off-thread copies of JSC strong references. The callback is posted back to the JS thread safely, which closes a concurrency bug that could surface under native callback use.

**JSC module registry mutations are now synchronized with GC** (4324120)
Registry removals and clears now hold `cellLock()`, fixing a race between concurrent GC marking and module registry mutation. This is a real correctness/stability fix for ESM/module-loader concurrency.

**Install teardown is pinned to the main thread** (29f1f7c)
The package manager’s exit-callback cache teardown now runs on the main thread, avoiding unsound cross-thread destruction and exit-time aborts when validation fails on another thread.

### Other misc changes
- Docs clarification: `trustedDependencies: []` replaces the default allow list, it doesn’t extend it (a6a5614)
- Build/bootstrap and baseline allowlist updates for the new SIMD kernels and Windows cross-build flow (c78d08f, 4c954ab, 18b7c95, 0b1e7e5, f958cbd)
- Benchmark and test coverage added/updated across buffer, fetch, parser, FFI, HTTP, and install paths
