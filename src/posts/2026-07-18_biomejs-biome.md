---
date: 2026-07-18
repo: biomejs/biome
size: L
title: "Overload-aware inference and resolver fixes land"
excerpt: "Biome improved type inference for overloads and aliases, fixed unresolved-import false positives, and skipped HTML attribute sorting on processing instructions."
commits: 4
authors: [ematipico]
commit_authors: {"bd1038b": ematipico, "8ebafe1": ematipico, "7df46f5": ematipico, "0bf7486": ematipico}
---

### **Overload selection now uses full argument lists** (bd1038b)
Biome’s `noMisusedPromises` analysis now chooses overloads using the entire call or constructor argument list, rather than a single argument in isolation. That fixes cases involving overloaded calls, constructors, rest parameters, unions, and generic constraints, so async callbacks are flagged against the actually selected signature.

### **Resolver stops flagging valid re-exports as unresolved** (8ebafe1)
`noUnresolvedImports` now treats unknown re-export targets as unresolved only when they’re definitely missing, instead of reporting false positives when a package or barrel can’t be fully resolved. This avoids incorrect diagnostics for patterns like `import type { NextRequest } from "next/server"`.

### **Type inference handles imported and aliased generic types better** (7df46f5)
Biome improved inference around imported and aliased types, including specialised tuple element types flowing through generic aliases. That makes rules like `useIncludes` work on more real-world generic code and reduces missed diagnostics.

### **HTML processing instructions are ignored by attribute sorting** (0bf7486)
The `useSortedAttributes` assist no longer runs on HTML processing instructions such as `<?xml ... ?>`. This prevents an assist from targeting syntax it shouldn’t modify.

### Other misc changes
- Internal type-substitution refactor in `biome_js_type_info`
- Added/updated rule coverage and snapshots for the above fixes
- Minor module-graph, resolver, and service plumbing updates
