---
date: 2026-05-10
repo: oven-sh/bun
period: weekly
slug: 2026-W19
period_label: "May 4–10, 2026"
size: L
title: "Bun tightens network safety and fixes TLS, Windows, and Android"
excerpt: "This week Bun landed major socket/TLS hardening, Windows and Android platform fixes, resolver and bundler correctness improvements, plus a large repo reorg."
commits: 33
---

### Network, TLS, and socket hardening
**Socket lifecycle and teardown fixes** fixed use-after-free and refcount bugs in client handlers, reconnects, and synchronous connect failures, especially around Windows named pipes and socket ref/unref balance.

**TLS got more robust and performant** with macOS system CA lookups avoiding expensive per-cert revocation checks, Windows system CA loading expanding to intermediates and trusted people, stalled handshakes now timing out cleanly, and shutdown closing immediately when `close_notify` cannot flush.

**Process and signal handling were stabilized** by fixing Windows raw mode state, mapping Windows console-close/break events to signals, and adding a bionic-correct Android `sigaction` layout to avoid broken handlers on Android.

### Correctness fixes across runtime, resolver, and bundler
**Path and array handling became safer** with Windows path normalization no longer overrunning buffers, and `process.setgroups()` / `process.hrtime()` no longer crashing on sparse or accessor-backed arrays.

**Module and package resolution improved** so wildcard exports can contain `@`, top-level await sibling imports wait correctly within the same evaluation pass, and `bun -p` now returns the proper completion value for TLA modules.

**Bundler output cleanup** removed stray empty `else {}` branches left by dead-code elimination, improving emitted code and fixing a dangling-else edge case.

### Publishing, images, and API fixes
**Publishing metadata is now included** in `bun publish` output so registry views can show README content correctly.

**Image pipelines preserve ICC profiles end-to-end** for WebP decode and encode, preventing color shifts when converting tagged images.

**A handful of API crashes were closed** including `Bun.mmap()` rejecting invalid option types, `websocket.perMessageDeflate` validating primitive values, and `new Bun.Terminal()` handling non-object inputs safely.

### Platform/build work and repo restructuring
**Windows builds got leaner** via safer identical-code folding, string tail merging, and lazy heap-backed TLS storage to reduce `bun.exe` size.

**The source tree was heavily reorganized** with a large directory rename and follow-up path/import/build fixups to keep the build green and improve long-term code structure.

### Other misc changes
- `bun test --isolate` now retargets surviving N-API globals correctly.
- MySQL query string ownership was fixed to remove a leak.
- DCE, raw mode, pidfd exit polling, and several docs/navigation updates landed.
- Forked repos were blocked from running auto-update PR workflows.
