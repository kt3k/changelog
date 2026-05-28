---
date: 2026-05-09
repo: nodejs/node
size: S
title: "QUIC cleanup trims dead state"
excerpt: "Node.js prunes unused QUIC session-manager plumbing and a stale binding variable, simplifying object construction."
commits: 2
authors: [jasnell]
commit_authors: {"facd71e": jasnell, "187b4d3": jasnell}
---

### Other misc changes
- QUIC cleanup: removed an unused `Environment*` member from `SessionManager` and updated its construction path, plus dropped a dead local binding in `Session` (facd71e, 187b4d3).
- No functional behavior change is indicated by the diffs; this is internal code cleanup only.
