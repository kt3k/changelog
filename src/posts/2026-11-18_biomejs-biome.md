---
date: 2026-11-18
repo: biomejs/biome
size: M
title: "Markdown fixes and Convex lint support"
excerpt: "Biome added a new Convex rule source/domain, fixed Markdown frontmatter handling in prettier migrations, and patched markdown parsing around blockquotes."
commits: 4
authors: [dyc3, tats-u, andrew-hesse]
commit_authors: {"73125bd": dyc3, "9add717": tats-u, "b6e7d37": andrew-hesse}
---

### **Markdown formatter no longer pairs emphasis across blockquote paragraphs** (b6e7d37)
The markdown parser/formatter now stops inline emphasis scanning at paragraph boundaries inside blockquotes, instead of incorrectly pairing markers across separate paragraphs. This fixes a real formatting bug that could rewrite Markdown into invalid or unexpected emphasis markup.

### **`biome migrate prettier` now preserves Markdown frontmatter settings** (9add717)
The Prettier migration now forces `markdown.parser.frontmatter = true`, matching how Prettier parses YAML frontmatter in Markdown files. That means migrated configs should behave correctly on Markdown content that starts with frontmatter, and the tests were expanded to cover the preserved output.

### **Biome adds Convex as a supported lint rule source/domain** (73125bd)
A new `convex` rule domain and `@convex-dev/eslint-plugin` source were wired into rule metadata, display names, docs links, and configuration validation. This enables Biome to recognize and describe Convex-specific lint rules instead of treating them as unknown.

### Other misc changes
- Release version bump to v0.7.3 (f3eb26a)
- Workflow/test ignore updates and snapshot churn for the migration/markdown suites
- Small codegen/metadata and lockfile refreshes
