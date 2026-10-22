---
date: 2026-10-21
repo: vitejs/vite
size: L
title: "Vite tightens URL handling and resolves edge cases"
excerpt: "A refactor-heavy day: subpath import resolution got stricter, URL conversion was centralized, and build hash behavior was fixed."
commits: 15
authors: [sapphi-red, h-a-n-a, btea, Skn0tt]
commit_authors: {"6116689": sapphi-red, "6f2730e": h-a-n-a, "6c69204": h-a-n-a, "4ddbbc3": h-a-n-a, "0d86b34": btea, "6a02780": Skn0tt, "8e890e1": btea, "197daf6": btea, "0075c4b": btea, "4d16e7c": sapphi-red, "df7b40e": sapphi-red, "a162990": sapphi-red, "446954c": sapphi-red}
---

### **Subpath imports now handle `#` and `?` safely** (0d86b34)
Vite’s package `imports` resolution now searches from the full specifier inward so keys containing extra `#` or `?` are matched correctly, instead of falling back incorrectly. This fixes a real edge case where explicitly blocked import keys could be bypassed or resolved to the wrong target.

### **Build chunk import-map hashes now track preload dependency changes** (4d16e7c)
The build output hash calculation now includes preload dependency membership for chunk import maps, so changing what gets preloaded correctly changes the affected file hashes. That matters for cache correctness: previously, assets could stay hash-stable even when their import map contents changed.

### **Vite’s dev URL handling was centralized around ModuleURL helpers** (446954c, 6116689, df7b40e, a162990)
A broad internal refactor splits import resolution from URL conversion and routes client, HTML, SSR, optimizer, and middleware code through shared ModuleURL/BrowserURL helpers. This reduces duplicated path logic and makes dev-time URL transformations more consistent across the stack.

### **SSR inline source map extraction is faster** (6a02780)
Evaluated module source maps now use a plain string search instead of a regexp when pulling inline maps out of generated code. This is a performance improvement for modules with large inline source maps.

### **Bundled dev gets a charset fix for the fallback page** (197daf6)
The fallback HTML now declares UTF-8 explicitly so the inlined HMR runtime and module script won’t be decoded with a legacy charset in some browsers. This prevents corrupted output on non-UTF-8 default environments.

### **Optimized dep and resolve fallbacks were tightened** (8e890e1, 0075c4b, 6c69204, 8bfe8f, 4ddbbc3, 6f2730e, 981f07f)
- Dependency bump/release: v8.3.5.
- Small optimizer, legacy-plugin, and test-coverage updates, including bundled-dev playground skip adjustments.
