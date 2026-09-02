---
date: 2026-09-01
repo: biomejs/biome
size: L
title: "Biome lands 4 new rules and key fixes"
excerpt: "Major lint additions, a React naming convention rule, and fixes for parser, Vue, Tailwind, CLI stdin, and type inference."
commits: 19
authors: [dyc3, ematipico, Netail, denbezrukov, levrik, Austin1serb]
commit_authors: {"2516335": dyc3, "f4e5ebb": dyc3, "1277af2": ematipico, "65da251": dyc3, "42995d2": ematipico, "54f3a2e": dyc3, "0f78499": ematipico, "472dbc2": levrik, "1d6210b": dyc3, "2d55931": Netail, "52a57b3": Austin1serb}
---

### **New lint rules: modern math APIs, flat Math.min/max, loop conditions** (f4e5ebb, 54f3a2e, 1d6210b)
Biome added three nursery rules: `useModernMathApis`, `useFlatMathMinMax`, and `noUnmodifiedLoopCondition`. Together they expand lint coverage for modernized math usage, cleaner `Math.min`/`Math.max` nesting, and loop conditions that never change, with migrations and config/schema wiring updated so the new rules can be enabled and auto-migrated from ESLint-compatible names.

### **React naming convention rule for createContext/useId/useRef** (2d55931)
A new nursery rule, `useReactNamingConvention`, enforces React-specific naming conventions for values derived from `createContext`, `useId`, and `useRef`. The change also extends Biome’s rule-source metadata and ESLint migration support to recognize the react-naming-convention plugin family.

### **Type inference in module cycles now preserves non-cyclic exports** (2516335)
Biome fixed a bug where `noFloatingPromises` could miss unhandled Promise chains when a dependency lived in an import cycle. The module-graph type inference rewrite now keeps types for exports that are not part of recursive dependencies, improving correctness for cyclic module graphs.

### **Parser/formatter/runtime fixes across JS, Vue, Tailwind, and CLI** (42995d2, 1277af2, 65da251, 472dbc2, 0f78499, 52a57b3)
Multiple user-facing bugs were fixed: malformed `delete` expressions no longer crash the parser, comments next to generic type arguments format correctly, Tailwind whitespace is no longer treated as trivia so recovery is more robust, Vue duplicate-key detection stops flagging props-derived values, stdin preserves Unicode correctly, and deep tree drops avoid stack overflows in rowan. These are mostly correctness and stability fixes, with some of them patching long-standing crashes or false positives.

### Other misc changes
- Added SCSS parser benchmarks
- Added a workflow to update module replacements
- Benchmark/sample-size tweak for type inference benches
- Dependency bumps: globset, tokio, ureq
