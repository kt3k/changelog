---
date: 2026-11-13
repo: oven-sh/bun
size: L
title: "Bun lands AOT, HTTP, and release pipeline work"
excerpt: "Big AOT/compiler changes headline the day, alongside HTTP request write fixes, event-loop/timer safety refactors, and CI/release overhaul."
commits: 11
authors: [dylan-conway, Jarred-Sumner]
commit_authors: {"c7b1ba4": Jarred-Sumner, "4bf0ef9": dylan-conway, "33cf0a0": dylan-conway, "b6e7b9c": dylan-conway, "e67258f": dylan-conway, "d0f4fdd": Jarred-Sumner, "f847732": dylan-conway, "f11eb40": dylan-conway, "4a78d39": dylan-conway, "9ea3c69": dylan-conway, "801eb37": dylan-conway}
---

### **AOT compiler gets a major expansion** (d0f4fdd)
Bun’s experimental AOT path gained support for bundles, classes behind parameters, getter-based exports, mocked async file awaits, and additional known-string handling. The change also updates the embedded WebKit/JSC version and broadens the resolver/IR machinery, so this directly affects what can be compiled and how much code the compiler can safely analyze.

### **HTTP client now resumes partially written request heads** (c7b1ba4)
When a request head doesn’t fit in one write, Bun now keeps the serialized bytes around and resumes sending from the correct offset instead of rebuilding and resending the whole head. That fixes wasted work and incorrect behavior for ordinary requests and proxy-tunneled requests alike.

### **Event loop sharing is refactored to remove exclusive borrows** (33cf0a0)
The event loop API was widened from `&mut self` to `&self` in most places, with state now shared through safer interior mutability patterns. This removes a large amount of `unsafe` and reduces the chance of borrow-based miscompilations around cross-thread posting and re-entrant callbacks.

### **Timers are made re-entrant-safe while callbacks run** (b6e7b9c)
Timer state is now shared instead of borrowed exclusively, so JavaScript callbacks can safely add, clear, or reschedule timers while the queue is being drained. That closes a class of re-entrancy hazards in the timer heap and related runtime paths.

### **CSS AST and bundler lifetime tracking is tightened up** (e67258f)
The CSS parser and bundler now carry the arena lifetime through the AST instead of relying on `'static` casts and pointer comments. This is a substantial correctness refactor: the borrow checker now enforces invariants that were previously only documented in safety notes.

### **Release branches get stricter history checks and easier drafts** (f847732, f11eb40, 801eb37, 4a78d39)
Release CI now validates branch ancestry more carefully, prevents drifting away from `main`, and supports building releases from dedicated release branches. The pipeline also stops generating giant diff comparisons for contributor lists and reorganizes artifact upload/signing steps for cleaner release drafts.

### Other misc changes
- Temp-folder/test harness cleanup and HTML entry-point path resolution in tests and CLI plumbing (4bf0ef9)
- Version bump to 1.4.5 / LATEST update (9ea3c69)
- Minor docs/compatibility wording updates and release-artifact test adjustments (d0f4fdd)
- Miri crate list updated to include `bun_event_loop` (33cf0a0)
