---
date: 2026-06-25
repo: biomejs/biome
size: M
title: "Formatter and analyzer fixes land"
excerpt: "Biome fixes CSS, GritQL, HTML linting, and TS formatter correctness, plus a small dependency bump."
commits: 5
authors: [ematipico, Zelys-DFKH, denbezrukov, henrybrewer00-dotcom]
commit_authors: {"54e8239": ematipico, "0efe244": Zelys-DFKH, "5ec965a": denbezrukov, "e36fd8a": henrybrewer00-dotcom}
---

### **CSS formatter keeps selector comments inline** (5ec965a)
Biome now preserves selector lists on one line when a `//` comment follows a comma, instead of reflowing the selector into descendant combinators. This fixes a formatting regression that could significantly change CSS output for comment-heavy selectors.

### **GritQL now accepts positional arguments in calls** (0efe244)
The Grit parser and pattern compiler were updated so unkeyed arguments are parsed as patterns unless a real `name = value` argument is present. This unblocks valid GritQL patterns that previously failed to parse, including pattern, function, and node calls.

### **`noUndeclaredClasses` handles `is:global` and HTML styles** (54e8239)
The HTML analyzer was fixed to correctly recognize styles declared inside Astro `is:global` blocks and plain HTML documents. That closes a false-positive gap in class detection for mixed Astro/Svelte content and regular HTML.

### **Formatter keeps parentheses around `await`/`yield` instantiation targets** (e36fd8a)
TypeScript instantiation expressions now retain parentheses around lower-precedence targets like `await`, `yield`, conditional expressions, and postfix updates. Without this, the formatter could change the meaning of code by letting type arguments attach to the wrong subexpression.

### Other misc changes
- Dependency bump: `salsa` 0.27.0 → 0.27.2 (2ff160a)
