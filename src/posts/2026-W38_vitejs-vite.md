---
date: 2026-09-20
repo: vitejs/vite
period: weekly
slug: 2026-W38
period_label: "Sep 14–20, 2026"
size: M
title: "Rolldown build option fix, deps refresh, and small polish"
excerpt: "This week tightened Rolldown build option merging, refreshed core deps, and shipped a few docs/UI and repo maintenance updates."
commits: 7
---

### **Rolldown build options now preserve comment settings**
Vite now merges `build.rolldownOptions.output.comments` in the correct place when resolving build options, so user comment/minification settings are preserved instead of being lost behind defaults.

### **Rolldown integration refreshed**
Several Rolldown-adjacent packages and pins were updated, including `rolldown`, `rolldown-plugin-dts`, and `tsdown`, along with workspace and lockfile adjustments. An old Vite shim was also removed as part of that alignment.

### **Docs/UI polish and maintenance**
The supported-versions docs input now uses `field-sizing: content` when available, improving the version field’s sizing. The docs also got a small clarification around `optimizeDeps.include` glob support for deep imports.

### Other misc changes
- Enabled `trustPolicyExcludePrune` in the workspace and removed some trust-policy excludes.
- Bumped pnpm from 12.3.4 to 12.4.1 and refreshed the lockfile.
- Updated assorted repo dependencies and CI/tooling pins.
- Minor refactor to the asset-regex constant.
