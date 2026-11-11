---
date: 2026-11-10
repo: leanprover/lean4
size: L
title: "HTTP keep-alive and runtime fixes land"
excerpt: "Lean fixes thread stack sizing and HTTP keep-alive timing, plus a substring split bug and OpenSSL update."
commits: 6
authors: [TwoFX, Kha, algebraic-dev]
commit_authors: {"80799ea": Kha, "0ae7c85": algebraic-dev, "64d2234": TwoFX}
---

**Apply `LEAN_STACK_SIZE_KB` before runtime threads start** (80799ea)
`LEAN_STACK_SIZE_KB` now takes effect during runtime initialization, so threads like libuv's event loop no longer always reserve the default 1 GB stack. This fixes failures under tight address-space limits, and the new test covers both a compiled program and `lean --version`.

**Fix HTTP keep-alive timeout accounting after slow writes** (0ae7c85)
The HTTP server now measures keep-alive idle time from when the response is actually written, not when it is handed to the outbox. That prevents connections from being closed immediately after a slow write finishes; the outbox also tracks when it last became idle so the server can compute the remaining timeout precisely.

**Fix backtracking in `Substring.Raw.splitOn`** (64d2234)
`Substring.Raw.splitOn` now delegates to the slice-based splitter, which correctly handles partial separator matches that should backtrack. This fixes incorrect splits on overlapping patterns and invalid substrings, and adds regression coverage against `String.splitOn`.

### Other misc changes
- OpenSSL bumped to 4.1.0 across build tooling and runtime support (1 commit).
- String docstring cleanup and typo/factual fixes (1 commit).
- Disabled a couple of flaky async HTTP tests (1 commit).
