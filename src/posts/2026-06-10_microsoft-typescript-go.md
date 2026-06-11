---
date: 2026-06-10
repo: microsoft/typescript-go
size: L
title: "Unicode fixes and declaration emit cleanup"
excerpt: "Big Unicode correctness work plus improved declaration emit for expando properties and better tsconfig error reporting."
commits: 4
authors: [Andarist, weswigham, jakebailey]
commit_authors: {"7d5b8f5": Andarist, "f157e78": weswigham}
---

**Unicode handling now matches JS semantics across the compiler** (7d5b8f5)
The checker and scanner now use JS-compatible casing and identifier tables instead of Go/UTF-8 defaults, fixing intrinsic string mappings, identifier classification, and surrogate-pair behavior. This is a broad correctness change that affects how the language service and compiler treat non-ASCII text.

**Declaration emit now walks expando properties through nested members** (f157e78)
The declaration transformer was updated to retain and emit expando members discovered anywhere in the file, not just at the host node. This should fix missing or incomplete `.d.ts` output for JS patterns that attach properties after function declarations, especially in isolated declarations workflows.

**Extended tsconfig parsing now reports JSON syntax errors from inherited configs** (cda7baf)
Parsing of `extends` chains now stops and surfaces read/parse errors from the extended file instead of silently continuing when the child config is malformed. That makes config failures much easier to diagnose and prevents downstream parsing from masking the real problem.

### Other misc changes
- UTF-8/UTF-16 correctness fixes and related baseline updates (1 commit)
- Code action deduping cleanup in the language service
- Misc test and baseline updates for the above changes
