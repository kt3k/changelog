---
date: 2026-05-31
repo: denoland/std
period: monthly
slug: 2026-05
period_label: "May 2026"
size: L
title: "Std adds faster routing, safer parsers, and API polish"
excerpt: "May brought HTTP routing performance, tighter parsing semantics, safer types, and small but important runtime fixes across std."
commits: 17
---

### **HTTP unstable routes get a radix-tree dispatcher**
`route()` now aliases a new `routeRadix()` implementation that dispatches static, parametric, and wildcard routes in O(segments) time. The older linear matcher remains available for compatibility and still handles complex `URLPattern` cases, so this is a performance win without a behavior break for existing edge cases.

### **HTML and cookie helpers expand the HTTP/text surface**
A new `html()` template tag landed in `@std/html/unstable-html` for trusted string concatenation, complementing the existing escaping helper. In `@std/http`, `getCookies()` now has a safer `Partial<Record<string, string>>` return type, reflecting that missing cookie keys are possible at compile time.

### **Parsing APIs became stricter and more spec-aligned**
Several parsers tightened their public contracts: YAML `parse()`/`parseAll()` now type warning callbacks as `SyntaxError` and better describe multi-document returns, Cache-Control parsing now accepts quoted numeric values and validates token fields more rigorously, and dotenv round-tripping preserves quoted escapes and literal backslash sequences correctly. XML docs were also clarified around XML 1.1 and the default DOCTYPE rejection behavior.

### **Data structures and encoding got correctness upgrades**
`RollingCounter` gained `at()` and `toArray()`, readonly snapshots, explicit iteration, and stricter restore-time validation. Separately, `encodeVarint()` now rejects values above `uint64` before writing and handles undersized buffers more predictably, preventing silent truncation and making errors explicit.

### **Performance and compatibility cleanup across std**
YAML mapping writes now use direct property assignment for normal keys, avoiding `Object.defineProperty` overhead while still guarding `__proto__` for prototype pollution safety. Timer-related typings were updated for canary compatibility, and the Unicode title-case data was moved out of JSON imports to improve bundler portability.

### Other misc changes
- Path docs clarified URL handling and error cases for `basename`, `dirname`, and `extname`
- Release prep, version bumps, and export/test updates across packages
- Small docs and typo fixes in XML and slugify packages
- Regression tests added for parser edge cases, route behavior, timers, and buffer limits
