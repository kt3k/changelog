---
date: 2026-08-19
repo: microsoft/typescript-go
size: L
title: "API generation lands, plus key fixes"
excerpt: "Generated the TS API from Go sources, shipped content mappers, and fixed crashes, comment preservation, and JSX go-to-definition edges."
commits: 6
authors: [weswigham, andrewbranch]
commit_authors: {"1a6eceb": weswigham, "01b9e72": andrewbranch}
---

### **Generate the TypeScript API from Go source** (1a6eceb)
The repo now generates the native-preview TS API directly from Go definitions, adding a new `generate:api` task and wiring API test builds to depend on generated enums/API output. This reduces manual drift between Go internals and the exposed TS surface, and the generated `proto.generated.ts` replaces a large hand-maintained chunk of protocol plumbing.

### **Add content mapper support to the VS Code extension** (01b9e72)
This introduces external content mappers as an experimental extension setting and plumbs them through the extension, client, and native-preview API. It also adds new AST span-map/enumeration generation, which is a substantial capability change for how unsupported file types can participate in TypeScript language features.

### **Prevent a crash when computing emit output paths** (65535b2)
Path handling in file rename and string-completion logic was hardened so case-folding can’t lead to invalid byte slicing on case-insensitive hosts. The fix closes a real crash scenario and adds regression coverage for tricky Unicode/case-folding path prefixes.

### **Preserve comments when downleveling arrow expression bodies** (aeff766)
The async transform/printer flow now converts expression-bodied functions into blocks in a way that keeps comments attached to the emitted return statement. This fixes comment loss in downleveled output, which matters for readability and for tools that rely on emitted source structure.

### **Fix go-to-definition at the right edge of JSX tag names** (c6b013f)
Token lookup was adjusted so the editor can resolve definitions when the cursor is exactly at the end of a JSX tag name. This improves a subtle but user-visible navigation bug in both the Go and TS navigation paths.

### Other misc changes
- Fix test:api on Windows, including a test runner invocation tweak and outDir path assertions.
- Misc test/baseline updates for the above fixes.
- Small internal refactors and generated-file churn from the API/content-mapper work.
