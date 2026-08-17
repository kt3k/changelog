---
date: 2026-08-16
repo: biomejs/biome
size: M
title: "Accessibility rules and HTML parsing fixes"
excerpt: "Added a new control-label lint rule, fixed HTML/SVG parsing bugs, and expanded generic CSS font-family support."
commits: 3
authors: [MHJahanbakhsh, ematipico, xosnos]
commit_authors: {"7529811": MHJahanbakhsh, "13853b1": ematipico, "e65f07e": xosnos}
---

### **New nursery rule: useControlLabel** (e65f07e)
Adds a new HTML/JSX accessibility rule that flags interactive controls like `button` and `menuitem` when they lack an accessible label. The rule is wired into Biome’s config, diagnostics, and ESLint migration path, so it can be enabled and mapped from existing setups.

### **HTML/SVG parsing fixes and lint false-positive fix** (13853b1)
Fixes an Astro false positive from `useJsxKeyInIterable` and corrects SVG parsing for documents that start with an XML declaration followed by a `PUBLIC` doctype. The formatter/parser updates also improve HTML directive/root handling so these documents round-trip more reliably.

### **CSS `useGenericFontNames` now accepts `math`** (7529811)
The generic font-family list now includes `math`, which prevents `useGenericFontNames` from flagging valid CSS like `font-family: math` or fallback stacks ending in `math`. This aligns the linter with the CSS keyword set.

### Other misc changes
- Rule/docs/config plumbing for `useControlLabel`
- Test and snapshot updates for HTML, SVG, Astro, JSX, and CSS cases
- Changeset entries and minor generated code updates
