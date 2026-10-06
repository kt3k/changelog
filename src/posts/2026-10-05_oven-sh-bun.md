---
date: 2026-10-05
repo: oven-sh/bun
size: L
title: "Bun tightens spawnSync, SQL, and TLS handling"
excerpt: "Major fixes for spawnSync event-loop isolation, SQL query desync bugs, and a TLS renegotiation crash in fetch pooling."
commits: 4
authors: [robobun, Jarred-Sumner]
commit_authors: {"13a98b0": Jarred-Sumner, "9bd19c9": robobun, "951a8b5": robobun, "d492876": robobun}
---

### **spawnSync no longer hijacks the VM loop** (13a98b0)
Bun.spawnSync now keeps the thread’s real event loop separate from the loop used to wait on the child, fixing GC/finalizer reentrancy issues and several child-reaping edge cases. This also makes unwatched Bun.spawn exits surface correctly before throwing.

### **MySQL only rejects the query with the bad row** (9bd19c9)
When Bun.SQL can’t decode a MySQL row into JS, it now rejects just that query and leaves the rest of the packet stream aligned for the next one. That fixes response desyncs where later queries could consume leftover rows or trigger protocol errors.

### **Postgres pipelining keeps failed requests in flight until ReadyForQuery** (951a8b5)
A failed Postgres query now stays queued until its ReadyForQuery arrives, instead of letting later pipelined requests slide into its slot. The fix prevents row/result mixups and also stops writing past statements that are still being parsed.

### **fetch stops redoing TLS setup per request** (d492876)
TLS configuration is now applied once per connection, before the first handshake, instead of being re-run on every request. This fixes a crash/regression where a pooled TLS 1.2 socket could renegotiate mid-idle and take down the process.

### Other misc changes
- Added and updated regression tests for spawnSync, MySQL, Postgres, and TLS renegotiation
- Internal refactors and comments across event-loop, SQL, and HTTP code paths
- Test harness and NAPI fixture updates
