---
date: 2026-08-09
repo: leanprover/lean4
size: M
title: "Lake cache and exit tests hardened"
excerpt: "Lake now treats cache corruption as non-fatal trace output and the leanExit test suite is less flaky about exit reporting."
commits: 3
authors: [tydeu]
commit_authors: {"7c90644": tydeu, "b1cd183": tydeu}
---

### **Lake cache failures are downgraded and invalid JSON now errors out** (b1cd183)
Cache-related lookup failures no longer break builds run with `--wfail` or `--iofail`; they’re caught and reported at trace/verbose level instead. The cache reader also now rejects invalid JSON with an actual error, and the tests were updated to expect the stricter behavior.

### **leanExit test flakiness is fixed** (7c90644)
The `leanExit` harness now forces exit codes to be reported, and the test case was rewritten to work around Lean’s unreliable diagnostic flushing before `IO.Process.exit`. This makes the exit-code diagnostics test deterministic instead of timing-dependent.

### Other misc changes
- Stage0 refresh (1 commit)
