---
date: 2026-08-15
repo: leanprover/lean4
size: L
title: "Lean tightens instance search typing"
excerpt: "A breaking fix makes instance search respect expected types more strictly, plus a small docs typo cleanup."
commits: 2
authors: [ia0, datokrat]
commit_authors: {"57eb1ae": ia0, "f86fc8a": datokrat}
---

### **Instance search now checks metavariable assignments against the expected type** (f86fc8a)
Lean now restricts assignments to metavariables created for instance-implicit arguments so their final values match the expected type at instance transparency. This fixes #9077 and adds a backward-compatibility option, but it is a breaking change that can affect existing declarations.

### **Doc typo fixed in `IterStep.skip`** (57eb1ae)
A documentation typo in `IterStep.skip` was corrected in `Init.Data.Iterators.Basic`. This is purely cosmetic.

### Other misc changes
- Added new backward-compatibility and transparency-control options for instance search
- Extended regression tests and expected outputs around definitional equality / instance search behavior
