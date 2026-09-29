---
date: 2026-09-28
repo: vitejs/vite
size: M
title: "Rolldown runtime tests and deps updated"
excerpt: "Rolldown-related dependency bumps landed alongside test updates for worker playgrounds, sourcemaps, and dev runtime layout changes."
commits: 5
authors: [h-a-n-a, sapphi-red]
commit_authors: {"634745d": h-a-n-a, "afaf48b": h-a-n-a, "e57f4da": sapphi-red}
---

### **Rolldown dev runtime tests now cover both layouts** (634745d)
The client injection test no longer assumes the rolldown dev runtime is split across helper imports; it now accepts a single-file runtime too. The HMR full-bundle test was also loosened to look for `DevRuntime` rather than a specific class declaration, matching the new runtime shape.

### **Worker playground specs enabled for bundled dev** (afaf48b)
A broad set of worker E2E tests were marked to skip in bundled-dev mode, letting the suite run without tripping over unsupported worker behavior there. This improves coverage alignment with the mode actually under test and reduces false failures.

### **Rolldown-related dependencies were bumped** (88c1741)
Rolldown was updated across the root, Vite package, and playground packages, with lockfile refreshes and a sourcemap fixture adjusted for changed output. This keeps the repo aligned with the latest rolldown releases and test expectations.

### **Other misc changes**
- Replaced a native-loader-incompatible SSR resolve config extension (`e57f4da`).
- General dependency bumps across templates, tooling, and package manifests (`9944fa6`).
- Semgrep workflow action version updated (`9944fa6`).
