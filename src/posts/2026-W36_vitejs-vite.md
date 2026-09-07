---
date: 2026-09-06
repo: vitejs/vite
period: weekly
slug: 2026-W36
period_label: "Aug 31 – Sep 6, 2026"
size: L
title: "Vite adds top-level tsconfig support and sharper config warnings"
excerpt: "This week brought project-wide tsconfig selection, clearer config/plugin warnings, and fixes for lazy dev payloads, preload links, and asset URLs."
commits: 18
---

### **Configuration and environment behavior got stricter and clearer**
Vite now warns in more cases where native config or environment plugins can behave unexpectedly: named JSON imports in native-loaded configs are flagged unless they use the default export shape, and plugins returned from `applyToEnvironment`/`perEnvironmentPlugin` now warn when they include Vite-only hooks that won’t run there. The week also introduced a top-level `tsconfig` option for project-wide overrides, while keeping automatic discovery as the default recommendation.

### **Dev server and asset handling fixed several correctness bugs**
Lazy bundled dev payloads are now only marked delivered after the browser evaluates them, closing a race that could drop factories during lazy compilation. On the HTML and asset side, Vite stopped inlining `preload`/`modulepreload`/`prefetch` links, preserving them as fetchable URLs, and `resolveFileUrl` now keeps hash placeholders intact so external plugins can still resolve emitted chunk and worker URLs correctly.

### **Package resolution and release workflows were updated**
Package root detection was fixed for nested manifests across pnpm stores, hoisted layouts, scoped packages, and Yarn PnP zip paths, improving metadata attribution and version lookup. Release automation also gained support for publishing from supported `v*` branches, with validation and branch-specific checkout/concurrency handling for backport-style release flows.

### **Build/tooling refresh and dependency updates**
The repository refreshed rolldown-related dependencies, including `rolldown` and `rolldown-plugin-dts`, with a temporary `shims.d.ts` workaround to keep TypeScript builds moving. The week also included a pnpm v12 workspace update, release-branch documentation tweaks, and minor template/docs/playground dependency bumps.

### Other misc changes
- Fixed `srcset` parsing for density descriptors without a leading zero.
- Removed an unused `esbuildPlugin` refactor leftover.
- Updated CONTRIBUTING and API docs, plus release/changelog metadata for `v8.3.0-beta.0`.
