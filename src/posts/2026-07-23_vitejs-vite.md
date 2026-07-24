---
date: 2026-07-23
repo: vitejs/vite
size: M
title: "Create-vite ESLint fix, legacy syntax guard"
excerpt: "create-vite now ignores --eslint for non-React templates, and plugin-legacy prevents minification from reintroducing newer syntax."
commits: 7
authors: [shulaoda, dogledogle, sapphi-red, daychongyang, amir-rezaei, btea]
commit_authors: {"989a42e": shulaoda, "428d8af": shulaoda}
---

### **create-vite no longer crashes on `--eslint` for Vue and other non-React templates** (428d8af)
Passing `--eslint` to non-React starters now emits a warning and continues instead of trying to scaffold an ESLint config that doesn't exist. The added test confirms Vue templates are left unchanged and no `ENOENT` is thrown.

### **plugin-legacy keeps legacy chunks on older syntax while minifying** (989a42e)
Legacy chunk minification now explicitly targets `es2015`, preventing the compressor from collapsing code into syntax too new for older browsers. This protects outputs like IE11 builds from regressing with ES2019+ constructs such as `catch {}` or optional chaining.

### Other misc changes
- plugin-legacy release bump to 8.2.2
- Docs cleanup and wording/link/code-format fixes (4 commits)
- Playground tsconfig tweak for legacy type-checking
