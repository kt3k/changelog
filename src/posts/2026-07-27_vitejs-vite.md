---
date: 2026-07-27
repo: vitejs/vite
size: M
title: "Vite bumps deps and fixes SSR stack traces"
excerpt: "Dependency refresh plus a module-runner fix for frozen Object.prototype; docs updated for new React compiler templates."
commits: 6
authors: [dogledogle, santhiprakash, dfedoryshchev, sheremet-va]
commit_authors: {"a4785c3": santhiprakash, "aafa103": dfedoryshchev, "0945bab": dogledogle, "6b3210c": dogledogle, "599c5b0": sheremet-va}
---

### **SSR stack traces now survive frozen Object.prototype** (599c5b0)
Vite’s module-runner sourcemap interceptor now clones call sites onto a null-prototype object, avoiding a throw when user code has frozen `Object.prototype`. The new test covers the previously failing stack-trace path and confirms `.stack` still serializes correctly.

### **create-vite now advertises React Compiler templates** (a4785c3)
The main getting-started docs were updated to list the new `react-compiler` and `react-compiler-ts` templates. This keeps the template catalog in sync with what create-vite can scaffold.

### **Correct the `cacheDir` fallback docs** (aafa103)
The config docs now explain that `.vite` is the fallback only when neither `package.json` nor `node_modules` is present. This clears up a small but potentially confusing detail in the public configuration API.

### **Other misc changes**
- Dependency bumps across repo templates, docs, tooling, and lockfile (4c07b74)
- Fix wording, punctuation, and code fence language in changelog docs (0945bab)
- Update the hot-update hook link in docs (6b3210c)
- Bump pinned ESLint/TypeScript-ESLint versions in create-vite internals (4c07b74)
- Refresh React, plugin-react, and oxlint versions in create-vite templates (4c07b74)
- Update zizmor GitHub Action version in CI (4c07b74)
