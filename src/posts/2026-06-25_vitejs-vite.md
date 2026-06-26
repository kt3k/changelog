---
date: 2026-06-25
repo: vitejs/vite
size: M
title: "Vite sharpens dev UX and workspace fixes"
excerpt: "Notable dependency optimizer and pnpm workspace fixes landed, alongside create-vite prompt tweaks and docs/workflow maintenance."
commits: 8
authors: [Boshen, cpojer, mdong1909, sapphi-red, jwwisgerhof, btea]
commit_authors: {"e347fef": Boshen, "092cb3b": cpojer, "2531ac7": btea}
---

### **Dependency optimizer messages are clearer** (092cb3b)
Vite now uses more precise wording when it discovers or optimizes dependencies, and it adds a dedicated suggestion for `optimizeDeps.include` with a docs link. This is mostly a UX/logging cleanup, but it should make cold-start and re-bundle messages easier to understand.

### **Vite now resolves pnpm workspace metadata from the repo root** (2531ac7)
The server now looks for pnpm’s `.modules.yaml` from the workspace root instead of the current working directory, which is important for monorepos and nested packages. That also ensures the virtual store path handling points at the correct `node_modules` location.

### **create-vite’s React linter prompt is simplified** (e347fef)
The interactive React template prompt was reworded from “Use ESLint instead of Oxlint?” to “Which linter to use?” with cleaner Oxlint/ESLint labels. This makes the first-run experience a little less opinionated and easier to scan.

### Other misc changes
- Dependency bumps across packages, docs, lockfile, and workflows (1 commit)
- CI/action updates, including `actions/checkout` v7 and `pnpm/action-setup` v6.0.9 (2 commits)
- Docs cleanup: grammar/link fixes and Fathom analytics removal (2 commits)
- Windows `net use` now runs with a hidden console window (1 commit)
