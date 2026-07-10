---
date: 2026-07-09
repo: biomejs/biome
size: M
title: "Fix wrapping for curried test.each calls"
excerpt: "Biome now breaks long curried test.each/it.each/describe.each/test.for calls correctly instead of hugging them onto one line."
commits: 1
authors: [dyc3]
commit_authors: {"60c8043": dyc3}
---

**Fix curried test.each-family calls to wrap by line width** (60c8043)
Biome's JS formatter now treats curried `test.each`, `it.each`, `describe.each`, and `test.for` calls as normal breakable call expressions when the arguments exceed the configured width. This fixes a formatting bug where the outer call could stay hugged onto one line, and adds regression coverage for the affected patterns.

### Other misc changes
- Added a changeset for the patch release
- Updated formatter snapshots and test fixtures for the new wrapping behavior
