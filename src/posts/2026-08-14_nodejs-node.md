---
date: 2026-08-14
repo: nodejs/node
size: L
title: "Zlib hardening, sqlite guardrails, and stream speedups"
excerpt: "A mix of performance work, ZIP/security hardening, and SQLite API safeguards landed alongside a semver-major zlib deprecation."
commits: 20
authors: [pipobscure, mcollina, trivikr, araujogui, TrevorBurnham, ulofiai, nodejs-github-bot, MayaLekova, joyeecheung, jasnell, anonrig, harjothkhara, HoonDongKang]
commit_authors: {"4551732": mcollina, "c4b755e": TrevorBurnham, "bc813a7": trivikr, "967d4af": anonrig, "91a99c5": pipobscure, "ad736a8": pipobscure, "ad87559": pipobscure, "54ac460": trivikr}
---

**Readable async iteration gets faster** (4551732)
Node now uses a hand-rolled async iterator for `Readable` instead of an async generator, cutting promise allocations and microtask hops per chunk. Buffered chunks can be delivered a microtask sooner, which should improve hot-path async iteration throughput.

**SQLite authorizer callbacks can no longer mutate the invoking connection** (c4b755e)
`node:sqlite` now throws `ERR_INVALID_STATE` if an authorizer callback tries to use the same `DatabaseSync` that invoked it, including prepare/exec, statement execution methods, iterators, tag stores, and `setAuthorizer()`. This closes a correctness hole and aligns the API with SQLite’s callback contract.

**Zlib classes are now EOL for call-without-`new` usage** (967d4af)
The `node:zlib` classes were converted to modern class syntax and instantiating them without `new` is now unsupported. This is a semver-major API break for legacy code that still calls constructors like `zlib.Gzip()` directly.

**ZIP archive writes now roll back cleanly on failure** (91a99c5)
If rewriting the ZIP central directory fails after member bytes have already been written, `ZipFile.add()` now restores the previous in-memory state and rewrites the original directory back. That prevents archives from being left half-updated and corrupting the next append.

**ZIP reads now wait for in-flight fd users before close()** (ad736a8)
Zip entry reads are tracked against the shared file descriptor so `close()` won’t release the fd while a read is still active. This avoids EBADF and the risk of reading from a reused descriptor.

**ZIP local/central header mismatches are rejected** (ad87559)
The ZIP parser now validates that local headers agree with the central directory on fields that affect how member bytes are interpreted, instead of silently accepting conflicting metadata. That hardens extraction against parser-confusion archives.

**FFI string buffers are refreshed on every call** (54ac460)
Fast FFI now rewrites cached temporary string buffers each time a JavaScript string is converted, so native mutations from one call don’t leak into the next call with the same string. This fixes stale/corrupted string data across repeated calls.

**`stream` cancellation reasons now preserve falsy values** (bc813a7)
Broadcast/share iterators now distinguish “no error” from falsy cancellation reasons like `0`, `""`, `false`, and `null`. That fixes cases where cancellation was previously collapsed into clean completion.

### Other misc changes
- SQLite: persistent stmt flag support and related docs/tests (1 commit)
- Streams: iterator/share/broadcast regression coverage and small state handling fixes (1 commit)
- ZIP: additional DoS/lifecycle/security tests and FIFO/device handling fix (4 commits)
- Inspector: avoid calling into JS from V8 interrupts (1 commit)
- Perfetto dependency update (1 commit)
- libuv cherry-pick for Windows fs-event behavior (1 commit)
- Docs/metadata updates, typings additions, and minor test-only changes (5 commits)
