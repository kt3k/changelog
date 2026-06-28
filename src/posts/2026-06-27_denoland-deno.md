---
date: 2026-06-27
repo: denoland/deno
size: L
title: "Deno desktop goes memory-only, plus key fixes"
excerpt: "Desktop apps now bridge Deno.serve over an in-process channel, with Windows packaging and WASM/LSP fixes alongside a core webidl perf win."
commits: 6
authors: [divybot, bartlomieju, littledivy, Hajime-san]
commit_authors: {"4925b0e": littledivy, "c9a604a": divybot, "3d3dbb4": divybot, "ea86647": Hajime-san, "edbcde8": bartlomieju, "303ba54": bartlomieju}
---

### **Desktop serve drops TCP loopback for in-process memory channels** (4925b0e)
`deno desktop` now serves apps over a named in-memory channel instead of allocating a random localhost port. That removes TCP loopback exposure entirely and bridges webview requests through the new `app://` scheme handler, which should improve startup simplicity and tighten the desktop runtime surface.

### **core/webidl skips repeated `next` lookups in sequence iteration** (ea86647)
The WebIDL sequence converter now reads an iterator’s `next` method once and reuses it for the rest of iteration, matching the ECMAScript iterator record model. That avoids redundant property lookups and can speed up APIs that rely on WebIDL sequences.

### **Desktop packaging stops deleting user directories on name collisions** (edbcde8)
`deno desktop` now marks bundles it created and only auto-removes directories that are empty or clearly its own previous output. If the inferred app name collides with an existing user directory, it now bails instead of risking data loss.

### **Desktop backend/runtime fixes land for Windows** (3d3dbb4)
The desktop toolchain is updated to laufey v0.4.1, which fixes broken `webview` and `raw` backends on Windows. The dev workflow also now resolves Windows executables correctly when locating local laufey builds.

### **LSP watches `.wasm` files for export changes** (c9a604a)
The file watcher glob now includes `.wasm`, so recompiling a local module can invalidate stale type information. This fixes cases where the language server would keep reporting missing exports until the file was deleted and recreated.

### Other misc changes
- Stable formatting fix for multi-line HTML/SVG tagged templates (303ba54)
- Dependency / checksum bumps for laufey and related artifacts
- Desktop runtime dependency updates to support the new in-process serving path
