---
date: 2026-05-10
repo: leanprover/lean4
size: M
title: "Profiler gets one-click browser serving"
excerpt: "Lean adds HTTP serving for `trace.profiler` output and improves `grind` diagnostics; vector append lemmas now work across sizes."
commits: 6
authors: [leodemoura, eric-wieser, Kha, kim-em]
commit_authors: {"2674a13": leodemoura, "62142c5": eric-wieser, "654017f": Kha, "a71f158": kim-em}
---

### **Lean can now serve `trace.profiler` output in a browser** (654017f)
A new `trace.profiler.serve` flow exports the Firefox Profiler JSON, serves it from an ephemeral `127.0.0.1` HTTP server, and opens the viewer URL automatically. This removes the manual file-upload step and makes profiler inspection much faster.

### **`grind` now reports local E-matching theorems more clearly** (2674a13)
Diagnostics for `grind` no longer drop local hypotheses or hide them behind anonymous `local.<idx>` names. Local theorem origins now preserve user-facing names and instantiation counters, which should make solver output much easier to interpret.

### **Vector append lemmas were generalized to mixed lengths** (a71f158)
Several `Vector` lemmas about `++` now accept vectors of different size indices instead of requiring both sides to share the same `n`. That broadens reuse for `sum`, `prod`, `flatMap`, `unattach`, and `eraseIdx` lemmas and reduces unnecessary casting friction.

### Other misc changes
- Marked move/swap operations `noexcept` for `type_checker`, `mpz`, and `name_generator` to help STL/container usage (62142c5)
- Updated stage0 generated sources twice, including a new profiler server artifact and a `prefer_native` flag flip (0eb80e3, 805fbca)
