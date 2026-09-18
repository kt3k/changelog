---
date: 2026-09-17
repo: denoland/std
size: L
title: "Std stabilizes APIs and hardens parsers"
excerpt: "Text truncate and YAML stringify graduate, with IP parsing, retry, serveDir, and JSONC fixes rounding out a busy day."
commits: 15
authors: [tomas-zijdemans, bartlomieju]
commit_authors: {"01fe755": tomas-zijdemans, "6c1f55f": tomas-zijdemans, "2e96f53": tomas-zijdemans, "17ffe9c": tomas-zijdemans, "d7afd1a": tomas-zijdemans, "52c68df": tomas-zijdemans, "491f4c0": bartlomieju}
---

### **truncate() is now stable** (01fe755)
`@std/text/unstable-truncate` was renamed to `@std/text/truncate` and re-exported from the text module. The docs and examples were updated, making the API officially stable and easier to discover.

### **YAML `stringify()` stabilizes `quoteStyle`** (6c1f55f)
The `quoteStyle` option moved from the unstable entrypoint into stable `@std/yaml/stringify`. This lets callers control single vs. double quotes without relying on the unstable module.

### **IPv4/IPv6 parsing now follows the URL standard** (d7afd1a)
`unstable_ip` was expanded with dedicated `parseIPv4()` and `parseIPv6()` helpers and `isIPv4()` now delegates to the parser. The implementation now rejects legacy IPv4 forms and zone IDs, aligning the behavior with the WHATWG URL parsing rules and tightening correctness.

### **`retry()` gains caller-controlled backoff delays** (52c68df)
A new unstable `getDelay` option lets callers override the wait before each retry, while still using the existing backoff calculation as input. This is useful for honoring server-driven retry timing like `Retry-After` without reimplementing the retry loop.

### **`serveDir()` blocks percent-encoded backslash traversal** (491f4c0)
The file server now rejects paths containing backslashes after URL decoding and adds a second containment check before serving files. It also introduces a more explicit dotfile mode, closing a Windows-specific traversal/dotfile disclosure gap.

### **JSONC unterminated strings now fail cleanly** (17ffe9c)
The parser now reports an unexpected end-of-input error when a string never closes, instead of silently running off the end. That makes malformed JSONC easier to diagnose and fixes an error-reporting bug.

### **BinarySearchTree/RedBlackTree now accept array-like inputs** (2e96f53)
`from()` on both tree types now handles array-like objects via `Array.from()`, not just true iterables. The added tests show it works for empty array-likes, duplicates, and custom comparators.

### Other misc changes
- Documentation updates for UUID v7 monotonicity and UUID v1 examples
- RedBlackTree docs rewritten to match sibling APIs
- JSONC test harness now compares parsed values
- Deno config and lint-rule updates
- ServeDir test expansion for dotfile and traversal cases
- Markdown/code-fence documentation note
