---
date: 2026-10-15
repo: vitejs/vite
size: M
title: "Vite modernizes deps and fixes build/runtime bugs"
excerpt: "TypeScript 7 lands, build import maps and bundled-dev error stacks get fixes, and CSS/url() plus optimizer edge cases are cleaned up."
commits: 10
authors: [sapphi-red, h-a-n-a, Ernesto-tha-great, btea]
commit_authors: {"928e721": sapphi-red, "8d7623d": sapphi-red, "50b382d": Ernesto-tha-great, "11fe1e4": h-a-n-a}
---

### **TypeScript 7 adopted, with workspace guardrails** (928e721)
Vite bumps the repo’s main TypeScript dependency to v7 and adds workspace overrides/package extensions to keep Volar-related packages pinned to TS 6 where needed. That’s a notable toolchain shift, but it’s contained by explicit compatibility constraints.

### **Build handles missing chunk import maps** (8d7623d)
The build pipeline now avoids emitting a broken `importmap.json` when output file names are unhashed, including pure-CSS cases. This fixes a real edge case where chunk import map generation could fail or produce the wrong artifact under custom output naming.

### **Bundled-dev error stacks now map through bundle source maps** (11fe1e4)
Forwarded browser errors in bundled dev are now resolved against the in-memory bundle output, so stack traces point back to the right sources instead of opaque bundle paths. This should make runtime errors much easier to debug in bundled-dev mode.

### **CSS `url()` parsing no longer crashes on literal `%`** (50b382d)
A `%` character that isn’t part of an escape sequence is now preserved in CSS URLs instead of being rejected by `decodeURI`. This fixes valid URLs like `url(./100%.png)` to behave like browsers do.

### Other misc changes
- Migrated linting to Oxlint and removed the old ESLint flat config.
- Swapped `@vercel/detect-agent` for `std-env` in `create-vite`/Vite server detection.
- Fixed optimizer patch-dir hashing for nub lockfiles.
- Updated docs for dynamic import retries and `server.forwardConsole`.
- Tagged bundled-dev skips/todos in playground tests.
- Small test/infra cleanups and dependency bumps (including TypeScript workspace/package updates).
