---
date: 2026-07-01
repo: microsoft/typescript-go
size: M
title: "API expansion and several compiler fixes"
excerpt: "Added a typed compiler options API, improved declaration emit and ID error placement, and fixed symlinked project reference resolution."
commits: 17
authors: [weswigham, andrewbranch, jakebailey, johnfav03]
commit_authors: {"d472c39": andrewbranch, "2e33ec6": andrewbranch, "eea561a": jakebailey, "74139cb": johnfav03, "ac0c655": weswigham}
---

**Typed `CompilerOptions` now exposed in the native preview API** (d472c39)
The preview API now exports a real `CompilerOptions` type and threads it through project objects, replacing loose `Record<string, unknown>` usage. This makes the API safer and more self-describing for consumers integrating with compiler configuration.

**Declaration emit now prefers `typeof` for function-valued aliases** (ac0c655)
The emitter was taught to treat variable-assigned function expressions and arrows as eligible for `typeof` printback, so declaration emit can preserve more precise references instead of expanding them structurally. This improves the fidelity of emitted `.d.ts` output for common component-style patterns and alias chains.

**Project-reference redirection works through symlinked subpaths** (74139cb)
The resolver now recognizes symlinked package roots earlier when probing `node_modules` paths, which fixes a redirect bug for directory-index subpaths. That prevents spurious module resolution failures in symlink-heavy workspace layouts.

**`fswatch` coalescing and callback state handling were tightened** (eea561a)
The filesystem watcher received a substantial correctness pass around event coalescing, event-ID tracking, and shared-stream behavior. This reduces missed or stale events, especially when many sibling watches are merged under recursive parents.

**`ts.getJSDocTags` and related AST utilities were ported to native preview** (2e33ec6)
JSDoc tag parsing and helper utilities were added to the preview AST layer, including new AST types/helpers and generator updates. This broadens the surface area available to API consumers and keeps native preview aligned with the JS/TS compiler utilities.

### Other misc changes
- Moved isolated-declaration ID errors to more precise locations across accessors, parameters, classes, and expando props (3 commits).
- Stabilized symbol table ordering in the API and fixed a remote node list inherited-method bug.
- Cleaned up JSDoc whitespace handling and updated many quick info baselines.
- Fixed compatibility with older `@types/node` and exact optional property typing.
- Miscellaneous test/baseline churn, manual-test moves, and LSP rename cleanup.
