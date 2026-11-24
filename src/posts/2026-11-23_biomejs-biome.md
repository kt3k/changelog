---
date: 2026-11-23
repo: biomejs/biome
size: L
title: "MDX lands across parser, formatter, and CLI"
excerpt: "Big MDX support rollout, plus a markdown indent fix, rowan mutation refactor, and a couple of smaller bug fixes."
commits: 9
authors: [ematipico, dyc3, b84330808]
commit_authors: {"73082ca": ematipico, "4dc698a": b84330808, "68236d5": ematipico, "399f3a1": dyc3}
---

### **MDX support now spans parsing, formatting, linting, and CLI handling**
Biomes’s MDX story expanded substantially: the parser, formatter, analyzer, and CLI all gained MDX-specific handling, and the service is now wired behind the `lang_mdx` feature. This unlocks formatting and linting for MDX documents, including JSX/tag snippets and embedded JS behavior, instead of treating them as plain Markdown/JS.

### **Markdown list indentation now respects `indentWidth`** (399f3a1)
The Markdown formatter now uses the configured `indentWidth` when indenting list item content, matching Prettier’s behavior more closely. This fixes a long-standing alignment issue for nested list content while preserving special cases like blockquotes and HTML blocks.

### **Rowan’s batch mutation code was refactored and reorganized** (73082ca)
The AST mutation machinery was moved and split into a new `mutation` module, with batch mutation logic rewritten to reuse shared trivia-copying helpers. This is an internal refactor, but it simplifies the mutation pipeline and reduces duplicated trivia handling.

### **EditorConfig numeric ranges now match negative numbers** (4dc698a)
`.editorconfig` glob sections with numeric ranges can now match negative values correctly, so patterns like `[{-3..3}]` behave as intended. That fixes section selection for files whose names include negative numbers.

### **Top-level suppressions now work after comment-only MDX snippets** (68236d5)
The analyzer now treats comment-only snippets, such as MDX `{/* comment */}`, as valid predecessors for top-level suppressions. This avoids false failures when suppressions follow MDX comment expressions rather than ordinary syntax tokens.

### Other misc changes
- Rule metadata updated for several lint rules (1 commit)
- Dependency bump: tombi to v1.11.3
- MDX-related parser/formatter tests and snapshots
- Grit/JS factory and formatter codegen updates for MDX JSX root handling
