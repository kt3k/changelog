---
date: 2026-10-07
repo: oven-sh/bun
size: L
title: "bun check aligns further with tsc"
excerpt: "More type-checking edge cases and monorepo/reference behavior now match TypeScript, plus docs were updated."
commits: 2
authors: [Jarred-Sumner]
commit_authors: {"43a42a8": Jarred-Sumner, "bd599f5": Jarred-Sumner}
---

### **`bun check` now matches more TypeScript union and JSX cases** (43a42a8)
Bun fixed additional divergences from `tsc` 7.0.2 in the type checker, including a named union case where conditional expressions were being narrowed too far. The parser/lexer and semantic pipeline were also updated to better preserve speculative-parse state, JSX-related tokenization, and diagnostic details so `bun check` reports the same errors TypeScript does.

### **`bun check` now follows `tsc`’s project/reference rules** (bd599f5)
`bun check` now mirrors `tsc` more closely for which files and projects it checks, especially in monorepos with `references`. The `-b` flag is now the explicit way to follow referenced projects like `tsc -b`, while plain `bun check` sticks to the nearest project and docs were updated to explain the new behavior.

### Other misc changes
- Dependency bump(s) in `Cargo.lock`
