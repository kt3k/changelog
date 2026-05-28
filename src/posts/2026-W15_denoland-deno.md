---
date: 2026-04-12
repo: denoland/deno
period: weekly
slug: 2026-W15
period_label: "Apr 6–12, 2026"
size: L
title: "Deno expands Node compat with native pipes, TLS, REPL"
excerpt: "Major Node-compatibility upgrades landed alongside permission hardening, a worker memory leak fix, and several runtime correctness improvements."
commits: 33
---

### Major Node compatibility upgrades
**Native pipe handling moves into Rust/libuv** — Deno replaced JS-side pipe I/O with native `uv_pipe_t` plumbing across Unix and Windows, covering the full lifecycle plus pipe-specific behaviors. This should make Node-style pipes more correct and consistent.

**Node TLS now uses a native `TLSWrap` backend** — JS TLS sockets are wired to a native `TLSWrap` backed by rustls, replacing the older stream-swap approach and bringing the implementation closer to Node’s model.

**A real `node:repl` polyfill ships** — The stub REPL module was replaced with a working `REPLServer`, adding TTY support, multiline input, dot commands, editor mode, and proper eval/context/error tracking.

**HTTP parsing and Node internals keep moving native** — Deno added a native llhttp-based `HTTPParser` for Node bindings, plus `fs.SyncWriteStream` for file-backed stdio and a per-isolate `napi_wrap`/`napi_unwrap` key fix for addon interoperability.

### Runtime correctness and permission hardening
**Network permissions now block alias bypasses** — Resolved endpoints are re-checked after DNS/hostname resolution, closing numeric-hostname tricks and normalizing IPv4-mapped IPv6 addresses so allow/deny rules apply to the actual host.

**Package `main` traversal is rejected** — Node resolution now prevents `package.json` `main` targets from escaping the package directory, closing a path traversal hole.

**StdIO and pipe lifecycle bugs were fixed** — Non-blocking stdin/stdout writes now retry correctly, idle pipe handles no longer keep the event loop alive, and pipe/stdio handling was cleaned up for Node’s descriptor semantics.

**Worker RSS leak was eliminated** — Dropping `uv_loop_t` now frees its heap state, fixing a linear memory leak in worker-heavy workloads.

### API gaps and behavior fixes
**DNS, crypto, WebGPU, and OTEL got important fixes** — `dns.getDefaultResultOrder()` is now exposed, oversized crypto `update()` inputs are rejected like Node/OpenSSL, `GPUQueue.writeBuffer()` accepts raw `ArrayBuffer`s, and OTEL export requests now time out instead of hanging forever.

**Filesystem watcher and stdout behavior improved** — Watch paths are canonicalized once and cached to reduce syscall overhead and prevent spurious events, while file-backed `process.stdout`/`stderr` now use synchronous writes.

### Other misc changes
**Testing, cleanup, and release maintenance** — Added permission coverage and proptests, tightened hanging signal-test CI behavior, bumped `rusty_v8` to 147.1.0, and included assorted build/config/lint/test fixture updates.
