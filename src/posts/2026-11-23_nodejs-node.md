---
date: 2026-11-23
repo: nodejs/node
size: L
title: "Node lands TLS, HTTP, streams, and source-map fixes"
excerpt: "Major runtime behavior changes, a new source-map scopes decoder, and several bug fixes across HTTP, streams, permissions, and TLS."
commits: 21
authors: [RafaelGSS, hamzakargin, legendecas, christianaurichzm, nigrosimone, gurgunday, dennev, vmoroz, ychuhai, ShogunPanda, zelalem61, inoway46, pimterry, MattiasBuelens, tamird]
commit_authors: {"642300f": dennev, "527dd80": legendecas, "1ad01d3": pimterry, "1ef4444": nigrosimone, "660c104": tamird}
---

**TLS renegotiation is now disabled by default** (1ad01d3)
Renegotiation is deprecated as a runtime behavior change now, not just a warning-only docs note. The update flips the default to disabled while preserving opt-in support via `allowRenegotiation`, and it adds warnings/updated semantics for the related limits and APIs.

**HTTP agent now avoids reusing expired free sockets** (642300f)
`Agent.addRequest()` now checks whether an idle keep-alive socket’s timeout has already elapsed before reusing it, even if the event loop was blocked and the timer callback never fired. This closes a race that could surface as `ECONNRESET` on reused connections.

**Source maps gain an ECMA-426 scopes decoder** (527dd80)
Node adds a substantial new decoder for the Stage 3 scopes proposal, expanding source-map support beyond VLQ mappings. This lays the groundwork for richer stack-trace/source-map scope information, though the formatter piece is still coming in a follow-up.

**Async callbacks skip stack work when nobody can observe it** (1ef4444)
Internal callback scopes now take a fast path when async hooks and `executionAsyncResource()` are not in use, avoiding unnecessary push/pop work on hot paths. That reduces overhead for common async execution while preserving full behavior when hooks are enabled.

**TLS address-family fallback test is made local and stable** (660c104)
The TLS autoselect-family server-name test now runs against a local IPv4/IPv6 loopback server instead of hitting nodejs.org. That makes the test less flaky and keeps certificate verification enabled while still exercising the fallback behavior.

### Other misc changes
- Stream and fs fixes for `highWaterMark: 0` behavior and byte-stream queue accounting
- Permission API now rejects empty `drop()` references
- `http`/`url`/`path`/`os` hot-path and correctness fixes
- Build tweak to keep PGO settings out of addon builds
- Misc test and docs updates, including TLS docs and HTTP chunk-length coverage
