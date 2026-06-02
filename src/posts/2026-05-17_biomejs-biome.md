---
date: 2026-05-17
repo: biomejs/biome
size: L
title: "CSS, HTML, and Markdown fixes land"
excerpt: "Big formatter/parser fixes for SCSS interpolation, invalid HTML from comments, and Markdown list boundary handling."
commits: 4
authors: [yanthomasdev, denbezrukov, jfmcdowell, dyc3]
commit_authors: {"cf238f5": denbezrukov, "fcb1e48": jfmcdowell, "50aa415": dyc3}
---

### **Preserve raw SCSS string interpolation** (cf238f5)
Biome’s SCSS formatter now handles raw string interpolation without normalizing away the original quoting/interpolation shape. This is a substantial formatter change that should reduce unwanted diffs and better preserve source intent in SCSS-heavy codebases.

### **Fix invalid HTML formatting when comments split tags** (50aa415)
The HTML formatter was updated to avoid producing syntactically invalid output when comments appear around closing tags. The fix also touches Svelte HTML handling and child-list comment ownership, which matters because it prevents the formatter from rewriting valid input into broken markup.

### **Break Markdown paragraphs correctly at sibling list markers** (fcb1e48)
The Markdown parser now recognizes additional list-marker boundary cases, including wide spacing and tab-related edge cases, so paragraphs terminate where CommonMark expects them to. This fixes list parsing/serialization bugs that could previously leak formatting across item boundaries.

### Other misc changes
- Renamed `FileExitsParams` to `FileExistsParams` across CLI, service, WASM, and backend JSON-RPC layers.
