---
date: 2026-11-23
repo: oven-sh/bun
size: L
title: "Big Bun refactors land across diff, IO, and HTTP"
excerpt: "Bun shipped major diff improvements, a Rust WebSocket/HTTP parser port, IPC and blob fixes, plus Redis and ICU API updates."
commits: 18
authors: [alii, dylan-conway, robobun]
commit_authors: {"26f8a96": dylan-conway, "99db7b2": alii, "c61ee31": dylan-conway, "d457f5d": dylan-conway, "2c2fca0": alii, "f19207c": alii, "d372232": alii, "902431c": alii, "476428f": alii, "6bd9289": dylan-conway, "dac8e3b": alii, "826e78e": alii, "08763cd": alii, "7d29bba": robobun, "993d430": dylan-conway, "622c311": dylan-conway, "eb11404": dylan-conway}
---

**Bun.diff gets faster, safer, and more capable** (902431c, dac8e3b, 99db7b2, 2c2fca0)
Bun’s diff stack picked up new matching options, better patch parsing/apply behavior, and major performance/memory work. It now supports `ignoreCase`, `ignoreWhitespace`, and `stripTrailingCr`, hardens patch application against hangs/wrong matches, and fixes edge cases in `parsePatch` that previously threw on valid-looking input.

**WebSocket server and HTTP request parser move to Rust** (c61ee31, d457f5d)
Two core server paths were ported out of C++: the `Bun.serve()`/`ws` WebSocket server and the `Bun.serve()`/`node:http` request parser. This is a major internal rewrite that reduces C++ surface area and should make these networking paths easier to maintain and evolve.

**IPC handle delivery and channel re-entry are fixed** (476428f)
IPC message delivery was reworked so handles are emitted only after the receiver has safely let go of the file descriptor. The commit also tightens re-entry and buffering behavior around nested event-loop callbacks, addressing use-after-free, duplication, and corruption cases.

**Redis support gains safer argument handling and `increx()`** (08763cd, 826e78e)
Bun’s Redis client now accepts richer argument types, preserves argument order more carefully, and documents/handles nullish-argument edge cases that can otherwise shift or drop command parameters. It also adds `increx()` and adjusts preconnect behavior so failed speculative connects don’t crash the process.

**Bun.file(), Bun.write(), and fd-waiting IO get important fixes** (f19207c, d372232)
File and descriptor IO was corrected for several platform-specific bugs, including broken pipe behavior, silent pipe reads, append handling, and cancelled reads. The underlying waiting machinery was also replaced with a typed, keyed design for IO-thread descriptor waits, which is a substantial foundation change.

**ICU bidi APIs are added** (993d430)
Bun’s ICU layer now exposes five new `ubidi` functions, including setup, run counting, and visual map access. That expands the native Unicode bidirectional-text surface available to the runtime’s C API consumers.

### Other misc changes
- Temporary-file/staging-directory ownership cleanup across install and CLI code (26f8a96)
- Windows path regression fixes in bundler, shell, install, and glob logic (622c311)
- Diagnostics channel compatibility bumped to Node 26.12.1 (eb11404)
- Redis docs/types updated for new argument forms and `URL` support (08763cd)
- Bench dependency refresh and fixture updates (7d29bba)
- WebKit bump for an AOT array-state regression fix (6bd9289)
- Misc docs, tests, and internal refactors around diffs, ICU, and logging (99db7b2, c61ee31, d372232)
