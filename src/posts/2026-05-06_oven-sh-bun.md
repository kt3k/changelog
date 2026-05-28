---
date: 2026-05-06
repo: oven-sh/bun
size: L
title: "Bun fixes raw mode, pidfd exits, and DCE output"
excerpt: "Windows stdin raw mode now updates correctly, Linux subprocess exits no longer get lost, and bundler DCE drops empty else blocks cleanly."
commits: 3
authors: [robobun]
commit_authors: {"611740f": robobun, "a28a3ad": robobun, "ff38b2b": robobun}
---

**Windows stdin raw mode now updates `isRaw` correctly** (611740f)
On Windows, `process.stdin.setRawMode(true)` could succeed without `process.stdin.isRaw` reflecting the new state. This brings Bun in line with Node/POSIX and fixes code that inspects raw-mode state after toggling it.

**Linux subprocess exit polling no longer uses `EPOLLONESHOT`** (ff38b2b)
Bun now registers Linux pidfd exit watches as level-triggered instead of one-shot, preventing dropped exit events when the event loop re-enters itself during dispatch. This fixes a real race where an `'exit'` could be delayed until some unrelated timer woke the loop.

**Bundler now trims empty `else {}` left behind by DCE** (a28a3ad)
Dead-code elimination no longer leaves behind a stray empty `else` branch in constant-folded conditionals, and the printer/walker were adjusted to avoid breaking dangling-else handling around labeled statements. This improves emitted output quality and fixes a correctness edge case in the bundler.

### Other misc changes
- Bundler docs updated to clarify `--minify-syntax` behavior.
- Added/expanded tests for Windows tty raw mode, DCE empty-else trimming, and Linux pidfd exit handling.
