---
date: 2026-03-04
repo: nodejs/node
size: M
title: "Streams race fix leads a mostly doc/tools day"
excerpt: "Node.js fixed a TransformStream cancel/write race, plus workflow, release-tooling, and docs updates."
commits: 5
authors: [panva, richardlau, marcopiraccini, MikeMcC399, JakobJingleheimer]
commit_authors: {"1647288": marcopiraccini, "5536325": panva, "7c4dc34": richardlau, "ef0f0b0": MikeMcC399, "23ba205": JakobJingleheimer}
---

**Fix TransformStream cancel/write race that leaked internal TypeErrors** (1647288)
A race between `reader.cancel()` and a late `writer.write()` could clear the transform algorithm while a pending write still tried to use it, surfacing an internal `TypeError` (`transformAlgorithm is not a function`). The fix guards against concurrent cancel/abort/close, and the new regression test ensures the race settles cleanly instead of leaking implementation details.

### Other misc changes
- Daily WPT workflow nightly version lookup corrected for the arm64 nightly index (5536325)
- Release proposal linter example updated to use 10-character short SHAs (7c4dc34)
- Windows SDK requirement documentation updated to Windows 11 in BUILDING.md (ef0f0b0)
- `expectFailure` markdown formatting clarified in the test API docs (23ba205)
