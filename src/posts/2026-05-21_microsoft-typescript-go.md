---
date: 2026-05-21
repo: microsoft/typescript-go
size: M
title: "JSX pragma parsing and CLI panic fix"
excerpt: "One parser fix and one CLI safety fix prevent ignored pragmas and response-file crashes."
commits: 2
authors: [a-tarasyuk]
commit_authors: {"d99f6b2": a-tarasyuk}
---

### **Skip unknown JSX pragmas instead of aborting** (d99f6b2)
The parser now continues scanning comment pragmas when it encounters an unrecognized `@...` tag, rather than breaking out early. This preserves valid JSX directives that appear after unrelated tags, fixing cases like `@fileoverview` followed by `@jsx`.

### **Avoid panicking on `@` response-file arguments** (6b34cd4)
The command-line parser now resolves response-file paths against the current directory before reading them, so bare `@` or relative `@blah` inputs produce diagnostics instead of a crash. The accompanying test coverage locks in the no-panic behavior for empty and missing response-file names.

### Other misc changes
- Added/updated compiler baselines for the JSX pragma regression test.
- Test helper and export signatures updated to pass current directory through command-line parsing.
