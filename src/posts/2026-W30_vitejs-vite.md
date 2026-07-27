---
date: 2026-07-26
repo: vitejs/vite
period: weekly
slug: 2026-W30
period_label: "Jul 20–26, 2026"
size: L
title: "Vite hardens HMR and bundled dev, with config and CSS fixes"
excerpt: "This week tightened HMR/bundled-dev behavior, improved config compatibility, fixed CSS URL rebasing, and added safer legacy output handling."
commits: 30
---

### **Bundled dev and HMR got sturdier**
Vite split the bundled-dev HMR runtime into a dedicated client entry, added CI coverage for `experimental.bundledDev`, and now reports bundled-dev HMR build failures to the terminal. HMR also got safer across restarts: `handleHMRUpdate` now aborts if the server restarts mid-transaction, and pruned modules clear `import.meta.hot.data` after dispose/prune handlers so stale state doesn’t leak into re-imports.

### **Config loading and compatibility checks were refined**
Native config compatibility checks now skip virtual modules, treat them as ESM in path-format helpers, and can be bypassed entirely when `VITE_CONFIG_NATIVE_IGNORE_WARNING` is set. Vite also now adds configured entry inputs like `index.html` to `server.fs.allow`, reducing filesystem-access friction during config resolution and dev startup.

### **CSS, legacy builds, and resolver edge cases were fixed**
CSS `url()` rebasing now works when PostCSS injects content during `OnceExit`, using the injected source as the rebasing anchor. On the build side, plugin-legacy now minifies with an explicit `es2015` target to avoid reintroducing syntax too new for older browsers, and `import.meta.glob` resolution gained test coverage for tsconfig path aliases.

### **Other misc changes**
- `create-vite --eslint` now warns instead of crashing on non-React templates.
- Network URLs for explicit host IPs now include the matching interface name when available.
- Docs were updated for config debugging and HMR behavior, plus assorted wording/link fixes.
- Dependency bumps across core, templates, and tooling, including `magic-string@1` and rolldown-related packages.
