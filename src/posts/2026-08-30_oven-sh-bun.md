---
date: 2026-08-30
repo: oven-sh/bun
size: L
title: "Resolver, fetch, shell, and transpiler fixes"
excerpt: "Multiple notable bug fixes landed across resolution, networking, shell pipelines, and the runtime transpiler cache, plus some test and API cleanup."
commits: 43
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"16a3012": robobun, "56efde1": robobun, "35772be": robobun, "8ace5cd": robobun, "5fadf8a": robobun, "c03b038": robobun, "af0d89d": robobun, "0cd5015": Jarred-Sumner, "9439a24": robobun, "b5d0bbc": robobun, "c64fa10": robobun, "118fdd2": robobun, "54fd211": robobun, "22f5249": robobun}
---

### **Git installs now run on the install thread loop** (22f5249)
`bun install` no longer shells out to `git` from shared thread-pool workers, which fixes Ctrl-C/signal routing issues during overlapping clones. The change also restructures package-manager task tracking so git work is queued and accounted for explicitly.

### **Runtime transpiler cache now keys on defines and `--drop`** (9439a24)
The runtime transpiler cache now includes the define table and drop settings in its cache key, preventing stale transformed output from being reused across projects or config changes. This closes a correctness hole where identical source bytes could produce the wrong runtime behavior on first run.

### **TypeScript resolver covers more rewrite cases** (56efde1)
The resolver now fixes several gaps in TypeScript extension rewriting, including `.cjs` → `.cts`, exact `exports`/`imports` targets that need extension probing, and type-only `tsconfig` paths. This unblocks real-world Node16/CommonJS layouts and brings Bun’s resolution closer to tsc/esbuild behavior.

### **Fetch unix-socket pooling is anchored to the current cwd** (16a3012)
Relative AF_UNIX socket paths are now resolved at call time against the active working directory, so connection reuse can’t accidentally hop between different sockets after `process.chdir()`. That fixes pooled fetches silently talking to the wrong server.

### **Shell pipelines are initialized safely before children start** (35772be)
Pipeline setup was reworked so every child is prepared before any command begins running, preventing use-after-free and panic scenarios when an early pipe or dup fails mid-pipeline. This makes shell failures deterministic instead of crashing later in the event loop.

### **WebView reuses one WKProcessPool across views** (af0d89d)
All WebKit-backed `Bun.WebView` instances now share a single process pool, removing the 64-instance cliff where new navigations would hang and helper processes would accumulate. This fixes a deterministic lifecycle bug in long-lived processes.

### **DNS and server binding reject invalid hostnames earlier** (b5d0bbc, c64fa10)
Hostname validation now happens before hitting any resolver, avoiding synchronous `getaddrinfo` calls for strings that can never be hostnames and returning more accurate DNS-style errors. This also improves `Bun.serve`, `Bun.listen`, and UDP socket behavior for invalid names.

### **Child stdin write errors now match Node’s syscall reporting** (118fdd2)
Failed writes to child stdin now report `syscall: "write"` instead of `"send"`, matching Node’s observable behavior. That makes `EPIPE`/stream error handling more portable for users relying on Node-compatible diagnostics.

### **`fetch`/parser/runtime cache race and backtracking fixes** (5fadf8a, 54fd211, c03b038, 0cd5015, 8ace5cd)
Several correctness bugs were fixed in parser backtracking and fetch/body handling, including preserving legal comments across speculative arrow parsing and deflaking a few fragile fetch/stream tests. These are smaller but still user-visible correctness fixes around edge cases.

### Other misc changes
- Dependency / tooling / test-only updates across bun:test, bun-types, process.versions, glob, SQL roots, child process, and install tests
- Reverts and internal cleanup in the transpiler cache and dead FFI / HTTP2 glue code
- Test deflakes and concurrency speedups in fetch, shell, install, DNS, and bytecode suites
