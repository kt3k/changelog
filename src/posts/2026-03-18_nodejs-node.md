---
date: 2026-03-18
repo: nodejs/node
size: M
title: "Test runner exit codes and stream errors tightened"
excerpt: "Notable fixes for test runner failures and pipeline error handling, plus a sqlite callback lifetime bug and tooling updates."
commits: 7
authors: [legendecas, geeksilva97, chohner, JLHwung, marcopiraccini]
commit_authors: {"56aba88": legendecas, "f68824a": geeksilva97, "40c625b": geeksilva97, "27501b4": legendecas, "7ca5de7": chohner, "bd8522a": JLHwung, "4d2d6de": marcopiraccini}
---

### **Test runner now fails on suite-level errors** (f68824a)
Errors thrown while defining a suite now mark the run as unsuccessful, fixing cases where `describe()` failures could still exit with code 0. The new fixture and exit-code test lock in the behavior so broken suites are reported correctly.

### **Pipeline preserves the original error over AbortError** (4d2d6de)
`stream.pipeline()` now prefers a real error even if an `AbortError` appears later, which prevents genuine failures from being masked during abort-related cleanup. The added regression test covers an infinite source feeding `Readable.map()` so thrown errors surface as expected.

### **sqlite changeset filter callback no longer dangles** (40c625b)
The SQLite changeset filter callback now captures the environment, database, and function explicitly instead of relying on a dangling reference. This fixes a lifetime bug that could lead to invalid access when applying changesets.

### Other misc changes
- Disabled Rust ICU `compiled_data` features in `deps/crates` and adjusted Temporal ICU dependencies (56aba88)
- Added `eslint-plugin-regexp` to the ESLint toolchain and enabled its recommended config, with many rules explicitly disabled for now (bd8522a)
- Fixed timezone-update workflow path references and generated-PR wording (27501b4)
- Doc typo fix in `environment_variables.md` (7ca5de7)
