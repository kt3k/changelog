---
date: 2026-09-08
repo: oven-sh/bun
size: L
title: "Leak fixes and stream semantics sharpened"
excerpt: "Major GC lifetime, stream clone, and backpressure fixes landed, plus safer SQL bytea binding and a parser OOM fix."
commits: 20
authors: [robobun, alii, Jarred-Sumner]
commit_authors: {"c9958cd": robobun, "b5ba14b": robobun, "14a4f45": robobun, "8afe3cb": robobun, "3cb2fa7": robobun, "26fba3a": robobun, "667372e": robobun}
---

**GC now frees leaked heap members on collected JS objects** (c9958cd)
ImportMetaObject, v8 InternalFieldObject, and JSHTTPParser now provide destructors so their owned native memory is released when GC collects them. This closes a real leak path for `import.meta.url` records and similar heap-owned fields.

**Stream cloning preserves native body metadata and avoids unnecessary tees** (b5ba14b)
`Response.clone()` now keeps unread native blob/file bodies on the fast path instead of always teeing through JS, which preserves MIME type and sendfile-backed behavior. It also avoids breaking cached body streams after clone by syncing wrapper caches correctly.

**Direct streams got full JS backpressure/cancel semantics** (3cb2fa7)
JS-read direct streams now own their buffers, propagate backpressure, and wake/cancel readers correctly instead of behaving like a loose native source. This is a substantial runtime contract change for `getReader()`, `for await`, `pipeTo()`, and `tee()`.

**String enum folding was made linear and non-corrupting** (14a4f45)
The parser’s string-addition folder was refactored so inlined string enum members are stored in a flat, safe form before concatenation. That fixes a nasty quadratic-memory/OOM path and prevents shared rope corruption during constant folding.

**`req.clone()` no longer leaves request-body streams hanging after response end** (8afe3cb)
Bun.serve now settles and errors parked request-body streams even when the handler clones the request and never reads either body. This fixes a per-request leak that could keep tee branches, controllers, and promises alive indefinitely.

**Property iteration can now include Symbol keys without misreporting them as strings** (26fba3a)
The JS property iterator gained an explicit `include_symbols` mode, and callers that only count/display properties can opt into it. Native code no longer accidentally turns Symbols into their description strings, which affects macros, HTTP2 sensitive headers, spawn env, and similar walkers.

**Postgres `bytea` binds now reject invalid values instead of silently writing empty bytes** (667372e)
Binding a non-BufferSource to a `bytea` parameter now throws `ERR_INVALID_ARG_TYPE` with the correct parameter index. That closes a data-loss bug where arrays, dates, and plain objects were stored as `\x` without warning.

### Other misc changes
- Fixed `Bun.write()` promise resolution on macOS `fcopyfile` path.
- Fixed a keep-alive pool eviction bug to close sockets with FIN instead of RST.
- Fixed `FileReader`/pipe-reader event-loop handling so stopped readers don’t pin the process.
- `bun test --isolate` now fences late completions from a finished file.
- `MIMEType` now frees its native strings on GC.
- Various dead-code removals and dependency/baseline updates.
- Minor test expectation and ASan detection tweaks.
