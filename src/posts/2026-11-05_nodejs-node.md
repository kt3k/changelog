---
date: 2026-11-05
repo: nodejs/node
size: L
title: "Crypto speedups and WebIDL blob fixes"
excerpt: "Blob/File now follow Web IDL more closely, HTTP parser batching improves throughput, and crypto caches and HMAC reuse cut overhead."
commits: 16
authors: [anonrig, panva, rozzilla, nodejs-github-bot, mcollina, araujogui, inoway46, LiviaMedeiros, joyeecheung, MikeMcC399, StefanStojanovic]
commit_authors: {"aead708": panva, "4830c11": mcollina, "544340a": rozzilla, "36452f1": araujogui, "1a2b511": anonrig, "1eaaeee": anonrig, "75c42e9": anonrig, "3295b92": anonrig, "5e893ce": joyeecheung, "8337f97": rozzilla}
---

### **Blob and File constructors now follow Web IDL conversion rules** (aead708)
Node now converts Blob/File constructor arguments in Web IDL order, including inherited dictionary members and `File.lastModified` conversion, and avoids invoking user getters or species constructors while copying data. It also treats detached parts as empty and tightens brand checks, which brings Node closer to browser behavior and closes observable edge cases.

### **Crypto caches digests and reuses HMAC contexts** (1eaaeee, 3295b92, 75c42e9, 1a2b511)
Crypto now keeps per-environment digest caches for synchronous operations and reuses HMAC templates in `createHmac()`, reducing repeated OpenSSL provider lookups. The accompanying tests cover cache invalidation across FIPS mode changes and confirm duplicated HMAC contexts stay independent.

### **HTTP parser batches body chunks per execute call** (36452f1)
The C++ HTTP parser now buffers body spans and delivers them to JS once per `execute()` instead of once per chunk, cutting C++↔JS crossings for chunked uploads. This should improve throughput for bodies delivered in many small pieces.

### **Inspector is blocked during snapshot building** (5e893ce)
Node now rejects `--inspect`, `--inspect-brk`, and `--inspect-wait` when `--build-snapshot` is in use, matching newer V8 restrictions. The runtime and docs were updated so snapshot builds fail fast instead of hitting a debugger-related V8 limitation later.

### **Querystring and URLSearchParams percent-encoding gets faster** (544340a, 8337f97)
Latin-1 escape sequences are now precomputed in `querystring.escape()`, and `URLSearchParams#getAll()` uses indexed appends. These are focused throughput improvements for common serialization and lookup paths.

### **HTTP/2 compat push responses now handle stream errors** (4830c11)
Pushed `Http2ServerResponse` streams now get error handling attached before the callback runs, preventing unhandled errors when a peer refuses a push. Applications that use `response.createPushResponse()` no longer need to race their own listener attachment to avoid crashes.

### Other misc changes
- WPT updates for FileAPI/blob/file/readers and related feature metadata (1 commit)
- Undici WPT report warning tweak (1 commit)
- Build/system changes: shared generated-file producer cleanup, Python 3.10 support drop, and Windows PGO build minification (3 commits)
- Minor internal refactors and benchmarks for benchmarks/helpers (4 commits)
