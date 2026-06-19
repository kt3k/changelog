---
date: 2026-06-18
repo: leanprover/lean4
size: L
title: "Float overhaul, new `lia` support"
excerpt: "Lean4 added a dedicated `@[lia]` lemma set, exposed `Float`’s logical model, and fixed several runtime/concurrency issues."
commits: 16
authors: [kim-em, Kha, sgraf812, TwoFX, volodeyka, hargoniX]
commit_authors: {"5781828": Kha, "5822584": TwoFX, "bc5f89f": kim-em, "2be4e45": Kha, "44232a0": TwoFX, "8e073a2": sgraf812, "9ddaae5": sgraf812, "d24bd89": hargoniX, "518dc66": Kha, "04e7ed3": sgraf812, "c2f8445": kim-em, "84fc958": volodeyka, "1fb7efa": kim-em}
---

### **Float is now modeled in Lean and `ofScientific` was rewritten** (5822584, 44232a0)
`Float`/`Float32` are no longer opaque wrappers: they now delegate many operations to `Float.Model`, giving the kernel a logical account of arithmetic while keeping compiled code on the fast C path. In the same area, `Float.ofScientific` was fully reimplemented and exposed on the model side, with the new version validated against millions of parsing test cases.

### **`lia` gets its own attribute and can now see `min`/`max`** (c2f8445, bc5f89f)
Lean added a builtin `@[lia]` attribute and wired the `lia` tactic to use a dedicated, much smaller E-matching lemma set instead of the full `@[grind]` set. The standard `Nat`/`Int` `min_def` and `max_def` lemmas are now tagged for it, which makes common `min`/`max` goals solvable by `lia` out of the box.

### **`wait_for_expected_type%` postpones elaboration until the expected type is known** (9ddaae5)
A new term elaborator was added that elaborates an expression only after an unassigned expected-type metavariable has been resolved. This is useful for notations that depend on `outParam` inference, avoiding premature unfolding of terms into less precise types.

### **Task handling is fixed to be thread-safe** (d24bd89)
The runtime now makes `lean_task.m_imp` atomic and updates task-manager code to load it safely before and after mutex acquisition. This removes undefined behavior in `get_task_state_core` and closes a concurrency bug in task lifecycle management.

### **`Triple` and spec keying were refactored for program-first elaboration** (8e073a2, 04e7ed3)
The `Triple` argument order was changed so the program comes first, which lets elaboration fix the monad/return type before elaborating pre/postconditions. The `@[spec]` keying logic was updated to recover the program position structurally from the declaration signature, making the system resilient to this and future reorderings.

### **`while`-loop invariant support got a shorthand rename and abstraction** (84fc958)
The loop-invariant machinery was renamed from `WhileInvariant` to `RepeatInvariant`, and a new abbreviation was added for building repeat-loop invariants more ergonomically. This broadens the verification API for `while`/`forIn`-style loops.

### Other misc changes
- `IO.Ref` is no longer max-shared in the compactor (518dc66).
- Bench/build profiling and misc test tooling updates (2be4e45, 5781828).
- Stage0/bootstrap refreshes and a CLAUDE.md comment-style doc tweak (b548c14, 87a7d9d, 1fb7efa).
