---
date: 2026-07-14
repo: oven-sh/bun
size: L
title: "NAPI semantics and bun install fixups"
excerpt: "Major N-API behavior fixes landed alongside install retry deduping, WebSocket decompression cleanup, bundler HTML output, and shell rm race work."
commits: 26
authors: [robobun]
commit_authors: {"4a53c6b": robobun, "6a1acc9": robobun, "fea15ba": robobun, "8545a19": robobun, "cc0c1e8": robobun, "d23d693": robobun, "b801890": robobun, "616c623": robobun, "a4faec8": robobun, "c8e32b6": robobun, "644b0b6": robobun, "f48812d": robobun, "5098c8d": robobun, "224bdde": robobun}
---

### **Bun N-API now matches Node on pending exceptions and object coercion** (4a53c6b, a4faec8, 616c623, f48812d, 644b0b6, fea15ba, 6a1acc9, 8545a19, c8e32b6)
Bun tightened several Node-API edge cases: it now blocks more entry points when a napi exception is already pending, applies ToObject coercion consistently across property/element/prototype APIs, and fixes `napi_instanceof`, `napi_fatal_exception`, `napi_detach_arraybuffer`, and `napi_adjust_external_memory` to behave like Node. It also reports Node-API v10 and accepts zero-length external strings, which helps addons feature-detect the right capabilities instead of falling back.

### **`bun install` stops re-running failed tarball downloads** (cc0c1e8)
A tarball that already failed now stays failed instead of being scheduled again during a later install phase. This removes duplicate retry traffic and prevents the same error from being reported twice for permanently broken downloads.

### **WebSocket permessage-deflate now recovers after stream end** (d23d693)
The client inflater is reset after `Z_STREAM_END` even when context takeover is enabled, so later compressed messages keep decoding correctly. Without this, one completed DEFLATE stream could leave the connection silently mis-decoding subsequent messages.

### **Bundler fixes HTML entry chunks under code splitting** (b801890)
When splitting is enabled, HTML entry pages now reference the actual entry JS chunk instead of a shared chunk. That restores browser execution of the entry module graph and fixes blank-page builds.

### **`Readable.fromWeb()` now propagates cancel to the source** (5098c8d)
The adapter was simplified to read one chunk per `_read()` so aborting a Node readable correctly cancels the underlying web stream. This fixes a subtle resource-lifecycle bug where the source `cancel()` hook never ran.

### **`rm -rf` closes a lost-wakeup race in the shell** (224bdde)
The directory-removal handoff was reworked so the parent publishes ownership to children without a race window that could strand `dir_task` forever. This is a concurrency fix for an otherwise hard-to-reproduce deadlock/livelock path.

### Other misc changes
- CI baseline verification: pin qemu 9.1.0 and fail on emulated-run errors.
- `Bun.color()` alpha clamping fix.
- `Bun.randomUUIDv7()` timestamp validation fix.
- FileSystemRouter path-leading-slash behavior fix.
- Redis URL/database parsing and incremental RESP3 parsing fixes.
- `node:fs` max-path-length ENAMETOOLONG fix.
- WebKit sync/contribution docs updates.
- C++ header constant cleanup with `inline constexpr`.
- Macro/no-macros bundler test coverage and assorted N-API test additions.
