---
date: 2026-10-05
repo: nodejs/node
size: L
title: "Node tightens net, config, and VFS"
excerpt: "Major net autoselection changes, stable config files, new layered VFS mounts, plus stream and MIME performance work."
commits: 19
authors: [mcollina, marco-ippolito, gabylb, vedchaudhari, inoway46, joyeecheung, jasnell, trivikr]
commit_authors: {"9746ebc": mcollina, "019e869": marco-ippolito, "3c57714": marco-ippolito, "c56cb09": mcollina, "6812e92": jasnell, "ad55417": mcollina, "149a864": mcollina, "85df70e": trivikr}
---

**Network autoselection now keeps competing TCP attempts alive** (9746ebc)
`autoSelectFamily` no longer cancels pending connection attempts when a later one starts; the first successful socket now wins, and `localPort` forces sequential fallback. The docs and tests were updated to reflect the new race behavior and timeout semantics.

**Config files are now stable and the parser is more robust** (3c57714, 019e869)
`--config-file` graduated from experimental, with updated CLI/docs and namespace handling for `test`, `watch`, and `permission`. The config-file reader also now avoids misreading flags after the script boundary, fixing several edge cases around bare and value-bearing config flags.

**VFS gains composable layered mounts** (ad55417)
A new `ComposableProvider` lets multiple providers be stacked at one mount point with priority-based reads, copy-up writes, and hide-on-delete behavior. This unlocks more flexible virtual filesystems and comes with new API docs and coverage.

**Watch mode now preserves quoted NODE_OPTIONS correctly** (85df70e)
Quoted values containing quotes or backslashes are now escaped properly when watch flags are stripped and `NODE_OPTIONS` is rebuilt for child processes. That fixes cases where child Node.js processes could fail to start or silently lose characters.

**ReadableStream async iteration was refactored for speed** (c56cb09)
WebStreams async iterator methods are now shared on a prototype instead of rebuilt per iterator, cutting per-iterator overhead. The change is explicitly benchmarked and should help short-lived stream iteration patterns.

**MIME parsing got a faster implementation** (6812e92)
`MIMEType.parse()` and related accessors were rewritten around a lookup-table-based parser, reducing overhead in common parsing paths. A dedicated benchmark was added to track the improvement.

**Utf8Stream now supports bounded write retries** (149a864)
`maxWriteRetries` was added to `Utf8Stream`, limiting repeated `EAGAIN`/`EBUSY` retries and resetting the counter only on real forward progress. This makes retry behavior more predictable and closes edge cases around flush/write handling.

### Other misc changes
- z/OS build/config updates (2 commits)
- CI/build workflow tweaks, including lint checkout and vcbuild fixes (3 commits)
- Revert/restoration related to jitless/lite mode support (1 commit)
- CodeQL workflow dependency bumps (4 commits)
