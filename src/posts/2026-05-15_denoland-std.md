---
date: 2026-05-15
repo: denoland/std
size: M
title: "Dotenv round-trips tricky escapes correctly"
excerpt: "Fixes lossless `.env` stringify/parse behavior for quotes, backslashes, and control chars; adds regression coverage."
commits: 1
authors: [lunadogbot]
commit_authors: {"95a1e2e": lunadogbot}
---

### **Dotenv stringify/parse now preserves tricky values** (95a1e2e)
`stringify()` now escapes backslashes before newline, carriage return, and tab characters so literal escape-like sequences such as `\n` stay distinct from real newlines. `parse()` was updated to recognize `\"`, `\'`, and `\\` inside double-quoted values, fixing round-trips for values that previously broke on inner quotes or backslashes.

### Other misc changes
- Added regression tests covering many combinations of quotes, escapes, whitespace, and control characters.
