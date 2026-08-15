---
date: 2026-08-14
repo: denoland/deno
size: L
title: "Deno hardens timers, domains, N-API, and events"
excerpt: "Thread-safe timer wakeups, better Node domain/uncaughtException behavior, safer N-API finalizers/strings, and EventTarget abort cleanup."
commits: 4
authors: [nathanwhit, bartlomieju]
commit_authors: {"89f33cb": nathanwhit, "23a0a04": nathanwhit, "f09ed7c": nathanwhit, "a883d13": bartlomieju}
---

### **Thread-safe timer wakeups prevent lost notifications** (23a0a04)
`web_timeout.rs` replaces the self-referential waker setup with an `Arc`-backed `AtomicBool` plus `AtomicWaker`, making timer readiness safe across threads. This fixes wakeup races where consecutive timers could lose notifications, and adds coverage for wake-before-registration and cross-thread delivery.

### **Node domains now track uncaught exceptions more like Node.js** (f09ed7c)
The domain polyfill now updates process-level exception capture when listeners are added or removed, and routes uncaught errors through parent domains when appropriate. It also clears domain state more carefully after handled errors, improving compatibility for nested domains and `process.on("uncaughtException")` interactions.

### **N-API finalizers and string/typedarray APIs get safety fixes** (a883d13)
This change defers JS-calling finalizers to a JS-safe point instead of invoking them from V8's GC callback, avoiding crashes when finalizers call back into JS. It also fixes NULL result handling for string/property-key creation and adds Float16Array-related N-API coverage and behavior fixes.

### **EventTarget cleans up abort handlers on removal** (89f33cb)
Explicitly removing an event listener now also unregisters its attached `AbortSignal` handler, and the same cleanup runs when a `once` listener is consumed. That prevents stale abort callbacks from firing after the listener is already gone.

### Other misc changes
- Dependency/test coverage updates bundled with the high-impact fixes
- Regression tests added for the domain, N-API, timer, and EventTarget changes
