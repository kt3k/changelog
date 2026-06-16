---
date: 2026-06-15
repo: nodejs/node
size: M
title: "Node tightens crypto, streams, and debugger behavior"
excerpt: "A new sync dgram bind, crypto deprecation, debugger init fix, and a handful of correctness fixes land today."
commits: 8
authors: [trivikr, watilde, developers-universe-1, guybedford, anonrig]
commit_authors: {"463e56f": developers-universe-1, "723dd38": guybedford, "c2f2013": trivikr, "3ad2463": watilde, "9d2db70": trivikr, "aa25a0a": anonrig}
---

### **dgram gets a synchronous `bindSync()` API** (723dd38)
Node now exposes `Socket.prototype.bindSync([options])`, a synchronous, non-blocking bind that returns the bound address immediately and throws bind errors synchronously. It skips DNS resolution, binds the socket handle directly, and keeps `'listening'` emission on the next tick.

### **Hmac.digest() now warns on repeated calls** (463e56f)
Calling `Hmac.digest()` more than once now emits runtime deprecation `DEP0206` instead of silently returning an empty buffer. This aligns the API with `Hash.digest()`-style finalized-state handling and gives users a clearer migration signal.

### **Debugger CLI now waits for post-connect init** (c2f2013)
The debugger REPL now resolves `run` and `restart` only after post-connect initialization completes, preventing a prompt from appearing before `Runtime.runIfWaitingForDebugger()` has actually released the target. This fixes a user-visible race and improves debugger test reliability.

### **CJS lexer no longer aborts on empty V8 handles** (aa25a0a)
`cjs_lexer::Parse` now propagates empty `MaybeLocal` results instead of unconditionally calling `ToLocalChecked()` and crashing the process. That makes ESM imports of CJS modules more resilient when string allocation or pending exceptions occur on the isolate.

### **`pipeTo()` stops treating writers with `transform()` as transforms** (9d2db70)
The stream/iter `pipeTo()` and `pipeToSync()` paths now honor the parsed destination writer instead of re-classifying writer objects that happen to have a `transform()` method. This fixes a misrouting bug where such writers could be handled like transform streams rather than plain sinks.

### **`util.inspect()` preserves `-0` with numeric separators** (3ad2463)
Inspection now formats `-0` correctly even when `numericSeparator` is enabled. This closes a small but real correctness gap in developer-facing output.

### Other misc changes
- Debugger REPL internal refactor to defer init after run/restart
- Stream duck-typing docs clarified to require `off()`
- CLI typo fix in snapshot documentation
- Crypto deprecation and Hmac constructor test updates
