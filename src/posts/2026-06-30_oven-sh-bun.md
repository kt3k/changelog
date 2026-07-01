---
date: 2026-06-30
repo: oven-sh/bun
size: L
title: "Bun hardens fetch, spawn, and parser edges"
excerpt: "Spec fixes, crash prevention, and Node-compatibility work landed across fetch, child process spawning, module loading, and markdown."
commits: 22
authors: [robobun, dylan-conway, Jarred-Sumner, alii]
commit_authors: {"52a1ddf": robobun, "5cf5cba": robobun, "5f41bd3": robobun, "e794f42": robobun, "c944094": robobun, "6c1f36a": Jarred-Sumner}
---

**Markdown parser now guards all remaining 32-bit overflow paths** (52a1ddf)
The markdown parser’s earlier length check was expanded to cover sibling `u32` limits in block metadata and container traversal, avoiding release-build fatals on oversized inputs. The change also adds a test-only hook so the new `TooManyBlocks` path can be exercised without gigabytes of data.

**Child process spawning now honors `uid`/`gid`** (6c1f36a)
`Bun.spawn`, `spawnSync`, and the Node child_process wrappers now forward POSIX user/group identity options all the way into the native spawn path. This brings Bun in line with Node/libuv behavior for privilege-dropping spawns, and the typings were updated accordingly.

**Fetch clone semantics now reject disturbed or locked bodies** (5f41bd3)
`Request.clone()` and `Response.clone()` now throw the spec-mandated `TypeError` when the body is unusable instead of cloning anyway. That fixes a major compatibility gap and also makes Bun.serve routes catch reused `Request`/`Response` bodies instead of failing silently.

**Bun.serve now errors on reused Response bodies** (e794f42)
Returning a `Response` whose body has already been consumed now invokes the server’s `error()` handler instead of sending a silent empty 200. This closes an easy-to-miss production bug where cached or reused responses appeared to work while dropping the payload.

**Buffer fill now matches Node’s argument parsing** (c944094)
`Buffer.prototype.fill()` was reworked to follow Node’s offset/end/encoding rules more closely, including the tricky cases where string-like arguments should be interpreted as encodings or rejected as invalid. The fix also aligns the zero-argument behavior with Node’s whole-buffer fill semantics.

**`.node` imports with query strings no longer abort** (5cf5cba)
The module loader now treats query-suffixed native addon specifiers as native addons instead of falling into an unreachable N-API path and crashing. That keeps static/dynamic imports and `require()` consistent when a cache-busting query is present.

### Other misc changes
- CSS NaN `calc()` serialization fixed to emit zero instead of invalid `NaNpx`.
- `Bun.Glob` no longer aborts on overly long absolute paths.
- `Response.redirect()` now parses/serializes the URL before setting `Location`.
- `tty.WriteStream#getColorDepth()` now reports the correct terminal color depth.
- Windows buffered pipe writer UAF fix.
- `process.stdin` paused-mode EOF remainder delivery fix.
- `Bun.serve` now reports sync fetch handlers that return non-Response values.
- Resolver cache locking fix for filesystem router reload/build races.
- `fs.watch` now reports queue overflow as `('change', null)`.
- Node `open()` flag/mode validation tightened.
- UTF-16LE encoding alias normalization fixed.
- `dgram.Socket.bind()` now throws synchronously when already bound.
- React Compiler hoisting bug fix.
- Markdown docs/JSDoc editorial pass.
