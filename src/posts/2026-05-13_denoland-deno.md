---
date: 2026-05-13
repo: denoland/deno
size: L
title: "Node compat, sqlite, and Windows fixes land"
excerpt: "A packed day of Node-compat work: URLSearchParams errors, sqlite serialize/deserialize, fs/watch behavior, Windows pipe leaks, and more."
commits: 21
authors: [bartlomieju, littledivy, divybot, lunadogbot, crowlbot, nathanwhit]
commit_authors: {"9febd38": divybot, "0fe9e76": littledivy, "2366bb6": divybot, "48c2bbb": lunadogbot, "0377166": bartlomieju, "3933caa": littledivy, "8cb7e56": lunadogbot, "e2feae5": lunadogbot, "261913c": littledivy}
---

**Node URLSearchParams now matches Node’s invalid-this and missing-arg errors** (9febd38)
Deno’s `URLSearchParams` methods were updated to emit Node-compatible branding and `ERR_MISSING_ARGS` messages, including the right interface name and argument labels. This closes a compatibility gap in invalid-call behavior that Node tests were asserting.

**DatabaseSync gains serialize() and deserialize()** (3933caa)
`node:sqlite` now supports exporting a database to a `Uint8Array` and restoring it back, matching Node’s newer SQLite API. That unlocks database snapshot/restore workflows and brings Deno closer to Node’s public surface.

**fs.watchFile now catches more than mtime changes** (48c2bbb)
`StatWatcher` was broadened to compare additional stat fields, so chmod/chown, replacements that preserve mtime, and sub-resolution changes now trigger events. The bigint path is also wired through correctly, fixing missed filesystem changes in Node-compat watchers.

**Windows child_process.spawn no longer leaks pipe handles** (0377166)
The Windows pipe close path now releases both the duplicated OS handle and the CRT fd slot after `spawn`-created pipes are torn down. This fixes a real exhaustion bug that could surface later as misleading EMFILE failures in unrelated file APIs.

**SQL tagged template support is wired up for node:sqlite** (2366bb6)
Deno filled out Node’s SQLite tagged-template API, including the `SQLTagStore` behavior behind `db.createTagStore(capacity)`. This enables cached template-driven query execution with bound parameters, as in modern Node.

**MessagePort listener deduplication now matches Node** (261913c)
`parentPort.on('message')` and related listener handling were adjusted so the same callback reference can’t be registered twice for the same event. That aligns `worker_threads` behavior with Node and avoids duplicate message delivery.

**node:test top-level await no longer deadlocks** (8cb7e56)
`test()`/`suite()` now resolve in a way that doesn’t block module evaluation when awaited at top level. This fixes a common Node pattern that previously hung under Deno’s test bridge.

**SocketAddress is implemented for node: net internals** (0fe9e76)
Deno added the internal `SocketAddress` plumbing that Node expects, plus the internal module exports needed to reach it. It also handles structured-clone recovery and parsing of IPv4/IPv6 host:port strings.

**module.register() stops misrouting node: builtins through the loader hook** (e2feae5)
When user load hooks are active, `node:` builtins now bypass the broken path that could fall through to the Rust loader and fail with `Unsupported scheme "node"`. This fixes real-world tooling cases like Vite/Fresh builds that import built-ins from npm packages.

### Other misc changes
- CI runner allocation tweaks for larger ARM/x86 release LTO jobs (2 commits)
- Snapshot/build plumbing cleanup for deduped JS sources (1 commit)
- NAPI finalizer behavior changed to run synchronously in the second-pass weak callback (1 commit)
- `fs.readdir` now applies encoding to `Dirent.name` and `parentPath` (1 commit)
- `readSync(position)` now returns `EINVAL` as expected (1 commit)
- `internal/url` and `internal/socketaddress` exposure fixes (2 commits)
- `StatWatcher`/`worker_threads`/`sqlite` test updates and assorted refactors
