---
date: 2026-11-12
repo: leanprover/lean4
size: L
title: "Lean4 tightens HTTP, recursion, and kernel performance"
excerpt: "HTTP lingering-close fixes land alongside major WF recursion optimizations, a faster Nat hash, and a new Sym occurs check."
commits: 15
authors: [TwoFX, nomeata, algebraic-dev, JasonGross, leodemoura, sgraf812]
commit_authors: {"ce34bb2": algebraic-dev, "3564da2": JasonGross, "4aea23b": nomeata, "9d78df0": nomeata, "ab25719": TwoFX, "6b75f88": nomeata, "84c20cd": leodemoura}
---

### **HTTP server now lingers after head-only rejections** (ce34bb2)
`Std.Http` now treats head-only rejections like 413 and malformed `Content-Length` as cases where the client may still be uploading, so it drains input before closing instead of risking a reset. That preserves the response for clients that are still sending the body.

### **Well-founded recursion gets faster and cleaner** (4aea23b, 9d78df0, 6b75f88)
The mutual well-founded recursion pipeline was reworked to avoid quadratic elaboration costs: termination goals are now cleaned up with the right `WellFoundedRelation.rel`, mutual packed arguments use a balanced `PSum` tree, and redundant case splits are omitted when branches return the same type. This should make large mutual blocks substantially cheaper to elaborate and type check.

### **Kernel `Nat` literal hashing now uses all bits** (3564da2)
`Expr` hashing for `Nat` literals no longer collapses large values modulo `2^64`; the runtime now exposes a full-bit hash for arbitrary-precision naturals. This fixes a quadratic cache-key collision pattern in the kernel on terms with many large literals.

### **`Sym` unification now performs an occurs check** (84c20cd)
`Sym`-based unification got a dedicated occurs check that follows assignments and delayed assignments, preventing self-referential metavariable assignments that could previously overflow the stack. This closes a soundness/robustness hole in tactics like `apply` when terms contain metavariables.

### **Lean setup/debug modules are decoupled** (ab25719)
`Lean.Idbg` was split out as a separate runtime-support module, and `Lean.Meta.WHNF` no longer depends on the old external declaration path for `getStructuralRecArgPos?`. This reduces link-time dependencies for the affected core modules.

### Other misc changes
- Windows TCP close now cancels all pending writes across threads, with async tests updated.
- `vcgen` gained config for simp step limits (`simpMaxSteps`, `simpMaxDischargeDepth`).
- Stage0 was updated twice.
- Test suite cleanup for deprecated API and old structure syntax.
