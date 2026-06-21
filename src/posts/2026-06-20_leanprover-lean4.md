---
date: 2026-06-20
repo: leanprover/lean4
size: M
title: "Lake URL fix, snapshot reuse, CI label typo"
excerpt: "Lean4 fixed a Lake remote URL bug, sped up test elaboration with shared header snapshots, and corrected a CI restart label."
commits: 3
authors: [Kha, leiko1337]
commit_authors: {"7559185": Kha, "437d4e5": Kha, "62f25a5": leiko1337}
---

**Lake now reports `remoteUrl` correctly** (62f25a5)
`Package.remoteUrl?` was inverted: empty strings returned `some` and non-empty URLs returned `none`. This fix restores the documented behavior so release URL logic can honor configured remotes and fall back properly to the Git remote.

**Test suite reuses prebuilt header snapshots** (437d4e5)
The elab test harness now wires in incremental header snapshots for the common `Lean` and empty-import cases, avoiding repeated prelude imports across hundreds of tests. The change also patches loaded snapshots’ `mainModule` to match the current file and registers snapshot regions for LSan, which makes the optimization both correct and sanitizer-friendly.

### Other misc changes
- CI: fixed the `macos-arm-ci` restart-on-label match spelling (7559185)
