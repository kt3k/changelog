---
date: 2026-05-13
repo: leanprover/lean4
size: M
title: "Lean fixes async races and linter wording"
excerpt: "ContextAsync race handling, try? testability, and clearer unused-variable warnings landed alongside a CMake fix for empty leanc args."
commits: 4
authors: [pandaman64, nomeata, wkrozowski, algebraic-dev]
commit_authors: {"bba3868": pandaman64, "6279ae9": nomeata, "793cd14": wkrozowski, "ed0d50f": algebraic-dev}
---

### **ContextAsync.race no longer relies on sleep-based timing** (ed0d50f)
The async race helper was reworked to resolve a promise from whichever task finishes first, then cancel the loser. This removes the old timing-sensitive behavior and should make ContextAsync-based code and tests far less flaky.

### **try? gets a test-only mode that skips built-in branches** (6279ae9)
A new `debug.tactic.try.onlyUserSuggestions` option lets `try?` run only user-registered suggestion generators, bypassing expensive built-in branches like `exact?`, `simp`, and `grind`. That makes the resurrected cancellation tests faster and more stable, while also giving tests a cleaner way to exercise the suggestion pipeline.

### **unusedVariables now explains what to do instead** (793cd14)
The linter message was rewritten from a terse "unused variable" warning to a more actionable explanation: the name is not explicitly referenced, and the binding can be removed or renamed to `_` if used implicitly. This improves developer ergonomics and clarifies a common Lean warning.

### Other misc changes
- Fixed `toml_escape` so empty internal leanc flags no longer emit `moreLeancArgs = [""]`, avoiding a bogus empty argv entry in GCC builds. (bba3868)
- Updated tests for async cancellation, `try?`, and unused-variable diagnostics.
