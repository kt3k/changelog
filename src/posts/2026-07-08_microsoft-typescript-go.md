---
date: 2026-07-08
repo: microsoft/typescript-go
size: M
title: "Type checks tighten, expando emit fixed"
excerpt: "TypeScript-Go fixes nullable API returns, improves declaration emit for late-visible expando functions, and flips main to 7.1 nightlies."
commits: 3
authors: [andrewbranch, UditDewan, jakebailey]
commit_authors: {"d35cc5f": andrewbranch, "066b695": UditDewan}
---

### **Fix return types that can’t actually be undefined** (d35cc5f)
The native preview checker API now guarantees types/signatures instead of returning `undefined`/`null`, and callers use error/unknown sentinels to represent unresolved results. This is a meaningful API cleanup that should reduce defensive checks and better match the underlying checker behavior.

### **Emit expando properties for late-visible declaration functions** (066b695)
Declaration emit now tracks expando assignments whose host wasn’t visible at collection time and reprocesses them if the host becomes visible later. That fixes missing `.propTypes`-style output for functions that only become visible late in emit, which affects public declaration files.

### Other misc changes
- Switched main branch release plumbing to 7.1 nightly builds and bumped the dev version to `7.1.0-dev`.
- VSIX/package naming and status bar text adjustments for the nightly release flow.
