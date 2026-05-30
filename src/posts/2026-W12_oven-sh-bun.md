---
date: 2026-03-22
repo: oven-sh/bun
period: weekly
slug: 2026-W12
period_label: "Mar 16–22, 2026"
size: L
title: "Bun adds cron and WebView while hardening runtime crashes"
excerpt: "New scheduling and browser APIs landed, alongside key fixes for MySQL, DNS caching, FFI, debug tooling, and embedded-executable stability."
commits: 30
---

### **New platform APIs: cron scheduling and browser automation**
Bun shipped two notable runtime additions this week: `Bun.cron` for registering, removing, and parsing OS-level cron jobs, and `Bun.WebView` for native headless browser automation with WebKit and Chrome backends. Both come with runtime plumbing, TypeScript surfaces, and docs/tests, making them first-class APIs rather than experimental edges.

### **Docs and discoverability improved for core utilities**
`Bun.CSRF.generate()` and `Bun.CSRF.verify()` now have a dedicated docs page, sidebar placement, and API table coverage, making the CSRF helpers much easier to find and use. Cron docs also got formatting and admonition cleanup later in the week.

### **Crash fixes and correctness patches across runtime APIs**
A set of important bug fixes landed across networking, FFI, and validation paths: MySQL capability negotiation now matches what servers actually support, DNS cache entries can expire correctly, tagged templates preserve embedded null bytes, and invalid `server.url` values return exceptions instead of crashing. Bun also hardened `CookieMap.toJSON()` for numeric and reserved names, and fixed `FD.fromJSValidated` so huge floats no longer panic the runtime.

### **Bundler and debugger stability improved**
The bundler no longer crashes when `--compile` mixes CSS and JS entry points, and it now preserves namespace imports through barrel re-exports. Debugger mode also disables the runtime transpiler cache so source maps and breakpoints stay aligned, while hot-reload test handling was tightened to avoid stderr buffering hangs.

### **Standalone binaries and engine updates**
Standalone Linux binaries now use an ELF `.bun` section for embedded graphs instead of reading `/proc/self/exe`, improving compatibility with execute-only binaries. Bun also bumped its bundled WebKit/JavaScriptCore revision twice during the week, with follow-up binding updates and test adjustments to keep internals in sync.

### **Other misc changes**
- Security scanner install failures now emit useful diagnostics
- macOS Next.js/Puppeteer tests switched to `headless: "shell"` to avoid Gatekeeper issues
- Several deflake and test-harness cleanup changes landed across CI and integration tests
- Misc docs fixes corrected stale comments and SQLite WAL sidecar descriptions
