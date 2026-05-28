---
date: 2026-04-12
repo: oven-sh/bun
period: weekly
slug: 2026-W15
period_label: "Apr 6–12, 2026"
size: L
title: "Security hardening and runtime fixes span HTTP, TLS, and I/O"
excerpt: "Bun added several security and crash fixes, plus major serve/WebSocket improvements, WebCrypto support, and CI/build hardening."
commits: 65
---

### Security, crash, and concurrency hardening
**HTTP/TLS and decoder safety** — Bun fixed a request-smuggling risk by rejecting conflicting `Content-Length` headers, restored hostname verification for `tls.connect({host, port})`, and made `StringDecoder.write()` fail safely on oversized output instead of crashing.

**Socket and threading races** — Multiple lifetime bugs were closed in socket connect/close paths, the runtime transpiler job, and the threadpool, including a lost-wakeup/warmup issue that could strand work or hang callers.

### Serve, WebSocket, and process/runtime behavior
**`Bun.serve` file handling was unified and hardened** — Static and fetched file responses now share one streaming path, gaining Range support, abort-safe fd handling, and fixes for descriptor leaks on 304, HEAD, and other bodiless responses.

**WebSocket and process semantics improved** — The client now supports `ws+unix://` and `wss+unix://` endpoints, while `process.ppid` became a live getter so reparenting and orphan-detection behave correctly.

**Node compatibility gaps closed** — `node:dns/promises` now exposes `getDefaultResultOrder()`, `fs.Stats`/`BigIntStats` constructor and prototype behavior were corrected, `os.freemem()` now reports available memory on Linux, and `MKADDRESSBOOK` is accepted as an HTTP method.

### WebCrypto, bundling, and performance
**New WebCrypto and markdown capabilities** — X25519 `deriveBits()` now works in SubtleCrypto, and `Bun.markdown.ansi()` adds direct terminal rendering for markdown entrypoints without spinning up the JS VM.

**Bundler and iterator performance** — The CSS bundler now preserves top-level `@layer` ordering rules, and array iteration got a butterfly fast path for common array layouts.

### Build, CI, and packaging hardening
**Release and CI gates got stricter** — Bun added binary-size regression checks for release builds, improved Buildkite reliability and artifact timeout handling, and changed Windows artifact repacking to keep ZIP layouts compliant.

**Platform-specific build fixes** — Nix-compiled binaries now normalize interpreter paths for portability, local Linux builds enabled the parallel Zig compiler, and several flaky tests/fixtures were stabilized across WebView, Valkey TLS, proxy, and CI coverage.

### Other misc changes
**Misc cleanup and docs** — File-descriptor renames were finished (`FD`), `bun run pr:comments` helpers/docs were added and tweaked, test suites were parallelized in spots, and assorted build/tooling refactors landed throughout the week.
