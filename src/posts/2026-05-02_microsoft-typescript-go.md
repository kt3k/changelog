---
date: 2026-05-02
repo: microsoft/typescript-go
size: M
title: "Better typing for `this.xxx` assignment declarations"
excerpt: "TypeScript-Go now handles self-referential `this` property assignments more precisely, improving inferred property types and avoiding bad widening."
commits: 1
authors: [ahejlsberg]
commit_authors: {"2f6504c": ahejlsberg}
---

### **Improve `this.xxx` assignment declaration typing** (2f6504c)
Type inference for assignment declarations now treats `this`-property assignments more like the JS implementation: self-referential writes are excluded from the declared type, and empty-array cases are widened to `any[]` with an implicit-any diagnostic when needed. This should fix class property inference in common patterns like `this.foo = [this.foo[0] * 2]` and avoid producing `never`/empty unions when no usable initializer type is present.

### Other misc changes
- Added regression coverage for `this` property assignment typing.
- Updated baseline outputs for errors, symbols, and types.
