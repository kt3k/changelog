---
date: 2026-11-19
repo: oven-sh/bun
size: L
title: "Bun tightens cron, SQL, and build security"
excerpt: "Cron URLs and safer launchd logs land, PostgreSQL cancel gets faster, and build integrity gets stricter with WebKit pins."
commits: 15
authors: [alii, dylan-conway, Jarred-Sumner]
commit_authors: {"e58549b": alii, "0615baf": alii, "cdd3144": alii, "084e362": alii, "09cf4ec": alii, "34dbe8e": alii, "bc9a4c8": dylan-conway}
---

**Bun.cron now accepts `file://` URLs and validates cron paths more safely** (0615baf)
`Bun.cron()` now takes either a `string` path or a `URL`, including the `file://` strings returned by `import.meta.resolve()`. The implementation routes through the same URL conversion path as `node:fs`, which also improves error reporting and avoids treating `file://` prefixes as literal path text.

**launchd cron logs move out of shared `/tmp` and reject newline-injected executables** (cdd3144)
On macOS, cron stdout/stderr now go under the user’s temp directory instead of predictable names in `/tmp`, reducing cross-user exposure. The executable path parser also refuses CR/LF, preventing a malformed path from breaking the generated crontab/launchd entry.

**PostgreSQL cancel() is no longer quadratic under backlog** (09cf4ec)
`query.cancel()` now uses request numbering plus binary search instead of repeatedly scanning the queue from the front, which fixes a performance regression for large backlogs. The pipeline internals were refactored around request turns, and the benchmarks in the commit message show the slowdown is gone.

**PostgreSQL request identity is now owned by the pipeline** (084e362)
The request queue no longer relies on a mutable per-request turn field; `Pipeline::push` now returns an opaque `Turn`, and queue lookups operate on that value instead. This tightens the API, removes a class of external mutation, and keeps request ordering encapsulated inside the pipeline.

**HTMLRewriter now treats an uncalled handler as unfinished work** (34dbe8e)
A regression where a disposed module graph could cause handlers to be considered “done” without actually running is fixed. That restores rewriting behavior instead of silently leaving document content unchanged.

**S3 multipart uploads buffer the tail in blocks to reduce copying** (e58549b)
Upload tail handling was rewritten around a block-based `Tail` structure that keeps data in chunks until it makes sense to join them. That lowers copying and memory churn for large multipart uploads while preserving the same external behavior.

**Builds now pin WebKit tarball hashes before unpacking** (bc9a4c8)
Prebuilt WebKit downloads are now checked against a committed SHA-256 list before extraction, closing a supply-chain gap where release assets could be replaced. The repo also adds `bun run pin-webkit` and updates CI/documentation so WebKit bumps require an explicit integrity update.

**Other misc changes**
- SQLite updated to 3.54.1.
- lsquic updated to 4.11.2.
- BoringSSL pin advanced to the fork’s master head.
- BoringSSL upgraded to upstream 148a7b1f.
- `bun check`/`bun lint`/`bun fmt` startup and formatter/linter internals optimized.
- Cron docs/tests and type definitions updated for the new URL support.
- Small DNS, formatter, and review follow-up fixes.
