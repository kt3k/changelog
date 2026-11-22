---
date: 2026-11-21
repo: nodejs/node
size: L
title: "Security fix lands alongside HTTP2 API win"
excerpt: "Node.js patches a detached-buffer memory safety bug, adds http2 response.setHeaders(), and updates URL/ada handling."
commits: 12
authors: [LiviaMedeiros, mcollina, anonrig, nodejs-github-bot, jakecastelli, panva, maxhfisher]
commit_authors: {"5b8b4ee": nodejs-github-bot, "08eff13": mcollina, "6d426a0": jakecastelli, "ce44266": mcollina}
---

**Fix detached onread buffers to prevent memory corruption** (08eff13)
The stream read path now retains the backing store for user-supplied buffers and stops reusing a buffer if it has been detached during the callback. This closes a memory-safety hole where subsequent socket reads could write into freed or transferred memory owned by the application.

**Add `response.setHeaders()` to `Http2ServerResponse`** (6d426a0)
HTTP/2 compatibility responses can now bulk-apply headers from a `Headers` or `Map`, matching the core `OutgoingMessage` API more closely. The implementation handles `set-cookie` carefully and updates the docs and coverage, making header-setting code more consistent across HTTP and HTTP/2.

**Update `ada` URL parser to 4.1.1** (5b8b4ee)
Node pulls in a substantial `ada` refresh, replacing large parts of the embedded URL parsing tables and checker logic. That means URL behavior is being aligned with newer upstream data and fixes, which can affect parsing/serialization edge cases across the runtime.

**Make `import()` cheaper by avoiding dictionary-mode objects** (ce44266)
ESM import attribute containers and diagnostics context objects are now created in a more JIT-friendly shape, and the diagnostics object is only built when subscribers exist. This trims overhead on a hot path for module loading without changing the public API.

### Other misc changes
- Primordial/ERM cleanup: add `DisposableStack`, `AsyncDisposableStack`, and `SuppressedError` support; update diagnostics_channel and related internals.
- WPT URL fixture refresh and test data updates.
- REPL paste/highlight redraw fix.
- GC HTTP client tests made less flaky by limiting concurrency.
- FIPS-compatible PBKDF2 test input tweak.
- Revert of a diagnostics_channel refactor.
