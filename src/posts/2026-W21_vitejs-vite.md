---
date: 2026-05-24
repo: vitejs/vite
period: weekly
slug: 2026-W21
period_label: "May 18–24, 2026"
size: M
title: "Vite hardens HTML, glob, and CI behavior in 8.0.14"
excerpt: "Release 8.0.14 lands with fixes for trailing-slash HTML paths, absolute-base glob imports, plus pinned CI actions and dependency updates."
commits: 13
---

### **Release and runtime correctness fixes**
Vite 8.0.14 shipped with targeted fixes for two path-resolution edge cases: `transformIndexHtml` now correctly treats trailing-slash URLs as directories, and `import.meta.glob` no longer misrewrites paths when using absolute bases, including files outside the root.

### **Security and supply-chain hardening**
CI, release, and automation workflows now pin official GitHub Actions to exact commit SHAs instead of floating version tags, reducing the chance of unexpected upstream changes. The week also included a security-related `ws` bump.

### **Bundler alignment and test coverage**
The repo was updated to `rolldown` 1.0.2, alongside refreshed sourcemap expectations and added playground coverage for the HTML and glob fixes. Sass package root resolution also received a regression test to guard against `main` vs `index.scss` lookup issues.

### Other misc changes
Dependency and tooling refreshes across linting, types, Playwright, tsx, vue-tsc, and docs/fixture maintenance, plus small Renovate and workflow cleanups.
