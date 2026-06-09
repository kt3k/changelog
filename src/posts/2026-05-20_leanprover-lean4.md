---
date: 2026-05-20
repo: leanprover/lean4
size: M
title: "Do elaborator gets indexed monads; string compare speeds up"
excerpt: "Lean4’s do-notation now handles indexed monads, while string comparison gets a faster C++ backend and path/string cleanups continue."
commits: 7
authors: [sgraf812, TwoFX, hargoniX]
commit_authors: {"8398048": hargoniX, "65b3453": sgraf812, "da8bcf7": sgraf812, "ada1696": TwoFX, "a3fff15": hargoniX, "fa23847": TwoFX}
---

### **Do notation now supports indexed monads** (65b3453)
`DoOps` gained `splitMonadApp?` and `mkMonadApp`, letting `elabDoWith` decompose and rebuild monad applications that carry instance arguments, such as indexed monads like `Measure α`. This removes a hard-coded `m α` assumption and makes custom do-elaboration work with a broader class of monads.

### **String comparison is now backed by a dedicated runtime primitive** (a3fff15)
`String.compare` was given an extern binding to a new C++ `lean_string_compare` implementation, so ordering can be computed directly instead of via the generic `compareOfLessAndEq` path. That should reduce comparison overhead for any code that orders strings.

### Other misc changes
- Do elaborator refactor: rename `mkMonadicType` to `mkMonadApp` across builtin `do` support and related call sites (da8bcf7)
- String-processing cleanup across compiler/docs/repr code, removing more `String.length` uses (ada1696)
- More string/path refactors for `FilePath` and `String` utilities, including ASCII-length assumptions and slice-based path handling (fa23847)
- Stage0 rebuilt to pick up the runtime/stdlib changes (34df732)
- Prep work for the `String.compare` optimization in runtime and headers (8398048)
