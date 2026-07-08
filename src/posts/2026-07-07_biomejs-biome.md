---
date: 2026-07-07
repo: biomejs/biome
size: L
title: "Plugin profiling split; HTML crash fix"
excerpt: "Biome now reports per-plugin profile timings and fixes a crash on unquoted HTML attributes, with a Markdown formatter rewrite in tow."
commits: 6
authors: [dyc3, ematipico, johncarmack1984]
commit_authors: {"b12e486": dyc3, "3518d04": ematipico, "a21463e": dyc3}
---

### **Plugin timings are now split by plugin name** (b12e486)
`--profile-rules` now records analyzer plugin time under each plugin’s own name instead of lumping everything into a single `plugin/plugin` bucket. That makes profiling output much more actionable when multiple plugins are loaded, and the new test covers the split behavior end to end.

### **HTML formatter no longer crashes on unquoted attribute values** (a21463e)
Biome now handles HTML attributes like `<textarea rows=4></textarea>` without crashing during checking or linting. The fix also hardens string extraction in HTML syntax so quoted and unquoted attribute values are handled safely, with a regression test added for the formatter output.

### **Markdown bullet list spacing got a major formatting overhaul** (3518d04)
The Markdown formatter was reworked to improve bullet-list spacing behavior, with broad changes across the shared formatter engine and Markdown-specific list/code-block logic. This is a substantial formatting change that should reduce inconsistent list rendering and improve output quality across Markdown documents.

### Other misc changes
- Updated Rust toolchain to 1.96.1 and refreshed CI container images.
- Updated `crossbeam-epoch` to address an advisory.
- Minor docs cleanup in `useSortedClasses` comments.
