---
date: 2026-05-17
repo: leanprover/lean4
period: weekly
slug: 2026-W20
period_label: "May 11–17, 2026"
size: L
title: "Lean4 sharpens time APIs, diagnostics, and editor tooling"
excerpt: "A week of core Lean improvements: clearer time handling, faster elaboration/config code, sturdier tests, and better linting and hover support."
commits: 38
---

### **Time and date handling gets a major cleanup**
Lean’s `Std.Time` API was made more explicit and locale-aware. The week introduced first-class wall time vs timestamp types, clearer UTC/local semantics, and timezone-offset-based conversions. Formatting also grew locale symbols, week-start-aware calculations, and week-based year support, while TZ lookup was hardened to respect `TZ`/`TZDIR` more reliably.

### **Elaboration and tactic infrastructure gets faster and more robust**
Several hot paths were optimized or simplified: tactic config elaboration is now much cheaper, beta instantiation skips unnecessary work in the common case, and `cbv` was aligned with the shared `SymM` machinery. Empty `by` blocks can now surface `try?` suggestions behind an option, and `try?` gained a test-only mode to exercise just user suggestion generators.

### **Serialization and cross-file sharing move forward**
Lean added a new `CompactedRegion.save/read` API for module-by-module save/load with explicit sharing across dependency regions. This is a substantial serialization refactor aimed at improving `.olean` reuse and reducing duplicated data across files and sessions.

### **Linting, diagnostics, and proof search become more informative**
Core linting picked up `dupNamespace` integration and the upstreamed `unusedDecidableInType` check, while `unusedVariables` now explains how to silence or remove bindings more clearly. Instance-synthesis diagnostics were improved for impossible/non-class instances, `grind` gained a separate cap for local-theorem generation, and MePo fixed a regression that had it selecting the worst premises.

### **Editor and hover support gets richer**
Lean added `MessageData.withExprHover` helpers for constructing hoverable expression messages, and structure-instance metadata now carries richer field-path information for better hovers/completions. Pretty-printing was also fixed so `pp.universes` no longer interferes with ordinary constants like `↔` and `Nat.succ`.

### **Other misc changes**
- `withSetOptionIn` stopped mutating infotrees, fixing a linter correctness issue.
- `lake shake --explain` now gives more precise reasons dependencies are kept.
- `--plugin` switched to `file=fn` to avoid Windows path parsing clashes.
- `ByteArray` and `Dyadic` gained missing proof lemmas/APIs.
- CI/server test harnesses were hardened, with several flaky cancellation and interactive test fixes.
