---
date: 2026-05-26
repo: denoland/std
size: L
title: "HTTP and text APIs level up"
excerpt: "A new radix router and HTML tag helper headline the day, alongside HTTP parsing fixes, API stabilization, and release churn."
commits: 10
authors: [tomas-zijdemans, bartlomieju, denobot, esroyo, MukundaKatta, iuioiua, lionel-rowe]
commit_authors: {"3185156": tomas-zijdemans, "cc95981": esroyo, "908245d": tomas-zijdemans, "95eb264": MukundaKatta, "d84b0ed": tomas-zijdemans, "92d3075": iuioiua}
---

### **Radix tree router added for HTTP unstable routes** (cc95981)
`routeRadix()` introduces O(segments) dispatch for static, parametric, and wildcard routes, with complex `URLPattern` cases still falling back to linear matching in insertion order. The old behavior is preserved via `routeLinear()` and `route` now aliases the new radix router, making this both a performance upgrade and a compatibility-conscious refactor.

### **`html()` lands in `@std/html/unstable-html`** (92d3075)
A new template-literal tag for concatenating HTML strings without escaping has been added, along with docs and tests. It’s intentionally unsafe for untrusted content, but gives consumers a simple helper for trusted templates and pairs with the existing `escape()` API for sanitization.

### **Cache-Control parsing now matches RFC 9111 more closely** (908245d)
The parser now accepts quoted-string numeric arguments, unescapes quoted-pairs correctly, and validates `no-cache`/`private` field names as proper HTTP tokens. That tightens spec compliance and closes a class of malformed-header edge cases that previously slipped through.

### **`getCookies()` type now reflects missing keys** (95eb264)
`getCookies()` now returns `Partial<Record<string, string>>` instead of claiming every cookie name is present. Runtime behavior didn’t change, but TypeScript users now get safer `undefined` handling for absent cookies instead of relying on an unsound return type.

### **Title-case data stops relying on JSON imports** (d84b0ed)
The Unicode title-case mapping was inlined into a generated TypeScript module rather than imported from JSON. This avoids JSR JSON import-attribute issues in bundlers like Vite and should make the text utilities more portable across build setups.

### **XML docs now cover XML 1.1 and DOCTYPE defaults** (3185156)
The XML package documentation now explains the optional `xmlVersion: "1.1"` mode and clarifies that DOCTYPE declarations are rejected by default unless explicitly allowed. It’s documentation-only, but important for consumers who need to understand parser behavior and security defaults.

### Other misc changes
- Release prep across std packages and version bumps (1 commit)
- Stabilized `collections/interleave` and updated exports/tests
- Fixed `http/unstable_message_signatures` publish-time import resolution
- Docs typo fix in `text/unstable_slugify`
- XML option wording tweak in types
