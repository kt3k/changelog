---
date: 2026-08-08
repo: oven-sh/bun
size: L
title: "Major runtime fixes and XML parser speedup"
excerpt: "Bun lands worker teardown stabilization, a faster XML parser, and several high-impact bug and security fixes across CLI, SQL, streams, and shell."
commits: 15
authors: [robobun, dylan-conway, Jarred-Sumner]
commit_authors: {"1147099": robobun, "8676018": robobun, "27b0bf4": robobun, "4f6b242": dylan-conway, "ab5b3f2": robobun, "8ce3c13": dylan-conway, "9d519e8": dylan-conway, "52bf09c": robobun, "3ce0052": robobun, "f972c28": Jarred-Sumner, "37c4428": robobun, "d5efbd6": robobun, "78da06a": robobun, "742b118": robobun}
---

### **Worker and worker_threads now get a real VM teardown** (9d519e8)
Bun’s worker runtime was reworked around WebCore-style lifetimes and joined-thread shutdown to eliminate crash, UAF, leak, and hang classes during VM teardown. This is a broad stability change that moves `Worker` / `node:worker_threads` much closer to being truly stable.

### **Bun.XML gets a SIMD parser rewrite and big speed gains** (f972c28)
The XML parser was rewritten to use a two-stage SIMD indexing pipeline and row-based output construction, instead of byte-by-byte scanning. That should materially improve parsing throughput and lowers the cost of Bun’s XML runtime on real-world documents.

### **bun run --parallel/--sequential no longer finishes scripts before output is read** (4f6b242)
This fixes a race that caused flaky missing-output behavior on macOS runners by waiting for script pipes to reach EOF/error before counting a script as finished. It prevents scripts from being marked done too early, which could drop the last output or advance sequencing incorrectly.

### **Large string reads now throw ERR_STRING_TOO_LONG instead of aborting** (ab5b3f2)
Reading 2–4 GiB strings no longer crashes the process; Bun now surfaces a proper error instead of hitting an assertion or SIGABRT. That closes a serious reliability issue in Blob, file, and fs text reads for very large inputs.

### **Bun.SQL/MariaDB now parses JSON columns as objects** (52bf09c)
MariaDB extended type info is now negotiated so `json` columns are recognized and decoded correctly instead of being returned as raw JSON text. This fixes a documented mismatch in Bun.SQL’s MariaDB behavior and makes JSON results consistent with MySQL.

### **ByteStream fixes re-entrancy around drained/cancelled fetch bodies** (3ce0052)
The ByteStream state machine was adjusted so drain signaling happens in a safer order when a consumer is already parked or gets re-entered during cancellation. That prevents aborting or losing in-flight fetches with streaming bodies from taking down the process.

### **Bun.inspect and deepEquals close use-after-free bugs** (d5efbd6, 78da06a)
Two core introspection/comparison paths were hardened against user code mutating objects mid-walk: `Bun.inspect`/`console.log` and `Bun.deepEquals` now avoid UAFs when getters or custom inspect hooks mutate the compared/formatted values. These are security-stability fixes that affect common debug and assertion APIs.

### **shell subprocess cleanup now handles mid-run worker termination** (8676018)
The shell runtime gained finalizer-oriented cleanup for in-flight subprocesses so terminating a worker during a `Bun.$` command doesn’t leak the whole exec pipeline. This plugs a leak/UAF-prone shutdown path for shell commands with live stdio.

### **node:stream webstream adapters now get the missing primordials** (1147099)
Bun now exports the TypedArray primordial helpers used by Node’s webstream adapter code, which had been undefined before. This fixes adapter behavior for stream writes that depend on those internal helpers.

### **node compile cache entry files are now created more securely** (37c4428)
Compile cache entry files now use mode 0600 instead of inheriting a more permissive default. That reduces local-information exposure for cached source and bytecode files in shared environments.

### Other misc changes
- Clippy/source lint fixes and a small source-lint test tweak (27b0bf4)
- Spawn FD-counting test stabilization for background pipe closes (8ce3c13)
- Main build fix restoring `PartTag::JsxImport` after JSX tree-shaking work (742b118)
- XML benchmark/docs updates and fixture additions around the parser rewrite (f972c28)
- Worker/runtime refactors, comments, and build-script plumbing tied to the teardown work (9d519e8)
- MySQL protocol refactors plus MariaDB test harness and wire-frame updates (52bf09c)
