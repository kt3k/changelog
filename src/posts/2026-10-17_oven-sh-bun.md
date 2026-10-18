---
date: 2026-10-17
repo: oven-sh/bun
size: L
title: "SQL, bindgen, and WebSocket overhauls land"
excerpt: "Big merge of SQL and WebSocket work, plus bindgen expansion and a POSIX realpath fix; many flaky tests were cleaned up too."
commits: 21
authors: [dylan-conway, Jarred-Sumner, robobun]
commit_authors: {"4334326": Jarred-Sumner, "c814409": dylan-conway, "c0e1716": dylan-conway, "017b243": Jarred-Sumner, "ff8ad61": dylan-conway, "f0c6cbc": Jarred-Sumner}
---

### **Bun SQL, bun:sqlite, and node:sqlite were consolidated** (017b243)
This folds a large set of open SQL-related PRs into one implementation, spanning `Bun.sql`, `bun:sqlite`, and `node:sqlite`. It also updates the docs, types, and benchmarks, and introduces `DATABASE_URL` as the default client connection env var.

### **Bindgen grew new argument and property models** (c814409, ff8ad61)
Bun’s bindgen now supports `b.bytes`, `Bun.CryptoHasher`, the static crypto hashers, `Bun.sha`, callable namespaces, and richer class/property schemas. That unlocks many native functions that previously hand-parsed `CallFrame`s, while tightening the docs around argument conversion, buffer ownership, and overload resolution.

### **WebSocket behavior and docs were substantially updated** (f0c6cbc)
This consolidates the open WebSocket work into a single native transport implementation, covering the global `WebSocket` client, `Bun.serve({ websocket })`, the built-in `ws` package, and related `node:http`/undici integrations. The docs now describe real closing handshake behavior, `server.publish()` compression defaults, and safer cookie-based upgrade guidance.

### **`fs.realpath` now matches Node’s POSIX path handling** (c0e1716)
On POSIX, backslashes are now treated as literal filename characters instead of path separators, fixing cases like files named `a\\b` or mixed `a/b` and `a\\b` lookups. The async `fs.promises.realpath` path also now routes through the native implementation more consistently with Node.

### **`bun install --frozen-lockfile` now accepts Yarn-style migrated resolutions** (4334326)
A regression from the lockfile migration flow is fixed: frozen installs no longer reject a `bun.lock` written from a Yarn Berry lockfile just because Yarn would apply `resolutions` more narrowly. The installer now checks Yarn’s own resolution semantics before flagging those rows as changed.

### Other misc changes
- Multiple flaky test fixes across install, networking, HTTP streaming, module graph, worker lifetime, and parallel execution.
- `bun lint`, `bun check`, and `bun fmt` docs/tooling updates, including native JSON/Markdown linting and parallelized type-aware work.
- WebSocket and SQL documentation edits, plus smaller test and harness adjustments.
- CI/test harness tweaks for PATH spelling on Windows and RSS/parallel-shard exclusions.
