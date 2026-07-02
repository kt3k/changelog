---
date: 2026-07-01
repo: vitejs/vite
size: M
title: "Fix nested dynamic import CSS preloads"
excerpt: "Vite now correctly matches preload markers to nested dynamic imports, preventing CSS from being assigned to the wrong chunk."
commits: 1
authors: [shulaoda]
commit_authors: {"2c53054": shulaoda}
---

### **Fix CSS preload matching for nested dynamic imports** (2c53054)
Vite’s build-time import analysis now pairs each `import()` with the correct `__VITE_PRELOAD__` marker using a stack-based match instead of assuming markers appear in simple source order. This fixes nested `import().then(() => import())` cases where the wrong chunk could receive the CSS preload, leaving the outer import with `void 0`.

### Other misc changes
- Added regression tests for marker matching edge cases and nested dynamic imports.
- Expanded the dynamic-import playground to cover nested preload behavior.
