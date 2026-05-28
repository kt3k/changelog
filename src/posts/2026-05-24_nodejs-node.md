---
date: 2026-05-24
repo: nodejs/node
size: M
title: "Test runner retry bug fixed; FFI API cleaned up"
excerpt: "A retry-state bug could hide real failures, while FFI signature fields were renamed and test runner watch behavior got more reliable."
commits: 10
authors: [aduh95, trivikr, marcopiraccini, MoLow, avivkeller, Renegade334, atlowChemi]
commit_authors: {"1dbea7a": trivikr, "e98f2ba": trivikr, "c58e5a1": marcopiraccini, "1ddb754": MoLow, "8bc9547": avivkeller, "d79aad8": aduh95, "8c3e9bd": aduh95, "7a9feef": aduh95, "df09b2a": Renegade334, "74ccf38": atlowChemi}
---

**`--test-rerun-failures` no longer swallows retry failures** (74ccf38)
The test runner and rerun reporter now track disambiguation counters against the base `file:line:column` key and advance them for both passes and fails. This fixes a subtle bug where a failing test on retry could be matched to the wrong prior run and reported as a pass.

**FFI signature objects switch to `return`/`arguments`** (df09b2a)
The public FFI API drops the older `result`/`parameters` aliases in favor of a simpler schema with `return` and `arguments`, and the docs/examples were updated accordingly. This is a breaking API cleanup for anyone configuring native function or callback signatures.

**Process-isolated test runner events now bypass declaration-order buffering** (1ddb754)
`test:enqueue`, `test:dequeue`, and `test:complete` are forwarded immediately instead of waiting behind per-file ordering. That makes execution-ordered reporting more accurate under process isolation, especially when fast failures race slower files.

**Watch-mode restart flakiness was reduced** (e98f2ba)
The watch-mode restart test now waits for the restart to begin before rewriting the file, then adds a settling delay before the next mutation. This makes the regression test less timing-sensitive on slower CI and better reflects real filesystem event handling.

### Other misc changes
- `test_runner` watch spec fixture avoids self-triggered restarts (1dbea7a)
- Commit-lint is skipped for backport PRs (c58e5a1)
- `test-internet` fork skip logic fixed in CI (d79aad8)
- Tests switched from manual `AbortController` setup to `AbortSignal.abort()` (8c3e9bd)
- Rust/Temporal build docs were reworded and simplified (7a9feef, 8bc9547)
