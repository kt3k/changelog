---
date: 2026-08-03
repo: denoland/std
size: M
title: "Async abortability tightened, docs clarified"
excerpt: "Bug fixes for abortable iterables and pooledMapSettled landed alongside guidance on error classes and PR titles/version bumps."
commits: 6
authors: [tomas-zijdemans]
commit_authors: {"ca58f94": tomas-zijdemans, "b780af4": tomas-zijdemans, "44be690": tomas-zijdemans, "b847d39": tomas-zijdemans, "a997afc": tomas-zijdemans, "5406d2f": tomas-zijdemans}
---

### **abortable() now closes iterators correctly on early exit** (a997afc)
Both `@std/async` and `@std/async/unstable-abortable` now ensure the source async iterator is closed when a consumer stops early or an abort happens. This fixes resource leaks and makes `abortable()` behave more predictably for async iterables.

### **unstable abortable() returns the right async generator when no signal is passed** (44be690)
`@std/async/unstable-abortable` now handles the no-signal case properly for async iterables, returning a real async generator instead of mishandling the input. The docs were also expanded to clarify the optional `signal` behavior and add usage examples.

### **pooledMapSettled() now respects late aborts after draining input** (5406d2f)
`pooledMapSettled()` now checks for aborts after the source iterable is exhausted and races final completion against an abort signal. That prevents the helper from ignoring a late cancellation while work is still in flight.

### Other misc changes
- Documented error-class selection guidance in contributor docs; linked it from `AGENTS.md` (b780af4, ca58f94)
- Documented how PR titles control version bumps and unstable `/unstable` semantics (b847d39)
