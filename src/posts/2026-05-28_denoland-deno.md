---
date: 2026-05-28
repo: denoland/deno
size: L
title: "VM import fix, CJS exports, and perf wins"
excerpt: "Several high-impact runtime and bundler fixes landed, plus Node/web performance work and CI publish hardening."
commits: 10
authors: [bartlomieju, nathanwhitbot, divybot, nathanwhit]
commit_authors: {"d7c3971": nathanwhit, "1b13e56": nathanwhitbot, "d2531ce": nathanwhitbot, "4c7d2cb": nathanwhitbot, "3ebf650": divybot, "fd5c160": bartlomieju, "bc6fb01": bartlomieju, "f762272": bartlomieju, "6683f4b": bartlomieju, "007bda5": divybot}
---

### **Fix node:vm dynamic import missing-callback behavior** (3ebf650)
`node:vm` now marks scripts/functions/modules compiled without an `importModuleDynamically` callback so dynamic `import()` fails with `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`, matching Node and closing a sandbox escape path. This also threads the new host-defined-options kind through the runtime and adds dedicated coverage.

### **Re-export named exports from `require(X).Y` CJS wrappers** (fd5c160)
Deno’s CommonJS analyzer now recognizes `module.exports = require("./inner").Y` as a member-shape re-export, not just bare `require(X)` assignments. That fixes missing named exports for packages with this entrypoint pattern, including cases like `graphql-tag`, so ESM imports can resolve the expected symbols.

### **Speed up Node HTTP header parsing and building** (1b13e56)
The llhttp binding now bulk-builds the header array with V8 array elements instead of setting each index one by one, and trims trailing header OWS in place instead of allocating a copied slice. This reduces request parsing overhead and aligns more closely with Node’s header handling.

### **Reduce web Brotli CompressionStream binary size** (d2531ce)
The web Brotli `CompressionStream` path was reworked to use a raw encoder state instead of the previous wrapper-based encoder. That removes a monomorphization-heavy code path while preserving streaming behavior and output, shaving binary size without touching the HTTP/Node Brotli implementations.

### **Stop CSS side-effect imports from tripping the LSP** (bc6fb01)
The LSP now reports `.css` resolutions to TypeScript as `.js`, matching the CLI typecheck path. This prevents false-positive TS6263 diagnostics on imports like `import "./styles.css";` in editors.

### **Replace bundle HTML rewriting dependency with a custom scanner** (4c7d2cb)
The bundler no longer depends on `lol_html` for its limited HTML rewriting needs; it now uses a purpose-built parser/scanner for script collection, script removal, and head injection. This is a substantial internal refactor that trims dependencies and broadens coverage for malformed or edge-case HTML.

### **Harden npm_publish for pnpm 11** (f762272)
The npm publish workflow was updated to accommodate stricter pnpm 11 behavior and to validate installs through the actual `deno` binary where possible. It also adds explicit build अनुमति markers for postinstall cases so the release pipeline keeps passing under newer pnpm rules.

### Other misc changes
- Ignore flaky `internet/test-dns-any.js` in node_compat CI (d7c3971)
- npm_publish workflow follow-up fixes for pnpm path/config handling (6683f4b, 007bda5)
