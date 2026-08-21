---
date: 2026-08-20
repo: nodejs/node
size: L
title: "Security fixes and QUIC/streaming work"
excerpt: "Heap overflow, unreadable package.json handling, and several QUIC/streaming correctness fixes headline the day."
commits: 19
authors: [nodejs-github-bot, codebytere, PickBas, frandle331-yh, ndossche, bitpshr, avivkeller, kimjune01, jasnell, mag123c, aduh95, martenrichter, StefanStojanovic, trivenay, mcollina, trivikr]
commit_authors: {"2899539": mcollina, "9472421": frandle331-yh, "575abdf": ndossche, "c4cfa63": bitpshr, "0ce7b02": avivkeller, "c1aac81": nodejs-github-bot, "323dbd8": nodejs-github-bot, "b5d37cd": kimjune01, "9f0ce45": jasnell, "e2cb91d": mag123c, "12eb296": aduh95, "2bfc1e9": martenrichter, "5ba7e05": codebytere, "58d58a4": StefanStojanovic, "ea4b37f": codebytere, "5a9fd82": PickBas, "6d60352": PickBas, "fd5b135": trivenay, "449b950": trivikr}
---

**Fix heap overflow in `fs.mkdtemp()` for long prefixes** (9472421)
`mkdtemp()` was allocating space for the prefix plus `XXXXXX` but not the terminating NUL, which could write one byte past the heap buffer for long enough prefixes. The fix allocates room for the terminator, copies the suffix directly, and zero-terminates safely.

**Report unreadable `package.json` files instead of treating them as absent** (c4cfa63)
Module resolution now distinguishes “no package config here” from “package.json exists but could not be read.” This closes a correctness gap where unreadable configs could silently drop `exports`/`type` and resolve to the wrong file.

**Fix QUIC incoming-stream handling when the application consumes headers** (fd5b135)
Incoming streams are no longer destroyed just because `onstream` is missing if the negotiated application can consume them via session-level callbacks like `onheaders` (for example, HTTP/3). The change updates both the JS session logic and docs, and adds coverage for HTTP/3 streams handled without `onstream`.

**Fix QUIC max-stream-data resumption when streams are blocked in JS** (2bfc1e9)
When flow control opens up, QUIC now refreshes the stream’s desired write size before rescheduling it, preventing stalls when the stream was blocked on the JS side. New tests cover both plain QUIC and HTTP/3 cases where the window is exactly exhausted.

**Run same-priority platform tasks in posting order** (ea4b37f)
The platform task queue was relying on `std::priority_queue` to preserve insertion order among equal-priority tasks, but it didn’t. This refactor makes same-priority execution deterministic in posting order, which matters for foreground task scheduling and delayed task flushing.

**Fix `ERR_INVALID_ARG_TYPE` behavior with `--enable-source-maps`** (b5d37cd)
Source-map lookup now falls back to the generated source line when no map exists or the original source can’t be recovered, instead of returning `undefined` and cascading into the wrong error. This preserves the expected `AssertionError` behavior in source-mapped output paths.

### Other misc changes
- Crypto ASN.1 UTF-8 error handling fix (575abdf)
- `rmSync()` retry handling fixes for `EPERM`/Windows delay math (5a9fd82)
- Diagnostic channel activation validation fix (449b950)
- WebStreams transform backpressure refactor and benchmark (2899539)
- Test runner JUnit classname hierarchy support (e2cb91d)
- Windows `O_SYNC`/`O_DSYNC`/`O_DIRECT` constants added (6d60352)
- Dependency bumps: zlib, simdjson (c1aac81, 323dbd8)
- Build/CI/docs/tooling updates, including GN include-path fix, PGO scripts, env var cleanup, and synopsis removal (5ba7e05, 58d58a4, 12eb296, 0ce7b02)
- Misc `new`/`delete` cleanup across core sources (9f0ce45)
