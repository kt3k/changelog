---
date: 2026-03-22
repo: denoland/deno
size: M
title: "Node readline now ignores terminal mode off TTY"
excerpt: "Deno matches Node by no longer throwing when `readline.createInterface()` is used with `terminal: true` outside a TTY."
commits: 1
authors: [KnorpelSenf]
commit_authors: {"ac659a1": KnorpelSenf}
---

### **Match Node's readline behavior outside TTYs** (ac659a1)
Deno now ignores `terminal: true` when stdin isn't a TTY instead of throwing, aligning the Node polyfill with Node.js behavior. This fixes a real compatibility bug for code that creates a readline interface in non-interactive contexts.

### Other misc changes
- Added a regression test for `readline.createInterface()` on non-TTY stdin.
- Updated the expected test output for the new readline scenario.
