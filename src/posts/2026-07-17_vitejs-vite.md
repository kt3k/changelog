---
date: 2026-07-17
repo: vitejs/vite
size: L
title: "Vite adds top-level input and smarter build URLs"
excerpt: "New top-level input support, native-loader config warnings, realpath root resolution, and CSS import-map fixes landed."
commits: 5
authors: [sapphi-red, DebadityaHait, Xavrir]
commit_authors: {"e16ff3a": DebadityaHait, "55bba7b": sapphi-red, "9beae37": sapphi-red, "78accc4": Xavrir, "05302b0": sapphi-red}
---

### **Top-level `input` now drives build, SSR, and dep scanning** (9beae37)
Vite now accepts a top-level `input` config and uses it as the default entry for build, library mode, SSR when `build.ssr` is `true`, and dependency pre-bundling when explicit entries aren’t set. This simplifies non-HTML apps by letting you declare entry points once instead of repeating them across build options.

### **Config loading now warns when native loader can’t handle a config** (05302b0)
Vite added compatibility warnings for config files that use Node-incompatible features under `--configLoader native`, including patterns like `__dirname`, `__filename`, extensionless imports, JSON imports, and TypeScript syntax. This makes it clearer when a config will fail or behave differently under native loading.

### **CSS chunks are now mapped correctly in chunk import maps** (e16ff3a)
Build output now rewrites chunk import maps so extracted CSS sidecars stay attached to the right JS chunk filenames, including dynamically imported CSS and direct-dynamic cases. That fixes broken references and avoids stale cached JS pointing at missing or incorrect CSS assets.

### **Vite now resolves the project root to its real path** (55bba7b)
`resolveConfig` now realpaths `root` before normalizing it, so cache and output paths are based on the canonical filesystem location. This prevents subtle mismatches when the project is reached through symlinks or other aliasing.

### **Dev server URLs now show interface names** (78accc4)
Network URLs printed by the dev server are now annotated with their network interface name, making it easier to tell which address belongs to which adapter. The logger also handles alignment and truncation for long interface names.

### Other misc changes
- Updated docs for the new `input` option and adjusted build/backend integration examples
- Added tests for config native-loader warnings and network URL labeling
- Updated changelog/license metadata and assorted test fixtures
