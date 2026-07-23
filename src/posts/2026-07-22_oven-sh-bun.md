---
date: 2026-07-22
repo: oven-sh/bun
size: L
title: "Cron semantics, SQL infinities, and HTTP fixes"
excerpt: "Notable behavior changes landed across cron scheduling, SQL date handling, fetch/websocket semantics, and several server-side HTTP edge cases."
commits: 45
authors: [robobun, Jarred-Sumner]
commit_authors: {"4b3329b": robobun, "f3bdc54": robobun, "708525f": robobun, "80b9108": robobun, "f262074": robobun, "a1f6de1": robobun, "bbf0e3f": robobun, "4915f42": robobun, "45f21e5": robobun}
---

### **Cron now runs in local time, with optional time zones** (a1f6de1)
`Bun.cron.parse()` and in-process `Bun.cron(schedule, handler)` now interpret schedules in the system’s local time zone by default instead of UTC. The new `{ tz }` option lets callers pin an IANA zone like `UTC` or `America/New_York`, which makes cron behavior match the OS-level overload and clarifies DST handling.

### **SQL date/timestamp infinities now round-trip correctly** (708525f)
Postgres `'infinity'`/`'-infinity'` values were being collapsed into `Invalid Date`/`NaN`. Bun now preserves them as JS `±Infinity` on decode and maps them back to Postgres endpoints on encode, fixing silent data loss for date and timestamp fields.

### **Bun.serve now evaluates ETag/time-based preconditions correctly** (f262074)
Static and file routes now honor `If-Match` and `If-Unmodified-Since` before `If-None-Match`/`If-Modified-Since`, matching RFC 9110 precedence. That fixes cases where Bun could return `304` when it should have failed with `412`.

### **fetch() and WebSocket edge cases get more browser/Node-compatible** (bbf0e3f, 45f21e5, 4b3329b)
Streaming `fetch()` aborts now release unread buffered body data and surface the abort to the reader instead of ending cleanly. Separately, `fetch(..., { method: "OPTIONS", body })` is now allowed, and WebSocket ping/pong/send-after-close behavior was tightened to better match `ws`/RFC expectations.

### **Server and HTTP timeout/close handling is more robust** (f3bdc54, 80b9108, 4915f42)
Bun.serve no longer panics when socket address lookup fails, and large HTTPS/HTTP responses are less likely to truncate when peers half-close or FIN early. These are reliability fixes for real connection-close and backpressure paths that previously dropped data or crashed.

### **Other misc changes**
- Test/perf work: syntax fixture batching, reduced static server stress iterations, cron/websocket/fetch/sql regression coverage, and flake fixes.
- Internal refactors and dead-code cleanup across Rust/C++/JS runtime code.
- Build/CI tweaks, dependency bumps, and link/Windows portability fixes.
- Docs and type updates for cron options and related API changes.
