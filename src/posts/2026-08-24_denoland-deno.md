---
date: 2026-08-24
repo: denoland/deno
size: L
title: "Big perf push across core and ops"
excerpt: "Arena, async borrow, websocket, and fs locking got meaningful performance and correctness upgrades, plus a few user-facing fixes."
commits: 11
authors: [bartlomieju, Hixie, charle-z, ryuapp]
commit_authors: {"293074f": bartlomieju, "ff67231": bartlomieju, "d9ec594": bartlomieju, "af8404d": Hixie, "4b987ea": bartlomieju, "6ba8619": charle-z, "cfbf621": bartlomieju}
---

### **AsyncRefCell gets an uncontended fast path** (ff67231)
Borrow futures now short-circuit immediately when the cell is uncontended, avoiding the waiter-queue path entirely. This trims overhead for common borrows and should help hot async code that repeatedly takes short-lived shared or exclusive borrows.

### **Future arena grows on demand instead of over-allocating** (d9ec594)
The op driver’s future arena now starts much smaller and expands only when needed, with support for recycling retired chunks before growing further. That reduces baseline runtime memory footprint while still preserving pinned-future semantics.

### **WebSocket op future is shrunk by boxing the handshake** (293074f)
`op_ws_create` was split so the bulky connect/handshake state machine lives in a boxed inner future instead of bloating the op future itself. That matters because Deno sizes its op future arena around the largest op future, so this keeps the common case cheaper.

### **Coverage now accounts for V8’s UTF-16 offsets** (af8404d)
Coverage line/range mapping was fixed to compare offsets in V8’s UTF-16 units rather than Rust’s scalar-value indexing, which was wrong for non-BMP text. This resolves misattributed branch coverage in scripts containing astral-plane characters.

### **Concurrent flock users no longer starve the blocking pool** (cfbf621)
Long-running file-lock work now runs on dedicated threads first, with retry/backoff if the OS temporarily refuses new threads, and falls back only if exhaustion persists. This prevents lock-heavy workloads from monopolizing Tokio’s blocking pool and stalling unrelated filesystem work.

### **N-API addon load failures now show the OS error and path** (4b987ea)
Addon load errors now surface the underlying loader cause plus the resolved path instead of opaque platform-specific failures. That makes broken or mislocated `.node` loads much easier to diagnose in the field.

### **DNS ANY queries skip unsupported record types** (6ba8619)
The net DNS path now ignores record types that aren’t supported when answering `ANY` queries. That avoids malformed or incomplete responses when resolvers return mixed record sets.

### **Other misc changes**
- Core modules were refactored into focused submodules.
- Several dependency/feature cleanup commits, including removing unused crates/features.
- Snapshot-creation tests were serialized behind a process-wide lock.
- NPM registry parsing and assorted internal cleanup/perf tweaks.
