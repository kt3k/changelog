---
date: 2026-10-06
repo: nodejs/node
size: L
title: "Node gets sync ESM loads, WebSocket masking"
excerpt: "Major runtime additions land: synchronous ESM entry loading, built-in WebSocket masking helpers, and new test-runner mock assertions."
commits: 10
authors: [nodejs-github-bot, christianaurichzm, GeoffreyBooth, trivikr, jasnell, araujogui]
commit_authors: {"8314231": christianaurichzm, "c89ec29": GeoffreyBooth, "a4f6d75": christianaurichzm, "57bb817": trivikr, "3a44541": jasnell, "fcfb7ec": araujogui, "1271bb4": nodejs-github-bot}
---

### **Synchronous ES module loading for most entry points** (c89ec29)
Node can now load and evaluate many ES module entry points synchronously, avoiding promise creation when the graph has no top-level await. That trims startup overhead and keeps the async path only for graphs that actually need it.

### **Built-in WebSocket masking helpers added to `node:http`** (3a44541)
`http.websocketMask()` and `http.websocketUnmask()` provide the RFC 6455 masking primitive in core for Buffer/TypedArray/DataView inputs. This gives userland WebSocket implementations a faster native path and exposes the operation directly in the public API.

### **Test runner assertions gain mock call matchers** (fcfb7ec)
`t.assert` now includes `called()`, `callCount()`, `nthCalledWith()`, and `lastCalledWith()` for inspecting mock functions. This makes the built-in test runner much more capable for behavior-style assertions without extra helpers.

### **QUIC session close/destroy now validates error codes** (a4f6d75)
`session.close()` and `session.destroy()` now reject non-integer, negative, or out-of-range `code` values instead of truncating or relying on undefined behavior. The accepted range is now explicitly limited to QUIC's 62-bit varint space, preventing invalid close frames.

### **QUIC stream bodies now fail cleanly on invalid resolved promises** (8314231)
If a promised stream body resolves to an unsupported type, the stream is now destroyed with the thrown validation error instead of surfacing an unhandled rejection. That fixes a crashy edge case in outbound QUIC body handling.

### **Watch mode strips underscore variants of watch flags** (57bb817)
Watch mode now normalizes `--watch_*` spellings the same way the option parser does, so underscore aliases are removed before spawning child processes. This fixes a bug where children could re-enter watch mode forever and never run the app.

### **Histogram dependency updated to 0.12.0** (1271bb4)
The vendored histogram library was updated with API/documentation changes and internal implementation updates. This is a notable dependency refresh, but it remains an internal library bump rather than a user-facing Node feature.

### **Other misc changes**
- QUIC docs tightened to document the valid close-code range.
- WebCrypto WPT fixtures refreshed.
- Source-map test426 fixtures updated for spec changes.
- Root certificates updated to NSS 3.129.
