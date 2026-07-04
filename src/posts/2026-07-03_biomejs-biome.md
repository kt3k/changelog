---
date: 2026-07-03
repo: biomejs/biome
size: L
title: "Markdown parser and formatter get smarter"
excerpt: "Big Markdown parsing/formatting refactors land, plus a Svelte noUnusedVariables fix for store subscriptions and $bindable props."
commits: 4
authors: [ematipico, Mokto]
commit_authors: {"f852f65": ematipico, "e324b89": ematipico, "dbe05f4": ematipico, "da9b403": Mokto}
---

### **Markdown parsing now emits fewer, cleaner nodes** (dbe05f4)
The parser refactor reduces emitted syntax nodes and rewires several Markdown lexer/parser paths, with large snapshot updates across links, autolinks, emphasis, fenced code, and HTML-in-list cases. This should simplify downstream formatting and make the Markdown IR closer to the actual structure being parsed.

### **HTML blocks in Markdown are parsed as a single content node** (f852f65)
HTML block handling was changed so the parser/factory emits one `MD_HTML_CONTENT` node instead of a broader inline-item list, and the formatter was updated to respect line terminators around HTML/fenced blocks inside lists. That fixes a class of list/HTML formatting edge cases and reduces churn in the Markdown AST.

### **Markdown formatter adds blockquote, link, and thematic-break support** (e324b89)
This formatter release adds substantial handling for blockquotes, inline links/images, link reference definitions, and thematic breaks, with list-marker normalization adjusted to avoid turning valid lists into thematic breaks. In practice, this improves CommonMark compatibility for a wide set of Markdown constructs.

### **noUnusedVariables stops flagging valid Svelte patterns** (da9b403)
The linter now recognizes Svelte store subscriptions and `$bindable()` props as intentional uses, avoiding false positives in `noUnusedVariables`. This is a targeted but important correctness fix for Svelte users.

### Other misc changes
- Markdown formatter/parser snapshot updates and generated code refreshes
- Internal embedded-reference plumbing for Svelte linting
