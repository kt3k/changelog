---
date: 2026-08-07
repo: nodejs/node
size: M
title: "SQLite tag store fix leads Node changes"
excerpt: "SQLite bindings are now cleared before reuse, DNS ports are validated, and Windows-only fs flags are exposed."
commits: 6
authors: [avivkeller, Renegade334, AugustinMauroy, mcollina, aduh95, PickBas]
commit_authors: {"e2d7b34": Renegade334, "8fc7341": mcollina, "985aa07": PickBas}
---

**SQLite SQLTagStore now clears stale bindings and enforces placeholder counts** (8fc7341)
The tag store used to reuse cached statements without clearing previously bound values, which could leak parameters across executions. This fix resets and clears bindings before rebinding, and rejects argument counts that don't match template-literal placeholders.

**`dns.setServers()` now validates port ranges** (e2d7b34)
Ports parsed from server strings are now checked with `validatePort()`, so out-of-range values fail with a clean `ERR_SOCKET_BAD_PORT` instead of being accepted or misparsed. This tightens input validation for DNS resolver configuration.

**Windows-only fs open flags are now exposed and documented** (985aa07)
Node now exports additional libuv file-open flags like `UV_FS_O_TEMPORARY`, `UV_FS_O_SHORT_LIVED`, `UV_FS_O_SEQUENTIAL`, and `UV_FS_O_RANDOM`, alongside updated docs and coverage. These are Windows-only hints/behaviors that can now be inspected from JS.

### Other misc changes
- Documentation cleanup: remove `util.inherits` examples from stream docs and update code fences.
- Commit queue script tweak to defer `git node land --abort` until needed.
- `.mailmap` update for Aviv Keller.
