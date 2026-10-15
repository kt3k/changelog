---
date: 2026-10-14
repo: vitejs/vite
size: M
title: "HMR socket crash fix and resolver tweaks"
excerpt: "Vite now avoids crashing on reset upgrade sockets, fixes JSX dependency scanning, and updates a resolve.exports edge case."
commits: 3
authors: [MFA-G, btea, koriyoshi2041]
commit_authors: {"c2c9ef4": MFA-G, "4ea708a": btea, "38f3cb4": koriyoshi2041}
---

### **Prevent crashes on reset upgrade sockets** (c2c9ef4)
Vite now attaches a no-op error handler to upgrade requests that the HMR server doesn’t take over, avoiding process crashes when clients reset those sockets mid-handshake. This tightens server robustness around unhandled upgrade traffic.

### **Scan `oxc.jsxInject` imports during dep optimization** (38f3cb4)
The dependency scanner now reads `oxc.jsxInject` instead of `esbuild.jsxInject`, so injected JSX imports are actually discovered and optimized. This fixes cases where packages like Vue could be missed during pre-bundling.

### **Fix `resolve.exports` handling for `$$` filenames** (4ea708a)
Vite bumps `resolve.exports` to 2.0.4 and adds a regression test for resolving an import path containing `$$` in the filename. That addresses a real resolver edge case without changing user-facing APIs.

### Other misc changes
- Added/updated playground coverage for the HMR socket error case.
- Dependency bump and lockfile churn for `resolve.exports`.
- Small test fixture updates in the resolve playground.
