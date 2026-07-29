---
date: 2026-07-28
repo: biomejs/biome
size: L
title: "YAML, CSS, and HTML formatting get smarter"
excerpt: "Major formatter fixes across YAML, CSS, and HTML, plus one lint quick-fix cleanup and a release cut."
commits: 11
authors: [dyc3, denbezrukov, subotac, dadavidtseng]
commit_authors: {"61e35a3": dyc3, "acdaf87": dyc3, "2c526da": dyc3, "65d9024": dyc3, "8e216f2": dyc3, "4dcd0d9": dyc3, "9c16840": subotac, "8ffe2b9": dadavidtseng, "75721e4": denbezrukov}
---

### **CSS formatter now handles comments and SCSS variables in rule lists** (75721e4)
Biome expanded CSS/SCSS syntax support so `CssRuleList` can contain SCSS variable declarations, not just plain rules. The formatter and parser were updated together, which should prevent misparsing and let SCSS rule-list content format correctly.

### **YAML formatting gains quote normalization, explicit entries, and middle comments** (65d9024, 8e216f2, acdaf87, 61e35a3)
This was a large YAML formatter/parser pass: it now normalizes scalar quote style, preserves and places “middle” comments between node properties and content, and handles explicit block mapping entries more accurately. It also normalizes where YAML node properties are printed, which affects tags, anchors, and explicit mapping layouts in a number of edge cases.

### **HTML formatter preserves whitespace-sensitive content** (4dcd0d9, 9c16840)
Biome now treats `<textarea>`, `<xmp>`, and `<plaintext>` like other verbatim elements, preserving their content exactly instead of collapsing whitespace. A related fix also keeps trailing newlines after HTML comments, improving fidelity for comment-heavy HTML and Svelte outputs.

### Other misc changes
- Parser fix for YAML plain scalars and alias-name lexing (2c526da)
- Lint quick fix: remove double space in `noUselessTernary` (8ffe2b9)
- Release/versioning and changelog updates (1139f1c)
