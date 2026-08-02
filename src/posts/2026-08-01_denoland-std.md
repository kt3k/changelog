---
date: 2026-08-01
repo: denoland/std
size: S
title: "Publish workflow stops following canary Deno"
excerpt: "Pinned JSR publishing to stable Deno v2.x after a canary typing regression blocked the release workflow."
commits: 1
authors: [bartlomieju]
commit_authors: {"2d8f5a5": bartlomieju}
---

### **Publish workflow pinned to stable Deno** (2d8f5a5)
The JSR publish workflow was switched from canary to `v2.x`, matching the rest of CI. This avoids release failures caused by unreleased Deno regressions, like the URLPattern typing issue that previously blocked publishing.

### Other misc changes
- None
