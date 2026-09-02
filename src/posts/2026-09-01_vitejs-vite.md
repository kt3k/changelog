---
date: 2026-09-01
repo: vitejs/vite
size: M
title: "Config warnings, release branch support"
excerpt: "Vite adds native config compatibility warnings, release workflows for v* branches, and a few targeted bug fixes and cleanup."
commits: 6
authors: [sapphi-red, ulrichstark, NgoQuocViet2001, btea]
commit_authors: {"f40efef": ulrichstark, "33d0e98": sapphi-red, "5a38afe": sapphi-red, "b50e1b4": NgoQuocViet2001, "fdef04f": sapphi-red, "472385e": btea}
---

### **Warn on unsupported JSON named imports in native config** (472385e)
Vite now warns when a native-loaded config uses named imports from JSON modules, since JSON only provides a default export per spec. The new compatibility checks cover both relative JSON files and bare package specifiers, while explicitly allowing `default as` imports.

### **Warn when `applyToEnvironment` returns plugins with Vite-only hooks** (fdef04f)
Plugins returned from `applyToEnvironment` or `perEnvironmentPlugin` now trigger a warning if they define hooks that Vite will ignore there, like `config`, `configEnvironment`, `configureServer`, or `configResolved`. This makes environment-plugin behavior clearer and should prevent confusion when hooks appear to be “not working.”

### **Allow releases and publishing from supported `v*` branches** (33d0e98)
The release workflow can now target a specific release branch, validates that branch name, and uses it consistently for checkout and concurrency. Publishing is also enabled for `v*` branches, which supports backport release flows instead of only `main`.

### **Fix srcset parsing for density descriptors without a leading zero** (b50e1b4)
`processSrcSetSync` now correctly preserves URLs when the density descriptor is written as `.5x` or `.75x`. This avoids misparsing valid `srcset` values that previously could be handled incorrectly.

### Other misc changes
- Removed an unused `esbuildPlugin` refactor dead code (f40efef)
- Updated the repo to pnpm v12 and adjusted workspace settings accordingly (5a38afe)
- Documentation updates for the new release flow and environment-plugin warning behavior (33d0e98, fdef04f)
