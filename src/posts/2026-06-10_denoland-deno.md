---
date: 2026-06-10
repo: denoland/deno
size: L
title: "Permissions, HTTP, and Node fixes land"
excerpt: "Notable fixes for permission checks, HTTP semantics, node:vm lifetime safety, and npm metadata fetching, plus test coverage updates."
commits: 13
authors: [divybot, crowlbot, bartlomieju, nathanwhit, lowlighter]
commit_authors: {"2655d44": bartlomieju, "2a9b192": bartlomieju, "48a9cfc": lowlighter, "46ac9d3": divybot, "ea65f25": crowlbot, "ee59874": crowlbot, "43e8962": crowlbot, "84a6342": crowlbot, "63d8687": divybot, "caf69f8": divybot, "1e9e951": divybot, "fd8f9dc": nathanwhit, "eb44004": nathanwhit}
---

### **Fix permission checks for non-recursive path ops** (2655d44)
Deno now allows single-path reads and writes like `stat`, `open`, `readFile`, `writeFile`, and `readDir` even when a denied subtree exists underneath the queried path. The change keeps recursive deletes strict so `remove(..., { recursive: true })` still fails if it would descend into a denied descendant.

### **Keep `node:vm` context wrappers alive with their contexts** (2a9b192)
This fixes a GC/lifetime bug where a contextified wrapper could be collected while the underlying `v8::Context` was still live, leaving a dangling pointer behind. The wrapper is now anchored on the context’s global object, preventing use-after-free in interceptors and wasm code-gen callbacks.

### **Forward shebang permissions into `deno test --doc`** (48a9cfc)
Doc tests now inherit permissions from shebangs, matching the behavior users expect from normal script execution. That closes a gap where `--doc` could ignore permission requirements embedded in the source.

### **Make `deno outdated` send npm’s metadata Accept header** (46ac9d3)
Metadata fetches now use the same npm-style `Accept` header as install resolution, which fixes private/self-hosted registries that content-negotiate or redirect non-npm clients. The update also preserves `minimumDependencyAge` behavior by avoiding the abbreviated packument when a date filter is configured.

### **Prefer Brotli when compression quality ties** (1e9e951)
HTTP compression selection now breaks equal q-value ties in favor of Brotli instead of whichever encoding appeared first. That better matches modern client expectations and improves response compression decisions for headers that advertise multiple encodings, including zstd.

### **Preserve empty multipart filenames as files** (63d8687)
Multipart parsing now treats `filename=""` as a file part rather than falling back to a text field. This aligns Deno with browser behavior for unselected file inputs and fixes empty-file uploads in `FormData`.

### **Join split request headers consistently** (eb44004)
HTTP header merging now uses `; ` for `Cookie` everywhere, including single-header getters, instead of mixing in comma-joining for one code path. That keeps `req.headers.get("cookie")`, iteration, and framework cookie parsing consistent.

### Other misc changes
- Re-enable flaky Windows fetch tests (ea65f25)
- Export `runMain` from `node:module` (ee59874)
- Suppress misleading `only` notices when a test already fails (43e8962)
- Improve lint plugin load errors to name the offending plugin (84a6342)
- Fix Windows trailing-space path normalization in `deno info`/`deno run` (caf69f8)
- Add focused HTTP/2 serve request coverage (fd8f9dc)
- HTTP compression test/support refactors and coverage updates (1e9e951, eb44004, 46ac9d3, 48a9cfc, 2655d44, 2a9b192, 63d8687, caf69f8)
