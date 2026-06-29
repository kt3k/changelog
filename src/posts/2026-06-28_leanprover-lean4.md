---
date: 2026-06-28
repo: leanprover/lean4
size: M
title: "Lean docstrings now follow parse-site syntax"
excerpt: "Docstrings in macros now use the syntax tree’s format instead of local options, fixing Verso/Markdown mismatches across elaboration."
commits: 1
authors: [david-christiansen]
commit_authors: {"de5b7f2": david-christiansen}
---

### **Docstring format now comes from the parsed syntax** (de5b7f2)
Docstrings are now interpreted based on how they were parsed, rather than re-reading the local `doc.verso` setting at the use site. This fixes cases where macros expanded in a different option context would previously mis-handle Verso vs. Markdown docstrings, and it preserves the parse-site meaning consistently through elaboration.

The change also updates the docstring API and call sites to carry just the doc-comment syntax, with a new helper to detect Verso comments from the syntax tree. A regression test was added for the parse-site/use-site mismatch.

### Other misc changes
- None
