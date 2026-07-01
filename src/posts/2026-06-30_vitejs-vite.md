---
date: 2026-06-30
repo: vitejs/vite
size: M
title: "Vite ships bugfixes and CSS/path fixes"
excerpt: "Patch releases landed alongside HMR, CSS, config temp-dir, and bundled-dev fixes, plus a few docs and dependency updates."
commits: 30
authors: [sapphi-red, shulaoda, btea, SujalXplores, dogledogle, wan9chi, EduardF1]
commit_authors: {"ba31193": sapphi-red, "0d3bd7c": sapphi-red, "cf97711": sapphi-red, "cccef55": sapphi-red, "330e982": sapphi-red, "4ae9e14": sapphi-red, "8f925e2": btea, "2dafd3b": sapphi-red, "833fc30": SujalXplores, "9fa7ab4": shulaoda, "709eb8e": shulaoda, "043a810": wan9chi, "ef0b891": shulaoda, "33895ba": shulaoda, "085a0ab": sapphi-red}
---

### **Patch releases: Vite 8.1.2 and create-vite 9.1.1** (ba31193, 330e982, 4ae9e14)
Released the latest patch versions for both packages, rolling changelogs and version bumps into the repo. This is mostly release bookkeeping, but it marks the day’s user-facing packaged output.

### **CSS tsconfig-paths support expands, with a documented Less caveat** (ef0b891)
Vite now resolves `paths` aliases in CSS and Sass imports using the importing file’s actual source, rather than just the directory, which fixes alias resolution in stylesheets. The docs also clarify that Less still can’t participate in `resolve.tsconfigPaths`, so users need relative paths or `resolve.alias` there.

### **Bundled dev HMR invalidation is fixed** (709eb8e)
When bundled-dev mode invalidates a module, it now calls into the bundled-dev invalidator directly instead of recursing through the normal environment path. The accompanying playground coverage confirms `import.meta.hot.invalidate()` behaves without blowing the stack.

### **Rolldown lazy stub modules now skip plugin transforms** (8f925e2)
Vite’s bundled-dev integration now detects Rolldown’s `?rolldown-lazy=1` stub modules and bypasses plugin transform hooks for them. That avoids plugin interference with generated lazy-loading stubs and works around a bundled-dev-specific integration bug.

### **LightningCSS import handling and null-byte escaping are corrected** (9fa7ab4, 833fc30, 2dafd3b)
Vite now preserves `$` characters in external `@import` URLs when LightningCSS rewrites them, fixing a subtle URL corruption issue. It also correctly escapes/unescapes all null bytes in IDs and removes an older LightningCSS null-byte workaround that’s no longer needed.

### **Config temp-file handling avoids polluting cache fingerprints** (043a810)
Bundled config files now use a dedicated `.vite-temp` directory under `node_modules` when possible, and Vite ignores that directory instead of only the transient file. This keeps config bundling from accidentally affecting task cache fingerprints.

### **Oxc JSX config mapping is fixed** (33895ba)
The esbuild-to-oxc conversion now inverts `jsxSideEffects` correctly when mapping to `jsx.pure`. That restores the expected semantics for JSX purity in the Oxc pipeline.

### **Optimize-deps scanner and CSS import bugs are fixed** (085a0ab, 0d3bd7c, cf97711, cccef55, 8f925e2)
Scanner shutdown now ignores `ERR_CLOSED_SERVER`, and pnpm `.modules.yaml` resolution was briefly changed and then reverted. There was also a revert of the multi-null-byte ID escaping change before the final fix landed, so those internals churned a bit during the day.

### Other misc changes
- Dependency bumps and lockfile updates across the repo.
- Docs clarifications and link fixes in the guide and API docs.
- Test updates and playground adjustments for watcher, import-attribute, and HMR coverage.
- CI workflow tweaks, including Actions cache updates and Windows Node version changes.
