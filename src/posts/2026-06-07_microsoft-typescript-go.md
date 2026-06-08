---
date: 2026-06-07
repo: microsoft/typescript-go
size: M
title: "TS gets clearer optional-property errors"
excerpt: "Improved diagnostics for exact optional properties and computed-name inheritance errors, with updated baseline coverage."
commits: 2
authors: [a-tarasyuk, ahejlsberg]
commit_authors: {"254e9a5": a-tarasyuk, "cbd610a": ahejlsberg}
---

### **Clearer exact-optional argument diagnostics** (254e9a5)
When `exactOptionalPropertyTypes` is on, passing `{ y: undefined }` now produces a more specific TS2379 message that points users toward adding `undefined` to the target property type. This makes a common assignability error much easier to understand and fix.

### **Use the late-bound symbol when reporting computed-name errors** (cbd610a)
Error reporting now resolves the declaration symbol for member-specific checks instead of relying on the member's direct symbol. That fixes misreported diagnostics for inherited computed properties, including cases like `Symbol.toPrimitive`, so the checker points at the right property incompatibility.

### Other misc changes
- Updated compiler/submodule baselines and test cases for the two diagnostic fixes.
