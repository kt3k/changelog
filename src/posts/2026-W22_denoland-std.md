---
date: 2026-05-31
repo: denoland/std
period: weekly
slug: 2026-W22
period_label: "May 25–31, 2026"
size: M
title: "HTTP routing, HTML helper, and varint safety improved"
excerpt: "This week brought a faster HTTP router, a new unsafe HTML template helper, tighter HTTP parsing, and safer varint encoding."
commits: 11
---

### **HTTP routing gets a radix-tree fast path**
`@std/http/unstable` now uses `routeRadix()` as the default router for static, parametric, and wildcard routes, improving dispatch to O(segments) while preserving the old linear matcher for complex `URLPattern` cases. This keeps compatibility while making common routing significantly faster.

### **New HTML template helper for trusted strings**
`@std/html/unstable-html` gained `html()`, a template-literal tag for concatenating HTML without escaping. It’s explicitly unsafe for untrusted input, but pairs with `escape()` to give consumers a lightweight helper for trusted templates.

### **HTTP parsing and types got stricter**
Cache-Control parsing now handles quoted numeric values and quoted-pair unescaping more faithfully to RFC 9111, while also validating `no-cache` and `private` field names as proper tokens. In `getCookies()`, the return type was corrected to `Partial<Record<string, string>>`, so TypeScript now reflects that missing cookies are actually missing.

### **Text and XML APIs were made more portable and clearer**
Unicode title-case data was moved out of JSON imports into generated TypeScript, avoiding bundler and JSR import-attribute issues. XML docs were also expanded to cover XML 1.1 support and the default rejection of DOCTYPE declarations.

### **Varint encoding now fails safely on overflow**
`encodeVarint()` now checks for values above `uint64` before writing and stops cleanly at the actual buffer length, returning clearer errors for undersized buffers instead of silently truncating data.

### Other misc changes
- Release prep and version bumps across std packages
- `collections/interleave` was stabilized and exports/tests updated
- Fixed publish-time import resolution in `http/unstable_message_signatures`
- Minor docs and type wording fixes in text and XML packages
