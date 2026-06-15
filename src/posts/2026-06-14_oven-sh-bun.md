---
date: 2026-06-14
repo: oven-sh/bun
size: M
title: "SQL validation and pool safety fixes"
excerpt: "Bun tightened SQL helper validation, hardened pool scans against unassigned slots, and extended a few container test timeouts."
commits: 3
authors: [robobun, alii]
commit_authors: {"4d79cf8": robobun, "eb98fd8": robobun}
---

### **SQL helpers now reject degenerate inputs cleanly** (4d79cf8)
Bun's `sql()` helpers now throw clear `SyntaxError`s for invalid helper payloads instead of surfacing raw `TypeError`s or backend syntax errors. The fix also tightens the TypeScript signature so bare `null`/`undefined` are rejected at compile time, while preserving valid array bindings like `[null]` for `WHERE IN`.

### **Pool scans no longer blow up on unfilled connection slots** (eb98fd8)
The SQL pool now tolerates holes in its connection array during startup, which matters because user code can re-enter pool methods while a `password` callback is still filling slots. This prevents a raw `TypeError` during connection management and makes the pool-start path resilient under reentrant callbacks.

### Other misc changes
- Increased `beforeAll` timeouts for container-backed tests to 120s to avoid cold-start hook kills (3 commits).
