---
date: 2026-07-22
repo: microsoft/typescript-go
size: L
title: "Type checker fixes and import formatting polish"
excerpt: "Organize imports now respects editor formatting, the checker keeps destructuring narrowing through re-entrant analysis, and link storage got a paging overhaul."
commits: 4
authors: [TorinAsakura, ahejlsberg, RyanCavanaugh, Andarist]
commit_authors: {"4e25827": TorinAsakura, "f60e5fc": ahejlsberg, "072f7f7": RyanCavanaugh, "36d9c9b": Andarist}
---

### **Organize imports now honors editor formatting** (4e25827)
The language service now preserves editor formatting preferences when running organize-imports/remove-unused, including tab size and spaces settings. That makes the action match the user’s configured indentation instead of reverting to defaults.

### **Paged link storage lands for checker internals** (f60e5fc)
The checker’s link storage was refactored to use a new paged representation for dense keys, with a fallback from array-backed pages to a map for higher indices. This is a substantial internal memory/layout change aimed at scaling link storage more efficiently.

### **Keep dependent destructuring narrowing during re-entrant checks** (36d9c9b)
The checker now avoids a circularity case when narrowing destructured bindings inside the initializer’s own flow, while still allowing re-entrant narrowing in nested callbacks and binding defaults. This fixes real control-flow analysis regressions around dependent destructuring and assertion-heavy code.

### **Document skipLibCheck declaration-conflict fallout** (072f7f7)
The changelog now calls out that declaration conflicts in TypeScript 7 can surface more consistently across contributing sites, including non-.d.ts files that were previously hidden by `--skipLibCheck`. This is a user-facing clarification of an observable behavior change.

### Other misc changes
- Editor formatting preference parsing updated to map `tabSize`/`insertSpaces` onto format settings
- Added/updated fourslash and user-preferences tests
- Internal checker/link-store refactors supporting the paging change
- CHANGES.md update
