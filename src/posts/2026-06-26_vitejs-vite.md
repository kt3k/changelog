---
date: 2026-06-26
repo: vitejs/vite
size: M
title: "Rolldown fixes land across dev and scanner"
excerpt: "Bug fixes span HMR asset serving, scanner root resolution, malformed URI handling, and Rolldown-related docs/deps updates."
commits: 8
authors: [sapphi-red, EduardF1, greymoth-jp, h-a-n-a, shulaoda]
commit_authors: {"84f5ccc": greymoth-jp, "5876b2c": h-a-n-a, "9722b07": sapphi-red, "7e18bf8": sapphi-red}
---

### **HMR asset serving now handles newly emitted files** (5876b2c)
Bundled dev now stores additional assets emitted during HMR/lazy compile, not just the initial build output. That fixes cases where a patch introduces a new asset that would otherwise 404 until a full rebuild.

### **Scanner resolves build input from the project root** (9722b07)
The dependency scanner now resolves `build.rolldownOptions.input` relative to the Vite root instead of `process.cwd()`. This aligns scanning with build behavior and fixes missed deps when the root differs from the current working directory.

### **Malformed .html URLs no longer break index HTML handling** (84f5ccc)
`indexHtmlMiddleware` now guards `decodeURIComponent()` with a try/catch and falls back to the next middleware on malformed URIs. That prevents bad requests from throwing inside the middleware chain.

### **Plugins with empty output still emit sourcemap metadata** (7e18bf8)
The CSS and HTML plugins now return an explicit empty source map alongside their generated code. This keeps build tooling and downstream consumers from seeing missing `map` fields for these transformed modules.

### Other misc changes
- Rolldown/tsdown/oxc-related dependency bumps (1 commit)
- Docs updates for Rolldown APIs and tsconfig resolution (2 commits)
- Test-only flaky navigation mock in fs-serve playground (1 commit)
