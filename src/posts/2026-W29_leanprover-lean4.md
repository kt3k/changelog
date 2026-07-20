---
date: 2026-07-19
repo: leanprover/lean4
period: weekly
slug: 2026-W29
period_label: "Jul 13–19, 2026"
size: L
title: "Lean4 lands new grind homomorphism support and VCgen upgrades"
excerpt: "This week adds homomorphism-based grind reasoning, broader vcgen framing/spec handling, and several correctness and performance fixes across core."
commits: 70
---

### **`grind` gains a new homomorphism framework**
Lean’s `grind` tactic got the week’s biggest expansion: new `@[grind homo]` and `@[grind homo_pred]` attributes, validation/reset plumbing, and a core homomorphism library covering `BitVec`, `Fin`, `Nat`, `Int`, `USize`/`ISize`, and `List`. Together these changes move `grind` toward direct domain-to-domain reasoning instead of the older `ToInt`-style bridge, while also enabling eager fact injection for range/relation lemmas.

### **`grind` became both more capable and safer**
The tactic picked up `BitVec` literal evaluation, better theorem lookup, and improved handling of offsets and match conditions, while also avoiding expensive `isDefEqD` checks on fake match-like hypotheses. Several correctness bugs were fixed too: bootstrapping around `BitVec` normalization, ring coefficient rewrites, nested proof canonicalization, and cutsat proof construction that could trip the kernel. A new `liaSteps` limit now bounds LIA search to prevent blowups on hard goals.

### **`vcgen`/`mvcgen` gained more flexible spec and frame handling**
Verification-condition generation got a meaningful capability boost: `@[frameproc]` adds automatic frame inference, conjunctive specs can now be applied directly without unnecessary framing, and equality specs no longer over-specialize across cache hits. A fix for `match h : e` splitting also closes an important ill-typed VC generation path.

### **Trace workflows are now much easier to inspect**
Lean now supports `store_traces_as ... in cmd` alongside `postprocess_traces`, letting commands save trace trees in memory and transform them afterward. That makes it much easier to debug large elaborations without rerunning them just to inspect or reshape trace output.

### **Core runtime and elaboration saw several performance/correctness fixes**
Notable infrastructure changes include restoring WHNF cache use under sub-default transparency, making `set_option ... in` incremental, moving initializer-execution APIs from `IO` to `BaseIO`, and adding a faster `String.Internal.ugetUTF8Byte`. There were also fixes for `mkAuxDefinition` export scoping, module-save flush failures, and `inferInstanceAs` leaking ill-typed wrapper aux defs.

### **Other misc changes**
- New core linter coverage for internal-module namespace pollution and `coreInternal` checks
- Reducibility diagnostics made clearer for class definitions and instances
- `Sym.simp` sharing/unifier fixes and better side-condition discharge via `grind`
- Parser/pretty-printing cleanup, namespace-pollution reductions, and assorted stage0/tooling updates
