---
date: 2026-06-04
repo: denoland/deno
size: L
title: "Deno hardens Jupyter, fixes npm/TS edge cases"
excerpt: "LSP gains doc-lint diagnostics and test-step debug lenses, while Jupyter auth and npm/Node resolution get important fixes."
commits: 7
authors: [divybot, bartlomieju]
commit_authors: {"4b2ac61": divybot, "b89147b": divybot}
---

### **LSP now surfaces `deno doc --lint` warnings** (4b2ac61)
The language server now reports `deno doc --lint` findings as editor diagnostics for published package entrypoints, including missing JSDoc, explicit types, and return types. That lets package authors catch public-API documentation issues directly in the editor instead of discovering them only at publish time.

### **Type-checking now treats eligible npm `.d.ts` files as ESM** (b89147b)
Deno’s resolver now looks beyond the nearest `package.json` `
