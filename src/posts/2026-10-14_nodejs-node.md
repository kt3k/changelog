---
date: 2026-10-14
repo: nodejs/node
size: L
title: "Node 26.12.0 lands with perf and async fixes"
excerpt: "A new 26.12.0 release plus sqlite, URLSearchParams, AsyncLocalStorage, and WebCrypto updates highlight the day."
commits: 9
authors: [nodejs-github-bot, aduh95, kisnner26, araujogui, rozzilla, gengjiawen, nigrosimone]
commit_authors: {"e39f2e8": aduh95, "782a3ac": nodejs-github-bot, "4381c47": kisnner26, "68df1db": araujogui, "496b48b": nodejs-github-bot, "b22fea5": nodejs-github-bot, "dd7235c": rozzilla, "87db28b": gengjiawen, "a0ce8f1": nigrosimone}
---

### **SQLite rows now reuse shared shapes for faster reads** (68df1db)
`all()`, `get()`, and `iterate()` now build result rows from a cached dictionary template when possible instead of creating dictionary-mode objects each time. That should cut property-read overhead on hot paths; the fallback still preserves the old behavior for column sets the template can't represent.

### **AsyncResource callbacks now keep the AsyncLocalStorage store** (a0ce8f1)
`AsyncResource::MakeCallback()` now passes the saved async context frame through to `InternalMakeCallback()`, aligning it with the Node-API path. This fixes cases where `AsyncLocalStorage` lost its store inside callbacks and removes extra frame-scoping work on every call.

### **URLSearchParams.sort() drops one scratch buffer** (dd7235c)
The merge-sort implementation now buffers only the left run and reads the right run directly from the output array, eliminating one temporary array allocation and some copying. The change preserves stability and should reduce memory churn for larger sorts.

### **WebCrypto WPTs were reorganized for modern algorithms** (782a3ac)
The WebCrypto test fixtures were reshuffled to separate modern-algorithm coverage into the new `modern-algos/` area, with README guidance updated to match. This is mostly test-structure maintenance, but it helps keep the growing WPT suite organized as the API surface expands.

### **QUIC stream docs were corrected** (4381c47)
The `direction` and `id` docs now describe the actual value types and pending/destroyed states more accurately. This is a documentation fix, but it removes misleading API text.

### **Release 26.12.0 metadata updated** (496b48b)
The changelog and several docs were bumped to reflect the 26.12.0 release and related API notes. This is release bookkeeping rather than runtime behavior.

### **CI workflow can now fetch on private forks** (e39f2e8)
The `nix-changes` workflow now keeps Git credentials during checkout so later steps can fetch as needed. This fixes failures in private-fork runs.

### **Other misc changes**
- Build tweak: remove a nonexistent abseil header from V8 gyp files (87db28b)
- Release metadata/docs updates for 24.22.0 and related API notes (b22fea5)
- WPT fixture syncs for WebCryptoAPI (782a3ac)
