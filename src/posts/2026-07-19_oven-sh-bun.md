---
date: 2026-07-19
repo: oven-sh/bun
size: L
title: "Bun hardens GC and HTTP/socket lifetimes"
excerpt: "Major fixes for refcount/GC lifetime bugs, HTTP double-delivery/UAFs, and several protocol/runtime correctness issues landed alongside CI and test harness work."
commits: 31
authors: [robobun]
commit_authors: {"3821241": robobun, "99fc2f8": robobun, "37ed95f": robobun, "d8dadda": robobun, "f5ba155": robobun, "8d85482": robobun, "7bf888e": robobun}
---

### **Fix redis refcount over-release causing heap UAF** (99fc2f8)
Refactors the Valkey/Redis client’s lifetime handling to use a scoped ref guard instead of manual ref/deref pairs, and adds a `forget()` helper to safely hand off ownership. This addresses a heap-use-after-free from refcount over-release and includes regression coverage around GC churn.

### **Prevent HTTP final-result double delivery after failures** (3821241)
Hardens `HTTPClient` so terminal failure states stay terminal even after internal state reset, preventing late events from dispatching a second final result into freed memory. It also tightens retry and timeout handling so failed clients don’t re-enter start/fail paths after their AsyncHTTP backing has already been released.

### **Root TLS upgraded-duplex callbacks on the wrapper, not Strong handles** (37ed95f)
Moves the TLS duplex origin and listener thunks off native `StrongOptional` roots and onto GC-traced wrapper slots, which better matches the object’s real lifetime. This reduces retention/leak risk and protects against re-entrant close paths that could otherwise run while the wrapper is becoming unreachable.

### **Fix a UUIDv7 explicit-timestamp monotonicity bug** (8d85482)
Separates clock-driven and caller-supplied UUIDv7 state so explicit timestamps are encoded verbatim without disturbing the default monotonic sequence. That makes `randomUUIDv7(timestamp)` deterministic and sortable across repeated calls while preserving the normal clock-path behavior.

### **Keep HTTP/2 writable/close callbacks alive across JS re-entry** (d8dadda)
Adds keepalives around `on_native_writable`, `on_native_close`, and frame dispatch paths so JS callbacks can destroy sessions without leaving the parser or socket dangling mid-loop. This is a concrete UAF fix for ASAN-fuzzed HTTP/2 paths.

### **Fix Bun.mmap to honor the requested offset** (f5ba155)
Changes `Bun.mmap` to return a view at the caller’s requested offset instead of silently page-aligning it. That restores correctness for code depending on exact mapping offsets and aligns behavior with the documented API.

### **Preserve 404 behavior for falsey Bun.serve routes without a fetch handler** (7bf888e)
Adjusts server routing so `false` routes correctly resolve to a 404 when no fetch handler exists. This fixes a public-facing routing edge case that could otherwise return the wrong response shape.

### Other misc changes
- CI retry / quarantine / shard-threshold tweaks, including a new musl lane and baked install caches
- Test harness and reliability doc updates
- Node API compatibility fixes: `events`, `http`, `http2`, `sqlite`, `path`, `fs`, `dotenv`, `util.parseArgs`
- Shell I/O and FIFO redirect fixes
- CSS tokenizer underflow fix and TLS/terminal retention cleanup
- Misc build/docs/dependency/test-only changes
