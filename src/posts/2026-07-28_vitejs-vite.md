---
date: 2026-07-28
repo: vitejs/vite
size: M
title: "Vite sharpens native config and HMR handling"
excerpt: "Config incompatibility warnings now point to exact columns, bundled dev workers survive HMR patches, and optimize-deps fixes plugin-injected imports."
commits: 9
authors: [sapphi-red, btea, Nic-Polumeyv, bluwy, h-a-n-a, shulaoda, santhiprakash]
commit_authors: {"8a24572": btea, "8c2a87d": Nic-Polumeyv, "0d04351": shulaoda}
---

### **Worker assets now survive bundled-dev HMR patches** (0d04351)
Vite now re-emits bundled worker assets during `load`/`transform` so an HMR patch doesn’t leave patched worker URLs pointing at files that were never written. The new coverage adds cases for both directly accepted workers and nested workers in full-bundle dev mode.

### **Plugin-injected imports work inside optimized deps** (8c2a87d)
Import analysis now preserves interop for imports injected into an already-optimized dependency by plugins like `@rollup/plugin-inject`. This fixes a class of dev-only optimize-deps failures where the injected sibling import could be rewritten incorrectly.

### **Native config incompatibility warnings include columns** (8a24572)
Vite’s native config compatibility warnings now report `file:line:column` instead of just `file:line`, making the exact unsupported syntax location clickable and easier to fix. The accompanying snapshots were updated to match the more precise diagnostics.

### Other misc changes
- Added Semgrep CI and then adjusted its container/flags; excluded `__tests__` from scans.
- Hardened bundled-dev test startup to wait for the first bundle/client before assertions.
- Removed Warp OZ-based issue/template check workflows.
- Updated CONTRIBUTING.md code references to the latest tag.
