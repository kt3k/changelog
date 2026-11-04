---
date: 2026-11-03
repo: biomejs/biome
size: L
title: "A wave of new lint rules lands"
excerpt: "Biome added a large batch of nursery rules across JS, Vue, Svelte, HTML, and CSS, plus a few performance and parser fixes."
commits: 38
authors: [dyc3, nhedger, vibbix]
commit_authors: {"6f8313d": dyc3, "4ada6fc": dyc3, "c94f694": dyc3, "291f034": dyc3, "378798f": dyc3, "c2c2590": nhedger, "8a1167d": dyc3, "31f1820": vibbix}
---

### **Major lint-rule expansion across the stack**
Biome added a substantial set of new nursery rules covering JavaScript, Vue, Svelte, HTML, and related patterns, including checks for useless awaits, mismatched map keys, unsafe Playwright references, Vue component/export conventions, and more. These broaden the linter’s coverage significantly and introduce many new diagnostics plus configuration/schema updates for users.

### **Performance work for large projects and analysis timers**
Several performance-oriented changes landed, including faster file view map resizing in the service layer (6f8313d) and a timer path that avoids overhead when a rule is disabled (c94f694). There’s also a grit dependency bump aimed at regex performance (378798f).

### **Tailwind parser handles dashed arbitrary-value names correctly**
The Tailwind parser was fixed to recognize long dashed base names when arbitrary values are involved (291f034). This prevents misparsing in real-world class strings and comes with updated parser and lint snapshots.

### **Top-level grit config is now applied**
The service now respects top-level grit configuration (c2c2590), which should make CLI and service behavior line up with user expectations. The change includes test coverage for precedence between global and grit-specific settings.

### **SCSS multi-value declarations now format like Prettier**
The SCSS formatter was adjusted so multi-value property declarations better match Prettier’s output (31f1820). This is a focused formatting fix, but it affects a common authoring pattern.

### Other misc changes
- Dependency pinning and deny-list updates for mimalloc (4ada6fc)
- Rule metadata refreshes (8a1167d)
- Miscellaneous test/snapshot updates tied to the new rules
- Cargo lockfile and manifest maintenance from dependency bumps
