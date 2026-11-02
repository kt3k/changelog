---
date: 2026-11-01
repo: biomejs/biome
size: L
title: "Biome lands a wave of new lint rules"
excerpt: "A big batch of Vue and TanStack Query lint rules arrived, plus a JS plugin performance win and a few fixes/refactors."
commits: 23
authors: [dyc3, Suto-Michimasa, Jayllyz]
commit_authors: {"7742209": dyc3, "e898da4": dyc3, "91ac4cb": dyc3, "78c1dd5": dyc3, "e9d9616": dyc3, "c0a4174": dyc3, "a55d360": dyc3}
---

### **TanStack Query void query functions are now flagged** (c0a4174)
Biome adds `noTanstackQueryVoidQueryFn`, which reports query functions that don’t return data and therefore fail at runtime with TanStack Query. The rule is wired into config, diagnostics, and ESLint migration support for the `tanstackQuery` and `types` domains.

### **Vue ref reactivity-loss checks got added** (78c1dd5)
`noVueRefObjectReactivityLoss` warns when a ref’s value is read only once in the same function that created it, because the copied value won’t stay reactive. This is a substantial correctness addition for Vue users, with full rule metadata and test coverage.

### **Biome now enforces non-empty Vue computed returns** (91ac4cb)
`useVueComputedPropertyReturn` reports computed getters that never return a value on every path. The change also updates the underlying return-analysis helpers, so the rule can precisely detect missing returns in Vue computed properties.

### **Stable TanStack Query clients are enforced in React** (e9d9616)
Biome adds `useTanstackQueryStableQueryClient`, which catches `QueryClient` instances created inside React components or custom hooks. That matters because those clients are recreated on every render, resetting the cache and undermining TanStack Query behavior.

### **Vue navigation guards can’t use `this` in `beforeRouteEnter`** (7742209)
`noVueThisInBeforeRouteEnter` flags `this` usage in Vue Router’s `beforeRouteEnter` guard, where the component instance does not exist yet. This prevents a common runtime footgun in router-driven components.

### **JS plugin `.kind` reads are now static and faster** (a55d360)
`node.kind` and `token.kind` are moved from native accessors to precomputed data properties, avoiding a native call on each read. The codegen and runtime changes should noticeably speed up JavaScript plugins that inspect kinds frequently.

### **Vue restricted `v-on` listeners are now supported** (e898da4)
Biome implements `noVueRestrictedVOn`, letting users block specific event listeners by event, modifiers, and element. The ESLint migration snapshots also show this rule moving from “not implemented” into direct support.

### Other misc changes
- Added several more nursery rules: `useVueDefaultProp`, `noVueUndeclaredSlots`, `noVueThisInBeforeRouteEnter`, `noVueMultipleObjectsInClass`, `noVueDeprecatedDestroyedLifecycle`, `noVueDeprecatedHtmlElementIs`, `noVueDeprecatedInlineTemplate`, `noVueDeprecatedConfigKeyCodes`, `useAccessorPairs`, `noDynamicDelete`.
- Added `noUselessTypeAssertion` and updated related type-analysis plumbing.
- Refactored `noVueUndeclaredDirectives` to use the Vue semantic model.
- Fixed `usePlaywrightValidDescribeCallback` to accept anonymous `describe` callbacks.
- Corrected changeset/changelog wording and attribution.
- Misc config/schema/generated-file updates and test snapshot refreshes.
