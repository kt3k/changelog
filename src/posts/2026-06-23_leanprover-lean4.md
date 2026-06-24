---
date: 2026-06-23
repo: leanprover/lean4
size: M
title: "Lean4 tightens parsing, build, and Lake behavior"
excerpt: "A new Lake feature lands alongside parser and `lia` fixes, plus CI/build cleanup and a cache-benchmark addition."
commits: 7
authors: [tydeu, datokrat, leiko1337, hargoniX, Kha, eric-wieser]
commit_authors: {"2197581": Kha, "9ea1b4c": datokrat, "ce02720": leiko1337, "247ad57": hargoniX, "0056306": eric-wieser, "ab97228": tydeu, "fde478c": tydeu}
---

### **Lake now treats `platformIndependent` as trace-compatible** (fde478c)
Modules that don't depend on dynamic libraries can now toggle `platformIndependent` between `true` and unset without forcing a rebuild. The change also updates the precompile/link test coverage to verify the new behavior and related trace output.

### **Fast import parser fixes overlapping block-comment terminators** (ce02720)
`finishCommentBlock` now restores the parser position when a `-` doesn't actually start a terminator, so overlapping candidates like `--/` are rechecked correctly. This fixes a subtle import-header parsing bug that could skip valid terminator starts.

### **`lia` stops generating instances from hypotheses** (247ad57)
Lean's `@[lia]` setup now disables local theorem instantiation in this path, preventing `lia` from creating instances from quantified hypotheses. That closes off a performance trap that could otherwise blow up when problematic hypotheses are in scope.

### **Other misc changes**
- Removed temporary PR-release workflow special casing (9ea1b4c)
- Deleted a broken header file that referenced a missing include (0056306)
- Hardened Lake cache verification/restore in CI (ab97228)
- Added a cold-cache import benchmark helper and script (2197581)
