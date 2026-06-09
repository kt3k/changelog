---
date: 2026-05-06
repo: leanprover/lean4
size: L
title: "Lean 4 tightens docstrings, attrs, and runtime safety"
excerpt: "Blockquotes now render in Verso docstrings, attribute loading gets stricter, LLVM 22 lands, and the runtime hardens OOM handling."
commits: 14
authors: [sgraf812, Kha, hargoniX, david-christiansen, nomeata, kim-em, eric-wieser, wkrozowski]
commit_authors: {"5d56421": david-christiansen, "036bd4f": kim-em, "56fe75e": eric-wieser, "8d2b5d0": hargoniX, "e6dfdfd": Kha, "0e2088f": wkrozowski}
---

### **Verso docstrings now support blockquotes and render more robustly** (5d56421)
Lean’s docstring pipeline now handles blockquotes end-to-end, and the Markdown renderer was reworked to combine blocks and inlines more reliably. This should fix previously missing output and reduce formatting glitches around quoted, indented docstring content.

### **Attribute elaboration now rejects IR-only modules** (e6dfdfd)
The elaborator now errors if `@[attr]` comes from a module that is reachable only through IR and not visibly imported. That closes a server-vs-command-line inconsistency and avoids `lake shake --fix` flip-flopping on repeated runs.

### **Runtime allocator now panics safely on OOM instead of corrupting state** (56fe75e)
When segment allocation fails, the runtime now treats that as fatal instead of propagating `std::bad_alloc` after leaving the small allocator inconsistent. This prevents later memory corruption in code that tries to recover from allocation failure.

### **Lean upgrades LLVM to 22** (8d2b5d0)
The LLVM toolchain was bumped from 19.1.2 to 22.1.4 across CI and benchmark scripts. This brings the repo onto the newer backend and is expected to yield modest performance gains.

### **Diagnostics and simp reporting now avoid exporting-mode crashes** (036bd4f)
Diagnostic reporting is wrapped in `withoutExporting`, so private helper names referenced in unfold summaries no longer trigger “Unknown constant” errors in module mode. This fixes a real crash path when `diagnostics` is enabled under a `public section`.

### **Core linter for unreachable tactics is now upstreamed** (0e2088f)
The `unreachableTactic` linter has been moved into core and wired into `Lean.Linter.Extra`. That gives Lean a built-in warning for dead tactics after constructs like `tac1 <;> tac2`.

### Other misc changes
- `mvcgen'` prototype tweaks and test fixes across several commits
- Cancellation test infrastructure simplified
- `CLAUDE.md` test note updated
- `reldebug` preset renamed to `relwithassert`
- LLVM upgrade docs added
