---
date: 2026-05-18
repo: nodejs/node
size: M
title: "Temporal lands in fs stats"
excerpt: "Node.js adds Temporal.Instant support to fs stats, with docs and error updates plus a few test and benchmark fixes."
commits: 5
authors: [LiviaMedeiros, MikeMcC399, mcollina, trivikr, thisalihassan]
commit_authors: {"4ee7567": LiviaMedeiros, "155268f": MikeMcC399, "f2aaf63": mcollina, "3b19867": trivikr, "debe2ed": thisalihassan}
---

### **fs stats gain Temporal.Instant support** (4ee7567)
`fs.Stats` and `fs.BigIntStats` now expose `*Instant` fields backed by `Temporal.Instant`, alongside the existing Date-based timestamps. The docs and error messaging were updated accordingly, and the new behavior is covered by dedicated tests; this is a meaningful API expansion for users adopting Temporal.

### Other misc changes
- Watch-mode inspector test made less flaky by removing the restart race (f2aaf63)
- Test runner deserializer fixed to avoid hanging on incomplete V8 frames (debe2ed)
- Stream/iter broadcast benchmark updated to respect backpressure (3b19867)
- Windows build docs added manual Rust toolchain install steps (155268f)
