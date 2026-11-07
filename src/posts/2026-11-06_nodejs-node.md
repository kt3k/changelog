---
date: 2026-11-06
repo: nodejs/node
size: L
title: "DNS coalescing and crypto hardening land"
excerpt: "Node.js adds concurrent dns.lookup() coalescing, fixes crypto/OpenSSL error handling, and patches several race and FFI issues."
commits: 11
authors: [panva, colinaaa, avivkeller, araujogui, christianaurichzm, aduh95, mcollina, trivikr, orgads, bitpshr]
commit_authors: {"9d8a9ad": colinaaa, "128f247": araujogui, "280798a": christianaurichzm, "be6f8f8": mcollina, "8e8b4f0": trivikr, "ec4d4c2": orgads}
---

### **dns: coalesce identical concurrent lookup() requests** (ec4d4c2)
Concurrent `dns.lookup()` calls for the same hostname/options now share a single `getaddrinfo` request instead of fanning out to the libuv threadpool. This reduces contention and avoids cascading timeouts when DNS resolution is slow.

### **crypto: prevent stale OpenSSL errors** (be6f8f8)
Crypto paths now clear OpenSSL's error queue around SPKAC parsing, key import, key comparison, and TLS write/read operations so they only observe errors from their own calls. This fixes misleading error handling and makes TLS/private-key parsing more reliable across OpenSSL backends.

### **sqlite: reject oversized UDF return values correctly** (128f247)
SQLite custom functions now use 64-bit result APIs for strings and blobs, preventing silent truncation when JavaScript returns values larger than `INT_MAX`. Oversized results now fail with `SQLITE_TOOBIG` instead of producing corrupted output.

### **ffi: reject signature conflicts from getFunctions getters** (8e8b4f0)
`getFunctions()` now rechecks pending symbols after running getters, so user code can't sneak in a conflicting signature for an already-cached function. That closes a correctness hole where a library could end up caching the wrong wrapper.

### **stream: fix pipeTo assert when writer is released during microtask** (9d8a9ad)
`pipeTo()` now skips a deferred write if shutdown already released the writer, preventing an internal assertion from firing in a race between scheduling and teardown. The added regression test covers both abort and destination-error timing.

### **watch: track all dependencies of an owner** (280798a)
Fixed watch mode's dependency bookkeeping so an owner doesn't overwrite earlier tracked dependencies with only the most recent one. This restores correct cleanup/restart behavior under `node --test --watch`.

### Other misc changes
- WPT test flag updates
- Domain crypto test input fix
- Security pre-alert template doc fix
- Torque/V8 build sync
- Child process docs clarification
