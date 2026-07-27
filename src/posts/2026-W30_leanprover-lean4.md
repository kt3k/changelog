---
date: 2026-07-26
repo: leanprover/lean4
period: weekly
slug: 2026-W30
period_label: "Jul 20–26, 2026"
size: L
title: "VCGen got much stronger, with key runtime and HTTP fixes"
excerpt: "Lean gained safer VC generation, a kernel soundness fix, better HTTP/IO behavior, faster metavariable instantiation, and Linux linking improvements."
commits: 71
---

### **VCGen became more capable and more reliable**
A big share of the week focused on `vcgen`: it now handles `have`/`let`/`suffices` goal types better, accepts arbitrary term arguments, respects explicit specs over ambient ones, and ranks named, `*`, and unfold specs more predictably. It also learned to split `∀`/`→` entailments on the RHS, support `iInf`, unfold root-`match` specs correctly, and avoid several recursive/deep-embedding regressions.

### **Kernel and runtime fixes closed soundness and stability issues**
The kernel now rejects opaque values containing free variables, fixing a serious soundness hole in `add_opaque`. Runtime work also improved module initialization for private `Lean` imports, made init idempotent, and fixed error reporting for thread creation failures. An earlier IO error-decoding change was revised to avoid Windows breakage.

### **Performance improved in core elaboration**
`instantiateMVars` got a major caching fix that prevents repeated lifted substitutions from causing exponential blowups. This should remove a class of proof-term performance cliffs that could previously lead to excessive memory use or OOMs.

### **HTTP and async plumbing got more robust**
HTTP bodies are now replayable for redirects, body streams can surface terminal errors, and redirects themselves are handled by a first-class `RedirectPlan` API. The client also fixed bodyless response handling for HEAD/204/304-style cases, while async selection was reworked to combine multiple selectables safely and cleanly.

### **Core APIs and library cleanup continued**
Float and Float32 gained `nan`/`inf` constants and more conversion models, natural-number division/mod lemmas were renamed with deprecated aliases, `forall_congr` is being replaced by `pi_congr`, and `checkUnivs` got better handling for mutual declarations and inductive constructors. `grind` also picked up homomorphism API renames and richer metadata.

### **Platform and tooling improvements**
Linux shared libraries now get SONAMEs, Lake was updated to load `libLake_shared.so` more reliably on Linux, and ThreadSanitizer support landed in the build/runtime setup. Benchmarks and CI were refreshed as part of the ongoing infrastructure work.

### Other misc changes
Parser forbidden-token handling was tightened, `fun_induction` naming was fixed for let-bound hypotheses, `Nat.nextPowerOfTwo` gained more lemmas, and there were assorted docs, tests, deprecations, and build/cache tweaks.
