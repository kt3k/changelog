---
date: 2026-08-19
repo: nodejs/node
size: L
title: "FS readFile gets a one-shot fast path"
excerpt: "Major fs, FFI, sqlite, and stream fixes landed, including a readFile performance rewrite and several correctness/security patches."
commits: 11
authors: [trivikr, codebytere, gamemaker1, soulee-dev, lazerg, Anshikakalpana, mcollina, MikeMcC399]
commit_authors: {"4700264": Anshikakalpana, "46541f9": gamemaker1, "f3a8f1a": soulee-dev, "03fb384": lazerg, "59c976f": mcollina, "4bd9821": trivikr, "9c641c5": codebytere, "542e2b2": codebytere, "d6bbf57": trivikr, "882a781": MikeMcC399, "c79868f": trivikr}
---

**fs.readFile now completes small files in one thread-pool round trip** (542e2b2)
Node’s readFile path now uses a new `ReadFileJob` fast path for regular files that fit in one chunk, collapsing open/fstat/read/close into a single libuv trip. The promises API gets the same treatment, which should cut latency and reduce thread-pool contention for common small-file reads.

**buffer writes now validate offsets before overflow-prone math** (59c976f)
Buffer string write helpers now coerce and bounds-check `offset` before using it to derive the remaining length, preventing offset overflow from slipping through. The native slow path was fixed too, so out-of-range offsets now fail cleanly instead of being miscomputed.

**sqlite sessions no longer allow reentrant close during changeset generation** (d6bbf57)
`session.close()` now throws if a changeset or patchset is being generated, preventing a use-after-free when the session is closed from inside SQLite callbacks. The change is documented and covered by a regression test.

**FFI float setters now reject non-numbers instead of coercing them** (f3a8f1a)
`setFloat32()` and `setFloat64()` now require actual numbers and throw `ERR_INVALID_ARG_VALUE` for strings, booleans, objects, and other non-number inputs. This brings the setters in line with the stricter validation already used by the integer and argument conversion paths.

**FFI fast-pointer handling now rejects direct SharedArrayBuffer inputs** (4bd9821)
The optimized pointer conversion path was tightened so direct `SharedArrayBuffer` values are rejected consistently, matching the generic wrapper’s validation. That avoids optimized/unoptimized behavior drift for pointer arguments.

**Streams async pull now surfaces aborts that happen during final flush** (c79868f)
The async pipeline iterator now checks for aborts after transform iteration completes, even when a flush resolves to `null` and yields no final batch. That fixes a case where an abort could previously be swallowed and the pipeline incorrectly complete.

**JUnit output no longer breaks on empty diagnostics** (03fb384)
The test runner’s JUnit reporter now handles empty diagnostic output correctly, fixing a regression in generated reports.

**module package.json lookup now caches per directory** (9c641c5)
Nearest-parent `package.json` discovery is now memoized by directory instead of by file, eliminating redundant native lookups and repeated deserialization work. This should reduce overhead for module loading in package-heavy trees.

**Other misc changes**
- Doc clarification for IPv4-mapped IPv6 classification (46541f9)
- Test-only coverage for closed-library assertions in FFI dynamic library APIs (4700264)
- Revert of a broken FileHandle stream close-listener fix (882a781)
