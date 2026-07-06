---
date: 2026-07-05
repo: biomejs/biome
size: M
title: "Astro shorthand parsing and disposable types"
excerpt: "Astro embedded shorthand attrs now lint correctly, disposable global types were migrated, and temp-dir redaction got a boundary fix."
commits: 3
authors: [JamBalaya56562, minseong0324, Netail]
commit_authors: {"3f9e3c9": JamBalaya56562, "ef9076a": minseong0324, "93d8e53": Netail}
---

### **Astro embedded shorthand attributes are parsed correctly** (93d8e53)
Biome now recognizes Astro shorthand attributes inside embedded nodes, which fixes linting coverage for cases like `{accesskey}` and `{autofocus}`. This unblocks correct a11y analysis and other JS/HTML rules on Astro templates where embedded shorthand syntax was previously missed.

### **Disposable global types were migrated to the new codegen flow** (ef9076a)
The JS type-info/global-types pipeline was updated to generate and resolve disposable-related globals through the newer codegen path. This matters because it keeps Biome aligned with the evolving `Disposable`/`AsyncDisposable` type surface and preserves correctness for rules like `useDisposables`.

### **Temp-dir snapshot redaction now respects path boundaries** (3f9e3c9)
Snapshot redaction was tightened so a temp directory is only masked when it appears at a real path boundary, not when it is merely a substring inside globs or other text. That avoids corrupting legitimate output like `**/build` while still redacting actual temp paths.

### Other misc changes
- Snapshot/test updates for the Astro and disposable changes
- Changeset and test fixture additions
- Internal refactors in codegen/type-info support files
