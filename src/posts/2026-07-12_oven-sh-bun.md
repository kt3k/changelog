---
date: 2026-07-12
repo: oven-sh/bun
size: L
title: "Stability fixes across HTTP/3, SQL, NAPI, and more"
excerpt: "A broad day of bug fixes: QUIC stop semantics, Postgres result handling, thread-safe function finalization, and several crash/UAF repairs."
commits: 20
authors: [robobun]
commit_authors: {"fa1fe9e": robobun, "134838f": robobun, "042ff0c": robobun, "e16e6d3": robobun, "b0b9f6c": robobun, "c07bd5a": robobun, "43ee038": robobun, "062ebaf": robobun}
---

### **HTTP/3 stop(true) now closes idle connections cleanly** (fa1fe9e)
Bun now sends `CONNECTION_CLOSE` when an HTTP/3 server is stopped abruptly, instead of leaving idle pooled sessions alive until timeout. This fixes intermittent stream resets in `serve-http3` and makes later requests on reused ports behave correctly.

### **Postgres query errors now discard late result messages safely** (062ebaf)
When a backend sends `ErrorResponse` and then continues with `DataRow`/`CommandComplete` for the same request, Bun now skips those late frames instead of touching already-freed request state. That prevents a crash in the SQL path on misbehaving or split network connections.

### **Threadsafe function aborts now finalize and unblock correctly** (b0b9f6c)
The NAPI TSFN implementation now drains queued work after abort, wakes blocked producers properly, and schedules finalization when the last reference is released after an abort. This fixes hangs at process or Worker shutdown where the finalizer and event-loop cleanup never ran.

### **Bundler onBeforeParse externals are kept alive across GC** (43ee038)
Native `onBeforeParse` externals are now retained in GC-tracked storage so the bundler doesn't dereference freed memory while a build is still running. This closes a use-after-free that could crash native plugin flows such as `bun init --react=shadcn`.

### **Bake dev server teardown no longer touches a swept global object** (134838f)
`DevServerSourceProvider` now stores the VM handle instead of the GC-managed global object, so its destructor can unregister safely during teardown. The accompanying test hardens the ASAN path that exposed the use-after-free on exit.

### **Fake timers now guard only real objects before tagging `setTimeout`** (e16e6d3)
`useFakeTimers()` no longer assumes `globalThis.setTimeout` is any cell; it now requires an object before writing the `clock` marker. That avoids a segfault when tests replace `setTimeout` with values like strings, symbols, or bigints.

### **UDP connect(port) now rejects invalid ports instead of silently using 0** (c07bd5a)
`Bun.udpSocket({ connect: { port } })` now throws for out-of-range ports rather than silently clamping them to zero and dropping all datagrams. This fixes a dangerous footgun where `send()` appeared to succeed while traffic vanished.

### **Readable.toWeb now leaves the source stream non-flowing after EOF** (042ff0c)
The Node stream bridge restores the expected paused/non-flowing state once a `Readable.toWeb()` source is fully consumed. This brings Bun back in line with Node behavior and fixes subtle post-EOF stream state mismatches.

### Other misc changes
- Fixed an fd leak in `ReadStream._destroy` for `{ start, autoClose }`.
- Fixed a `WTFStringImpl` leak in `napi_create_string_latin1`.
- Switched `node:crypto` random functions to BoringSSL `RAND_bytes` and refactored internal entropy helpers.
- Fixed `$.escape` handling for Latin-1 and empty strings.
- Updated several proxy stress tests to share proxy pairs and reduce CI flakiness.
- Adjusted a tmpdir mkdir assertion and a spawn pipe leak test.
- Prevented deliberate crash tests from uploading noise to CI crash-reporting.
