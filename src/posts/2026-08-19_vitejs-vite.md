---
date: 2026-08-19
repo: vitejs/vite
size: M
title: "HMR race fixes and root symlink respect"
excerpt: "Notable SSR/module-runner bug fixes, plus config sourcemap and root-resolution corrections."
commits: 12
authors: [lazerg, sapphi-red, h-a-n-a, bluwy, antfu, minirang, btea, DaZuiZui]
commit_authors: {"8413052": lazerg, "05a003e": lazerg, "d9b10a9": DaZuiZui}
---

### **Module runner stops misclassifying completed imports as cycles** (d9b10a9)
This fixes an SSR HMR race where already-evaluated imports could still be treated as live circular requests, blocking valid module updates. The runner now ignores imported modules that have either finished evaluating or never had an active promise, preventing false-positive cycle detection.

### **Config root resolution now honors `preserveSymlinks`** (8413052)
Vite now only realpaths the configured root when symlink preservation is off, so a symlinked project root stays symlinked when `resolve.preserveSymlinks` is enabled. This aligns root resolution with user expectations and avoids surprising path rewrites in symlinked setups.

### **Config bundle sourcemaps resolve against the map location** (05a003e)
Nested config files now get sourcemap paths transformed relative to the sourcemap’s own location instead of the config file path. That makes inline config sourcemaps point back to the correct source file, improving debuggability for configs in nested directories.

### Other misc changes
- CSS target conversion now returns `undefined` for unconstrained targets instead of `{}`; Lightning CSS no longer receives empty targets.
- Peer range for `@vitejs/devtools` widened to `v0.5.0`.
- CI workflow cleanup to use local action syntax and drop actionlint.
- Docs clarifications and formatting tweaks.
- Test-only updates for bundled dev, module-runner HMR, and TLA circular import coverage.
- Small refactor in constants to use JSON import attributes.
