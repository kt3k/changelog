---
date: 2026-09-22
repo: oven-sh/bun
size: L
title: "Bun tightens TLS, streams, spawn, and fs semantics"
excerpt: "Multiple bug fixes close race conditions and align Bun more closely with Node across TLS, streams, spawn IPC, fs callbacks, and S3 uploads."
commits: 21
authors: [robobun, Jarred-Sumner]
commit_authors: {"71639b0": robobun, "0a4002b": robobun, "6b877b4": robobun, "320c84c": robobun, "7a16823": robobun, "091a025": robobun, "fe927c3": robobun, "bf80d21": robobun, "1016a7a": robobun, "f5bb689": robobun, "46461c3": robobun, "6d99e4b": robobun, "80825a7": robobun, "2f9bf19": robobun, "a33a9c8": robobun, "19ce83e": robobun}
---

### **Fix S3 uploads that could leak forever when the writer is abandoned** (71639b0)
If an `S3File.writer()` is dropped before `end()`, Bun now aborts the multipart upload instead of leaving buffered data and event-loop refs alive indefinitely. The fix also handles uploads that fail while `CreateMultipartUpload` is still in flight and cleans up a 204 abort path.

### **Stop TLS client certificates from being sent before a rejected chain is known bad** (0a4002b)
Bun now suppresses the client certificate flight earlier when a server chain is going to be rejected, including proxy tunnels, `Duplex` TLS, and named pipes. This closes a privacy/correctness gap where mTLS credentials could leave the client even though the handshake would fail.

### **Preserve a pre-handshake write in the same TLS segment as the final flight** (6b877b4)
A write queued before TLS handshake completion is now retried so it ships with the final handshake flight instead of being split into a later segment. That matches Node more closely and fixes intermittent `ECONNRESET` behavior seen in `node:https`-style clients.

### **Do not swallow `ERR_INVALID_THIS` from async-iterable bodies** (320c84c)
Async-iterable bodies now propagate iterator errors instead of silently truncating reads or hanging forever. This fixes broken `Response`, `fetch` upload, and `Bun.serve` stream behavior when iterator methods are called with the wrong receiver.

### **Fix `FileSink` lifetime and finalization when a worker exits or a pipe outlives its controller** (7a16823)
Bun now separates controller finalization from sink finalization so a pipe controller can die safely without use-after-free. It also adds shutdown ref cleanup for stranded sink work, preventing leaks and ASAN-only crashes.

### **Make spawned child IPC blocking and keep fd slot handling correct** (091a025)
The child-side IPC socket is now blocking, so non-JS children can write full payloads instead of short writes and lost messages. The spawn logic also avoids fd-slot collisions that could previously turn valid `dup2` setups into `EBADF`.

### **Run Node `fs` callbacks from the native completion path, not a promise reaction** (fe927c3)
`node:fs` callbacks now fire in the same ordering Node expects, with `process.nextTick()` inside the callback beating microtasks queued there. This is a compatibility fix that affects callback ordering across the entire `fs` API surface.

### **Make direct streams deliver chunk data before `reader.closed` settles** (f5bb689)
Direct stream reads now resolve in the same order as the underlying chunk delivery, preventing `reader.closed` from racing ahead and causing downstream consumers like `Duplex.fromWeb` to drop the chunk. This closes a subtle stream ordering bug that could surface as missing data.

### **Return `false` from `net.Socket#write()` when the send fails immediately** (46461c3)
Bun now mirrors Node by reporting immediate send failures through `write()`’s return value and `socket.errored` right away. That makes synchronous error handling on sockets behave correctly for `EPIPE`, `ECONNRESET`, and closed handles.

### **Keep native-backed readable streams from emitting extra data after destroy()** (80825a7)
Destroying a native-backed readable now stops further `data`/`end` delivery and trims read-ahead buffering when appropriate. This aligns child process and `Readable.fromWeb()` behavior with Node and avoids one extra chunk after teardown.

### **Emit the right socket lifecycle events for `node:http` client disconnects** (6d99e4b)
`req.socket` now emits `end`, `error`, and `close` in the expected cases when a client disconnects with FIN or RST. That restores cleanup paths that rely on `end`/`error` instead of only seeing `close`.

### **Keep unread data alive and still emit `close` when wrapped TLS transports shut down** (bf80d21)
Wrapped TLS transports now preserve unread buffered data until consumers drain it, while still delivering the final `close` event. This fixes shutdown semantics for upgraded sockets and `node:tls` consumers that depend on the last read.

### **Add a Windows Credential Manager persist option** (1016a7a)
`Bun.secrets.set()` on Windows can now choose how entries persist instead of always using the default roaming-friendly mode. That gives callers control over whether a secret stays machine-local or follows the user profile.

### **Reject a malformed TypeScript type-literal parameter with a real parse error** (2f9bf19)
The parser now reports a normal `Unexpected <token>`-style error instead of leaking its internal `Backtrack` signal for bad type-literal signatures. That makes diagnostics more useful and keeps parser failures consistent across entry points.

### **Reject old-style stream bodies when they error during `node-fetch` reads** (a33a9c8)
Built-in `node-fetch` now rejects body reads if a legacy `Stream` source fails after being wrapped in `new Response(stream)`. This prevents `text()`, `json()`, and `arrayBuffer()` from hanging forever on errored non-`Readable` streams.

### **HMR websocket protocol can no longer abort or crash the dev server** (19ce83e)
The dev server now defends against malformed or unexpected HMR frames instead of hitting debug assertions and invalid state. This closes a reliability issue reachable by any client talking to the HMR websocket endpoint.

### Other misc changes
- CI dependency bumps / mordant baseline updates (3 commits)
- Minor test-only and internal plumbing changes around TLS, spawn, streams, fs, and S3
