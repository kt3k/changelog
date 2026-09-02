---
date: 2026-09-01
repo: oven-sh/bun
size: L
title: "Bun tightens TLS, DNS, WebView and GC behavior"
excerpt: "Major fixes landed for TLS teardown, macOS DNS startup, WebView rejection handling, GC cadence, and several runtime leaks/oom paths."
commits: 22
authors: [robobun, Jarred-Sumner, alii]
commit_authors: {"683d304": robobun, "b7039c9": robobun, "54691d8": Jarred-Sumner, "561641b": Jarred-Sumner, "e2eac5f": robobun, "84c364e": robobun, "e5a18d5": robobun, "70736fd": robobun}
---

### **TLS destroy now closes with a bare FIN** (683d304)
Bun’s TLS destroy path now skips `close_notify` and shuts down like Node when a socket is being force-closed, which fixes undici/SOCKS5 tunnel leaks where paused peers could hang waiting on the alert. The change also adds regression coverage for the leaked HTTPS connections.

### **macOS DNS fallback now avoids launch-time aborts on macOS 12** (54691d8)
`DNSServiceGetAddrInfoEx` and `kDNSServiceAttrAllowFailover` are now resolved at runtime, with a fallback to plain `DNSServiceGetAddrInfo` when the SPI is missing. That keeps Bun launching on macOS 12 while preserving the newer behavior on macOS 13+.

### **WebView close/navigation failures no longer create uncatchable rejections** (70736fd)
The Chrome backend now marks internal rejections as handled and routes navigation failures through the proper callback path, so closing a view or a browser crash won’t spam `unhandledRejection`. Docs and types were updated to explain that constructor `url:` navigations are internal and that `close()` rejects only catchably.

### **Bun.serve releases streaming response bodies on client abort** (e5a18d5)
When a streaming response is torn down mid-flight, Bun now detaches the body stream and clears the locked-body state during finalization. This fixes a GC-rooted leak affecting SSE-style handlers and other response streams that outlive an aborted client.

### **Idle GC gains quiet-period full collections and page-out behavior** (561641b)
Bun’s GC controller now tracks idle time separately from the regular repeating timer and can escalate to full collections after configurable quiet periods via `BUN_IDLE_GC_SECONDS`. The work also adds page-out handling for standalone module graphs and updates the WebKit pin to the new upstream snapshot.

### **NAPI finalizers now match Node’s cancellation/timing semantics** (e2eac5f)
Reference finalizers are now queued or cancelled in a Node-compatible way, preventing addons from running finalizers after `napi_delete_reference` has already freed the underlying object. Threadsafe function teardown also changed so its finalizer timing matches Node more closely, addressing crashes and use-after-free cases.

### **Prune now detects mixed node_modules layouts instead of refusing outright** (84c364e)
`bun prune` can now inspect the actual `node_modules` layout and choose the right planner even when the installed tree doesn’t match the configured linker. That removes a common dead-end when projects switch between hoisted and isolated installs without a clean reinstall.

### **CSS parser recognizes newer pseudo-elements** (b7039c9)
`bun build` now accepts `::details-content`, `::picker()`, `::checkmark`, and `::picker-icon` without emitting false invalid-selector diagnostics. The parser tables were brought in line with newer lightningcss support.

### **Response body stream is released when one finalize helper runs** (4f7e15f)
A server finalize path now releases a response body’s readable stream instead of leaving it live through cleanup. That fixes a lingering lint issue and aligns the teardown path with the rest of the server’s stream lifecycle.

### Other misc changes
- Bun types updated for TypeScript 7.1 import attributes and test fixtures (2 commits)
- OOM/error-path consistency work for Blob, Response, Bun.file, and TextDecoder
- GC/React compiler/runtime refactors and test updates
- CI/build/docs tweaks, benchmark test adjustments, and dependency pin updates
