---
date: 2026-06-03
repo: vitejs/vite
size: M
title: "Type-safety, sourcemaps, and glob fixes"
excerpt: "Stronger import-glob typings, a path-segment glob base fix, and optimized dep sourcemap preservation landed alongside a lexer bump."
commits: 5
authors: [nicolo-ribaudo, nathanhleung, jiyujie2006, Andarist, i62navpm]
commit_authors: {"1298951": Andarist, "cc39e55": nathanhleung, "eb12604": jiyujie2006}
---

### **Preserve sourcemaps for optimized deps with follow-up transforms** (1298951)
Vite now writes optimized dependency bundles with hidden sourcemaps and reads the generated `.map` file back when serving them. This should keep stack traces and debugging accurate even when optimized deps go through extra transforms.

### **Add more precise `importGlob` typing for known queries** (cc39e55)
The `importGlob` types now distinguish known `query` values like `?raw` from unknown ones, and export the new `KnownQueryTypeMap`. That makes the return type better reflect `eager`, `as`, and query combinations, improving type inference for users.

### **Fix `import.meta.glob` common-base detection by path segment** (eb12604)
`getCommonBase()` no longer treats path prefixes as shared directories, so patterns like `/a/foo/*.js` and `/a/foobar/*.js` correctly resolve only to `/a`. This avoids incorrect base calculation when glob roots merely share a string prefix.

### Other misc changes
- Bumped `es-module-lexer` to 2.0.0.
- Clarified `loadEnv()` docs to say it merges matching `process.env` values.
