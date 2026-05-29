---
date: 2026-05-28
repo: denoland/deno
size: L
title: "Deno tightens vm, npm, and web internals"
excerpt: "Security hardening for vm imports, CJS export analysis fixes, CSS LSP resolution, plus perf wins in HTTP and Brotli."
commits: 10
authors: [bartlomieju, nathanwhitbot, divybot, nathanwhit]
commit_authors: {"1b13e56": nathanwhitbot, "d2531ce": nathanwhitbot, "3ebf650": divybot, "fd5c160": bartlomieju, "bc6fb01": bartlomieju}
---

### **Block sandbox escapes from vm dynamic imports** (3ebf650)
`node:vm` now marks scripts compiled without an `importModuleDynamically` callback so dynamic `import()` throws `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING` instead of falling through to the main loader. That closes a sandbox escape path where VM code could reach host modules like `node:fs`.

### **Expose `module.exports = require(X).Y` as a real re-export** (fd5c160)
Deno's CJS analyzer now recognizes the common member-access form and narrows the wrapper's named exports based on the inner member's statically known properties. This fixes packages whose entrypoints export through `require(...).Y`, including cases that previously lost named exports at import time.

### **Make CSS side-effect imports resolve cleanly in the LSP** (bc6fb01)
The language server now reports `.css` resolutions to TypeScript as `.js`, matching the CLI typecheck path and avoiding TS6263 squiggles on imports like `import "./styles.css";`. This removes an editor-only false positive without changing runtime behavior.

### **Speed up llhttp header handling and match Node's trimming** (1b13e56)
The Node HTTP binding now bulk-builds the header array instead of setting each V8 element one by one, which cuts overhead on request parsing. It also trims trailing header OWS in place and adds a regression test for whitespace-surrounded header values.

### **Shrink web Brotli CompressionStream output size** (d2531ce)
The web Brotli `CompressionStream` path was rewritten to use a raw Brotli encoder state instead of the wrapper that caused extra monomorphization. The change keeps streaming behavior intact while reducing binary size.

### Other misc changes
- Replaced `lol_html` in bundle HTML rewriting with a custom scanner and removed the dependency.
- CI/npm_publish fixes for pnpm 11 strictness and global bin PATH handling.
- Ignored a flaky node_compat DNS test in CI.
