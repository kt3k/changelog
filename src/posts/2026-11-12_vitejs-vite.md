---
date: 2026-11-12
repo: vitejs/vite
size: L
title: "Vite tightens dev safety and CLI locking"
excerpt: "Added process locks, per-environment safe-module handling, stricter fs access, and a batch of escaping fixes plus source-map polish."
commits: 14
authors: [sapphi-red, btea]
commit_authors: {"3e1a86e": sapphi-red, "c5be55f": sapphi-red, "e0fe98a": sapphi-red, "7480c54": sapphi-red, "e4babd7": sapphi-red, "ef30399": sapphi-red, "39c3cb8": btea, "9bf5965": sapphi-red, "bd32fea": sapphi-red}
---

### **Vite now blocks duplicate runs with project-specific process locks** (3e1a86e)
`vite`, `vite build`, and `vite preview` now create lock files keyed to the command, project root, config, and mode, and will exit if another matching Vite process is already running. A new `--bypass-lock` flag lets you intentionally run alongside an existing process, which is useful for advanced workflows and tooling.

### **Safe modules are now tracked per environment** (7480c54)
Vite split `safeModulePaths` so each environment maintains its own allowlist instead of sharing one global set. That change makes filesystem access checks and module registration behave correctly across client, SSR, and custom environments.

### **Plugins can explicitly register safe modules during transforms** (e0fe98a)
A new `environment.addSafeModule(id)` API lets plugins mark resolved module IDs as loadable even when they fall outside `server.fs.allow`—while still respecting `server.fs.deny`. This matters for plugins that inject references Vite's import analysis can't discover on its own.

### **`server.fs.strict: 'extended'` broadens dev server file access** (e4babd7)
Vite added an extended strict-fs mode, expanding the server's filesystem access rules beyond the existing strict behavior. This gives users finer control over which paths can be served in dev.

### **HTML-safe module registration now covers references discovered in markup** (ef30399)
Vite now registers module references found in HTML so they can be requested later without tripping file-access checks. The HTML proxying and safe-module path logic were heavily updated to handle relative URLs, base paths, and nested references more reliably.

### **CSS emits no empty files when there's nothing to write** (c5be55f)
The CSS pipeline now skips generating empty CSS assets instead of emitting zero-byte files. That reduces build noise and avoids producing useless output artifacts.

### **Escaped import/specifier handling was hardened across build paths** (9bf5965)
Vite added coverage and fixes for escaping import specifiers and generated proxy/module names in HTML, dep optimization, and import analysis. This closes a class of codegen bugs where special characters in paths or package names could break emitted JavaScript.

### **CLI/tests moved off `execa` to `tinyexec`** (39c3cb8)
The repo's CLI test helpers were refactored to use `tinyexec` instead of `execa`, including the create-vite tests and playground harnesses. This is mostly an internal cleanup, but it also updates how subprocess output and process handles are collected.

### **Module runner stack traces were aligned more closely with V8** (bd32fea)
The source-map interceptor was rewritten to match V8's stack-frame formatting more closely, including async frames and method-name display. That should improve the fidelity of SSR/module-runner error stacks and make debugging easier.

### Other misc changes
- Fixed test utilities to use `server.fs.allow: []` and updated related dev server assertions.
- Switched various tests to `tinyexec` and cleaned up CLI/playground subprocess helpers.
- Minor workspace and lockfile maintenance.
- Small test updates around process locks, safe module paths, and import escaping.
