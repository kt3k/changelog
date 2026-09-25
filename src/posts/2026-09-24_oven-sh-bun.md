---
date: 2026-09-24
repo: oven-sh/bun
size: L
title: "Bun lands major SQL, TLS, and fetch fixes"
excerpt: "Big day: compile bytecode order files, several crash/abort fixes, TLS state cleanup, and SQL correctness/perf improvements."
commits: 19
authors: [robobun, Jarred-Sumner, alii]
commit_authors: {"8884311": robobun, "4227e46": Jarred-Sumner, "73df7bb": robobun, "8d36bff": robobun, "7e8bac1": robobun, "e8902ea": robobun, "d92fc84": robobun, "c462509": robobun, "8c722e2": robobun, "0b11c68": Jarred-Sumner, "c8e1f6f": robobun, "2838e1b": robobun, "6d67b14": robobun, "b5e2208": robobun, "0cbfe81": alii}
---

### **Bytecode order files for compiled apps** (4227e46)
Bun now supports recording and replaying bytecode access order for `--compile --bytecode` apps, with `BUN_BYTECODE_ORDER_OUT` and `bytecodeOrderStats()` to guide layout. The goal is to reduce startup I/O and resident bytecode by clustering the functions an app actually touches first.

### **TLS connection state moves off `SSL` ex_data** (0b11c68)
Per-connection TLS state was reworked to live on the owning connection instead of scattered across OpenSSL `SSL` ex_data slots. This is a substantial internal refactor that should make TLS ownership clearer and reduce brittle cross-object bookkeeping for SNI, session caching, and wrappers.

### **Postgres decode errors now fail only the affected query** (6d67b14)
When the client cannot decode a row, Bun now skips the rest of that row and rejects just that request instead of poisoning later pipelined queries on the same connection. The new error also carries a clearer hint, and the docs now warn that the server may already have executed the query.

### **Fetch stops aborting on oversized `arrayBuffer()` / `bytes()` bodies** (7e8bac1)
Reading very large response bodies with `arrayBuffer()` or `bytes()` now rejects instead of crashing the process. That closes a serious stability bug in body materialization for responses above the 4 GiB boundary.

### **Fix gzip exact-size inflate performance regression** (2838e1b)
Bun restores the one-shot libdeflate path for `text()` and `arrayBuffer()` when a gzip body is fully available, avoiding the slower multi-pass inflate path. This should cut client CPU for medium-sized compressed responses.

### **Promise rejection tracking is now append-only and faster** (8c722e2)
Unhandled rejection bookkeeping was rewritten to avoid repeated vector scans and shifting. That removes the O(N^2) behavior on large rejection bursts and should materially improve worst-case promise-heavy workloads.

### **TLS handshake verify no longer misses shutdown races** (0cbfe81)
A handshake verify result is now read even if shutdown happens mid-handshake, fixing a race in TLS clients. This prevents a class of broken connection endings when a Duplex-wrapped client closes during setup.

### **Node VM option parsing gets cheaper** (c8e1f6f)
`vm.Script` and `runInContext()` now reuse cached option-name identifiers and source-origin URLs instead of re-atomizing/parsing them every call. This is a targeted performance win for hot VM construction/execution paths.

### **Process nextTick checkpoints avoid unnecessary work** (b5e2208)
Bun now clears the next-tick scheduled flag at the right time and only runs the tick pass when one is actually pending. That removes empty JS checkpoints from the steady state and trims overhead from `setImmediate`-heavy code.

### **Reject malformed Postgres requests and resolver inputs more safely** (8884311, 8d36bff, e8902ea, c462509, d92fc84, 73df7bb)
Several crash-prone edge cases were hardened: Postgres now releases its event-loop ref correctly on rejected requests, the bundler logs invalid `data:` URL failures instead of panicking, root-relative resolver joins no longer abort, `bun pm view` rejects malformed registry version entries, X509 structured-clone records with empty DER are rejected, and partial Postgres Bind frames are discarded atomically on encode failure.

### Other misc changes
- Dead-code removals across WebCore, Node bindings, spawn, and class generation (4 commits)
- Minor TLS/SSL internal cleanup and socket-close handling tweaks
- Small docs/test/benchmark updates and dependency/config churn
