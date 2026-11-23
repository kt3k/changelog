---
date: 2026-11-22
repo: leanprover/lean4
period: weekly
slug: 2026-W47
period_label: "Nov 16–22, 2026"
size: L
title: "Lean4 adds an EPR solver and sharpens core performance"
excerpt: "New `epr` tactic, major VCGen/do/cbv speedups, tighter kernel checks, and a raft of runtime and HTTP correctness fixes."
commits: 144
---

### **Major theorem-proving additions and proof automation gains**
Lean gained a new `epr` tactic that solves EPR problems via BitVec-backed encoding and `bv_decide` machinery. Across the week, `grind`, `funind`, and `match`/equation-lemma generation were all tightened up: `grind` learned better fact filtering and arithmetic reasoning, `funind` now handles more recursive-call shapes, and the match compiler/equation generator became both faster and more precise on literal-heavy and non-variable-discriminant cases.

### **VCGen, `do`, and `cbv` saw substantial speedups**
Several hot paths were reworked for performance. `do` elaboration now lazily abstracts continuations and caches join-point/control data, cutting large-block behavior from near-cubic to much better scaling. `vcgen` learned to split assertions, share more join points, and avoid expensive zeta/reduction blowups, while `cbv` got cheaper partial-application checks and less re-sharing during reduction. These changes together target large real-world proof scripts and verification workloads.

### **Kernel and checker correctness were tightened**
Lean picked up a number of important soundness- and robustness-oriented checks: loose bound variables in inductive declarations are now rejected, constructor checking happens in the right environment, recursive `Prop` eliminations are restricted more carefully, and `maxHeartbeats` is scoped per declaration instead of accumulating across checks. `leanchecker` also now validates replay-map keys against stored constant names, closing a metadata mismatch hole.

### **Runtime, evaluator, and process-safety improvements**
The runtime got a broad stability pass. `IO.Process.spawn` was reimplemented on libuv for better cross-platform behavior and clearer failures, while evaluator/runtime paths now guard against huge shifts, oversized bit-vector widths, descriptor leaks, stack overflow in thread settings, and unsafe scalar-array out-of-bounds behavior. `Body.Stream.readAll` also now treats cancellation correctly instead of silently returning partial data.

### **Std/Lake/HTTP ecosystem updates**
`Std.Http` was brought much closer to RFC behavior, with fixes around URI parsing, timeout handling, `Expect: 100-continue`, transfer coding, and lingering close, plus added regression tests. Lake gained `downloadCacheService` support and better file setup through private imports, improving build-cache and editor workflows. The `.olean` format was bumped to v4, and Lean now exports fewer proof-only realizations to reduce rebuild churn.

### **Other misc changes**
- `PredTrans`/`Std.WP` were refactored toward unbundled, monotone-by-construction APIs.
- `Nat.shiftLeft`, `ByteArray`/`FloatArray`, UDP ephemeral ports, and several deprecation-linter edge cases were fixed.
- Small API additions like `Name.iter`/`revIter`, plus assorted CI, stage0, docs, and benchmark updates.
