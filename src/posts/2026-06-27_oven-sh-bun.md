---
date: 2026-06-27
repo: oven-sh/bun
size: L
title: "Crash fixes and protocol conformance"
excerpt: "Bun fixed several crashers across async context, fetch, websockets, cloning, and source maps, plus a few HTTP correctness bugs."
commits: 13
authors: [robobun]
commit_authors: {"8072934": robobun, "8706328": robobun, "0f9331d": robobun, "f336885": robobun, "d4b9d10": robobun, "a1a2c81": robobun, "7257f93": robobun, "7c05b11": robobun, "df92f8f": robobun, "c2b5cef": robobun, "a2290aa": robobun, "f412daa": robobun, "96a7627": robobun}
---

### **Fix top-level await + AsyncLocalStorage segfault** (0f9331d)
Bun now preserves AsyncLocalStorage state when a top-level `await` resumes, including after `import()`-driven module evaluation. This fixes a deterministic segfault that affected real-world TLA modules and brings Bun in line with Node.

### **Tighten WebSocket close() validation and frame masking** (8706328)
WebSocket `close()` now rejects invalid status codes and overlong reasons per RFC 6455, and the runtime now refuses incorrectly masked/unmasked frames instead of desynchronizing the parser. This closes a spec-conformance gap and hardens the server/client against malformed or fuzzed traffic.

### **Stop Bun Shell from asserting on detached pipe callbacks** (f336885)
A detached `PipeReader` can now complete without tripping a debug assertion when syscall faults or similar races cause an extra terminal callback. That removes a regression that could panic Shell under fuzzed failure conditions.

### **Fix source map columns after non-ASCII characters** (d4b9d10)
Source-map original columns and inline snapshot updates now agree on the column unit used after non-ASCII text. This corrects off-by-one mappings in `bun build --sourcemap` and improves stack-trace/snapshot accuracy for international text.

### **Prevent Bun.serve from killing the process on response body stream errors** (8072934)
If a streamed response body errors after the response has started, Bun now handles the rejection and force-closes the response instead of letting it escape as an unhandled rejection or malformed completion. This fixes a server-killing bug for stream-backed responses.

### **Fix bundled CJS handling for nullish exports and top-level arguments** (a1a2c81)
The bundler/runtime now handles `module.exports` being nullish and top-level arguments more robustly in bundled CommonJS output. This addresses edge cases that could break generated CJS bundles and related HMR/runtime paths.

### **Harden HTTP abort tracking on socket close** (7257f93)
Abort trackers are now swept by socket pointer during `Handler::on_close` fallthrough, improving cleanup when connections end unexpectedly. This reduces racey abort-state leaks in fetch/socket close scenarios.

### **Fix streamed request-body wire bugs in fetch()** (7c05b11)
Bun now avoids malformed HTTP/1.1 uploads when a streamed request body is being sent, including the empty-chunk case that could accidentally emit the chunked terminator early. This repairs keep-alive upload correctness and prevents stalled or truncated requests.

### **Keep structuredClone reference pools in sync** (df92f8f)
The structured-clone serializer/deserializer reference pools were aligned so pooled terminal objects stay indexed consistently on both sides. This is a low-level correctness fix that prevents corrupted clone payloads for newer cloneable types.

### **Throw DataCloneError for detached ArrayBuffers** (c2b5cef)
Detached `ArrayBuffer` serialization now raises the standard `DataCloneError` DOMException instead of a plain `TypeError`. That matches the HTML spec and the behavior users get in major browsers and Node.

### **Avoid retrying consumed ReadableStream fetch bodies on reconnect** (a2290aa)
Fetch no longer retries idempotent requests with `ReadableStream` bodies after a keep-alive disconnect, which could previously replay a partially consumed upload and panic. The fix makes reconnect behavior match the actual recoverability of the request body.

### **Use forward slashes in Windows source map sources** (f412daa)
Source-map `sources` entries on Windows now always use `/` instead of the host path separator. That makes emitted maps resolve correctly as URLs across tooling.

### **Bounds-check HTTPClient::header_str to stop slice panics** (96a7627)
HTTP header string lookup now returns an empty slice instead of panicking when header metadata gets out of sync with the backing buffer. This removes a crash in request building under concurrent TLS load and allocation churn.

### Other misc changes
- WebKit dependency bump and test updates (1 commit)
- Minor docs/comments/internal refactors across HTTP and WebSocket code
