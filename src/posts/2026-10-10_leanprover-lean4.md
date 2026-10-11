---
date: 2026-10-10
repo: leanprover/lean4
size: L
title: "grind gets smarter; libuv runtime refactors"
excerpt: "New grind parameter handling and replay fixes land alongside a major libuv runtime overhaul and a few solver correctness fixes."
commits: 9
authors: [leodemoura, algebraic-dev, tydeu]
commit_authors: {"8254463": leodemoura, "9f9ee91": leodemoura, "62801e8": leodemoura, "d77ee81": leodemoura, "d285f8d": leodemoura, "07c4dc3": algebraic-dev, "ca7a383": algebraic-dev, "50541c3": algebraic-dev, "b8182f6": tydeu}
---

### **grind can now treat ground theorems as facts** (9f9ee91)
`grind` now accepts certain non-`∀` theorem/axiom/constructor parameters as asserted facts instead of trying to E-match them. That removes the need for workarounds like `[(mkP)]` for ground propositions, while keeping replay suggestions consistent.

### **grind? / finish? suggestions keep their parameters and validate correctly** (d77ee81, 62801e8)
The generated suggestions now preserve parameters such as `inj` and `funCC`, and `finish?` validates scripts at the original goal before those parameters are asserted. This fixes pasted suggestions that previously dropped essential setup or only worked because pending parameters were still active.

### **grind fixes an instance comparison bug with `@[implicit_reducible]` definitions** (8254463)
`isDefEqI` now compares instances at `.implicit` transparency, matching how instance-implicit arguments are actually checked. This unblocks `grind` on instances wrapped in `@[implicit_reducible]` definitions and fixes a real regression.

### **grind internalization no longer trips over re-entrant solver callbacks** (d285f8d)
A subtle internalization bug is fixed where solver callbacks could re-internalize terms whose arguments were still being processed, leading to errors like “ring term has not been internalized.” The change adds queueing and guardrails so callbacks only see fully safe terms, closing a nasty class of internal grind failures.

### **Lean’s runtime libuv layer gets a major safety refactor** (07c4dc3, ca7a383, 50541c3)
The libuv bindings were overhauled with RAII lock guards, embedded handles for sockets/timers/signals, and a cleanup of helper/error plumbing. These changes reduce manual locking/allocation churn and make the runtime code much harder to misuse.

### Other misc changes
- Lake now clears existing IR artifacts before running `leanir` (b8182f6).
