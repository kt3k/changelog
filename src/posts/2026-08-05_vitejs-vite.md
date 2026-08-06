---
date: 2026-08-05
repo: vitejs/vite
size: M
title: "Bundled dev fixes HTML injection order"
excerpt: "Vite fixes bundled-dev HTML script ordering, updates HTML e2e coverage, and drops an obsolete release-age exclude."
commits: 3
authors: [h-a-n-a, btea]
commit_authors: {"d62b336": btea, "ad55e34": h-a-n-a, "eac0cc8": h-a-n-a}
---

### **Bundled dev now injects its client runtime before chunk scripts** (eac0cc8)
The bundled dev server now prepends the dev client module in HTML before other chunk scripts, which should ensure the runtime is available earlier during serve mode. The change also centralizes the client filename constant and removes the old entry-script prefixing logic from the bundled output path.

### **HTML playground coverage now reflects bundled vs unbundled behavior** (ad55e34)
The HTML e2e test now keys off bundled-dev mode instead of generic build/serve checks, and its expectations were updated to match the current injected copy. It also tightens a couple of assertions and re-enables the HTML playground in the bundled-dev test matrix.

### Other misc changes
- Removed an outdated `minimumReleaseAgeExclude` entry from pnpm workspace config (d62b336)
