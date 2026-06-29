---
date: 2026-06-28
repo: vitejs/vite
period: weekly
slug: 2026-W26
period_label: "Jun 22–28, 2026"
size: L
title: "Vite 8.1 ships with bundled dev resilience and workspace fixes"
excerpt: "Vite 8.1 lands with bundled-dev error recovery, pnpm workspace/root fixes, and several Rolldown-alignment improvements."
commits: 25
---

### **Vite 8.1 release and bundled dev recovery**
Vite 8.1.0 shipped this week, alongside updates to create-vite 9.1.0 and plugin-legacy 8.1.0. The biggest change is in bundled dev: build errors are now cached and replayed to newly connected clients, and the server better decides when to defer vs force a full reload, making failed incremental builds much easier to recover from.

### **Rolldown alignment across dev, scan, and build**
A series of updates tightened Vite’s integration with Rolldown 1.1.2. The dependency scanner now resolves build inputs from the Vite root instead of `process.cwd()`, bundled dev was updated to store newly emitted assets during HMR/lazy compile, and plugins that emit empty output now preserve explicit sourcemap metadata. These changes reduce mismatches between scan and build behavior and fix a few edge cases that could break HMR or tooling.

### **Monorepo and HTML handling fixes**
Vite now resolves pnpm workspace metadata from the repo root, which should improve behavior in monorepos and nested packages where the working directory differs from the workspace root. HTML middleware also got a robustness fix: malformed `%`-encoded URLs no longer throw during `decodeURIComponent()`, and instead fall through cleanly.

### **Developer experience and template polish**
Dependency optimizer messaging is clearer, with more specific wording and a dedicated `optimizeDeps.include` suggestion. The `create-vite` React prompt was also simplified to make linter choice clearer, and templates now target `vite@^8.1.0` with updated config defaults, including better `moduleResolution` handling and optional Oxlint/ESLint support.

### **Other misc changes**
- CI and automation fixes, including a Renovate rule correction for npm release age
- Docs and release-artifact updates for Vite 8.1 and Rolldown APIs
- Package/version bumps, lockfile refreshes, and minor workflow cleanup
