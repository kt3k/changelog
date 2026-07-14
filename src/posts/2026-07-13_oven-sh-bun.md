---
date: 2026-07-13
repo: oven-sh/bun
size: L
title: "Bun hardens N-API, crypto, and router edge cases"
excerpt: "A security fix for TSFN teardown, plus bug fixes for detached crypto inputs, UUIDv7 monotonicity, query parsing, and MySQL prepare validation."
commits: 10
authors: [robobun, Jarred-Sumner]
commit_authors: {"73b6c14": Jarred-Sumner, "df791a7": robobun, "5ba9057": robobun, "8f1a954": robobun, "005ddfb": robobun, "b4045c1": robobun}
---

### **Fix TSFN use-after-free when a worker tears down** (73b6c14)
Bun now tracks N-API thread-safe functions per env and aborts them during env cleanup so addon threads can’t keep touching a freed worker event loop. This closes a real use-after-free that could segfault `bun --bun next build` when background addon threads outlived worker shutdown.

### **Treat detached crypto ArrayBufferViews as empty input** (5ba9057)
`Hash.update()`, `Sign.update()`, and `Verify.update()` now follow Node’s behavior for detached views instead of throwing. That fixes compatibility for addons and user code that pass typed-array views whose backing buffer was transferred away.

### **Preserve randomUUIDv7 monotonicity across counter rollover** (005ddfb)
`Bun.randomUUIDv7()` now advances the timestamp when the 12-bit counter overflows, instead of wrapping and breaking sort order. This makes UUIDv7 output reliably monotonic even when more than 4096 IDs are generated within one millisecond.

### **Reject invalid MySQL prepare-OK packets with statement_id 0** (b4045c1)
Bun now treats a `COM_STMT_PREPARE` response with `statement_id = 0` as a protocol error instead of accepting an impossible prepared-statement state. That hardens MySQL client handling against malformed or hostile servers and prevents later execution logic from relying on a bogus statement handle.

### **Keep file system router query parsing past empty-key pairs** (8f1a954)
A query string entry like `=value` no longer terminates parsing and drops the rest of the parameters. `FileSystemRouter.match().query` now skips empty keys and continues, matching `URLSearchParams`-style behavior more closely.

### **Fix long Unix socket paths on Linux** (df791a7)
The Linux `sun_path` workaround now bounds the basename copy with a length-aware `snprintf` format instead of treating a ptr+len path as NUL-terminated. This fixes an out-of-bounds read that could surface under ASan or produce corrupted socket paths.

### **Other misc changes**
- Split `bun-serve-static` stress coverage into separate test files and updated duration baselines.
- Skipped transient Windows hot-reload file-access errors in one test.
- Rebased a message-channel heap-count assertion.
- Adjusted a proxy-stress helper to dial `127.0.0.1` directly.
