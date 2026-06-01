---
date: 2026-04-29
repo: microsoft/typescript-go
size: L
title: "API expansion and debugger stack guard"
excerpt: "New native-preview checker endpoints, a stack-limit escape hatch, and fixes for union truncation and JS Promise diagnostics."
commits: 6
authors: [navya9singh]
commit_authors: {"1b81e8f": navya9singh}
---

### **Native preview exposes more checker APIs** (1b81e8f)
The native-preview layer now exports `NodeBuilderFlags` and adds several new checker calls, including resolved signatures, widened/non-nullable/type-node conversion helpers, parameter type lookup, and an array-like type check. This broadens what tooling can query from the checker and makes the preview API substantially more capable.

### **Add a debug stack limit for tsgo entry points** (2c25188)
`TS_GO_DEBUG_STACK_LIMIT` now lets developers cap goroutine stack size when the CLI and test entry points start up. That gives a controlled way to reproduce or prevent runaway stack growth during debugging.

### **Fix off-by-one truncation in union display** (ce43ebc)
Union type truncation now counts displayed elements correctly, so error text no longer under-reports how many union members were elided. This improves the accuracy of diagnostics and quick info for large unions.

### **JS Promise arity errors now point to the JSDoc-specific hint** (f65feaf)
In JS files, calling `new Promise((resolve) => resolve())` now reports the dedicated TS2810 message telling users that `new Promise()` needs a JSDoc hint for a zero-arg `resolve`. This makes the diagnostic more actionable for `checkJs` users.

### **Reparse bracketed `@param` names as optional modifiers** (5a31703)
Bracketed JSDoc parameter names are now always reparsed into `?` optional markers, instead of being treated like plain optional declarations only in some cases. That fixes JS type inference and grammar behavior for defaulted parameters documented with `[name]` syntax.

### **Extension command renamed for version selection** (56ab4af)
The built-in command for choosing a TypeScript version was renamed to the native-preview namespace and wired through the extension UI. This keeps the command surface aligned with the extension's naming scheme.
