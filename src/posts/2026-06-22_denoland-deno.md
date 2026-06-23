---
date: 2026-06-22
repo: denoland/deno
size: L
title: "Deno adds list, changed tests, and major runtime fixes"
excerpt: "New dependency listing and selective test flags land alongside Wasm, node:test, pack, desktop, and module-hook fixes."
commits: 9
authors: [bartlomieju, littledivy, divybot, nathanwhitbot, lunadogbot]
commit_authors: {"0e13f2c": divybot, "755552e": bartlomieju, "faa2dd2": littledivy, "77f9001": bartlomieju, "f3acb84": bartlomieju, "893d85b": nathanwhitbot, "be1723a": lunadogbot, "a6f2917": bartlomieju, "27a90a3": littledivy}
---

### **Deno gets a new `list` command for declared deps** (755552e)
`deno list` now inspects dependencies declared in `deno.json` / `package.json`, rather than walking an entrypoint’s module graph like `deno info`. It supports tree depth, prod/dev filtering, recursive workspace listing, and name filters, giving users a package-oriented dependency view similar to `npm ls`.

### **Selective test runs arrive with `--changed` and `--related`** (be1723a)
`deno test` can now run only tests affected by git changes or by a set of source files, bringing Vitest-style dependency-aware selection to one-shot test runs. That’s a meaningful workflow improvement for larger repos, especially when iterating on a small slice of code.

### **Wasm ESM exports now unwrap globals correctly** (f3acb84)
Importing `.wasm` modules now returns the underlying value for global exports instead of exposing raw `WebAssembly.Global` wrappers. This fixes a spec mismatch and aligns Deno with Node’s behavior for Wasm ESM integration, including cases with `v128` globals.

### **`node:test` nested top-level tests are routed as subtests** (a6f2917)
Top-level `test()`/`it()` calls made inside another `node:test` body now attach to the running test instead of throwing a nested-test error. The polyfill also drains those routed subtests before the parent settles, which should improve compatibility with real-world suites like fastify.

### **`deno pack` now includes published assets** (893d85b)
Pack now collects non-module files matched by `publish.include` and ships them in the tarball, so static assets like SVGs no longer get dropped. That closes a packaging gap between `deno pack` and `deno publish`.

### **`module.registerHooks()` gets full import-attribute context** (77f9001)
Node ESM hooks now receive the full `with { ... }` import attributes during resolve/load, instead of only the `type` attribute. The load path also preserves hook-supplied module formats and falls back to import attributes when needed, improving compatibility for custom loaders.

### **Desktop app bundles can now be compressed** (27a90a3)
`deno desktop --compress [xz|zstd]` adds self-extracting app bundles that ship the runtime/UI payload compressed and unpack on first launch. This can dramatically shrink distribution size, with a tradeoff of one-time startup decompression.

### **Wayland support lands for desktop webview/CEF backends** (faa2dd2)
The desktop runtime now picks up a `laufey` bump that adds native Wayland support for both the webview and CEF backends on Linux. That removes the old X11/XWayland limitation for those backends.

### **JSDoc event tags are now documented in `deno doc`** (0e13f2c)
`deno doc` and `deno doc --json` now understand `@event`, `@fires` / `@emits`, and `@listens` tags. That improves API documentation for event-driven classes, especially `EventTarget`-style code.

### Other misc changes
- Desktop packaging dependency bump for `laufey`.
- JSDoc event-tag test coverage added.
- Various parser, flag wiring, and fixture updates for the new CLI features.
- Minor internal test/output updates across the touched subsystems.
