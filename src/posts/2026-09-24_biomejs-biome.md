---
date: 2026-09-24
repo: biomejs/biome
size: M
title: "Formatter and linting fixes land"
excerpt: "Svelte comment formatting, overlapping linter domains, plugin error paths, and a CSS property recognition fix."
commits: 7
authors: [dyc3, Th3S4mur41, ematipico, hirehamir]
commit_authors: {"0cc46d8": dyc3, "82ea5a6": dyc3, "8d0b990": dyc3, "aef690d": Th3S4mur41, "369d50d": dyc3, "2f629c5": ematipico, "d568632": hirehamir}
---

### **Svelte block comment placement fixed** (0cc46d8)
The HTML formatter now handles comments at the end of Svelte block contents correctly, indenting comments before `{:else}`, `{:then}`, or closing tags with the block body instead of the boundary token. This also adds targeted Svelte formatter logic so these comments aren’t printed twice or dropped.

### **Disabled domains no longer suppress overlapping rules** (8d0b990)
Biome’s linter configuration now preserves rules that belong to multiple domains, even if one of those domains is set to `"none"`. Explicitly enabled rules also stay enabled, fixing a config bug that could silently turn off expected diagnostics.

### **Plugin load errors now show failing paths** (d568632)
When plugins fail to load, the CLI now reports each broken plugin path on its own line instead of merging error text together. That makes plugin issues much easier to diagnose in multi-plugin setups.

### **CSS analyzer learns `frame-sizing`** (aef690d)
`noUnknownProperty` now recognizes the `frame-sizing` CSS property as valid. This prevents a false positive on a property that’s already part of the platform.

### Other misc changes
- CI tightened pull request title linting to reject subjects ending in `...` (369d50d)
- Test harness updates and snapshot refreshes for CLI command output (2f629c5)
- Svelte comment duplication fix plus formatter internals for block handling (82ea5a6)
