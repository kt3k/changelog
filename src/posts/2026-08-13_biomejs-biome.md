---
date: 2026-08-13
repo: biomejs/biome
size: M
title: "HTML formatting, CSS recovery, lint fix"
excerpt: "Biome tightened HTML wrapping, improved CSS bogus-declaration recovery, and fixed a safe-fix parentheses bug in a JS lint rule."
commits: 5
authors: [dyc3, wanxiankai]
commit_authors: {"67c3bf0": dyc3, "2f5d452": dyc3, "610ee28": dyc3, "41386f3": dyc3, "17e48d6": wanxiankai}
---

### **HTML formatter now counts closing tags in wrap width** (67c3bf0)
The HTML formatter now includes an adjacent closing tag when deciding whether a word-filled line fits, preventing overlong lines when the final word and tag have to move together. This fixes a width-regression in whitespace-sensitive HTML/Svelte/Vue formatting.

### **HTML formatter preserves touching text adjacency** (2f5d452)
When formatted HTML has an element directly followed by text, the formatter now keeps the adjacency intact instead of inserting rendered whitespace on wrap boundaries. This changes the fill/separator placement logic so wrapping happens inside the tag group, not between sensitive siblings.

### **HTML formatter keeps block-like edge children structural** (610ee28)
Elements like `video`, `object`, and root templates now treat block-like or hidden edge children as structural, so parent tags wrap instead of being hugged together. That improves formatting for media fallback content and similar edge-child layouts.

### **CSS parser recovers better from bogus declarations** (41386f3)
The CSS parser now handles bogus declarations more gracefully, recovering at declaration boundaries so later valid declarations still parse instead of triggering a panic or derailing embedded `style` parsing. The formatter and generated syntax/factory code were updated to recognize the new bogus declaration node.

### **`noExtraBooleanCast` safe fix preserves conditional grouping** (17e48d6)
The JavaScript lint rule’s autofix now keeps parentheses when removing `Boolean(...)` from a conditional test, avoiding broken precedence in ternary expressions. This is a correctness fix for a fixable lint diagnostic, not just a new warning.

### Other misc changes
- None.
