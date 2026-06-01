---
date: 2026-05-04
repo: microsoft/typescript-go
size: M
title: "Fix expando object circularity in index inference"
excerpt: "TypeScript-Go now avoids treating expando object literals as inferable indexable shapes, fixing a circularity bug in property assignment."
commits: 1
---

### **Fix circularity when assigning to expando object properties** (6a6cb09)
The checker now excludes expando object literals from `isObjectTypeWithInferableIndex`, preventing them from being treated like plain object literals during index inference. That breaks the circular relationship seen when assigning properties like `obj.foo` and `obj.buzz = Object.values(obj)`, and the new regression test locks in the corrected behavior.

### Other misc changes
- Added regression baseline coverage for `expandoNoInferredIndex` symbols and types.
