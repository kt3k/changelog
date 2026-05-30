---
date: 2026-03-06
repo: oven-sh/bun
size: M
title: "Stabilize flaky next-pages HMR tests"
excerpt: "A single test-focused fix hardens Puppeteer launch, reload timing, and post-HMR assertions to avoid CI hangs and stale handles."
commits: 1
authors: [robobun]
commit_authors: {"9daa1f7": robobun}
---

### **Fix race conditions and launch flakiness in next-pages HMR test** (9daa1f7)
This test update closes several CI-only failure modes: it attaches console listeners before reloads, waits for the page state and styles to settle before asserting, and re-queries DOM handles after HMR so React rerenders don't leave stale references.
It also makes Puppeteer launch more resilient on macOS by adjusting launch flags, stripping quarantine on downloaded Chrome, and retrying browser startup up to three times; the longer subprocess timeout helps slow runners finish reliably.

### Other misc changes
- None
