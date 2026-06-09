---
date: 2026-05-18
repo: leanprover/lean4
size: L
title: "Lean4 tightens tactics, caches, and CI"
excerpt: "Major tactic refactors, cache-key fixes, better premise selection, and a CI workflow cleanup landed today."
commits: 10
authors: [kim-em, nomeata, Kha, kmill, tydeu, Vtec234]
commit_authors: {"e09155b": Kha, "ebbbec0": nomeata, "705ba64": nomeata, "6d5ec05": kim-em, "5d22886": kmill, "3f3a26c": kim-em, "2c38bb3": tydeu, "8f508e3": kim-em, "a68d753": kim-em, "9df1cae": Vtec234}
---

### **Tactic `try?` becomes extensible and info-tree based** (ebbbec0)
`try?` now dispatches built-ins through `@[builtin_try_tactic]` registrations instead of a hardcoded syntax-kind match, bringing its extensibility model in line with normal tactics. Its suggestion extraction also stops scraping message text and instead reads structured `TryThisInfo` nodes from the info tree, which is much more robust.

### **Application elaboration gets a substantial refactor and performance pass** (5d22886)
The app elaborator was reworked around more explicit state tracking, including cached elaborated arguments and cleaner handling of implicit/named args. The change also improves tracing, dot-notation elaboration, asymptotic behavior, and fixes an eta-args bug that could incorrectly turn explicit arguments into implicit ones.

### **Meta cache keys fix two distinct collision bugs** (a68d753, 8f508e3)
`Meta.Config.toKey` now allocates enough bits for `TransparencyMode`, preventing `.none` from colliding with neighboring flags in `WHNF`/`isDefEq` caches. A second fix adds `zetaUnused` to the key, closing another cache-collision path where different reduction settings could incorrectly reuse results.

### **Premise selection is made more accurate** (3f3a26c, 6d5ec05)
MePo now filters candidates to theorems only and orders results by iteration first, then score, so earlier rounds stay ahead while preserving ranking within each round. Separately, library suggestion constant collection now instantiates metavariables before scanning goal types, so premises hidden behind an induction motive are no longer dropped.

### **`Unit` gains JSON codecs** (9df1cae)
`FromJson`/`ToJson` instances were added for `Unit`, encoded as `{}`. The same file also picked up documentation for the JSON deriving behavior.

### **Other misc changes**
- CI/workflow cleanup: folded Linux Lake into Linux release and adjusted update-stage0 caching/setup (e09155b)
- Lake env test isolation fix for `tests/env` (2c38bb3)
- Regression tests added/updated for cache-key and premise-selection fixes (a68d753, 8f508e3, 6d5ec05, 3f3a26c)
- Small `try?` tracing/terminal-goal handling tweaks inside the tactic refactor (ebbbec0, 705ba64)
