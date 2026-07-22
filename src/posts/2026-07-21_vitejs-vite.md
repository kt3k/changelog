---
date: 2026-07-21
repo: vitejs/vite
size: M
title: "Config compat, CSS URL fix, and deps bumps"
excerpt: "Vite tightens native config handling, fixes CSS URL rebasing for injected PostCSS content, and refreshes several dependencies."
commits: 9
authors: [btea, soreavis, sapphi-red]
commit_authors: {"2ced1fe": btea, "abb793e": soreavis}
---

### **Native config compat now skips virtual modules** (2ced1fe)
Vite’s native config compatibility check no longer runs on virtual modules and now treats them as ESM in path-format helpers. That closes a false-positive class of config compatibility issues and improves support for `.mts` config setups.

### **CSS URL rewriting works for OnceExit-injected content** (abb793e)
The CSS pipeline now rewrites `url()` references even when a PostCSS plugin injects content during `OnceExit`, using the injected source file as the rebasing anchor. This fixes broken asset paths for plugins that compose or inline CSS late in the PostCSS lifecycle.

### **Dependency updates across core and templates** (c60b4d7)
Vite and related packages were updated to `magic-string@1`, alongside matching bumps in several sourcemap playgrounds. This keeps the repo aligned with the newer major release of a key transform dependency.

### Other misc changes
- Renovate bumps for `actions/checkout` and `actions/setup-node` across workflows.
- Non-major dependency updates across docs, create-vite templates, and internal packages.
- Docs link fixes and a small test TypeScript error cleanup.
