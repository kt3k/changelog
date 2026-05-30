---
date: 2026-04-05
repo: oven-sh/bun
period: weekly
slug: 2026-W14
period_label: "Mar 30 – Apr 5, 2026"
size: L
title: "Bun hardens async errors, sockets, and builds"
excerpt: "Async stack traces improved, proxy and socket behavior tightened, and the build system gained PGO plus faster shared caches."
commits: 42
---

### Major runtime and networking improvements
**Async stack traces are now much more useful** — Errors from native async APIs now keep async frames more consistently, and `Error.captureStackTrace()` matches `new Error()` for await-chain debugging.

**Proxy and socket behavior got closer to Node/libuv** — `fetch()` now picks up runtime `HTTP_PROXY`/`HTTPS_PROXY`/`NO_PROXY` changes, HTTPS proxy CONNECT tunnels are pooled and reused, and Unix socket lifecycle handling was fixed so Bun no longer steals live paths or leaves stale `.sock` files behind. macOS also gained a workaround for longer Unix socket paths.

**File, stream, and protocol edge cases were hardened** — `ReadableStream.blob()` now rejects cleanly on already-consumed bodies, `process.stdout.end()` waits for buffered writes, Linux `statx` fallbacks cover more real-world failures, UDP sockets surface ICMP/truncation metadata, and malformed multipart boundaries now error instead of crashing.

### Build system and toolchain overhaul
**Legacy CMake support was removed** — Bun dropped the old CMake build path entirely, simplifying the repo and deleting a large amount of dead build infrastructure.

**Local and release builds got faster and more flexible** — The build system now supports IR PGO flags, shares caches across checkouts by default, preserves CPU targeting for local WebKit builds, and makes Zig checks first-class Ninja targets. Windows also fixed a codegen output mismatch that caused endless rebuilds.

**Toolchain and CI workflows were modernized** — The pinned Zig compiler was bumped, CI/build plumbing was updated around Buildkite, and the repo switched from a brittle scraper to `bk`-driven helpers for finding builds, logs, and failures.

### Performance and safety fixes
**Performance work landed in hot parsing paths** — ANSI stripping and string-width helpers were sped up with SIMD/path optimizations.

**Several correctness and security issues were fixed** — MySQL query memory leaks were removed, DNS lookup no longer risks stack overflow on long hostnames, and tar extraction now skips absolute Windows paths during normalization.

### Other misc changes
- Added in-process `Bun.cron(schedule, handler)` with stop/unref-style lifecycle control
- Updated bundled root CA trust store
- Numerous docs polish, CI test flake fixes, and small build-script cleanups
