---
date: 2026-05-07
repo: microsoft/typescript-go
size: L
title: "JSDoc, config lookup, and LSP watchdog fixes"
excerpt: "Several notable parser and project-resolution fixes landed, plus LSP now exits when its parent dies."
commits: 11
authors: [DanielRosenwasser, jakebailey, purelualight, andrewbranch, a-tarasyuk, weswigham]
commit_authors: {"51a1064": jakebailey, "b96acbe": a-tarasyuk, "0d33019": weswigham, "9e69d83": DanielRosenwasser}
---

### **LSP now shuts down when its parent process exits** (51a1064)
The language server now starts a watchdog tied to the parent PID and cancels the server context if that process disappears. This helps prevent orphaned `tsgo` LSP processes after an editor crash or forced quit.

### **JSDoc fenced code blocks now preserve `@` tags correctly** (3c6134d)
The JSDoc parser now tracks fenced code block state across newlines, so `@`-prefixed text inside triple-backtick blocks is treated as literal content instead of being misread as tags. That fixes hover and parsing behavior for examples and embedded code in JSDoc.

### **`@satisfies` no longer blocks `@param` application on arrow functions** (7f8d024)
The reparser now skips through `satisfies` expressions when looking for function-like hosts, so JSDoc `@param` types can still attach to arrow functions wrapped in a `@satisfies` annotation. This fixes incorrect type checking and diagnostics for a common JSDoc pattern.

### **JSDoc `?` and `!` prefixes now bind with the right precedence** (9e69d83)
The parser changed nullable/non-nullable JSDoc type parsing to use the higher-precedence type-operator path, matching how unions and other operators should combine. This resolves several incorrect parses and error cases around prefix operators mixed with unions, intersections, and `readonly`.

### **`tsconfig` option names are now case-sensitive with suggestions** (2e80702)
Config parsing now rejects incorrectly cased option names more precisely and can offer “Did you mean” suggestions for known top-level config sections. This makes tsconfig/jsconfig errors clearer and helps users recover from casing mistakes faster.

### **JS files now prefer `jsconfig.json` over sibling `tsconfig.json`** (16ff7f0)
Project discovery was adjusted so a JS file in a directory containing both configs is assigned to the `jsconfig.json` project, while TS files still resolve to `tsconfig.json`. That matches editor/server expectations and avoids JS files inheriting the wrong config semantics.

### **CommonJS export transformation is more robust in nested control flow** (b96acbe)
The CommonJS module transformer now handles nested `if`/labeled statements and `var`-hoisting cases without crashing or emitting invalid export syntax. Several baselines were updated to reflect safer fallback output in these edge cases.

### **Type metadata serialization fixed a null/undefined precedence bug** (0d33019)
A parenthesization bug in union/intersection metadata emission was corrected, changing some decorator metadata output for nullable unions. This matters because emitted design types are used by downstream reflection tooling and were previously being produced incorrectly in some strict-null-checks cases.

### Other misc changes
- Process-alive/platform plumbing and LSP shutdown wiring refinements.
- Minor comment fixes.
- `vscode-tas-client` dependency bump.
- Small internal GC/session and type-serializer tweaks.
