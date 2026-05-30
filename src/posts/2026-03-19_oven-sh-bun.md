---
date: 2026-03-19
repo: oven-sh/bun
size: M
title: "Bundler crash fix, DNS cache expiry corrected"
excerpt: "Bun fixed a compile-time CSS/JS crash and a DNS cache bug that could keep stale entries alive indefinitely."
commits: 2
authors: [dylan-conway, robobun]
commit_authors: {"923690e": dylan-conway, "7960fe9": robobun}
---

### **Bundler crash when CSS and JS entry points mix in --compile** (7960fe9)
Bun now maps entry point IDs to the actual JS chunk index instead of treating them as direct array indices, which prevented out-of-bounds access when CSS-only entry points reduced the JS chunk list. A regression test was added to cover `bun build --compile` with mixed CSS and JS/TS entry points.

### **DNS cache entries can now actually expire** (923690e)
The DNS cache no longer treats `refcount > 0` as a blanket reason to report entries as unexpired, which had allowed stale records to stick around indefinitely while any request to that host was in flight. Expiry and memory safety are now handled separately, so stale entries can be evicted without risking in-flight request state.

### Other misc changes
- Added a regression test for the bundler crash.
