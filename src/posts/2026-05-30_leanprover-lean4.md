---
date: 2026-05-30
repo: leanprover/lean4
size: L
title: "Closures now survive compacted saves"
excerpt: "Lean 4 adds experimental closure serialization in `.olean` files, plus a small spec-db migration fix and docs cleanup."
commits: 3
authors: [Kha, frangio, sgraf812]
commit_authors: {"bfad38b": Kha, "df865df": frangio, "729a662": sgraf812}
---

### **Experimental closure serialization for compacted saves** (bfad38b)
`CompactedRegion.save` can now opt into serializing closures with `allowClosures := true`, writing a new `v3` `.olean` layout. That lets saved functions be loaded back and called, even from a separate process, but only when the saver and loader use identical executables and dependent libraries.

### **Spec DB migration no longer drops erased `@[spec]` entries** (729a662)
The `mvcgen'` spec database migration now preserves erased specs instead of discarding them. Erased entries are carried into the new database and filtered at lookup time, restoring the legacy behavior and avoiding mismatches during migration.

### Other misc changes
- Fixed a syntax error in `mvcgen` docs (df865df)
