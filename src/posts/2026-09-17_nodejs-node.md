---
date: 2026-09-17
repo: nodejs/node
size: L
title: "VFS startup flags and crypto refactor land"
excerpt: "New VFS boot flags, a major asymmetric-key name overhaul, and several QUIC, TLS, stream, and tracing fixes."
commits: 15
authors: [jasnell, legendecas, pipobscure, panva, aduh95, joyeecheung, pimterry, XadillaX, ViniciusDev26]
commit_authors: {"6a7f94c": pipobscure, "1a3712d": panva, "9d82b4b": legendecas, "2dd7e7b": joyeecheung, "c2ddf93": pimterry, "cfcac8f": legendecas, "99f0dde": XadillaX, "fa95cd5": jasnell, "61fa321": jasnell, "bea0109": jasnell, "1ad67bc": jasnell, "0114dd0": jasnell, "41a1ed2": jasnell, "e204ae8": ViniciusDev26}
---

### **VFS gains startup mount/load flags** (6a7f94c)
Node can now mount virtual file systems before user code runs via `--vfs-mount`, and `--vfs-load` can both mount and execute the program from that VFS. This makes it possible to boot directly from archives or directories, including in worker-thread startup, and formalizes how entry points and provider selection work.

### **Crypto switches asymmetric keys to algorithm names** (1a3712d)
Asymmetric key handling was reworked to identify and construct keys by algorithm name instead of OpenSSL numeric IDs, which matters for provider-backed keys that may not have one. The change centralizes algorithm metadata in `ncrypto`, updates key generation/serialization paths, and should make newer PQC/provider-backed algorithms work more consistently.

### **TLS single-use secure contexts are released correctly** (e204ae8)
`singleUse` is now propagated onto the secure context, and `TLSSocket` tracks that context so it can be closed as soon as the socket is done. This fixes a lifetime bug where SSL contexts could linger until GC, which especially matters for connections that swap handles during auto-select retries.

### **QUIC stream cleanup and HTTP/3 lookup behavior improve** (c2ddf93)
QUIC stream close handling was adjusted to tolerate already-gone streams and the HTTP/3 application glue was simplified around stream lifecycle/lookup management. The change also adds coverage for stream-credit behavior, reducing the chance of leaks or stale stream state during shutdown and cleanup.

### **Stream iterator sharing and broadcast semantics are tightened** (61fa321, bea0109, 1ad67bc, 0114dd0, 41a1ed2)
The `stream/iter` internals got several behavior fixes around backpressure, cancellation, and late joiners. Notably, sync sharing now rejects unbounded backpressure, drop-newest behavior was fixed to skip rather than detach prematurely, broadcast pumps now abort cleanly, and buffered data is retained when there are temporarily no consumers.

### **Trace event value storage avoids union type-punning** (99f0dde)
Trace value encoding was rewritten to use `memcpy`-based copying instead of reading inactive union members. That removes undefined behavior and aligns Node’s legacy tracing path with the corresponding V8 fix.

### Other misc changes
- PGO build docs updated for Linux (9d82b4b)
- `test-watch-create-isolation-none` unskipped (b453e7b)
- V8 logging level now derives from `dcheck_always_on` (2dd7e7b)
- Minor QUIC timeout regression fix (fa95cd5)
- Removed obsolete `cl.exe` mention from Windows build docs (cfcac8f)
