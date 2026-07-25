---
date: 2026-07-24
repo: microsoft/typescript-go
size: L
title: "API gains emit support and config access"
excerpt: "New emit/config APIs landed, tuple variance got a panic fix, and VSIX build/release packaging was overhauled."
commits: 6
authors: [andrewbranch, jakebailey, ahejlsberg]
commit_authors: {"8d29e62": ahejlsberg, "498f0c2": andrewbranch, "7da5af5": jakebailey, "5d9209b": andrewbranch, "8962ca9": jakebailey}
---

### **API emit and config discovery added** (498f0c2)
The native-preview API now exposes a proper `ParsedCommandLine` type, plus methods to list config source files and fetch individual config source contents. This makes project/config introspection much more complete for tooling built on top of the server.

### **Emit operations become first-class API surface** (5d9209b)
The API was extended with emit-related types and methods, including emitting to disk or string and forcing JS/declaration emit for selected files. The underlying compiler/server plumbing was updated in parallel, so consumers can now drive emit workflows directly instead of relying on ad hoc internals.

### **Variadic tuple relation check no longer panics** (8d29e62)
Tuple relationship checking now distinguishes rest elements from variable elements correctly and adds a bounds check when comparing tuple positions. This fixes a crash and tightens the error path for mismatched variadic tuple assignments.

### **Configured diagnostic locale is now respected** (d423282)
The language server now tracks locale separately from initialize-time locale and lets user preferences override it, including an explicit `locale` setting. That means TypeScript diagnostics can now follow the configured language more reliably instead of sticking to the startup locale.

### **Release builds can use published platform packages** (7da5af5)
The release pipeline gained a mode to skip local npm package building/signing and instead pack VSIXes from published platform packages. This changes how stable releases are assembled and helps align the extension with published artifacts.

### **Readable build info now includes repopulation details** (8962ca9)
The readable build-info output now serializes repopulation metadata for diagnostics, making incremental/rebuild state easier to inspect. That improves debugability for module-resolution and composite-build edge cases.

### Other misc changes
- Build/release task and packaging updates
- Small API/proto and test adjustments
- Misc. generated baseline updates
