---
date: 2026-09-07
repo: leanprover/lean4
size: L
title: "Lean adds project export checking"
excerpt: "Lean4 now has `lake check` and `leanchecker --from-export` to replay exports through the kernel, expanding external verification support."
commits: 2
authors: [hargoniX, Kha]
commit_authors: {"c40679c": hargoniX, "64906da": Kha}
---

**`lake check` lands as a new external-verification workflow** (64906da)
`lake check` now builds a project's default targets, exports the resulting modules, and replays them through the kernel while rejecting non-standard axioms. It also adds project plumbing for collecting default target modules plus dedicated tests for audit rejection, multi-target, and sorry cases.

**`leanchecker` can now verify `.ndjson` exports directly** (c40679c)
`leanchecker` gains a `--from-export file.ndjson` mode that loads a Lean export and runs it through the kernel, with extra checks around quotient constants. The export path was refactored into a reusable `dumpEnv` helper, and `InductiveVal`, `QuotKind`, `QuotVal`, and `ConstantInfo` now derive `BEq` to support the new comparison logic.

### Other misc changes
- Export/CLI refactors to share dumping logic and support the new check flow
- New and updated test fixtures for export checking
- Misc internal build metadata changes
