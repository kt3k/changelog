---
date: 2026-05-17
repo: denoland/std
period: weekly
slug: 2026-W20
period_label: "May 11–17, 2026"
size: M
title: "std tightens YAML, dotenv, and data-structure APIs"
excerpt: "This week brought YAML parser performance and API polish, dotenv escape round-tripping fixes, and richer RollingCounter snapshots."
commits: 5
---

### **API polish across data structures and YAML**
`RollingCounter` was brought closer to the other unstable data-structure APIs with explicit iteration, readonly snapshots, `at()` and `toArray()`, plus stricter restore-time validation. In YAML, `parse()`/`parseAll()` now have sharper `SyntaxError` typing and `parseAll()` returns `unknown[]`, making the contract clearer for multi-document input and invalid YAML failures.

### **YAML parsing got a faster, safer mapping write path**
The YAML loader now writes ordinary mapping keys via direct property assignment instead of `Object.defineProperty`, which should reduce V8 overhead during parse and merge operations. The special `__proto__` case still uses the slower descriptor path to avoid prototype pollution, and new regression tests cover merge keys and `__proto__` handling.

### **Dotenv now round-trips escapes more faithfully**
`stringify()` was updated to preserve literal backslash escape sequences before newline, carriage return, and tab characters, while `parse()` now accepts escaped quotes and backslashes inside double-quoted values. Together, these changes fix a class of round-trip bugs where quoted values or escape-like text would be altered on write/read cycles.

### Other misc changes
- Clarified path docs for `basename`, `dirname`, and `extname`, especially around URL handling.
- Added `@throws` notes and guidance for non-`file:` URLs in posix/windows path docs.
