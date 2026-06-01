---
date: 2026-05-18
repo: microsoft/typescript-go
size: L
title: "Patches land for emit, JSX, and checker crashes"
excerpt: "A busy day of bug fixes: declaration emit, JSX parsing/printing, scanner correctness, and several panic/hang fixes in the checker."
commits: 20
---

### **Declaration emit now preserves parsed `typeof` postfix forms** (5a1261b)
The printer now treats postfix type operands specially so parsed `typeof X` stays unparenthesized in round-tripped output like `typeof C[keyof typeof C]`, while synthesized forms still get the parentheses TypeScript expects. This fixes declaration emit for arrays, indexed access, and optional tuple elements built from `typeof` types.

### **Enum `NaN` values stop collapsing and mis-caching** (b463318)
The checker now caches `NaN` literal types separately, since `NaN` can’t be used as a Go map key in the usual way. It also tracks `NaN` enum members per-enum symbol, fixing incorrect distinctness and assignment behavior for enums whose members evaluate to `NaN`.

### **Non-ASCII string literal types now round-trip in `.d.ts` output** (728eeb7)
Declaration emit now preserves the original characters for string-literal-like nodes instead of always ASCII-escaping them. That means emojis and other non-ASCII text stay readable in emitted declaration files, matching synthesized literal-type behavior more closely.

### **JSX entity decoding no longer skips entities after stray `&`** (1bf0f86)
The JSX transformer now walks past intervening literal ampersands when decoding entities, so mixed text like `&&amp;` and `a&b&amp;c` is emitted correctly. This fixes a bug where later entities could be skipped or decoded incorrectly in JSX text.

### **Scanner correctly handles multi-byte characters after a backslash** (2ea1509)
Escape-sequence scanning now decodes full UTF-8 runes after `\`, instead of treating them as single bytes. This fixes malformed escaping for non-ASCII characters and improves diagnostics for invalid escapes in strings and regex-like contexts.

### **Malformed `tsconfig` no longer panics the options parser** (5af4ac0)
The `tsconfig` parser now guards the object-literal extraction path against malformed inputs. Instead of crashing, it reports the bad config cleanly.

### **JSDoc `@param x.y` no longer breaks signature reparse** (f9db4c3)
Reparsing now skips qualified-name JSDoc parameters that describe sub-properties rather than standalone parameters. This avoids a panic path in callback/overload JSDoc handling.

### **Rest-tuple inference avoids a panic on too-short sources** (902a32b)
The checker now handles `[..., ...T]` inference when the source tuple is shorter than the fixed-arity constraint. That turns a crash into normal type-checking behavior for an edge case in variadic tuple inference.

### **Anonymous decorated classes now get a generated runtime name** (1850f57)
The ES2022 runtime-syntax transformer now generates a name for anonymous classes that are decorated, not just exported ones. That prevents the decorator emit path from tripping over nameless class declarations.

### **Declaration emit preserves JSDoc on private async methods** (913fed9)
Private async methods now keep their documentation comments in emitted declarations. This improves `.d.ts` output quality for APIs that rely on private helpers but still want accurate doc generation.

### **Numeric export names are handled in declaration emit** (7119345)
Declaration emit now supports export names that are numeric literals. This closes a gap where unusual-but-valid export names could be lost or mis-emitted.

### **Type-only exports in `if` bodies no longer crash the printer** (7892130)
The printer now handles the case where a type-only export appears as the body of an `if` statement. That removes a crash in an unusual but valid AST shape.

### **Switch witness typing fixes empty-string cases** (9f17e24)
The checker’s witness logic for `switch` clauses has been corrected. This tightens type reasoning around empty-string cases instead of producing incorrect flow results.

### **Catch binding rest properties no longer panic under ES2017** (fce6206)
Transforming rest properties in catch bindings now avoids a crash when targeting ES2017. This fixes a codegen edge case in downlevel emission.

### **`getRestTypeAtPosition` handles optional-plus-rest signatures** (6dd27e5)
The checker no longer panics when a contextually typed function mixes optional and rest parameters. This makes function-signature analysis more robust in a tricky inference case.

### **`@callback` / `@overload` JSDoc with qualified names no longer panics** (f3911d2)
The parser now tolerates `@this` and literal `this` parameter combinations that previously caused a crash. This is another JSDoc robustness fix in the reparser.

### **Top-level await reparsing now slices diagnostics correctly** (ce98adb)
A parser slicing bug in `reparseTopLevelAwait` has been fixed, preventing misaligned diagnostics and crash-prone behavior in await-heavy source files.

### Other misc changes
- JSX spread/assertion printer test updates
- Auto-import promote-fix crash fix for non-textual module specifiers
- Small printer plumbing updates for newline preservation
- Baseline/test updates for the fixes above
