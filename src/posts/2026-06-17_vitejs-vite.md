---
date: 2026-06-17
repo: vitejs/vite
size: M
title: "Rolldown compat, CI freshness tweak"
excerpt: "Vite keeps build option proxies intact, tightens ecosystem CI freshness checks, and loosens Rolldown pinning."
commits: 3
authors: [sapphi-red]
commit_authors: {"3527191": sapphi-red, "9928722": sapphi-red, "0d4a81f": sapphi-red}
---

### **Keep build options as live proxies** (3527191)
`resolveBuildEnvironmentOptions()` now reapplies the rollup/rolldown compatibility setup after building the resolved config, so `rollupOptions` stays a getter-backed view instead of becoming a frozen data property.
This fixes cases where updating `rolldownOptions` or `rollupOptions` would otherwise drift apart across the main, client, and SSR build configs.

### **Use the head commit date in ecosystem CI freshness checks** (0d4a81f)
The `/ecosystem-ci` trigger now fetches the PR head commit and compares its committer date against the comment timestamp, rather than relying on the PR's `pushed_at` field.
That makes the warning more accurate when deciding whether the branch was updated after the command was posted.

### Other misc changes
- Rolldown dependency range changed from exact `1.1.1` to `~1.1.1` across root, package, and playground manifests (9928722)
