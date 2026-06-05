---
date: 2026-06-04
repo: microsoft/typescript-go
size: L
title: "Parser and API fixes land"
excerpt: "Parser now blocks uneraseable `as`/`satisfies` forms, while native-preview and project handling fix crashes and parent lookup bugs."
commits: 6
authors: [andrewbranch, ahejlsberg, DanielRosenwasser]
commit_authors: {"69d658d": ahejlsberg, "2aafbdd": andrewbranch, "70b87f0": andrewbranch}
---

### **Parser stops parsing uneraseable `as`/`satisfies` chains** (69d658d)
The parser now detects when an `as` or `satisfies` assertion would be impossible to erase without changing the expression’s meaning, and stops consuming later higher-precedence operators in that case. This closes a real correctness gap around mixed binary expressions and assertions, with new regression coverage for the `disallowUnerasableAssertion` cases.

### **native-preview fixes `getOrCreateNodeAtIndex` parent resolution** (2aafbdd)
Remote nodes created by index now resolve their real parent instead of always pointing at the source file, including skipping synthetic `NodeList` containers to match normal traversal. That makes symbol/node resolution in the preview API more accurate, and the added tests verify class members report the expected parent chain.

### **Module resolver avoids a nil dereference in node_modules lookup** (230d600)
The resolver now checks that the package info exists before dereferencing version-path data during `node_modules` resolution. This prevents a crash in a module-loading path that could be hit while resolving packages from specific directories.

### **Project command-line reset prevents nil-command-line crashes** (70b87f0)
Projects now have an explicit `SetCommandLine` path that clears cached derived state and marks the project fully dirty when the command line changes. That fixes a crash where an inferred project could be rebuilt twice in one snapshot and end up passing a nil command line into program construction.

### Other misc changes
- Added JSDoc namespaced typedef quick info and find-all-refs tests (1 commit)
- Devcontainer Node feature bump (1 commit)
