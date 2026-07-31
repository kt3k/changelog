---
date: 2026-07-30
repo: microsoft/typescript-go
size: L
title: "Checker speedups and LS memory fixes"
excerpt: "TypeScript-Go got faster narrowing, safer symbol resolution, and a fix for config diagnostics after watched file edits."
commits: 5
authors: [johnfav03, ahejlsberg, connorshea]
commit_authors: {"322fa1e": ahejlsberg, "98c4784": johnfav03, "0f29c77": johnfav03, "4443b20": johnfav03, "37357ae": connorshea}
---

### **Optimize equality and switch narrowing** (322fa1e)
The checker now uses a more targeted union/type removal path and adds new enum flags to support faster `narrowTypeByEquality` and `narrowTypeBySwitchOnDiscriminant`. This should reduce work in common control-flow narrowing cases and includes new coverage for non-uniform union narrowing.

### **Fix O(K²) memory blowup in go-to-implementation** (0f29c77)
The language service now deduplicates references and implementation groups as it expands the worklist, preventing quadratic retention when many implementations are discovered repeatedly. This fixes a real OOM class in deeply-typed projects without changing the final response.

### **Refresh config diagnostics after watched file changes** (98c4784)
`tsconfig.json`/`jsconfig.json` diagnostics are now republished when a watched config file changes on disk, even if the client does not issue another pull request. That closes a gap where config errors could go stale until the editor re-asked for diagnostics.

### **Prevent stack overflow in self-referential `for...of`** (4443b20)
`getExplicitTypeOfSymbol()` now guards against recursive re-entry on the same symbol, avoiding infinite recursion on patterns like `for (const a of a)`. This turns a crash into the expected diagnostics for the self-referential loop.

### Other misc changes
- Typo fix in declaration transformer variable naming (37357ae)
