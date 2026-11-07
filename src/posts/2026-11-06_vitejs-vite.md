---
date: 2026-11-06
repo: vitejs/vite
size: S
title: "Vite tightens test teardown handling"
excerpt: "A test-only refactor switches suites to `onTestFinished`-based cleanup, reducing shared server state and making teardown more reliable."
commits: 1
authors: [sapphi-red]
commit_authors: {"a579e35": sapphi-red}
---

### Other misc changes
- Test teardown refactor across dev, HTTP, optimizer, watcher, SSR runtime, and playground suites to use `onTestFinished` via shared test helpers (a579e35)
- Added/updated test utilities and fixture cleanup plumbing for the new teardown approach
