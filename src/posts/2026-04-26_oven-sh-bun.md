---
date: 2026-04-26
repo: oven-sh/bun
size: L
title: "Bun lands a pile of runtime fixes"
excerpt: "WebSocket, spawn, hot reload, stdio, HTTP timeout, and SQLite all got meaningful fixes, plus FreeBSD cross-build support."
commits: 19
authors: [dylan-conway, robobun, Jarred-Sumner]
commit_authors: {"9239913": robobun, "e356ed6": robobun, "2ee9cad": Jarred-Sumner, "f97aa65": robobun, "d644b47": dylan-conway, "86e6ab6": Jarred-Sumner, "e2017e7": robobun, "4c88df8": robobun}
---

### **FreeBSD and Android cross-target support expands publish images** (2ee9cad)
Bun’s release/build pipeline now supports x86_64 and aarch64 FreeBSD targets alongside Android, wiring in the needed sysroot, platform, and CI/build-script changes. This is a major infra update that unlocks new release artifacts and cross-compilation paths.

### **WebSocket clients now respect `perMessageDeflate: false`** (e2017e7)
The WebSocket upgrade path now suppresses `Sec-WebSocket-Extensions` when callers opt out of compression, matching Node and `ws`. This fixes a real compatibility gap for apps that rely on disabling permessage-deflate.

### **Bun.spawn fixes a stdin pipe leak on child exit** (e356ed6)
If a spawned child exits before `.stdin` is ever read, Bun now closes the stdin pipe fd instead of leaving it dangling. That prevents resource leaks in cases where subprocess stdin is never consumed.

### **TTY restore no longer clobbers downstream raw mode** (f97aa65)
Bun now skips exit-time `tcsetattr` restoration unless it actually modified termios itself, avoiding trampling a pipeline consumer’s terminal state. This fixes a nasty interactive bug where tools like `less` or `fzf` could appear frozen after Bun exited.

### **HTTP client response timeouts stop keeping the event loop alive** (4c88df8)
`IncomingMessage.setTimeout()` on the client side now uses an unref’d timer and shares a module-scope handler instead of closing over request locals. That aligns Bun with Node behavior and fixes unnecessary hangs after responses complete.

### **Hot reload avoids stale sourcemaps during rejected-module races** (d644b47)
Bun now defers reloads not only while promises are pending, but also while a rejection exists that hasn’t been reported yet. This prevents hot-reload races from remapping errors against the wrong sourcemap or dropping the error entirely.

### **SQLite is bumped to 3.53.0** (d578f57)
Bun updates its bundled SQLite amalgamation to 3.53.0. This brings in upstream SQLite changes and fixes, though the repo-side impact is mostly dependency maintenance.

### **Spawn now downgrades JS refs after async pipe drains** (9239913)
When stdout/stderr finishes draining after process exit, Bun now re-evaluates pending activity so subprocess wrappers can become collectible. This fixes a leak where subprocess objects and buffered output could stay strongly referenced forever.

### **Safer double-to-int conversions in buffer and histogram code** (86e6ab6)
Several argument-parsing paths now use `truncateDoubleTo*` helpers instead of raw casts, avoiding undefined behavior on NaN, infinities, and out-of-range values. The arm64 codegen stays efficient while the conversions become well-defined.

### Other misc changes
- Deflaked hot/inspect/terminal/spawn tests and other Windows/CI regressions.
- Fixed a module alias bug for `bun:main` and covered module-namespace edge cases.
- Improved Buildkite flaky-test surfacing and a Windows PCH build rule.
- Updated the bundled sqlite amalgamation docs/comments and minor internal build wiring.
