---
date: 2026-09-08
repo: nodejs/node
size: L
title: "Zstd chunking, VFS semantics, and BoundSocket transfer"
excerpt: "Node.js tightens zstd decoding, stream error propagation, VFS open(2) behavior, and adds transferable BoundSocket support."
commits: 34
authors: [panva, pipobscure, nodejs-github-bot, jasnell, TrevorBurnham, MikeMcC399, aduh95, mcollina, martenrichter, zeexzeex, gurgunday, leah-1ee, guybedford, SparshGarg999, greenheadHQ, hyemimi, codebytere]
commit_authors: {"7055c48": jasnell, "60e3630": jasnell, "36d8fce": pipobscure, "41cb09f": TrevorBurnham, "f955c20": guybedford, "0a9225d": panva, "2987a59": SparshGarg999}
---

**zlib now decodes zstd frames cleanly across chunk boundaries** (7055c48)
This fixes zstd handling for concatenated and skippable frames even when frame boundaries are split across arbitrary chunks. It also preserves `rejectGarbageAfterEnd`, reports corruption in later frames, and updates the classic/async/iterable APIs and typings.

**Streams/iterators now propagate non-Error reasons more consistently** (60e3630)
`writer.fail()`, `broadcast.cancel()`, and `share.cancel()` now accept arbitrary reasons and preserve them exactly, with classic stream bridges wrapping non-Error reasons in standard errors that carry the original `reason`. This closes several edge cases around falsy errors and improves the stream/iter documentation and internals.

**`net.BoundSocket` can now be transferred across threads and processes** (f955c20)
Bound TCP sockets are now supported in worker `transferList`s and as `subprocess.send()` handles, extending the original BoundSocket model beyond the creating thread. The source object is left adopted afterward, and the docs now spell out the new lifecycle and error cases.

**Web IDL conversion and brand checks were tightened across core** (0a9225d)
Node switched several conversions to explicit brand predicates and internal state checks, making `AbortSignal`/`CryptoKey` recognition more robust after prototype tampering. This also updates sequence validation and dictionary handling, which helps prevent subtle spec-compliance and safety bugs.

**SQLite now treats `undefined` as `NULL`** (41cb09f)
Passing `undefined` to SQLite APIs now matches omitting a parameter: it binds as `NULL` instead of throwing. That removes an inconsistency in parameter binding and makes the JS-to-SQLite conversion rules easier to reason about.

**Windows `fs.rmSync()` now removes read-only files** (2987a59)
On Windows builds using libc++, `rmSync()` now clears the read-only attribute before retrying removal, matching the behavior users already get with other toolchains. This fixes a real cross-toolchain deletion failure for both single files and recursive removals.

**ZipProvider handles now follow `open(2)` semantics more closely** (36d8fce)
Opening, truncating, appending, and closing ZIP-backed virtual files now behaves more like real file descriptors, including preserving entry metadata and making open-then-close operations take effect up front. This is a notable correctness fix for the experimental VFS layer.

### Other misc changes
- Version cut for 24.21.0 and changelog updates
- QUIC refactor and crash fix
- Web IDL performance refactor and owner metadata tweak
- Stream benchmark flake fix and writable buffer compaction improvement
- SQLite test cleanup and doc updates
- Dependency bumps: googletest, simdjson, zlib, nixpkgs-unstable
- Various docs, typings, and workflow tweaks
