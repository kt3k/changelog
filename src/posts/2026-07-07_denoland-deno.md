---
date: 2026-07-07
repo: denoland/deno
size: L
title: "Desktop, streams, and runtime fixes land"
excerpt: "Deno adds React Router desktop support, closes several runtime leaks, and ships a handful of stream/network performance and correctness fixes."
commits: 22
authors: [bartlomieju, divybot, wilkmaciej, crowlKats, sectore, Tsudrat, akazwz]
commit_authors: {"7128952": wilkmaciej, "370e587": sectore, "dc6a95f": divybot, "3d52c77": bartlomieju, "83c50b1": bartlomieju, "800d6c9": bartlomieju, "77880a8": bartlomieju, "7064c6b": bartlomieju, "a79612e": bartlomieju, "8dcdd72": wilkmaciej, "6aa63cc": bartlomieju, "7afce23": Tsudrat, "a67ef47": bartlomieju, "b7d5a7d": bartlomieju, "186f17a": bartlomieju, "f6c7bba": akazwz, "816fda3": divybot, "46e0955": wilkmaciej}
---

### **Desktop now supports framework HMR and React Router** (370e587, f6c7bba, 7afce23, 816fda3)
Deno Desktop gained framework-server HMR support, so `deno desktop --hmr` can now defer reload handling to a framework’s own dev server instead of only using V8-level reloads. It also now detects React Router projects during compile/desktop framework detection, including separate SPA vs SSR entrypoint generation, which closes a big gap in the supported framework matrix.

### **Network and stream correctness fixes for common hangs and edge cases** (77880a8, a67ef47, 800d6c9, 83c50b1, a79612e)
`Deno.connect()` now respects abort signals even while DNS resolution is still in flight, preventing canceled connection attempts from silently running until OS timeout. The web streams implementation also picked up several correctness/perf improvements, including a persistent `pipeTo` pump, a sync fast path for `ReadableStream` async iteration and `TransformStream`, and a fix for pending BYOB reads when teeing a closing byte stream.

### **Runtime and inspector teardown is now much cleaner** (dc6a95f, 8dcdd72, 7064c6b, 46e0955)
Compiled desktop app startup errors are now surfaced instead of failing silently, which matters for GUI launches where stderr is effectively invisible. The inspector server now closes stale WebSocket sessions when the runtime is torn down, watch mode runs preload modules correctly, and signal handlers are unregistered when their streams are dropped to avoid long-lived leaks.

### **Node compatibility improved for inspect and inherited fds** (7128952, b7d5a7d)
`inspector.waitForDebugger()` now matches Node more closely by blocking without scheduling an unexpected pause on the next statement. Node child-process/fd handling also got more permissive for inherited extra stdio TCP sockets, fixing a case where `net.Socket({ fd })` could be rejected as an apparent duplicate.

### **Install/cache and config behavior tightened up** (3d52c77, 186f17a, 6aa63cc)
The npm installer cache hash is now deterministic, reducing setup churn, and the `node_modules` lock staleness window was widened to avoid false preemption under parallel processes. Deno also added wildcard support to `minimumDependencyAge.exclude`, with validation and diagnostics to keep patterns well-formed.

### **Other misc changes**
- Desktop docs and stale comment cleanup
- `Deno.autoUpdate` docs added
- `desktop.backend` config honored
- Inspector tests/specs expanded
- Misc workspace/schema/doc/internal plumbing updates
