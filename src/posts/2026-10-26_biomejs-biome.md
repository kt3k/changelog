---
date: 2026-10-26
repo: biomejs/biome
size: L
title: "Markdown fixes and lint speedups land"
excerpt: "Big formatter/parser fixes plus faster linting and a module graph type-resolution fix."
commits: 9
authors: [dyc3, jfmcdowell, kurovskyiii]
commit_authors: {"17cdba8": dyc3, "f00637c": dyc3, "0804317": dyc3, "0da9080": jfmcdowell, "fa7cf4c": dyc3, "59ff42a": kurovskyiii}
---

### **Markdown parser now keeps quotes stable in deep lists** (0da9080)
Fixed block quotes nested inside deeply indented list items so `proseWrap: "always"` wraps consecutive quote lines together instead of flattening them. The parser/formatter changes also preserve setext headings and fenced code blocks in these nested cases.

### **Markdown embeds preserve fenced-block frontmatter** (fa7cf4c)
When Markdown embeds are formatted with frontmatter parsing enabled, fenced Markdown code blocks now keep their frontmatter intact instead of reformatting it into a thematic break and paragraph. That avoids stripping YAML indentation inside embedded markdown.

### **Duplicate-case / else-if / fallthrough lint rules are now linear** (f00637c)
Several switch/branch analysis rules were reworked to avoid quadratic behavior, using hashing and a new traversal strategy to scale linearly on large inputs. This should make `noDuplicateCase`, `noDuplicateElseIf`, and `noFallthroughSwitchClause` noticeably faster on complex codebases.

### **Unused-private-member detection got a faster traversal** (17cdba8)
`noUnusedPrivateClassMembers` was refactored to track members by name and stop scanning once all candidates are resolved, reducing unnecessary work. The same commit also streamlined `useHookAtTopLevel` and `noUnusedImports` internals to improve lint performance.

### **Imported type/value merges now resolve correctly in annotations** (59ff42a)
Type inference now prefers the type side when an import refers to a symbol exported as both a type and a value, fixing false positives in type annotations. This matters for rules like `noBaseToString`, which previously could misclassify such imports as objects.

### Other misc changes
- Updated rule metadata across JS, Markdown, and unsupported-rule mappings (0804317)
- Added Vue ESLint migration/support entries, including `vue/dot-notation` (0804317)
- Dependency bumps: `smallvec` to 1.16.4, `serde_json` to 1.0.154, `notify` to 8.2.1 (3 commits)
