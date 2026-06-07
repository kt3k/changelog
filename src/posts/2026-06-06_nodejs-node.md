---
date: 2026-06-06
repo: nodejs/node
size: S
title: "Brotli test now waits for backpressure"
excerpt: "A flaky Brotli 16GB test now waits for the readable buffer to fill before asserting, avoiding a race with libuv worker scheduling."
commits: 1
authors: [trivikr]
commit_authors: {"2adaeee": trivikr}
---

### Other misc changes
- Test reliability fix: `test-zlib-brotli-16GB.js` now polls until the Brotli decoder reaches its expected buffered chunk count before checking backpressure, removing a race with the fixed timeout (2adaeee).
