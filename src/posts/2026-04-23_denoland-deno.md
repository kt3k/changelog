---
date: 2026-04-23
repo: denoland/deno
size: M
title: "Windows pipe reconnect bug fixed"
excerpt: "A Windows named-pipe server rearm bug is fixed, plus a glob regression in node fs and an OpenSSL lockfile bump."
commits: 3
authors: [bartlomieju]
commit_authors: {"402d741": bartlomieju, "a5b388d": bartlomieju}
---

### **Windows named-pipe servers now re-arm after accept** (402d741)
A bug in `uv_pipe_accept` could leave the next `NamedPipeServer` future unpolled on Windows, so subsequent client connections were accepted by the OS but never delivered to the server callback. The fix marks the waker ready after creating the new server, and adds a regression test covering three sequential connects.

### **Node `fs.glob` no longer skips siblings for `**/../*`** (a5b388d)
`fs.glob`/`globSync` had a control-flow bug where a cached duplicate path could abort processing of remaining siblings, leading to incomplete matches for patterns like `**/../*`. The fix changes the loop behavior and adds a unit test to lock in correct sibling enumeration.

### Other misc changes
- Dependency bump: OpenSSL 0.10.72 -> 0.10.78 (1 commit)
