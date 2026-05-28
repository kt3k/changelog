---
date: 2026-05-16
repo: denoland/deno
size: L
title: "Node compat gets vm, inspector, and URL fixes"
excerpt: "Major Node compatibility work landed: new vm.Module APIs, CDP Network events, and several internal-module and behavior alignments."
commits: 12
authors: [divybot, bartlomieju]
commit_authors: {"4510621": divybot, "b85d40c": divybot, "849ee10": divybot, "9732c5f": divybot, "08b03b3": divybot, "38b79c2": divybot, "f3fe4ab": divybot, "3a6c894": divybot, "a4463e1": divybot, "a4cb611": divybot, "f07cabe": divybot, "881cf73": bartlomieju}
---

### **Node inspector now emits Network CDP events** (881cf73)
Deno’s Node inspector gained a custom Network domain, including `Network.enable`/`disable` tracking and broadcasting protocol events to subscribed sessions. That unblocks inspector workflows that rely on network event delivery instead of treating the domain as a stub.

### **`node:vm` now supports two-phase module linking** (f3fe4ab)
`SourceTextModule` picked up `linkRequests(modules)` and `instantiate()`, bringing it closer to Node’s newer `vm.Module` flow. This is a meaningful API expansion for code that separates resolution from instantiation, and it adds stricter link-state validation along the way.

### **`URLSearchParams` was aligned with Node semantics** (f07cabe)
`new URLSearchParams(null)` and `new URLSearchParams(undefined)` now produce empty params instead of stringifying those values, matching Node’s behavior. The constructor also got more explicit iterable/record handling to satisfy node:url compatibility tests.

### **Node compat can now `require()` more internal modules**
Several commits exposed previously internal-only modules to Node’s resolver: `internal/webstreams/*` and `internal/worker/js_transferable` (4510621), `internal/fs/promises` with deferred loading (a4463e1), and `internal/async_hooks`, `internal/options`, and `internal/tty` (849ee10, 3a6c894, 9732c5f). Together these fixes unblock a broad set of Node compatibility tests that depended on those internal entry points.

### **Async and filesystem compatibility were tightened**
`AsyncWrap` now refreshes async IDs when agent sockets are reused, preventing stale async bookkeeping on pooled connections (b85d40c). Separately, `FileHandle.read()` argument normalization and close/unref internals were brought in line with Node, so monkey-patching `FileHandle.prototype.fd` no longer breaks internal close logic (a4463e1).

### **Node test runner and process resource APIs improved**
`test.expectFailure` was added to `node:test`, expanding test-runner parity with Node’s API (08b03b3). The repo also gained active process resource tracking hooks used by fs/process internals and compatibility tests (a4cb611).

### **Other misc changes**
- Underscored V8 flags are now normalized in node-compat test parsing (38b79c2).
- Node compat configs and test fixtures were updated for the new APIs and expected outputs.
- Minor internal plumbing changes to support the above compatibility fixes.
