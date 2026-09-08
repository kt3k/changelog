---
date: 2026-09-07
repo: vitejs/vite
size: L
title: "Vite ships 8.3.0-beta.1 with DevTools integration"
excerpt: "New beta release lands dev server DevTools support, plus a few notable fixes and dependency updates."
commits: 8
authors: [btea, sapphi-red, webfansplz]
commit_authors: {"b919a1a": sapphi-red, "4ec58d1": btea, "68aeb8a": webfansplz, "f794133": btea, "d6b19ab": btea}
---

### **DevTools integration now works in dev server and build** (68aeb8a)
Vite now supports deeper DevTools integration for both `serve` and `build`, with separate packages for dev-server inspection and build analysis. The config docs and tests were expanded, and the plugin lifecycle was tightened so `devtools` must be set in user config rather than mutated by plugin hooks.

### **Shortcuts now surface errors more reliably** (4ec58d1)
The CLI shortcut binding path was adjusted to use a safer concatenation flow, which extends error handling around shortcut registration. This is a small but meaningful fix for developer ergonomics when custom shortcuts are involved.

### **New beta release published** (5bce8ca)
Vite cut `v8.3.0-beta.1`, updating the package version and changelog. This marks the release checkpoint for the day’s changes.

### Other misc changes
- Dependency updates across the repo, including workflow, package, and lockfile bumps (fc7c104)
- Introduced `@e18e/eslint-plugin` and related lint rule cleanup (f794133)
- Removed an unnecessary comment in type definitions (b919a1a)
- Updated the GitHub Pages deploy action digest (ac6526f)
- Minor ts-check/comment ordering cleanup (d6b19ab)
