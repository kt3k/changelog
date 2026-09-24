---
date: 2026-09-23
repo: biomejs/biome
size: L
title: "Parser, lint, and type-info upgrades"
excerpt: "Major parser and type-inference fixes, new CSS/JS lint rules, and a CLI fix for malformed configs."
commits: 14
authors: [dyc3, ematipico, posido, Th3S4mur41, siketyan]
commit_authors: {"3260602": ematipico, "ff4c4dd": dyc3, "06ff47b": dyc3, "4a32975": dyc3, "9e50ea2": ematipico, "1bdca0e": dyc3, "ae48ca9": dyc3, "22a38c0": dyc3, "d2b7855": dyc3, "b87822d": dyc3, "b7d9037": posido, "1b9479e": Th3S4mur41, "02441c4": ematipico, "dd5a5ce": siketyan}
---

### **Fix embedded suppression handling across HTML-ish snippets and JS embeds** (3260602)
Biome now applies suppression comments correctly in HTML-like files and in snippets embedded inside JavaScript, so ignores work where developers expect them to. This touches the analyzer pipeline and file handlers to make snippet analysis respect both host-file and embedded-file suppressions.

### **Fix TypeScript parsing edge cases around `<<` and instantiation expressions** (dd5a5ce)
Biome no longer misreads shift expressions as type arguments in a couple of tricky TS patterns, including `f<T> << f<T>` and `<<` followed by a later `>>>`. This prevents false parse errors and aligns parsing more closely with TypeScript.

### **Add `useLogicalProperties` for CSS logical-property enforcement** (1b9479e)
A new nursery CSS rule flags physical properties like `width`, `left`, and `margin-top` in favor of logical equivalents, with an option to target LTR or RTL layouts. It broadens Biome’s CSS lint coverage and ships new configuration/schema plumbing plus autofix-ready diagnostics.

### **Add `noMeaninglessVoidOperator` to catch pointless `void` usage** (ff4c4dd)
Biome gains a new JS nursery rule that reports unnecessary `void` operators, such as `void log()` when the call already returns `void`. It’s integrated into lint configuration and ESLint migration support, so teams can adopt it more easily.

### **Fix type inference for computed members, Intl, Date, and global function declarations** (d2b7855, ae48ca9, 22a38c0, 1bdca0e)
The type-info and module-graph pipeline got a substantial expansion: computed/static members are now lowered and formatted correctly, symbol-keyed access is inferred, `Intl` and `Date` members are modeled more completely, and global functions like `eval`/`parseInt`/`encodeURI` are lowered from source declarations. This should improve the precision of inferred types and downstream diagnostics across the JS ecosystem support.

### **Fix malformed config files from being silently ignored** (9e50ea2)
Biome now surfaces configuration parse errors before running commands instead of quietly proceeding with a broken config. That makes failures much more obvious and prevents confusing lint/format/check behavior when the project config is invalid.

### **Fix `noUselessStringConcat` string-fix quoting** (06ff47b)
The string-concatenation fixer now escapes quotes properly when rewriting code. This avoids producing broken or misleading autofixes in quote-heavy strings.

### **Fix `useAtIndex` and `useForOf` edge cases** (4a32975, b87822d)
These style rules were tightened up to preserve negative index expressions and to avoid suggesting `for...of` rewrites when the loop body is intentionally updating the index. Both are correctness-focused bug fixes to autofix behavior.

### **Fix HTML regex lexing with leading `>`** (b7d9037)
The HTML parser now lexes regex literals that begin with `>` correctly instead of confusing them with other tokens. This is a targeted parser fix that reduces false syntax errors in HTML contexts.

### Other misc changes
- CI workflow tweak to silence a verification job (02441c4)
- Dependency/changeset and rule-registration updates for the new lint rules and type-info changes
- Small internal analyzer/service refactors to support snippet-aware suppression handling
