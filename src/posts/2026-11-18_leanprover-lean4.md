---
date: 2026-11-18
repo: leanprover/lean4
size: L
title: "HTTP fixes lead a feature-heavy Lean day"
excerpt: "Major HTTP server correctness work plus VCGen, `grind`, and name-resolution improvements; also a kernel heartbeat fix and memory/runtime bug fixes."
commits: 21
authors: [sgraf812, leodemoura, hargoniX, Kha, algebraic-dev, Garmelon]
commit_authors: {"dcd22d5": leodemoura, "902461b": algebraic-dev, "d15bfa7": algebraic-dev, "300f273": sgraf812, "70c9a7d": hargoniX, "4dc94ee": sgraf812, "18b4a16": hargoniX, "aede766": hargoniX, "d0aceb3": Kha, "1b091cc": sgraf812, "47ac95d": leodemoura, "29480b5": leodemoura}
---

### **HTTP server now handles RFC edge cases and timeouts correctly** (d15bfa7, 902461b)
Lean’s HTTP stack got a substantial correctness pass: connection timers now use a watchdog, URI parsing gained size limits, `Expect: 100-continue` and transfer-coding parsing became RFC-aware around quoted strings, and `CONNECT`/lingering-close timeout handling was tightened. The follow-up commit fixed lingering close, timeout reporting, and `CONNECT` tunnel handling so connections no longer mis-handle buffered bytes or report the wrong failure mode.

### **VCGen learned to split assertions and reuse better split rules** (1b091cc, 4dc94ee)
`vcgen` can now split `if`/`match` conditions appearing in assertions and reuses that information later via cached split equalities. In parallel, join-point generation was improved to anti-unify common jump arguments, which reduces proof search work and avoids duplicated case splits in common structured-state patterns.

### **Reserved-name handling and name resolution got faster** (47ac95d, dcd22d5)
Lean now records a cheap “candidate” test for reserved-name predicates and uses it to avoid re-running expensive checks for every namespace candidate during resolution. This makes global name resolution faster in files with many `open`s, and the benchmark added here reports a sizable instruction reduction.

### **Kernel heartbeat limits are now scoped per declaration** (d0aceb3)
The kernel’s `maxHeartbeats` limit now applies separately to each `addDeclCore` call instead of accumulating across declarations checked on the same thread. That fixes a class of false failures for tools that replay many declarations in sequence, while keeping per-declaration checking limits intact.

### **Runtime and tactic bugs were fixed** (70c9a7d, 300f273, 18b4a16, 29480b5, aede766)
`lean_array_get_borrowed` no longer leaks memory on its panic path, `grind` can case-split on negated `check` guards, stack-size setting now saturates instead of overflowing, and match congruence equation auxiliaries are now private to avoid diamond import conflicts. There’s also a small ABI clarity change for `isScalarObj`.

### Other misc changes
- CI workflow tweaks and cache/backport script updates (3 commits)
- Benchmark/test formatting and scaling-test additions (2 commits)
- Stage0 refresh and a CMake version-cycle bump (2 commits)
