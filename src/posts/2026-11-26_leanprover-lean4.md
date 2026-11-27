---
date: 2026-11-26
repo: leanprover/lean4
size: L
title: "HTTP server split, epr gets faster and safer"
excerpt: "Major async/http performance work, EPR encoding refactors, and fixes for metavariable pruning plus truncated `.olean` handling."
commits: 10
authors: [hargoniX, Kha, algebraic-dev, leodemoura, datokrat]
commit_authors: {"3740f8b": algebraic-dev, "b9ed3ae": hargoniX, "28858e4": leodemoura, "b5c0913": Kha, "f95e596": datokrat}
---

### **HTTP server driver split cuts async/request overhead** (3740f8b)
`Std.Http.Server.Connection` was refactored into a pure `Std.Http.Server.Driver`, with lower per-request overhead across `Std.Http` and `Std.Async`. The new loop machinery keeps `for`-style iteration in constant stack space for synchronous steps and preserves bounded memory even when later steps suspend, which matters for long-running servers and async loops.

### **EPR quantifier guards are encoded more directly** (b9ed3ae)
The `epr` quantifier translation now uses explicit bitvector guards instead of the previous per-sort membership-disjunction encoding. That removes linear overhead in sort size and simplifies the translation pipeline by deriving membership from the guard when needed.

### **Failed backward-rule application now restores metavariables** (28858e4)
`Sym.BackwardRule.apply` now rolls back metavariable assignments whenever it reports `.failed`, instead of leaving partially unified goals behind. This fixes goal corruption in callers that try multiple rules on the same goal, such as VC generation.

### **Truncated `.olean` files now fail fast with an error** (b5c0913)
Module loading now checks compacted-region framing against the file size before reading closure offsets and relocation tables. A truncated or malformed `.olean` now produces an error instead of risking reads past end-of-file.

### **Metavariable pruning preserves instance-typed status** (f95e596)
When a metavariable is replaced by a smaller-context auxiliary metavariable, the replacement now inherits the original instance-typed mark. This closes a bug where pruning could bypass the instance-typed check and lead to unsound instance resolution.

### Other misc changes
- `epr` NNF and preprocessing fixes for corner cases around `False`, `True`, and vacuous quantifiers.
- CI workflow updated to find PRs for `pr-release` runs via GitHub API.
- Stage0 refresh.
- Minor test additions and internal refactors around BVDecide/EPR and `Sym`.
