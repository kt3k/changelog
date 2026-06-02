---
date: 2026-05-19
repo: microsoft/typescript-go
size: L
title: "Typed fixes, better emits, faster lookup"
excerpt: "Key checker and emit fixes landed: recursion guard, enum/NaN emit, destructuring semantics, auto-import path selection, and a symbol lookup speedup."
commits: 12
authors: [jakebailey, ahejlsberg]
commit_authors: {"52d3d0f": jakebailey, "21b8d00": ahejlsberg, "937ea9f": jakebailey}
---

### **Preserve iterator semantics for CommonJS export destructuring** (654d05c)
CommonJS downleveling now keeps native destructuring when it can, instead of eagerly flattening export assignments. That avoids changing array iterator behavior for exported destructuring patterns and falls back to flattening only when aliasing makes native destructuring unsafe.

### **Fix a symbol-to-node recursion that could stack overflow** (8799681)
`createAnonymousTypeNodeEx` now marks instantiation types as visited while trying to reuse an existing `typeof` node, preventing unbounded recursion when reuse fails and the recovery path re-enters type-to-node conversion. This closes a crash-prone edge case in symbol-to-node boundary handling.

### **Speed up accessible-symbol lookup chains** (52d3d0f)
Symbol accessibility lookup now caches alias extraction for large global/export tables and distinguishes resolved exports from raw export tables to avoid cache collisions. The result should reduce repeated table scans in hot paths without changing lookup behavior.

### **Fix declaration emit for `NaN` and `Infinity` enum values** (9166d92)
Declaration emit now preserves `NaN`, `Infinity`, and `-Infinity` instead of serializing them incorrectly as numeric literals. That makes emitted `.d.ts` output match the actual enum values for these special numbers.

### **Keep `readonly` on `as const` object-literal properties in declarations** (ab14d13)
Declaration emit no longer drops `readonly` from const-asserted object literal properties. This fixes a type fidelity bug in generated declarations for APIs that rely on immutable object shapes.

### **Fix auto-imports lowercasing PascalCase default imports** (fd881b4)
Auto-import completion no longer lowercases PascalCase default-import bindings on case-insensitive filesystems. That means suggested imports now preserve the expected identifier casing across more filesystem configurations.

### **Fix declaration emit for elided and empty JSDoc comments** (0d82a2c, 4538dee)
Declaration emit now preserves JSDoc attached to elided imports and keeps empty `/***/` comments instead of dropping them. These fixes improve comment retention in generated declarations and avoid losing documentation accidentally.

### **Fix `project-relative` module specifier preference with `paths`** (10ff693)
When `paths` aliases are configured, `project-relative` now still prefers a relative path for imports within the same project boundary. The change also tightens how the project directory boundary is computed, which should make specifier selection more consistent.

### Other misc changes
- Fixed empty-array widening for expando properties with parent type annotations; still reports implicit-`any[]` on unannotated expando members (21b8d00).
- Fixed a spurious `_N` suffix on sibling object-literal method type parameters during declaration emit, plus a small cleanup in pseudo type-node scope handling (431937b).
- Emitted `publish-order.json` with per-package npm dist-tags in the release workflow (937ea9f).
- Added/updated regression tests and baselines for the above fixes.
