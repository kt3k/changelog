---
date: 2026-03-20
repo: oven-sh/bun
size: L
title: "Bun adds WebView and fixes runtime crashes"
excerpt: "Headless browser automation lands, standalone Linux binaries get a new embedding path, and Bun patches two crashers plus a CookieMap bug."
commits: 7
authors: [robobun, Jarred-Sumner, alii, dylan-conway]
commit_authors: {"010dfa1": Jarred-Sumner, "9933f7a": robobun, "581d45c": robobun, "66f7c41": dylan-conway}
---

### **Bun.WebView brings native headless browser automation** (010dfa1)
Bun adds a new `Bun.WebView` API with both WebKit and Chrome backends, enabling built-in browser automation without external tooling. The TypeScript surface and runtime plumbing are extensive, and the Chrome backend can auto-detect an installed browser or be pointed at one explicitly.

### **Standalone Linux binaries now use an ELF section for embedded graphs** (66f7c41)
Standalone executables on Linux no longer need to read their own file from `/proc/self/exe` to recover the embedded module graph, which previously broke on execute-only binaries. The new `.bun` ELF section approach matches the existing macOS and Windows strategies and avoids runtime file I/O.

### **Fix CookieMap.toJSON() for numeric and reserved property names** (9933f7a)
`CookieMap.toJSON()` could crash when cookie names looked like array indices, because it used a property setter that rejects indexed keys. The fix switches to the index-safe path and adds coverage for numeric names and names like `toString` and `constructor`.

### **Prevent invalid server.url URLs from crashing Bun** (581d45c)
Bun now correctly returns a JS exception when `server.url` would produce an invalid URL string instead of dereferencing a null DOMURL cell. This closes a crash path triggered by malformed unix socket inputs.

### Other misc changes
- Reverted the ASAN skip for `serve-body-leak` tests, then re-added it in a follow-up.
- Deflake `bake/dev/css.test.ts` with retry and error-handling improvements.
- Revert a temporary `serve-body-leak` test deflake adjustment.
