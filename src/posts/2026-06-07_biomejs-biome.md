---
date: 2026-06-07
repo: biomejs/biome
size: M
title: "SCSS media queries get interpolated logic support"
excerpt: "Biome’s CSS parser/formatter now handles interpolated SCSS media conditions, with lint and test updates to match."
commits: 1
authors: [denbezrukov]
commit_authors: {"80449d6": denbezrukov}
---

### **Parse interpolated SCSS media conditions** (80449d6)
Biome expanded its CSS/SCSS media-query parsing to understand interpolated logical conditions inside SCSS `@media` rules. The change ripples through parser, syntax factories, formatter, and the `no_unknown_media_feature_name` lint so these constructs are recognized and handled consistently instead of being misparsed or flagged incorrectly.

It also adds substantial parser and formatter coverage for the new SCSS media logic, including error cases for invalid `and`/`not` combinations and a large OK fixture demonstrating the supported interpolation behavior.

### Other misc changes
- Parser, factory, and formatter generated code updates
- New/updated CSS and SCSS test snapshots
