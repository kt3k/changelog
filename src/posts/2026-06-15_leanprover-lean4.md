---
date: 2026-06-15
repo: leanprover/lean4
size: L
title: "Lean 4 lands sqrt, cache dedupe, and runtime rollback"
excerpt: "Nat.sqrt is upstreamed, Lake deduplicates artifact transfers, and the task-pool idle-thread change is reverted."
commits: 7
authors: [Kha, tydeu, TwoFX, sgraf812, whxvd]
commit_authors: {"9566c79": tydeu, "ab122a1": TwoFX, "7c09f6a": sgraf812, "e36cb90": Kha}
---

### **Lake now deduplicates cache artifact transfers** (9566c79)
Lake’s cache upload/download flow now groups artifacts by hash, avoiding repeated transfers of the same file or URL. This fixes cases where `curl` would be asked to write to the same destination more than once, and it also adds support for recreating extra downloaded paths after a successful fetch.

### **`Nat.sqrt` is now part of core** (ab122a1)
`Nat.sqrt` has been upstreamed from Batteries into `Init`, along with a small theory file that characterizes the function without exposing its implementation details. This makes integer square root available in core Lean code and removes a dependency on external libraries for a common numeric primitive.

### **Std.Internal.Do got a substantial weakest-precondition cleanup** (7c09f6a)
The internal `Std.Internal.Do` WP/triple library was renamed and reorganized to follow the newer naming conventions, with loop-invariant types curried and monad-spec lemmas rewritten to reuse the `Triple` rules. This is a fairly deep refactor of the internal proof infrastructure and should make the library easier to maintain and extend.

### **Task-pool idle-thread expiration was reverted** (e36cb90)
Lean’s runtime backs out the change that expired idle standard task-pool threads after 5 seconds. The worker-management code is reworked back toward persistent standard workers, which likely restores prior behavior around thread reuse and shutdown semantics.

### Other misc changes
- CI tweaks: elevate fsanitize back to primary check, adjust release-token passing, and fix fork release generation (3 commits)
- Minor doc update for forked release generation
