---
date: 2026-07-03
repo: leanprover/lean4
size: L
title: "Lean4 gets time, Lake, and TZ upgrades"
excerpt: "Major time-format rewrites, POSIX TZ parsing for future zone rules, and Lake API/archive improvements landed together."
commits: 12
authors: [TwoFX, algebraic-dev, Garmelon, wkrozowski, tydeu, marcelolynch]
commit_authors: {"7433046": marcelolynch, "086e7a3": algebraic-dev, "a917280": algebraic-dev, "1f1d818": wkrozowski, "41b2fe8": tydeu}
---

### **Time format patterns realigned with Java/CLDR** (086e7a3)
Lean's time-formatting module was substantially rewritten so format specifiers now follow Java/CLDR-style pattern semantics more closely. That expands and clarifies support for fields like standalone month/quarter/day forms, day periods, and fixed-width numeric patterns, while also updating the docs and tests to match the new behavior.

### **Future timezone transitions now come from POSIX TZ footers** (a917280)
Lean can now parse POSIX TZ footer strings in TZif v2/v3 databases and derive a `RecurringRule` for transitions beyond the explicit table. This matters for long-range timezone lookups, since offsets can now be computed even when the stored transition array doesn't reach far enough into the future.

### **Lake gains stable `.ltar` archives and sync build/link APIs** (7433046, 41b2fe8)
Lake now strips input-derived hash data when packing module archives, making byte-identical outputs produce byte-identical `.ltar` files across paths and machines. The same day also added new `ModuleLinkInfo`/`build*Sync` APIs for custom targets and made shared-library linking more reusable.

### **`dupNamespace` linter can now catch non-consecutive repeats** (1f1d818)
The `dupNamespace` linter gained an opt-in mode for flagging repeated namespace components even when they are not adjacent. That makes the lint closer to the stricter behavior already used in mathlib, while keeping the default check conservative.

### Other misc changes
- Renamed or re-namespaced several symbols to reduce public namespace pollution (`IO.AsyncList`, `LLVM`, `Lean.Data.Lsp.*`).
- Fixed benchmark/scripts/build plumbing (`const_fold`, `benchReelab`, build metrics).
- Small internal refactors and test updates across LSP, Lake, and time-format tests.
