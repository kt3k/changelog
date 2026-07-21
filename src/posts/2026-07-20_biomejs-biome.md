---
date: 2026-07-20
repo: biomejs/biome
size: L
title: "YAML, CSS, and inference fixes land"
excerpt: "Big linting and formatting improvements: incomplete type inference is suppressed, CSS comments are preserved, YAML docs format better, and daemon/LSP shutdown is fixed."
commits: 8
authors: [ematipico, ayaangazali, dyc3, Netail, denbezrukov]
commit_authors: {"ab8c21b": ematipico, "edc0ed7": ayaangazali, "546e5ba": dyc3, "5039a1e": ematipico, "b7a9694": denbezrukov, "726fa14": ematipico}
---

### **Type inference now avoids incomplete-result false positives** (726fa14, ab8c21b)
Biome tightened its JS/TS inference so partially resolved types no longer drive incorrect diagnostics in rules like `noMisusedPromises`, `useAwaitThenable`, `useExhaustiveSwitchCases`, `noBaseToString`, and `useNullishCoalescing`. The underlying inference work also improves member/Promise resolution and now handles generic defaults more faithfully, which should make several type-aware rules both more accurate and less noisy.

### **CSS formatter preserves selector-boundary comments** (b7a9694)
Comments around CSS selector combinators are now kept on the correct side of the boundary instead of being misplaced during formatting. The formatter also better handles escaped newlines in attribute selectors, which fixes a class of layout-stability and comment-placement regressions in CSS and SCSS output.

### **YAML formatter now handles document markers and directives** (546e5ba)
YAML formatting gained dedicated handling for `---`/`...` markers and directives, so comments stay attached to the right document element across multi-document streams. The verbatim formatter was also adjusted to avoid double-printing comments and to preserve source ranges more accurately.

### **Daemon proxy no longer dies when one client disconnects** (5039a1e)
The LSP proxy path was reworked so stdin/stdout forwarding stops cleanly when either side disconnects, instead of letting one editor close out a shared daemon for everyone else. That’s a significant reliability fix for users running Biome through long-lived editor integrations.

### **HTML ARIA role inference now respects shorthand attributes** (edc0ed7)
`useAriaPropsSupportedByRole` now accounts for shorthand attributes when computing an element’s implicit ARIA role in Astro, Svelte, and Vue-like templates. This removes false positives for patterns like `<a {href} aria-label="...">`, where the element should still be recognized as a link.

### Other misc changes
- Updated `globset` to 0.4.19
- Added/adjusted Cargo audit ignore entries
- Preview CI config tweak
