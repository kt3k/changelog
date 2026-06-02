---
date: 2026-05-20
repo: vitejs/vite
size: M
title: "Pinned GitHub Actions to commit SHAs"
excerpt: "Workflow updates lock official GitHub actions to exact commits, reducing supply-chain risk across CI and release automation."
commits: 1
authors: [sapphi-red]
commit_authors: {"b413bce": sapphi-red}
---

### **Pinned official GitHub Actions to exact SHAs** (b413bce)
This update replaces version tags like `@v6`/`@v9` with pinned commit SHAs across CI, release, and repo automation workflows. It strengthens supply-chain security and makes these workflows less likely to change unexpectedly when upstream actions publish new releases.

### Other misc changes
- Renove/metadata cleanup to support pinning official actions.
- Updated multiple workflow files to use pinned `actions/*` references.
- Removed an exclusion rule from Renovate’s action pinning config.
