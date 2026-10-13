---
date: 2026-10-12
repo: vitejs/vite
size: S
title: "Docs cleanup and one test adjustment"
excerpt: "Mostly documentation fixes plus one dynamic-import test update; no functional code changes."
commits: 5
authors: [auroraxo, adityapratap0077-cloud, dogledogle, h-a-n-a]
---

### Other misc changes
- Docs fixes in env-and-mode, plugin, migration, and static deploy examples, including broken links, grammar, and code sample corrections.
- Updated the GitHub Pages deploy workflow to a newer `actions/setup-node` digest.
- Test tweak: run the dynamic-import vars worker case under bundled dev instead of skipping it.
