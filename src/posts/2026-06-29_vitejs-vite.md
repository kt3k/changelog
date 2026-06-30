---
date: 2026-06-29
repo: vitejs/vite
size: S
title: "Sass wildcard import regression test on Windows"
excerpt: "Adds coverage for Sass export wildcard resolution to a `_partial.scss`, guarding against a Windows path-separator regression."
commits: 1
authors: [sapphi-red]
commit_authors: {"ec064c3": sapphi-red}
---

### Other misc changes
- Added a regression test for `@use` resolution through a Sass export wildcard mapping to `_partial.scss` on Windows (ec064c3).
- Extended the CSS playground fixture with a matching `./styles/*` export and partial stylesheet to exercise the path.
