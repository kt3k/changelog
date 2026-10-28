---
date: 2026-10-27
repo: vitejs/vite
size: M
title: "Vite tightens build, fs, and create-vite"
excerpt: "Fixes for WASM fs access, optimizer cache detection, and dynamic-import CSS handling; create-vite also gets a TS 7 update and patch releases."
commits: 10
authors: [sapphi-red, onmax, btea]
commit_authors: {"64e2467": sapphi-red, "cc9bc21": sapphi-red, "df36558": sapphi-red, "0cf91e8": sapphi-red, "1b905e5": onmax}
---

### **WASM imports are now blocked outside `server.fs`** (64e2467)
Vite now treats `.wasm` imports like other restricted asset types in the dev server transform path, returning 403s when they fall outside allowed filesystem access. The playground coverage was extended to catch this case.

### **Optimizer cache detection now matches the real cache dir** (cc9bc21)
`createIsOptimizedDepFile` and `createIsOptimizedDepUrl` now key off the actual cache directory with proper trailing-slash handling, avoiding false positives from similarly named directories like `deps-extra` or `deps_temp_*`. This makes optimized dependency detection more precise, including when the cache lives under the project root.

### **Build keeps CSS dependencies for dynamic imports with queries/fragments** (df36558)
The build import-analysis logic now preserves CSS dependencies even when a lazy chunk URL gets a query string or fragment appended during chunk rendering. That prevents CSS from being dropped or mishandled in those import patterns, including library builds that can end up with removed CSS-only chunks.

### **CSS scope-to lookup is faster across rendered chunks** (1b905e5)
Vite now caches rendered-module lookup across chunks instead of scanning the chunk set repeatedly for `cssScopeTo` checks. This reduces repeated work during CSS post-processing and should improve build-time performance on larger outputs.

### **create-vite adopts TypeScript 7 where possible** (0cf91e8)
New TS templates were bumped to `~7.0.2`, and the CLI now prefers TS 7 for template scaffolding while keeping TS 6 in place for environments that still depend on `typescript-eslint` compatibility. That splits the difference between newer template defaults and current tooling constraints.

### Other misc changes
- create-vite patch releases to 9.3.2 and 9.3.3
- Template packaging fix for create-vite
- Dependency bumps and CI/workflow action updates
- Docs tweak in CONTRIBUTING.md
