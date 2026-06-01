---
date: 2026-05-31
repo: denoland/deno
period: monthly
slug: 2026-05
period_label: "May 2026"
size: L
title: "Deno doubles down on Node parity, startup speed, and tooling"
excerpt: "May brought major Node-compat wins, a faster/lighter runtime, and new packaging/install workflows across Deno."
commits: 509
---

### Node compatibility takes a big leap
**Loader hooks, module APIs, and workers** — Deno expanded `node:module` substantially with `module.register()`, `registerHooks()`, `SourceMap`, `stripTypeScriptTypes`, `findPackageJSON`, `syncBuiltinESMExports`, and better `vm` dynamic import behavior. Hook execution moved into a worker model, `node:test` gained reporters, watch mode, timeouts, TAP output, and better error semantics, and `node:worker_threads`, `node:cluster`, and `node:sqlite` picked up more of Node’s expected surface.

**TLS, crypto, HTTP, and inspector parity improved** — A large amount of work closed gaps in `node:tls`, `node:crypto`, `node:http`, `node:net`, `node:wasi`, and `perf_hooks`. Highlights include CA/PFX handling, client auth, ALPN/SNI callbacks, KeyObject cloning, post-quantum WebCrypto, HTTP upgrade/keep-alive fixes, inspector Network events for fetch/WebSocket/http, and more realistic error codes and socket behavior.

**Compatibility fixes unblock real packages and edge cases** — Child-process IPC now handles more socket and dgram handle passing, `require()`/ESM cycle errors match Node better, `URLSearchParams`/`fs.watch`/`process.chdir` semantics were tightened, and compiled binaries gained support for `module.register()`/`registerHooks()`, VFS-backed `node:fs`, blob workers, and safer addon loading.

### Startup, memory, and hot-path performance improved
**Lazy-loaded runtime and polyfill conversion** — One of the month’s biggest themes was moving large chunks of `ext/node` and core extensions off eager ESM loading and onto lazy-loaded scripts. That reduced snapshot size materially, cut startup overhead, and simplified loader ordering across `buffer`, `process`, `crypto`, `fs`, `net`, `tls`, `worker_threads`, and many web/runtime modules.

**Hot paths got faster** — Deno sped up HTTP request handling, header parsing, request-body reads, `fetch`/`TextDecoder`/`DOMMatrix` conversions, stream queues, `encodeInto()`, and several Web collection mutation paths. There were also targeted wins in `node:http` vectored writes, direct request dispatch, and runtime memory reductions from snapshot slimming.

**Build and binary size got attention** — The runtime adopted smaller release artifacts in a few places, including snapshot shrink work, `panic=abort` for release builds, zstd-compressed upgrade patches, and a lighter `deno_net`/Brotli footprint.

### Package management and CLI workflows matured
**New install/linking modes** — Deno added a hoisted npm linker mode, made unprefixed deps resolve to npm by default in more install paths, and introduced `deno ci` for frozen reproducible installs. Workspace catalog support, `min-release-age`, and improved BYONM resolution all make monorepo and package workflows more predictable.

**New packaging and release tooling** — `deno pack` can now generate npm tarballs, `deno bump-version` became workspace-aware, and `deno compile` gained progress reporting, better asset handling, and an experimental `--bundle` mode to shrink standalone binaries. `deno publish` and `npm_publish` also saw robustness fixes for non-GitHub CI and newer pnpm behavior.

**Developer ergonomics improved** — `deno check --watch`, parallel recursive tasks, better task output prefixing, safer global installs, and expanded test/formatter/linter scoping all reduce friction in daily use.

### Other misc changes
- `deno audit fix` alias added; `deno why` now traces JSR chains.
- `Deno.test()` sanitizer defaults changed, plus more stable exit handling and flaky test fixes.
- Web APIs gained `OffscreenCanvas`, structured-cloneable `Blob`/`File`, better timers, and broader WebCrypto support.
- Various LSP, Jupyter, bundle, cache, watcher, and config-resolution fixes landed throughout the month.
