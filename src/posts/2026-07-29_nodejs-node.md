---
date: 2026-07-29
repo: nodejs/node
size: L
title: "Security-heavy release with key bug fixes"
excerpt: "Node ships multiple CVE fixes plus several runtime and docs improvements, including HTTP, HTTPS, SQLite, zlib, permissions, and FFI fixes."
commits: 30
authors: [RafaelGSS, mcollina, nodejs-github-bot, trivikr, edsadr, soreavis, panva, Renegade334, HoneyTyagii, Archkon, ShogunPanda, soulee-dev, bitpshr, dobbydobap, agape1225, semimikoh, luanmuniz, HoonDongKang]
commit_authors: {"012ecf5": RafaelGSS, "f8f8aa2": Archkon, "821688a": mcollina, "d0387cf": mcollina, "52a8ace": mcollina, "b413a9a": RafaelGSS, "9f03017": RafaelGSS, "f242cf4": RafaelGSS, "6d0db4a": bitpshr, "a0dd71e": HoonDongKang}
---

### **Security release with multiple CVE fixes** (012ecf5)
Node.js 24.18.1, 26.5.1, and 22.23.2 were cut with a stack of security fixes across HTTP/2, permissions, HTTPS, zlib, HTTP parsing, and SQLite. These releases address several CVEs, including header accounting, RST reentrancy, permission escapes, session reuse checks, and other hardening work.

### **IncomingMessage.signal now tracks real connection teardown** (f8f8aa2)
`IncomingMessage.signal` no longer aborts just because a request/response finishes normally; it now follows the underlying socket close lifecycle instead. This fixes false aborts during normal completion and preserves the signal for actual mid-request disconnects.

### **HTTP max-header-count overflow is now enforced** (821688a)
The HTTP parser now rejects requests that exceed `server.maxHeadersCount` instead of silently continuing past the limit. This closes a header-overflow bug and makes the limit effective for request parsing.

### **https.Agent now respects per-request identity checks** (52a8ace)
Requests that supply a custom `checkServerIdentity` are no longer eligible for connection reuse or TLS session reuse unless the agent itself was configured with that policy. This prevents identity checks from being bypassed through pooled sockets or resumed sessions.

### **HTTPS agent keys now distinguish PFX object arrays** (9f03017)
`https.Agent#getName()` now generates unique cache keys for PFX object arrays by including each entry’s buffer and passphrase. That avoids accidental socket/session reuse across distinct credential bundles.

### **Permission checks now cover report output paths correctly** (b413a9a)
Node report generation now validates the actual final output path, including report-directory handling, before writing under permission mode. This prevents writes from slipping through when the configured report directory or filename is outside the allowed fs scope.

### **Trace events now require write permission before starting** (f242cf4)
Enabling trace categories now checks fs-write permission for the eventual trace file path up front. That prevents permission mode from starting tracing that would later fail on file creation.

### **SQLite tag-store iterators are invalidated correctly** (d0387cf)
The SQL tag store now resets statements through the internal `ResetStatement()` path so iterator invalidation bookkeeping is updated properly. It also marks iterators done on `SQLITE_DONE`, preventing stale iterators from being reused or replaying work.

### **AbortSignal.any() no longer retains settled composites** (6d0db4a)
Aborted composite signals are now removed from the long-lived GC tracking set when their transitive dependents settle. This fixes a leak where observed composites could be retained indefinitely.

### **Blob.prototype.slice() now clamps Web IDL indices** (a0dd71e)
`Blob.prototype.slice()` now uses [Clamp] conversion for `start` and `end`, matching the File API definition more closely. This aligns behavior with WPT expectations for fractional bounds.

### Other misc changes
- ppc64 FFI trampoline register preservation and literal alignment
- TLS docs clarification for resumption/`authorized`
- `ada` and `undici` dependency updates
- `llhttp` dependency update
- WPT fixture refreshes and test additions
- async_hooks validator cleanup and a worker error regression test
- test runner, benchmark, and minor docs/config tweaks
