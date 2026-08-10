---
date: 2026-08-09
repo: denoland/std
period: weekly
slug: 2026-W32
period_label: "Aug 3–9, 2026"
size: M
title: "Async helpers get stricter abort handling"
excerpt: "This week focused on making std/async cancellation safer and more predictable, plus a few contributor-doc clarifications."
commits: 6
---

### **Abortable async utilities now close cleanly on early exit**
`@std/async` and `@std/async/unstable-abortable` were tightened so source async iterators are properly closed when consumers stop early or when an abort fires. That reduces resource leaks and makes `abortable()` behavior more predictable.

### **Cancellation handling improved for edge cases**
`pooledMapSettled()` now checks for aborts even after input is fully drained, racing final completion against the signal so late cancellations are not ignored while work is still finishing.

### **`unstable-abortable` handles missing signals correctly**
The unstable helper now returns a real async generator when no signal is provided, instead of mishandling the input. Its docs were also expanded with clearer guidance on the optional `signal` parameter and usage examples.

### **Other misc changes**
- Added contributor guidance for choosing error classes and linked it from `AGENTS.md`.
- Clarified how PR titles influence version bumps and the `/unstable` semantics.
