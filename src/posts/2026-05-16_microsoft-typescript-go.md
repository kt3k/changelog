---
date: 2026-05-16
repo: microsoft/typescript-go
size: M
title: "Four parser/codegen bug fixes land"
excerpt: "Fixes out-of-bounds/trivia scanning, destructuring flattening, JSX runtime import detection, and async accessor error handling."
commits: 4
---

### **Async accessor no longer triggers a panic** (105910f)
The grammar check now reports the diagnostic for `for await` inside an async getter/setter instead of crashing on an impossible async-function assertion. This makes malformed accessor input produce errors reliably rather than taking down the compiler.

### **Destructuring flattening handles empty bindings safely** (0a70299)
Fixes an out-of-bounds access when flattening destructuring patterns with no bindings. The new test covers an empty nested binding case that previously could mis-handle emitted temporaries.

### **Trivia skipping now tolerates end-of-file positions** (c6460d1)
`SkipTriviaEx` now returns immediately when asked to scan past the end of the source text. That closes an out-of-bounds edge case in incomplete code, improving scanner robustness on truncated input.

### **JSX runtime import detection includes self-closing tags** (03db8ff)
The parser now recognizes JSX opening-like elements when walking the tree for runtime-import needs, fixing missing `react/jsx-runtime` imports for self-closing JSX. This affects emit correctness for React JSX output.

### Other misc changes
- Added regression tests and baselines for each fixed case.
