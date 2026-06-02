---
date: 2026-05-26
repo: microsoft/typescript-go
size: M
title: "Type emit fixes and smarter path completions"
excerpt: "Fixes declaration emit for keyword property names, avoids stale type-node caching during expansion, and improves partial-path import completions."
commits: 3
authors: [gabritto, a-tarasyuk]
commit_authors: {"c54ff7c": a-tarasyuk, "2f91510": gabritto, "a4c6528": gabritto}
---

### **Fix declaration emit for property names like `new`** (c54ff7c)
Declaration emit now treats property names more carefully, especially method names like `new`, so they don’t accidentally round-trip into the wrong kind of signature. The change also aligns reused names with freshly built nodes, fixing emit consistency for keyword-like property names.

### **Avoid reusing cached type nodes while expanding** (2f91510)
Type-to-node conversion no longer relies on the cached serialized form when the checker is in expansion mode. This prevents stale results from skipping the logic needed to decide whether expansion depth can increase, which should make hover/type string output more reliable.

### **Strip matching prefixes in path mapping completions** (a4c6528)
Path completions now handle partial module paths better by removing the already-typed prefix before suggesting matches. This improves import completion results for both relative paths and package subpaths, especially in bundler-style module resolution.

### Other misc changes
- Added/updated fourslash coverage for quickinfo verbosity changes.
- Test baseline updates for declaration emit and quickinfo behavior.
