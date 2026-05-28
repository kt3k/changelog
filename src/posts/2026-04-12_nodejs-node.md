---
date: 2026-04-12
repo: nodejs/node
size: M
title: "WPT runner docs, DH cleanup"
excerpt: "Node updated WPT runner docs and simplified stateless Diffie-Hellman key handling by dropping legacy validation paths."
commits: 2
authors: [panva]
commit_authors: {"4563cb3": panva, "dfe438d": panva}
---

### **Stateless Diffie-Hellman validation was simplified** (dfe438d)
Node removed a chunk of legacy argument and key-type checks from `crypto.diffieHellman`, tightening the implementation around the newer key-preparation path. The accompanying test cleanup also drops a large obsolete async test file and rewrites the stateless DH coverage to match the new behavior.

### **WPT runner README was expanded and clarified** (4563cb3)
The WPT README was rewritten to better explain how Node’s WPT harness is organized, how status files work, and how to configure `WPTRunner`. It also documents runner APIs like `setFlags`, `setInitScript`, `setScriptModifier`, and `pretendGlobalThisAs`, making the test harness easier to use and extend.

### Other misc changes
- None beyond the two notable changes above.
