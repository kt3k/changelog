---
date: 2026-03-16
repo: oven-sh/bun
size: S
title: "Bun.CSRF gets first-class docs"
excerpt: "Bun adds full documentation for its CSRF token API and surfaces it in the docs nav and API overview."
commits: 1
authors: [robobun]
commit_authors: {"31e0c9c": robobun}
---

### **Bun.CSRF finally gets documented** (31e0c9c)
Bun now has a dedicated docs page for `Bun.CSRF.generate()` and `Bun.CSRF.verify()`, with examples and parameter tables covering secrets, encoding, algorithms, and expiration. It also shows up in the Utilities sidebar and the runtime API overview, making the existing API discoverable.

### Other misc changes
- Docs navigation updated to include CSRF
- Bun APIs overview table updated for CSRF Protection
