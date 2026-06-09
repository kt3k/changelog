---
date: 2026-05-09
repo: leanprover/lean4
size: M
title: "Public Glob parser and PR rebasing guidance"
excerpt: "Lean4 made `Glob.ofString?` public and added CLAUDE guidance to avoid changing a PR’s GitHub base when rebasing locally."
commits: 2
authors: [kim-em]
commit_authors: {"1e367b5": kim-em, "68764f5": kim-em}
---

### **Public `Glob.ofString?` for Lake TOML parsing** (1e367b5)
`Glob.ofString?` is now public, which lets downstream code reuse the parser instead of relying on `open private` access. The commit is small, but it removes an access restriction that was blocking Mathlib cleanup.

### **Clarify Claude guidance on rebasing vs PR base** (68764f5)
Added a short note to `.claude/CLAUDE.md` explaining that “rebase onto X” should change only the local branch base, not the PR’s GitHub `--base` target. This helps preserve the Lean4 workflow where `nightly-with-mathlib` is used as a CI rebase target while the PR still targets `master`.

### Other misc changes
- None.
