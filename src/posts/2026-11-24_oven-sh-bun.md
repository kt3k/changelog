---
date: 2026-11-24
repo: oven-sh/bun
size: L
title: "Bun tightens fetch, Redis, and AOT semantics"
excerpt: "Major correctness work across fetch decompression, Redis reconnect/database handling, and AOT/parser internals, plus a Windows IPC fix."
commits: 15
authors: [alii, dylan-conway, Jarred-Sumner]
commit_authors: {"6f2cd49": alii, "63df889": alii, "7bdbdea": alii, "83229cf": alii, "80c1473": Jarred-Sumner, "0a9bbf5": Jarred-Sumner, "b40184a": alii, "bd92f9b": alii, "bfda778": alii, "64c9d09": alii, "70ea645": alii, "1f42072": dylan-conway, "c4d9b69": dylan-conway}
---

### **Fetch now accepts truncated compressed bodies that end normally** (c4d9b69)
Bun’s `fetch()` no longer rejects a response just because the compressed stream ends unfinished if the HTTP message itself ended normally; it now returns the bytes that were decoded so far. The change also updates docs and tests, and clarifies that callers who want strict rejection should disable auto-decompression and use `DecompressionStream` themselves.

### **Redis reconnects preserve the selected database** (63df889)
A reconnect now returns the client to the last successful `SELECT`ed database, instead of silently falling back to the URL/default database. That matters for apps that reconnect after transient failures and expect session state to survive.

### **Redis and SQL now treat empty environment URLs as unset, and connection errors name the address** (7bdbdea)
Environment URL resolution now distinguishes between “empty” and “unset” variables, changing precedence behavior for both SQL and Redis configuration. The same patch also improves refused-connection reporting so the error names the target address rather than failing generically.

### **Parser and AST refactor split call semantics from call syntax** (83229cf)
The parser/AST now track how a call or template was written separately from what it means semantically, replacing the old direct-eval flag with a richer call-kind model. This is a deep internal refactor that touches parsing, printing, lowering, and the React compiler pipeline to preserve correctness around `eval`, templates, and generated code.

### **AOT fixes stop wrong answers and missed module/code loads** (80c1473)
Bun’s `--aot` path got a broad correctness pass that fixes wrong answers, missing code loads, and module-resolution edge cases, including CommonJS/export handling and `import.meta.resolve` behavior. The patch also tightens several diagnostics and adjusts AOT lowering/loading logic, so builds are less likely to stop unexpectedly or emit incorrect output.

### **Fourteen runtime and platform fixes land together** (0a9bbf5)
This bundle includes substantial fixes in bundling, async stack traces, install behavior, Node compatibility, and platform-specific networking. Notably, it addresses shared-chunk ordering with import cycles, preserves async stack information for suspended functions, and adds macOS/Windows socket and IPC fixes.

### **`Bun.diff` now throws when the patch is ambiguous** (b40184a)
`Bun.diff` was changed from “apply whatever seems clear” to a stricter API that throws when the patch cannot be applied unambiguously. That makes the behavior safer and more predictable for tooling that depends on patch application results.

### **`util.diff` uses its own binding instead of `Bun.diff`** (6f2cd49)
The Node `util.diff` path was switched to a dedicated binding rather than routing through `Bun.diff`. That reduces coupling between the Node compatibility layer and Bun’s public diff API, and the accompanying tests cover the new path.

### **Redis reconnect behavior gets more robust under silent or busy servers** (bd92f9b)
The Valkey/Redis client now handles reconnects more carefully when the server is silent or overloaded, keeping the process alive appropriately for in-flight work and improving event handling around these states. This is another reliability fix in the reconnect/state-machine area.

### **Redis URL parsing now rejects bad credentials and fixes pipelining/scheme handling** (bfda778)
This patch tightens Redis URL error handling, including UTF-8 decoding failures in credentials, while also correcting pipelining and scheme-related behavior. It also updates types and tests around these cases.

### **Redis connect now rejects refused databases and avoids writing to DB 0** (64c9d09)
The client now treats a server-refused database selection as a failed connection instead of silently proceeding. That prevents writes from landing in the wrong database, which is a high-impact correctness fix for multi-DB deployments.

### **macOS IPC handles now wait properly when a channel is full** (70ea645)
On macOS, IPC handle delivery now waits for room in a full channel instead of failing or misbehaving. This is a platform-specific reliability fix for `child_process` IPC.

### **Fetch gzip tests were corrected for Windows socket behavior** (1f42072)
A Windows-specific test assumption was fixed: Winsock can send a large request body in one go, so the previous “unsent body” expectations didn’t hold there. This is test-only, but it aligns the suite with actual platform behavior.

### Other misc changes
- Redis reconnect/event-state refinements and related docs/type updates (2 commits)
- Several AOT/compiler test and doc-only adjustments
- WebKit dependency hash refresh / build metadata churn
- Minor docs wording updates across compiler/runtime pages
