---
date: 2026-04-06
repo: nodejs/node
size: L
title: "QUIC arena rewrite and stream/iter land"
excerpt: "Major QUIC packet allocation overhaul, new stream/iter classic adapters, and inspector storage fixes with stricter event handling."
commits: 6
authors: [jasnell, islandryu, thisalihassan, RafaelGSS]
commit_authors: {"449a93a": thisalihassan, "89cc85c": RafaelGSS, "d581ead": jasnell, "500c3a5": jasnell, "4f08c64": islandryu, "d93935b": islandryu}
---

### **QUIC packets move to arena allocation** (d581ead)
The QUIC implementation drops the per-packet ReqWrap/free-list model in favor of a per-endpoint arena with no V8 involvement for packet objects. This should reduce overhead, avoid fragmentation risk, and remove a major bottleneck in packet handling.

### **stream/iter adds classic stream interop** (500c3a5)
Node now exposes classic `Readable` integration for the experimental `stream/iter` APIs, including a new `Stream.toAsyncStreamable` path and a dedicated `ERR_STREAM_ITER_MISSING_FLAG` error when the flag is off. The feature is documented and tested heavily, making it a substantial new iteration/interop surface for streams.

### **Inspector webstorage events now auto-collect data** (d93935b)
Inspector DOM storage hooks were wired up to collect local/session storage changes automatically from the internal webstorage layer. This makes storage mutations visible to the inspector without manual plumbing and tightens the integration between runtime storage and DevTools protocols.

### **Inspector protocol event emission now reports failures** (4f08c64)
CDP event emission paths in the inspector now return errors when protocol dispatch fails instead of silently continuing. That improves debuggability and correctness for DOM storage and network event reporting.

### **Inspector webstorage coerces keys and values to strings** (449a93a)
Webstorage inspector events now stringify keys and values before dispatching them. That aligns event payloads with storage semantics and avoids type mismatches in inspector consumers.

### **Other misc changes**
- Security policy updated to remove the bug bounty program announcement (89cc85c).
