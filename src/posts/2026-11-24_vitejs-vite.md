---
date: 2026-11-24
repo: vitejs/vite
size: M
title: "Plugin errors get sharper and safer"
excerpt: "Vite improves plugin error tagging, handles environment cleanup on init failures, and tightens a few docs and dependency updates."
commits: 11
authors: [btea, materwelonDhruv, fengmk2, onmax, sapphi-red, iiio2, abrahamguo]
commit_authors: {"e1e1ac8": materwelonDhruv, "24eb35a": materwelonDhruv, "826dcb8": onmax}
---

### **Plugin hook errors now carry the right plugin name** (e1e1ac8)
Vite now re-tags hook errors based on the current plugin name and re-wraps handlers when a hook implementation changes. This makes plugin error reporting stay accurate after plugin renames or runtime hook replacement, which is especially useful when debugging evolving plugin code.

### **Server shutdown now closes partially initialized dev environments** (826dcb8)
If server startup fails after a `DevEnvironment` has been created, Vite now closes the environment’s transport instead of leaving it hanging. That reduces resource leaks and makes startup failure handling more robust.

### **Plugin hook errors preserve the original thrown message** (24eb35a)
Error messages from plugin hooks now stay as originally thrown instead of being rewritten with plugin prefixes. This keeps stack/error output cleaner while preserving the plugin and hook metadata for diagnostics.

### Other misc changes
- Dependency updates, including Vue 3.5 support in playgrounds and non-major bumps across the repo
- Switched linting setup to `tsrs` for type-aware linting
- Dependency bump for `body-parser`
- Docs clarifications for `<base>` usage and stale esbuild references
- Minor typo fix in CSS chunk map naming
