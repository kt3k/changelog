---
date: 2026-08-20
repo: denoland/deno
size: M
title: "Native timers now wake on deadline"
excerpt: "Deno fixed N-API/libuv timers so the event loop re-polls at the next deadline, preventing native timers from stalling until unrelated activity occurs."
commits: 1
authors: [bartlomieju]
commit_authors: {"9ad36f7": bartlomieju}
---

### **Wake the event loop for pending libuv timer deadlines** (9ad36f7)
Deno now arms a wakeup for the earliest pending `uv_timer_t` deadline and re-polls the loop when that deadline arrives, fixing a bug where native timers could sit idle until some other event happened. The change mirrors libuv’s next-timeout logic, avoids re-arming on every tick, and clears stale wake state when no timers remain.

### Other misc changes
- N/A
