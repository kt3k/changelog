---
date: 2026-06-19
repo: microsoft/typescript-go
size: M
title: "Fix empty tsconfig extend panic"
excerpt: "A nil-pointer panic when extending an empty config file was fixed, with regression coverage added."
commits: 1
authors: [oMatheusmol]
commit_authors: {"dc37b52": oMatheusmol}
---

### **Fix nil pointer panic when extending an empty config file** (dc37b52)
`tsconfig` parsing now creates an empty node list when building a source file for an empty config, instead of leaving `Statements` nil. That prevents a crash when a config extends an empty base file, and the added regression test confirms parsing still picks up the inherited project file.

### Other misc changes
- None
