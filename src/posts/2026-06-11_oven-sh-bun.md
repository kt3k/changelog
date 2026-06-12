---
date: 2026-06-11
repo: oven-sh/bun
size: L
title: "SQL pool fixes and bake decoupling land"
excerpt: "Bun tightened SQL pool shutdown/throw handling, deduped SQL internals, and refactored bake sourcemap dispatch to be type-erased."
commits: 7
authors: [alii, robobun]
commit_authors: {"7013497": alii, "ddd1ff0": alii, "5c02cc1": robobun, "170fcd7": alii, "6e91d24": alii, "f8723b1": robobun, "8354af5": robobun}
---

### **SQL pool shutdown now resolves cleanly mid-handshake** (5c02cc1)
Forced `sql.close({ timeout: "0" })` now settles even if a connection is accepted but still negotiating with the database. The pool stores the native handle earlier and explicitly tears it down when a forced close races with connection creation, fixing a hang on startup-time close.

### **User callback throws no longer corrupt SQL pools** (8354af5)
The MySQL and Postgres pool handlers now wrap `onconnect`/`onclose` in `try/finally` so pool bookkeeping always runs, even if user code throws. That prevents stuck pending state, missing error propagation, and hung `release()`/`onFinish` paths.

### **SQL protocol code got a broad internal cleanup** (7013497, ddd1ff0, 170fcd7)
The SQL Rust crates were refactored to collapse duplicated protocol types and move shared cursor/constructor parsing into common modules. This trims a lot of repeated code across MySQL/Postgres and reduces the surface area for future protocol drift, without changing the public JS API.

### **Bake sourcemap/provider dispatch was type-erased** (6e91d24)
The dev-server sourcemap plumbing no longer hardcodes bake-specific source-provider types inside the generic sourcemap crate. That decouples the generic layer from bake internals and makes the dispatch path cleaner for the server-components separate-SSR setup.

### **Inspector no longer double-fires client navigation events** (f8723b1)
A successful HMR `SetUrl` navigation now emits exactly one `clientNavigated` inspector event instead of two. This fixes duplicate notifications for route changes and aligns the inspector stream with actual navigation outcomes.

### Other misc changes
- SQL internal/protocol refactors and deduplication across shared modules
- Bake/server-components target rename and bundler plumbing updates
- Added and updated tests for SQL close behavior, SQL callback throws, sourcemap provider behavior, and inspector navigation events
