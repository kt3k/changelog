---
date: 2026-08-18
repo: biomejs/biome
size: L
title: "Markdown frontmatter lands; analyzer refactor"
excerpt: "Markdown can now parse frontmatter, while core analyzer settings were reworked to use tracked, thread-safe rule storage."
commits: 6
authors: [ematipico, dyc3, 1678092075]
commit_authors: {"142b7fa": ematipico, "66bc1ed": ematipico, "dec5a8f": 1678092075, "6b502c1": dyc3, "b2273d6": ematipico, "c7e4fa1": dyc3}
---

**Markdown parser now supports frontmatter blocks** (142b7fa)
Biome adds a new Markdown parser option to enable frontmatter parsing at the start of files, along with the syntax, lexer, parser, and formatter support needed to preserve it end-to-end. This unlocks proper handling of common doc formats that begin with YAML-style metadata.

**Core analyzer settings were refactored around tracked functions** (66bc1ed)
The analyzer configuration and option plumbing were reworked to use thread-safe, tracked rule storage and to make option values `Send + Sync`. This is a substantial infrastructure change that touches service state, file handlers, and language-specific configuration paths, and it should improve correctness for shared configuration handling.

**`useStrictMode` stops flagging Vue event handlers** (dec5a8f)
The JavaScript linter now skips Vue event-handler embeddings such as `@click="count++"` and `v-on:click`. This removes a false positive in a common Vue pattern.

### Other misc changes
- Dependency/build maintenance: update `spin` to avoid a yanked-package warning (6b502c1)
- CI advisory file fix and lockfile churn (b2273d6)
- Minor analyzer internal refactor to avoid boxed rule-state strings (c7e4fa1)
