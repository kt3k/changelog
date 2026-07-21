---
date: 2026-07-20
repo: microsoft/typescript-go
size: M
title: "API adds type parameter accessors; LS selection improves"
excerpt: "New native-preview APIs expose type parameter constraints/defaults, while language service smart-selection and a diagnostic fix land."
commits: 3
authors: [navya9singh, weswigham]
commit_authors: {"d1dc426": navya9singh, "7a831bd": weswigham}
---

### **TypeParameter now exposes constraint/default getters** (7f717c5)
The native-preview API now lets clients query a type parameter’s constraint and default directly, with async and sync surfaces updated in lockstep. The checker logic distinguishes type parameters from substitution types so these getters can return `undefined` when appropriate instead of forcing a type, which makes the API safer and more accurate.

### **Smart selection handles mapped types better** (d1dc426)
Selection-range generation was expanded to build a more structured tree for mapped types, grouping modifiers and bracketed type-parameter sections so editor selection behaves more naturally inside these constructs. That should improve expand/shrink selection in mapped type declarations and reduce awkward jumps.

### **Suppress diagnostics for context-sensitive parameter lookups** (7a831bd)
The checker no longer emits extra diagnostics when it is only fetching parameter types for context-sensitive signatures, avoiding noise from temporary or soon-to-be-overridden inference states. This also fixes the related baseline instability seen in reverse-mapped type inference cases.

### Other misc changes
- API naming/wiring tweak in native-preview request payloads
- Test baseline updates for smart selection and checker diagnostics
