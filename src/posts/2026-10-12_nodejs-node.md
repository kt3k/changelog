---
date: 2026-10-12
repo: nodejs/node
size: M
title: "Node gets SQLite 3.54.0 and abort fix"
excerpt: "SQLite is updated, AbortSignal.any() leak is fixed, and HTTP raw header name lookup is faster."
commits: 7
authors: [nodejs-github-bot, rozzilla, vassudanagunta, inoway46, soulee-dev, DariusHQ]
commit_authors: {"a7a96c2": nodejs-github-bot, "cca4937": nodejs-github-bot, "e2bc156": rozzilla, "1d3b65d": DariusHQ}
---

### **SQLite upgraded to 3.54.0** (cca4937)
Node now bundles SQLite 3.54.0, a major upstream refresh with new API/documentation changes and updated amalgamation sources. This keeps the embedded database engine current and brings in the latest upstream fixes and behavior changes.

### **Fix AbortSignal.any() composite leak** (1d3b65d)
`AbortSignal.any()` no longer unregisters the wrong cleanup token when nested composites are involved, which could leave an outer composite and its listeners stuck in GC-tracked state. The fix makes composite cleanup use the right weak-ref token and adds a regression test covering collection of nested composites.

### **Reduce allocations in `getRawHeaderNames()`** (e2bc156)
`OutgoingMessage.getRawHeaderNames()` now reuses the array returned by `ObjectValues()` instead of allocating a second array just to extract header names. That trims per-call allocation overhead on a hot HTTP path, and the new benchmark/test coverage confirms the returned array remains correct and isolated.

### **Acorn updated to 8.19.0** (a7a96c2)
The embedded Acorn parser was refreshed to 8.19.0, bringing Unicode 18 support and several parser bug fixes. The update also adjusts parser internals to better handle strict-mode directives, async arrow parsing, and related expression edge cases.

### Other misc changes
- Documented Test Runner in `diagnostics_channel`.
- QUIC CI now runs on V8 changes.
- PR labeler workflow updated to a newer action version.
