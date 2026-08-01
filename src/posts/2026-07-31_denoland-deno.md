---
date: 2026-07-31
repo: denoland/deno
size: M
title: "Redirect auth handling fixed in Deno HTTP client"
excerpt: "Deno now preserves stripped redirect headers across hops, preventing Authorization from being accidentally restored mid-chain."
commits: 1
authors: [nathanwhit]
commit_authors: {"fbe07f1": nathanwhit}
---

### **Preserve stripped headers across redirect chains** (fbe07f1)
Deno’s HTTP client now carries redirect headers forward as chain state instead of rebuilding them from the original request on each hop. This fixes a bug where an `Authorization` header removed on one redirect could be accidentally restored on later redirects, while still preserving same-origin and same-host upgrade behavior.

### Other misc changes
- Added a deterministic multi-hop redirect test using ephemeral local listeners.
