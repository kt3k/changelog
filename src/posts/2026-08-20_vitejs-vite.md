---
date: 2026-08-20
repo: vitejs/vite
size: M
title: "SSR destructuring fix ships in 8.2.2"
excerpt: "Vite 8.2.2 lands with an SSR transform fix for destructured parameters/assignments and a create-vite React Compiler note."
commits: 4
authors: [sapphi-red]
commit_authors: {"cb77e2a": sapphi-red, "9db0b61": sapphi-red, "1fb8afe": sapphi-red}
---

### **SSR now rewrites computed keys in destructured params** (9db0b61)
The SSR transform now correctly handles computed keys inside destructuring parameters, including nested object/array patterns and default values. This prevents imported identifiers from being left unreplaced in function arguments, fixing a real runtime bug in SSR output.

### **Destructuring assignments are covered by SSR transform tests** (cb77e2a)
Adds a regression test for destructuring assignments in moduleRunnerTransform, including cases where imported names are shadowed by local bindings. This helps lock in the fix and avoid future SSR prefixing regressions.

### **create-vite now mentions experimental React Compiler support** (1fb8afe)
The React template guidance now points users to the experimental native React Compiler path in plugin-react, alongside the existing Babel-based setup. It’s a docs-only template update, but useful for developers exploring the new compiler option.

### Other misc changes
- Release v8.2.2 and bump package version
- Changelog refresh for the 8.2.2 release
