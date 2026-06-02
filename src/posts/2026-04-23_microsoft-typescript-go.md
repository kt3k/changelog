---
date: 2026-04-23
repo: microsoft/typescript-go
size: L
title: "Auto-imports, hover, and code actions refined"
excerpt: "Notable fixes landed across auto-imports, hover rendering, iteration diagnostics, and VS Code extension auto-insert behavior."
commits: 16
authors: [andrewbranch, jakebailey, gabritto, Andarist, RyanCavanaugh, lucygramley, a-tarasyuk, ahejlsberg]
commit_authors: {"5351378": Andarist, "ba858e5": andrewbranch, "4f599c6": gabritto, "5b5c713": jakebailey, "2e7b0e5": jakebailey, "44e13b7": lucygramley, "a94f221": a-tarasyuk, "fd9bbdb": ahejlsberg, "88f8ad1": jakebailey, "911ba0b": Andarist, "5ee9d71": gabritto}
---

### **VS closing-tag auto-insertion now uses the new onAutoInsert path** (44e13b7)
The extension switches from the old tag-closing feature to a dedicated `textDocument/_vs_onAutoInsert` handler, with matching protocol and server updates. This should make closing-tag insertion behave more predictably in VS Code and simplifies the feature wiring.

### **JS/JSX inference now aligns with TypeScript defaults** (fd9bbdb, 88f8ad1)
The checker removes the JS-only `any` default used during overload inference, then restores it after the behavior change is documented, indicating an intentional compatibility shift was still being worked through the same day. The net effect is a meaningful change in how generic type arguments are inferred in JS files, with examples like `Object.entries` now tracking `unknown` instead of `any` in the new behavior path.

### **Iterable-union errors now surface more accurately** (911ba0b)
Union iteration checks now stop as soon as any constituent isn’t iterable, instead of combining diagnostics too early. That fixes incorrect or missing error propagation for `for...of`, destructuring, and index access on unions like `A[] | B`.

### **Hover expansion prints heritage clauses as declared** (4f599c6, 5351378, 5ee9d71)
Hover/quick info rendering was adjusted so expandable hovers preserve the declared order of heritage clause elements and print property access expressions correctly. These are user-facing presentation fixes that make symbol hovers easier to read and less surprising for mixins, merged interfaces, and aliased exports.

### **Auto-import packages now include `compilerOptions.types`** (ba858e5)
Auto-import package discovery now respects `compilerOptions.types`, so package suggestions better match the project’s configured type environment. That helps avoid offering imports from packages the project doesn’t intend to see.

### **Module resolution trims a trailing directory separator** (2e7b0e5)
A resolver fix removes an extra trailing separator when looking up modules from a specific `node_modules` directory. This is a targeted bug fix for path handling in module resolution.

### **Stack telemetry redaction is less aggressive** (5b5c713)
The stack sanitizer got a workaround to avoid over-redacting generic-looking secrets in telemetry output. This preserves more useful diagnostic detail while still keeping sensitive data protected.

### **Hover/codefix and declaration-experience bugs were cleaned up** (dc17525, a94f221, fd9bbdb)
Several user-visible correctness fixes landed for isolated declarations code actions, object-equality diagnostics, and related test coverage. Together they improve the quality of quick fixes and reduce false or duplicated suggestions in editor workflows.

### Other misc changes
- Extension menu/config cleanup and session refactors
- CLI/LSP launch template wiring
- Dependency/test/baseline updates across compiler, LSP, and fourslash suites
- Documentation note added for `.js -> .d.ts` emit changes
