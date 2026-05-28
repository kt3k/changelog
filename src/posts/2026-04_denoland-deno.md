---
date: 2026-04-30
repo: denoland/deno
period: monthly
slug: 2026-04
period_label: "April 2026"
size: L
title: "Deno’s April push reshapes Node compat and package workflows"
excerpt: "Major Node runtime rewrites, new package-manager commands, stronger security/compat fixes, and faster installs and workers."
commits: 353
---

### Node compatibility gets a major internal rewrite
**Node HTTP/TLS/HTTP2 stack moved native** — Deno replaced large parts of its Node networking layer with native TCP/pipe/TLS plumbing plus llhttp parsing, while tightening header limits, shutdown ordering, ALPN, keepalive, and secure-server behavior. This month also brought broader socket/handle support, pipe lifecycle fixes, and a cluster implementation that moves more real Node workloads off shims and onto native internals.

**Core fd, stream, timer, and REPL plumbing was overhauled** — Node fs APIs now use real OS file descriptors, stdio and child_process I/O were moved off resource-table indirection, timers default to Node semantics, and stream wrapping was refactored for reentrancy. Deno also shipped a real `node:repl` polyfill, removed old proxy/global indirection, and improved sync process APIs and `require.resolve()` parity.

**N-API and addon support matured** — Native add-on behavior got a mix of new support and course corrections: async init/destroy landed, handle scopes were briefly made real then reverted for safety, external Latin-1 strings became zero-copy, and finalizers were adjusted to run after GC. These changes broaden compatibility while avoiding crashes in common addon patterns.

### Security, correctness, and leak fixes
**Network permissions and TLS validation tightened** — Permission checks now re-resolve endpoints to block numeric-host alias bypasses, normalize IPv4-mapped IPv6 and macOS-equivalent paths, and improve `fs.watch` path handling. TLS saw stricter client/server cert validation, STARTTLS fixes, CA/root-cert handling improvements, and safer shutdown/write behavior.

**Several correctness bugs were closed across core APIs** — This month fixed Windows file-write data loss, worker RSS leaks, non-blocking stdio/write handling, `structuredClone()` behavior for platform objects, `crypto` edge cases, `fs.stat`/`lstat` semantics, and a long list of smaller HTTP, DNS, process, and inspector incompatibilities.

**Audit and telemetry became less fragile** — `deno audit` moved to npm’s supported bulk advisories API and gained `--fix` for auto-upgrading vulnerable deps, while OTEL export now times out instead of hanging indefinitely when no collector is present.

### Package manager and CLI workflows expanded
**Install and upgrade workflows got much more powerful** — `deno install` gained `--prod`, `--skip-types`, `--os`, and `--arch`, and unprefixed packages now default to npm. `deno upgrade` can fetch PR builds and warns when canary versions have expired, making it easier to test unreleased changes and understand upgrade failures.

**New commands fill out the toolchain** — `deno bump-version`, `deno transpile`, and `deno why` arrived, covering semver bumping, standalone TS/JSX/TSX transpilation, and dependency-chain introspection. `deno compile` also became smarter about framework directories by auto-detecting builds and bundling the right artifacts.

### Performance and reliability improvements
**Hot paths got leaner** — Worker and MessagePort messaging was sped up with raw post-message ops, event-loop polling was optimized, stream writes were trimmed, `TextEncoder.encodeInto()` gained a fast path, and background V8 threads were capped to reduce wasted overhead on small workloads.

**Filesystem, watchers, and caches were tightened up** — Watch paths are now canonicalized and normalized more efficiently, `fs.glob` and `fs.watch` edge cases were fixed, and cached/link resolution around npm packages and package.json main paths became more robust.

### Other misc changes
- Updated release/build infrastructure, CI sharding, and test coverage across node_compat and platform-specific regressions.
- Added or adjusted support for WebGPU, Geometry Interfaces, `import defer`, `fs.Utf8Stream`, `process.env` validation, and assorted console/URL/error parity fixes.
- Multiple version bumps landed during the month (2.7.11 through 2.7.14) alongside dependency updates like `rusty_v8` and OpenSSL.
