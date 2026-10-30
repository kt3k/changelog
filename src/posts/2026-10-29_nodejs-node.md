---
date: 2026-10-29
repo: nodejs/node
size: L
title: "Node 27 alpha lands with security and API fixes"
excerpt: "Major crypto hardening, a readFileSync overflow fix, stream context preservation, and new child_process timeout reporting headline the day."
commits: 15
authors: [marcopiraccini, araujogui, RafaelGSS, christianaurichzm, panva, motokaneyuki, mcollina, leah-1ee]
commit_authors: {"8d514c7": christianaurichzm, "502c117": panva, "d56c163": mcollina, "1d3835e": marcopiraccini, "c1cbf1f": marcopiraccini, "c9f1d2d": marcopiraccini, "c2591da": marcopiraccini, "510d84c": araujogui, "d4d24d7": araujogui, "1c38c91": araujogui, "9e17e7f": araujogui}
---

### **fs: fix readFileSync utf8 overflow on short reads** (8d514c7)
`readFileSync(fd, 'utf8')` could overflow its heap buffer on pipes that delivered many short reads before the first full 8 KiB chunk. The fix sizes the heap buffer to at least what was already accumulated, preventing the overflow and the related underflow in the next read size.

### **src: make crypto backend checks explicit** (502c117)
Node now rejects unsupported crypto backends at compile time instead of silently taking provider-specific or BoringSSL paths. This tightens the build matrix and avoids accidentally shipping backports against an incompatible crypto implementation.

### **stream: keep async context of pipeTo watchers** (d56c163)
Web Streams `pipeTo()`/`tee()` watcher reactions are now installed and invoked in the async context captured at registration time, rather than whichever callback later settles them. That preserves AsyncLocalStorage semantics for close, abort, and cancel paths that previously observed the wrong store.

### **child_process: add subprocess.timedOut** (c2591da)
Spawned subprocesses now expose a `timedOut` boolean when they are killed because the `timeout` option expired, and `exec()`/`execFile()` callbacks receive the same signal on their error object. This makes timeout-driven termination distinguishable from ordinary kills and fixes a long-standing observability gap.

### **fs: stop swallowing exceptions from completion callbacks** (c9f1d2d)
Exceptions thrown by completion callbacks, or by the nextTick work they trigger, are no longer accidentally caught by internal `TryCatch` blocks. That restores proper error reporting for several filesystem completion paths including `mkdtemp`, `realpath.native`, `readlink`, recursive mkdir/readdir, and `dir.read`.

### **zlib: avoid extra empty Zstd frame** (1d3835e)
Ending a Zstd compression stream with queued writes no longer appends a spurious empty frame. The fix tracks whether a frame has already been ended and keeps subsequent end handling from emitting an extra frame.

### **zlib: restart format detection when resetting Unzip** (c1cbf1f)
`createUnzip().reset()` now correctly resets auto-detection state so gzip/deflate detection can start over after partial or prior format detection. This fixes cases where resetting mid-stream could leave the decoder stuck in the wrong mode.

### **sqlite: cache the SQLTagStore constructor template** (510d84c)
The `SQLTagStore` constructor template is now cached on the environment like the other SQLite classes instead of being recreated each time. This reduces unnecessary template/prototype churn when creating many stores.

### **sqlite: settle BackupJob through a single exit point** (d4d24d7)
SQLite backup jobs now funnel all exits through a single settle path, ensuring the promise is finalized and the job object is deleted exactly once. This also closes a cleanup hole when progress-object construction fails.

### **sqlite: use DeleteFnPtr for all SQLite handles** (1c38c91)
SQLite handle ownership is being standardized around `DeleteFnPtr` aliases, replacing custom deleters and scope-leave cleanup helpers. The refactor also passes session ownership into `Session::Create`, simplifying lifetime management.

### **sqlite: track statements in the Statement constructor** (9e17e7f)
Statement objects now register themselves for tracking as soon as they are constructed, instead of relying on every caller to do it. That makes statement lifecycle bookkeeping consistent with `Session` and avoids missed tracking.

### **Other misc changes**
- Release/version bump to 27.0.0-alpha.0.0.0 and changelog indexing updates.
- Documentation updates for new/changed CLI, crypto, and release-process behavior.
- Typings cleanup for shared crypto handle methods.
- Minor doc fixes, including the `--watch-path` platform note removal.
