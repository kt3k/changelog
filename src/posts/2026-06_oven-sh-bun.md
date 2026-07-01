---
date: 2026-06-30
repo: oven-sh/bun
period: monthly
slug: 2026-06
period_label: "June 2026"
size: L
title: "Bun’s June sprint: compatibility, safety, and HTTP overhaul"
excerpt: "Major Node parity work, a new React Compiler transform, and a long run of crash, stream, fetch, and fs hardening."
commits: 353
---

### Compatibility leaps and new APIs
**Node parity expanded across core modules** — Bun shipped major compatibility work in `node:http` and `node:http2`, plus broader `net`, `tls`, `fs`, `stream`, `vm`, `buffer`, `dgram`, `cluster`, `path`, `crypto`, and `zlib` fixes. June also added `process.on('memoryPressure')`, `Bun.isStandaloneExecutable`, `Bun.spawn` `uid`/`gid` support, fetch request-body compression, and `bun list` / `bun pm ls --trusted` filtering.

**React Compiler integration landed** — Bun now exposes the upstream React Compiler as a built-in build transform, with CLI/API wiring and follow-up fixes for config handling and bundled output refs.

### HTTP, fetch, streams, and WebSocket were heavily hardened
**Fetch and server response handling got a large correctness pass** — Bun fixed decompression edge cases, request-body abort behavior, disturbed/locked clone semantics, response backpressure coupling, streamed upload/download races, proxy CONNECT tunneling bugs, and `Bun.serve` issues around reused bodies, null-body statuses, HEAD responses, and stream errors.

**WebSocket behavior moved closer to spec and Node** — Close codes, masking, backpressure reporting, fragmented dispatch, context takeover, and upgrade parsing were all tightened, alongside fixes for client/server lifecycle and buffered receive behavior.

**Streams internals were refactored for safety** — Several use-after-free, rooting, closure-retention, and cancelation bugs were removed across `ReadableStream`, `Shell`, and stream-to-response plumbing, reducing crash risk and memory retention.

### Stability, security, and memory safety dominated the month
**Crashers and UAFs were fixed across core subsystems** — Bun spent much of June eliminating segfaults in `node:vm`, GC visitation, SQL pools, workers, shell pipes, WebSockets, URL parsing, router matching, patch application, and Windows spawn/fs paths.

**Security and DoS hardening stood out** — Notable fixes included NaN-boxing sanitization in FFI/N-API, CSS minifier/parser overflow protections, sourcemap overflow guards, structured-clone large-buffer safety, and multiple parser/minifier safeguards against quadratic or exponential behavior.

**GC and lifetime management were tightened** — The runtime cleaned up many ownership bugs in streams, watchers, crypto wrappers, zlib/brotli/zstd, SQL, and bundler internals, often turning leaks or hidden retention into explicit accounting or weak references.

### SQL, install, and filesystem work rounded out the release
**SQL got more reliable under startup and teardown races** — Pool startup, handshake retries, forced close, callback throws, null-byte validation, and protocol parsing all saw fixes, making MySQL/Postgres behavior more robust under container startup and error conditions.

**Package management and install paths were hardened** — `bun install` gained safer patch handling, better lockfile/newer-version errors, optional-dep cleanup, and more tolerant workspace/script lifetime handling.

**Filesystem and path behavior kept converging on Node** — Windows path conversion, `fs.watch`, `fs.rm`, `fs.cp`, `readdir`, `open`, `lchown`, `glob`, and router path parsing all received compatibility and crash fixes, while build tooling gained sourcemap, standalone-binary, and binary/embed improvements.

### Other misc changes
- Repl UTF-8 editing, Markdown rendering fixes, CSS grid/parser/minifier improvements, and assorted bundler/decorator/transpiler correctness updates.
- CI/test harness hardening: Docker shard coordination, platform tag checks, timeout adjustments, and retry-on-infra-failure behavior.
- Docs and repo-guidance churn, including Discord.js guide rewrites and CLAUDE.md cleanup.
