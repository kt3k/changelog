---
date: 2026-06-08
repo: microsoft/typescript-go
size: M
title: "TS-Go fixes rename, JSX errors, and memory cleanup"
excerpt: "Renames no longer crash on solution configs, JSX/type-argument errors skip trivia correctly, and arenas can now be released after type printing."
commits: 6
authors: [DanielRosenwasser, jakebailey, weswigham]
commit_authors: {"69b0d53": DanielRosenwasser, "e90bfe2": weswigham}
---

### **Fix file rename crashes with solution config files** (69b0d53)
Renaming a file in a child project no longer panics when the parent solution config exists but its program has not been built yet. The session now skips projects with a nil program, avoiding a crash in multi-project rename edits.

### **Ship API enums without the const modifier** (78694bb)
The generated native-preview API enums are now emitted as regular `enum`s instead of `const enum`s. That makes the published API less brittle for consumers and avoids inlining assumptions across package boundaries.

### **Skip trivia when reporting JSX type-argument arity errors** (07196f2)
Type-argument error spans now start after any whitespace/comments following the `<`, so diagnostics point at the actual offending type rather than leading trivia. This improves both JSX-specific and general type-argument arity errors, and the new tests lock in the corrected spans.

### **Allow arenas to be released after type-to-string work** (e90bfe2)
The checker can now nil out node arenas after temporary node builder use, breaking the GC link between generated nodes and their source arena. This is a memory-management improvement that helps cached printer/node-builder paths avoid holding onto more memory than necessary.

### Other misc changes
- Dependency updates across Go modules, vendored jsonrpc files, and tooling
- CI workflow updates for checkout/codeql/codecov actions and a new vendor generation step
- Add vendored license/notice file exceptions to .gitignore
- Minor dprint/gofumpt version bump
