---
date: 2026-09-15
repo: vitejs/vite
size: S
title: "pnpm trust policy gets a prune exemption"
excerpt: "Vite updated pnpm and changed workspace trust policy handling, keeping only one explicit exclude while enabling prune exemptions."
commits: 1
authors: [btea]
commit_authors: {"bd3a3a9": btea}
---

### Other misc changes
- Enabled `trustPolicyExcludePrune` in the workspace and removed several trust-policy excludes (bd3a3a9).
- Bumped the repo’s pinned package manager from pnpm 12.3.4 to 12.4.1 (bd3a3a9).
- pnpm lockfile refresh to match the package manager update (bd3a3a9).
