---
date: 2026-07-02
repo: oven-sh/bun
size: M
title: "Redirect retries and shell errors get fixed"
excerpt: "Bun fixes redirect retry state loss, separates shell parse errors with newlines, and pins React experimental test installs."
commits: 3
authors: [robobun, cirospaciari]
commit_authors: {"1498d7b": robobun, "d4f3c54": robobun}
---

### **HTTP redirects now preserve the original request on retries** (d4f3c54)
Bun fixed a use-after-free and state corruption bug when a retried request had previously followed redirects. The retry path now restores the original URL, method, and headers before rescheduling, which matters for installs and other HTTP flows that must restart cleanly after transient failures.

### **Shell parse errors are now newline-separated** (1498d7b)
When multiple shell parse errors occur in one script, Bun now joins them with `\n` instead of concatenating them into one unreadable string. That makes `ShellError.message` and CLI output much clearer, and the new test covers the multi-error case.

### Other misc changes
- Pinned the bake test harness to a specific React experimental build to avoid breakage from the moving `experimental` tag.
- Updated the React install cache key and shared package list in the bake harness.
- Added regression coverage for redirect retry behavior in install tests.
