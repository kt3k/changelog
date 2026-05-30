---
date: 2026-03-05
repo: oven-sh/bun
size: M
title: "Buildkite artifact lookup fixed for CI links"
excerpt: "Switched CMake’s Buildkite artifact discovery from brittle build JSON scraping to `buildkite-agent artifact search`, restoring failing CI link steps."
commits: 1
authors: [dylan-conway]
commit_authors: {"3832c85": dylan-conway}
---

### **CMake Buildkite artifact discovery now uses buildkite-agent** (3832c85)
CI link steps were breaking because Buildkite no longer exposes the full `jobs` array in public build JSON, making the old scraper think builds had no jobs. This change replaces that approach with `buildkite-agent artifact search`, which is the right source of truth for sibling step artifacts and keeps the build link flow working.

### Other misc changes
- None.
