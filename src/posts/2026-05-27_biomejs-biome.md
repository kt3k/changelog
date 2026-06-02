---
date: 2026-05-27
repo: biomejs/biome
size: L
title: "Markdown/YAML parser fixes land, plugins added"
excerpt: "Biome fixed Markdown fence handling, YAML alias keys, and a core type regression, while shipping a release that adds plugin config support."
commits: 4
authors: [jfmcdowell, siketyan, ematipico]
commit_authors: {"fa05c19": jfmcdowell, "ce9d27f": siketyan, "de2a33c": ematipico}
---

### **Markdown fenced code blocks now end at list boundaries** (fa05c19)
Biome fixed a parser bug where fenced code blocks could keep consuming content past the end of a list item. The change also supports unterminated fences more accurately, which improves CST invariants and formatter behavior for tricky CommonMark edge cases.

### **YAML alias nodes are now valid mapping keys** (ce9d27f)
The YAML parser/formatter now correctly lexes and parses aliases used as mapping keys, instead of treating them as parse errors. This closes a real syntax gap across flow and block mappings and updates the generated syntax/formatter output accordingly.

### **Core emitted types regression fixed and plugin config added** (de2a33c)
Biome fixed a regression in emitted configuration types and schema generation, and added a new `plugins` configuration field to the public schema. That makes plugin loading part of the surfaced config API and keeps generated client typings in sync.

### Other misc changes
- Release housekeeping and changelog/package version updates (1 commit)
- Removed published changeset files after release
