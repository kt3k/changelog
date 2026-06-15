---
date: 2026-06-14
repo: denoland/deno
size: L
title: "Deno adds declarations, workspaces, and faster runtime"
excerpt: "Major bundle, install, formatter, and runtime changes landed, plus a few targeted bug fixes and cache improvements."
commits: 11
authors: [bartlomieju, lunadogbot, littledivy, divybot]
commit_authors: {"229ddc0": bartlomieju, "d400a15": littledivy, "bf844be": bartlomieju, "9cf4f7d": lunadogbot, "c6765be": divybot, "af9628d": lunadogbot, "a4e9966": bartlomieju, "e855ab5": bartlomieju, "37c97f4": bartlomieju, "08a3995": bartlomieju}
---

### **Bundle can now emit rolled-up declaration files** (229ddc0)
`deno bundle` gained a `--declaration` flag that produces a single `.d.ts` alongside each bundle output. This makes bundling usable for publishing TypeScript libraries without a separate declaration build step.

### **Workspace installs now create member-local node_modules** (a4e9966)
`deno install` now lays out `node_modules` inside each workspace member, matching npm/pnpm expectations and fixing native Node tooling that runs from within a subpackage. It also prunes stale links and keeps member `.bin` entries in sync, which closes a real workspace resolution gap.

### **Console/inspect moved from JS to Rust** (d400a15)
The console formatting and inspection stack was ported to Rust, turning `01_console.js` into a thin shim and moving the heavy formatting logic into native code. This is a substantial runtime refactor that should improve performance and reduce JS snapshot weight.

### **Formatter switches HTML/XML/SVG and components to lax-markup** (bf844be)
`deno fmt` now uses `lax-markup` for markup formatting, replacing the older formatter for HTML, XML, SVG, and component/template cases. The change is aimed at safer, more predictable formatting that preserves text and inline content byte-for-byte unless whitespace changes are provably harmless.

### **Formatter switches CSS to lax-css** (37c97f4)
CSS, SCSS, and Less formatting now go through `lax-css` instead of `malva`, and `malva` is removed from the dependency tree. This should fix long-standing CSS formatting issues while keeping formatting whitespace-only and syntax-preserving.

### **CSS module imports are now supported behind an unstable flag** (08a3995)
Deno added a prototype for `import ... with { type: "css" }`, returning a `CSSStyleSheet` for browser-style module graphs. This is a notable new capability for SSR/testing web components and unmodified browser modules, though it remains behind `--unstable-raw-imports`.

### **Install now caches workspace member resolution more accurately** (e855ab5)
Remote 404 responses are now negatively cached with a short TTL instead of being re-requested on every start. That should reduce repeated fetches for missing JSR or dynamic-import targets and avoid unnecessary network churn.

### **Test output now shows sub-millisecond durations** (af9628d)
Test reporters and related plumbing were updated so timings can display below the millisecond. This is a small but user-facing improvement to test diagnostics.

### **Coverage summary no longer panics without a common root** (9cf4f7d)
The coverage summary reporter now handles inputs that don’t share a common root instead of crashing. This is a targeted robustness fix for a real reporter edge case.

### **REPL regex literal highlighting was fixed** (c6765be)
The REPL editor now highlights regex literals correctly. It’s a focused UX fix, but not a broad functional change.

### Other misc changes
- Lockfile auto-resolves git merge conflicts in `deno.lock`.
- Dependency/version bumps and formatter/test updates for the new markup/CSS tooling.
- Internal plumbing updates for CSS module imports and bundle declaration emission.
