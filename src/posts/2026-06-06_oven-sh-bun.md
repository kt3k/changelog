---
date: 2026-06-06
repo: oven-sh/bun
size: L
title: "REPL UTF-8, CSS hangs, and crash fixes"
excerpt: "Fixes REPL multi-byte input, two CSS parser/minifier DoS bugs, a dev-server CSS crash, and several runtime/refactor issues."
commits: 8
authors: [robobun, Jarred-Sumner]
commit_authors: {"a988615": robobun, "1293ef4": robobun, "0342abb": robobun, "90589f9": robobun, "300b148": Jarred-Sumner, "27d5181": robobun, "73ab3dd": robobun, "a7034f2": robobun}
---

### **REPL now preserves multi-byte UTF-8 input** (a988615)
The interactive `bun repl` line editor now handles full UTF-8 codepoints instead of dropping non-ASCII bytes. That means pasted or typed Korean and other multi-byte text is preserved, moved, and transposed correctly in the editor.

### **CSS minifier now merges duplicate rules in linear time** (1293ef4)
This fixes a fuzzer-found hang where adjacent rules with equivalent selectors could trigger superlinear work during duplicate-rule merging. The change makes the merge path incremental and adds regression coverage for the affected CSS families.

### **Auto-install no longer panics on unreadable top-level directories** (0342abb)
Package-manager initialization now returns a sticky error instead of crashing when the root directory cannot be read at runtime. This turns a Windows-heavy panic path into a recoverable failure for `bun <script>` and `bun -e` when the cwd is deleted or unreadable.

### **Dev server CSS rebuild failures stop crashing** (90589f9)
A CSS file that parses but fails import resolution during hot reload now fails cleanly instead of tripping a bundler assertion. The fix also stops parking failed CSS on the graph as if it were valid, which avoids misclassifying broken files as successful CSS chunks.

### **Markdown rendering avoids quadratic nested-label work** (27d5181)
Nested link/image label rendering was refactored to avoid repeated rescans and quadratic behavior on deeply nested inputs. This also changes the renderer’s internal flow to keep label traversal bounded by heap-backed state rather than repeated recursive slice rebuilds.

### **CSS parser stops exponential backtracking on nested color token lists** (73ab3dd)
Token-list parsing now tracks failures and propagates them early when an alternative has already failed inside a nested token-list argument. That closes an OOM/DoS class in nested color-function handling, including `light-dark()` and related token-list paths.

### **Decorator lowering now evaluates private-call receivers once** (a7034f2)
Private method call lowering now captures complex receivers into temporaries so side effects run once instead of being duplicated across nested private-call chains. The temp declarations are hoisted into the owning function body, fixing both a receiver double-evaluation bug and the fuzzed memory blow-up.

### Other misc changes
- Test runner scanner raw-pointer refactor and UB cleanup (300b148)
- Panic/error-handling plumbing around package-manager init and resolver auto-install (0342abb)
- CSS minifier state/merge refactor and regression tests (1293ef4)
- Markdown parser/rendering internals refactor and tests (27d5181)
- REPL key handling/editor refactor plus tests (a988615)
- CSS parser/custom property internal parsing refactors and tests (73ab3dd)
