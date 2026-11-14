---
date: 2026-11-13
repo: nodejs/node
size: L
title: "Bench gains GC controls and env snapshots"
excerpt: "node:bench adds GC modes, environment-aware reporters, and doNotOptimize; Node also fixes tty restore behavior and a few inspector/crypto bugs."
commits: 13
authors: [jasnell, Renegade334, legendecas, nodejs-github-bot, mcollina, rozzilla, inoway46, SarthakAhuja, fzakaria]
commit_authors: {"dadf029": legendecas, "726d4d4": mcollina, "11d7451": SarthakAhuja, "c905bed": jasnell, "e256fcb": jasnell, "e3499df": jasnell, "7a38815": jasnell}
---

**node:bench gets garbage-collection controls** (e256fcb)
The benchmark runner now supports `gc` modes for disabling, forcing once after warmup, or forcing before every sample, with CLI support via `--bench-gc`. The docs and runtime wiring make the effective mode visible in plans, and `--bench-gc` automatically enables `--expose-gc` for child processes when needed.

**node:bench now exposes environment snapshots in reporters** (7a38815)
Built-in reporters now capture and emit host metadata such as Node/V8 versions, OS details, CPU grouping, memory, load average, and `execArgv`. This makes benchmark output more reproducible and easier to interpret across different machines and process-isolation setups.

**node:bench adds `doNotOptimize()` to prevent dead-code elimination** (c905bed)
A new API lets benchmark code keep computed values observable so optimizing compilers cannot trivially erase the work being measured. The spec reporter also warns when results look implausibly fast, helping catch eliminated-work benchmarks.

**Benchmark operations now default to 1** (e3499df)
`context.end()` and externally recorded samples now default `operations` to `1` when omitted, instead of requiring it explicitly. This makes the API less verbose and aligns the docs and tests with the new default.

**TTY state is restored only when Node changed it** (726d4d4)
Node no longer blindly writes terminal attributes back on exit; it now restores them only if Node itself changed terminal mode, or when exiting via signal/timeout paths. That avoids clobbering terminal settings owned by another program, fixing cases like piping into pagers.

**Inspector dispatch now uses a fallthrough callback on `Dispatchable`** (dadf029)
The inspector agent was refactored to pass a fallthrough callback directly into `Dispatchable` instead of routing through a separate dispatch result path. This matches the updated protocol dependency and tightens the inspector message-handling flow.

**X509 validity-time parsing is documented more clearly** (11d7451)
The crypto docs now spell out that unparsable certificate validity times return `'Bad time value'` or invalid `Date` objects, and they warn callers to reject invalid dates before doing expiry checks. That closes a subtle footgun where naive comparisons could mistakenly accept malformed certificates.

### Other misc changes
- Inspector protocol dependency update and generated code refresh (1 commit)
- V8 temporal backport for zoneinfo64 resource length handling (1 commit)
- Inspect formatting benchmark tweak and property-write micro-optimization (1 commit)
- Watch-mode test deflakes and reliability fixes (2 commits)
- mk-ca-bundle updated to 1.35 (1 commit)
