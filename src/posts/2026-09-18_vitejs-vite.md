---
date: 2026-09-18
repo: vitejs/vite
size: M
title: "Rolldown fixes and deps refresh land"
excerpt: "Build output comment handling was fixed, deps were refreshed, and a few docs/CI tweaks rounded out the day."
commits: 6
authors: [btea, CSY54, sapphi-red]
commit_authors: {"e9078f8": CSY54, "f4b4431": btea, "6a84c72": btea, "4aba8d8": sapphi-red}
---

### **Fix Rolldown output comments merging** (4aba8d8)
`build.rolldownOptions.output.comments` is now merged in the right place when resolving build options, preserving user-specified comment settings alongside Vite's defaults. This matters for minification behavior and tree-shaking, especially around ES/lib builds.

### **Refresh Rolldown-related dependencies** (9aecbbf)
Rolldown, `rolldown-plugin-dts`, `tsdown`, and related playground/package pins were bumped, along with lockfile and workspace updates. This keeps the Rolldown integration aligned with newer releases and removes an old Vite shim no longer needed.

### **Improve version-check input sizing in docs** (e9078f8)
The supported-versions docs UI now uses `field-sizing: content` for the version input when available, so the input better matches its contents. It’s a small polish fix, but it improves the page’s layout and usability.

### **Other misc changes**
- Dependency bumps across the repo, including `@types/node`, `lint-staged`, `oxfmt`, `typescript-eslint`, `@clack/prompts`, `vitepress` docs deps, and CI action/container updates (3 commits)
- Minor refactor: use a non-capturing group in the asset-regex constant (f4b4431)
- Docs comment update for `optimizeDeps.include`, clarifying glob support for deep imports (6a84c72)
