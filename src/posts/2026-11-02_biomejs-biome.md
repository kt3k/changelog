---
date: 2026-11-02
repo: biomejs/biome
size: L
title: "Vue rules, plugin APIs, and CI env cleanup"
excerpt: "A large day of lint-rule additions, plugin runtime APIs, error handling fixes, and CLI environment refactoring."
commits: 34
authors: [dyc3, Suto-Michimasa, ematipico]
commit_authors: {"b620cbc": Suto-Michimasa, "a00eb5a": dyc3, "b312e95": dyc3, "f60ce2d": dyc3, "ca4e6f3": ematipico}
---

### **Plugin failures now surface as real errors** (b312e95)
Thrown or failed plugin rules now emit error diagnostics instead of informational ones, so `biome lint` and `biome check` correctly fail with a non-zero exit code. This closes a reliability gap in plugin execution and makes broken plugins impossible to miss.

### **New JS runtime APIs: `tokenKinds()` and `nodeKinds()`** (f60ce2d)
The JavaScript plugin runtime now exposes kind-set APIs for nodes and tokens, with new language-aware set types wired into the Boa context. This lets plugins test syntax kinds more efficiently and with stronger type separation between node and token sets.

### **CLI environment handling is now injectable** (ca4e6f3)
The CLI stopped reading process environment directly in command logic and now routes environment access through an injectable source. That makes CI/color detection more testable and more deterministic, while also tightening up how `biome ci` decides when to force or disable colors.

### **Markdown emphasis wrapping is now prose-aware** (a00eb5a)
The markdown formatter was updated to wrap emphasis content when it appears inside surrounding prose, instead of preserving awkward inline formatting. This improves output quality for mixed prose/emphasis text, including CJK-friendly cases.

### **Playwright `describe` callback lint now accepts details args** (b620cbc)
`usePlaywrightValidDescribeCallback` now recognizes the optional `details` argument as valid. That reduces false positives for newer Playwright callback signatures.

### **Vue linting got a major expansion**
A broad set of new Vue rules landed, covering deprecated APIs, template validity, prop typing, event payloads, block order, slot usage, and more. These additions materially expand Biome’s Vue coverage and bring a lot more framework-specific feedback into the linter.

### Other misc changes
- Grit formatter list line-break handling fix
- Preserve comments when fixing wrapped nodes
- Preserve comments inside `<pre>` for HTML/Astro/Svelte formatting
- `useConsistentTestIt` safe-fix bug fix
- `noTailwindRawColors` gained `allowBlackAndWhite`
- Rule metadata updates
- Dependency and snapshot/test updates
