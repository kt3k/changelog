---
date: 2026-07-05
repo: nodejs/node
period: weekly
slug: 2026-W27
period_label: "Jun 29 – Jul 5, 2026"
size: L
title: "HTTP, streams, and security polish dominate a busy week"
excerpt: "Node tightened proxy/permission behavior, improved stream aborts and diagnostics, added a public tee API, and landed broad internal hardening."
commits: 67
---

### HTTP and proxy handling got stricter and more correct
**CONNECT and proxy requests fixed** — `http.request()` now validates absolute-form targets against the request authority, and CONNECT tunneling preserves the target host in `Host` instead of the proxy host. `ServerResponse.uncork()` also now emits `drain` correctly after buffered writes flush, improving backpressure behavior.

### Streams and Web Streams saw major reliability and performance work
**Abort handling is now prompt across stream consumers** — async consumers such as `bytes()`, `text()`, `arrayBuffer()`, and `array()` now reject as soon as an abort signal fires, instead of waiting for more data. `merge()` got the same treatment, and stream internals were refactored so pull paths share the new abort-aware behavior.

**Web Streams hot paths were optimized** — `ReadableStream` and `WritableStream` internals were simplified to reduce per-chunk predicate overhead, and `TransformStream` now creates its backpressure promise lazily to avoid unnecessary allocations.

**ReadableStream tee is now public** — Node exposes `ReadableStreamTee(stream[, cloneForBranch2])`, giving web-platform code a supported way to tap the internal tee operation and clone chunks for the second branch.

### ESM/CJS diagnostics and addon support improved
**TLA and async-module errors are more actionable** — `require()` failures for async module graphs now report top-level-await locations earlier and carry richer metadata, including `requireStack` and `topLevelAwaitLocations`, with clearer messaging for the required module.

**Addon import support is on by default** — experimental `.node` addon import support was promoted to always-on by default, while native addon loading also now respects permission drops and better handles permission propagation through child processes.

### Security, permissions, and internal hardening tightened up
**Permission checks were fixed and broadened** — `NODE_OPTIONS` parsing no longer mistakes substrings for real permission flags, and addon loading now fails correctly once `process.permission.drop('addon')` has taken effect.

**Internal property-copying code was hardened** — several subsystems switched to safer descriptor handling and prototype-null/bulk descriptor APIs to reduce defense-in-depth risk from inherited properties or prototype pollution surprises.

**Security policy wording was clarified** — `SECURITY.md` now explicitly separates defense-in-depth issues and V8 flags from reportable vulnerabilities, sharpening the project’s security boundaries.

### Filesystems, VFS, and low-level runtime fixes
**VFS behavior became more faithful** — recursive readdir now stops on symlink cycles, sync writes honor virtual file descriptors, and `MemoryFileHandle` treats `-1` as the current-position sentinel for read/write calls.

**Other runtime fixes landed** — datagrams skip redundant DNS lookups for literal IPs, `vm` preserves partial `PropertyDescriptor` updates correctly, and Windows path normalization was briefly fixed for reserved names before being reverted due to an unsafe rollout.

### Platform and build updates
**Architecture and tooling support expanded** — Maglev is enabled for riscv64, TLS key-agreement reporting now recognizes negotiated groups for PQ/hybrid handshakes, and the Temporal toolchain was bumped to Rust 1.83. CI, dependency, and workflow updates continued throughout the week.

### Other misc changes
**Workflow/docs/test cleanup** — new benchmark and stress-test workflows, contribution/onboarding docs, dependency bumps, lint/docs typos, and assorted test fixture refreshes and small CI tweaks.
