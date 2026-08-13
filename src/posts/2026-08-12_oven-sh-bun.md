---
date: 2026-08-12
repo: oven-sh/bun
size: L
title: "Bun tightens HTTP, install, and stream fixes"
excerpt: "Major fixes landed across cluster, HTTP/2/3, install, streams, abort timers, and bundler bytecode behavior."
commits: 35
authors: [robobun, Jarred-Sumner, alii, cirospaciari]
commit_authors: {"6065162": alii, "9518091": Jarred-Sumner, "f426a8e": robobun, "165dc9f": Jarred-Sumner, "a63b064": robobun, "2055fe9": robobun, "6e047ff": robobun, "7f1ae4e": robobun, "a5ca1cd": robobun, "315136d": robobun, "9a543cc": robobun, "626034f": cirospaciari, "65baeda": robobun, "a8c807f": robobun, "722f250": robobun, "c83326e": robobun, "6e201b6": Jarred-Sumner, "a0782cd": robobun, "1adeb97": robobun, "2ffb8d4": robobun, "f59f705": robobun, "8d10147": robobun, "e5752bb": robobun, "3e61ab3": robobun, "6596bf1": robobun, "fd1ea1b": robobun, "8c7ed92": robobun, "0825a8b": robobun, "3c87727": robobun, "e7abdf7": alii, "d8e3e19": robobun, "99f16a8": robobun, "aa9a59f": robobun, "b49c971": alii}
---

### **Cluster now supports real handle passing and round-robin sharing** (626034f)
Bun’s `node:cluster` implementation was brought in line with Node’s behavior, including IPC handle passing, round-robin fd handoff, shared handles, and UDP clustering. This unblocks workers from silently binding their own sockets and makes clustered servers actually share listeners as expected.

### **Install now handles shared git repos and workspace-targeted updates correctly** (a63b064, 315136d, a8c807f)
Git dependencies that point at different branches of the same repository now share clone work safely without dropping package resolution callbacks. Bun also fixed `bun update` filtering/recursive updates for non-interactive runs, and tightened lockfile resolution so bundled optional peers don’t drift past the hoist root.

### **HTTP and TLS fix a batch of connection-lifecycle bugs** (2055fe9, fd1ea1b, 0825a8b, aa9a59f)
Several low-level HTTP bugs were corrected around refcounting, proxy tunnel reuse, adopted sockets, and TLS write reentrancy. Together these changes reduce use-after-free risk, keep HTTPS proxy tunnels pooled in the right TLS context, and make socket adoption/writes safer under load.

### **AbortSignal.timeout no longer leaks or stalls in edge cases** (6e047ff, 7f1ae4e)
`AbortSignal.timeout()` now keeps its timer armed even if observers disappear before the deadline, and it also cancels/discards unfired timers when the heap drops them. That fixes both missed timeouts and long-lived heap leaks under fake timers, isolate swaps, and test teardown.

### **Streams now deliver direct-stream bytes and promises more consistently** (8c7ed92)
Direct `ReadableStream` sources now deliver bytes written after a flush to `pipeTo`, `tee`, and `for-await` readers instead of dropping them. The controller logic was adjusted so queued consumers and promise-backed reads follow the right delivery path.

### **Bytecode ESM output now matches the printer’s exports** (a0782cd)
The bundler stopped building ESM bytecode module records from stale linker state and instead uses what the printer emits. This fixes broken `--compile --bytecode --format=esm` output where re-exports could become TDZ failures at runtime.

### **ESM imports for builtin/native modules stay lazy** (d8e3e19, 6596bf1, 2ffb8d4)
Bun’s ESM views of builtins like `bun`, `node:process`, and `node:module` no longer eagerly reify every export at import time. That preserves lazy accessor behavior and avoids unnecessary work and side effects during module loading.

### Other misc changes
- HTTP/2 stream ID overflow fix (f59f705)
- Bun.serve sourcemap handling for HTML routes in production (9a543cc)
- `node:dns` null option handling and IPv4-mapped lookupService support (65baeda, 722f250)
- `node:fs.write` offset bounds fix (6065162)
- `JSSink`, blob read handlers, and low-level refcount/aliasing safety refactors (c83326e, 99f16a8, 1adeb97, f426a8e, b49c971)
- Build/CI improvements, debug-info flag fixes, and download retry/workflow tweaks (9518091, 6e201b6, 8d10147, e5752bb, a5ca1cd, 3e61ab3, e7abdf7, 3c87727, 3c87727, 165dc9f)
- HTTP/3, QUIC, shell, SQL, crypto, install, and runtime robustness pass (165dc9f)
