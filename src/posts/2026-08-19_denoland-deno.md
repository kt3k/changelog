---
date: 2026-08-19
repo: denoland/deno
size: L
title: "HTTP bodies, proxy targets, and fetch headers"
excerpt: "Fixes request-body lifetimes, proxy URL construction, streaming response truncation, SAB decoding, and HTTP/2 header limits."
commits: 6
authors: [bartlomieju, badgerbees, nathanwhit]
commit_authors: {"4173322": bartlomieju, "46baf26": bartlomieju, "e00b10c": bartlomieju, "0d760ee": bartlomieju, "dab460d": nathanwhit}
---

### **Keep Deno.serve request bodies readable after responding** (46baf26)
The HTTP server now avoids force-closing a request body if JavaScript has already taken the stream and is still reading it in the background. That fixes cases where a handler responds early but continues piping `req.body`, and it switches the body resource to auto-close so it can finish safely on its own.

### **Truncate fixed-length streaming responses to Content-Length** (dab460d)
Streaming `Deno.serve` responses now stop exactly at the declared `Content-Length` instead of rejecting oversized chunks outright. This prevents overlong streams from breaking fixed-length responses or corrupting reused HTTP/1 connections, including the zero-length case.

### **Build proxied request targets through the URL parser** (4173322)
Node HTTP proxy requests now construct the absolute-form target with the URL parser instead of string concatenation. That preserves default-port behavior and normalization, and it also rejects absolute-path rewrites that would retarget the request to a different authority.

### **Raise the default HTTP/2 header list limit for fetch** (e00b10c)
`fetch()` now advertises a 256KB `SETTINGS_MAX_HEADER_LIST_SIZE`, matching browser behavior instead of hyper’s old 16KB default. This avoids spurious HTTP/2 `PROTOCOL_ERROR`s when servers return legitimately large header blocks.

### **Snapshot SharedArrayBuffer input in `TextDecoder.decode()`** (0d760ee)
`TextDecoder.decode()` now makes a real copy of SharedArrayBuffer-backed input, including offset views, before decoding. That closes a memory-safety hole where concurrent mutation could race V8’s two-pass UTF-8 decoding and corrupt native memory.

### Other misc changes
- Node `_read()` cleanup on `IncomingMessage` (1 commit)
