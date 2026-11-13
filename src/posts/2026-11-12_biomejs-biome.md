---
date: 2026-11-12
repo: biomejs/biome
size: L
title: "Biome ships a wave of type-aware lint rules"
excerpt: "Major type inference upgrades plus several new nursery lint rules for JS/TS, Vue, HTML, and package.json licensing."
commits: 19
authors: [dyc3, ematipico, vibbix, pkallos]
commit_authors: {"e7c8297": ematipico, "5d28641": dyc3, "c33c03d": dyc3, "82651f5": dyc3, "149d729": dyc3, "0a9d204": dyc3, "6f2635a": dyc3, "04f30c4": dyc3, "5d7ca32": dyc3, "81d8d28": dyc3, "0bbe4f1": dyc3, "a5c08f8": ematipico, "aefaab9": ematipico, "596a2b1": ematipico, "87784c7": dyc3}
---

### **Type-aware inference now handles overloads, conditionals, and narrowing** (e7c8297, 596a2b1, a5c08f8, aefaab9, 87784c7)
Biome significantly expanded its type system support: it now selects the correct method overload in local inference, evaluates conditional types and `infer` bindings, and applies flow-sensitive narrowing after truthiness, equality, `typeof`, and assertion/predicate checks. This makes type-aware rules like `useAwaitThenable`, `noFloatingPromises`, `noUnnecessaryConditions`, and `useExhaustiveSwitchCases` materially more accurate.

### **New lint: `usePackageJsonValidLicense`** (5d28641)
Added a nursery rule to validate `package.json` license fields, with diagnostics for malformed values like arrays, booleans, empty strings, duplicate fields, spelling mistakes, and bad file references. The rule is wired into configuration/schema plumbing and ESLint migration support.

### **New lint: `useVueRegisteredComponentNameCasing`** (c33c03d)
Introduced a Vue-specific rule that checks registered component names against the configured casing convention. It includes Vue service support, config integration, and examples covering define-component/define-options usage.

### **New lint: `noConfusingArraySplice`** (82651f5)
Added a rule to flag confusing `Array.prototype.splice` usage patterns in JS and TS. This comes with autofix/migration plumbing, rule options, and configuration schema updates, so it can be enabled and enforced consistently.

### **New lint: `noVueDefineModelDefault`** (149d729)
Biome now warns when Vue `defineModel` is used with a default value in situations that can cause surprising parent/child state behavior. The implementation includes Vue parser/service integration and test coverage for valid and invalid SFC patterns.

### **New lint: `noDynamicRequire`** (0a9d204)
Added a nursery rule discouraging dynamic `require()` usage, including cases that should instead use dynamic imports. The rule is exposed through config/schema and supports the project’s ESLint migration path.

### **New lint: `noLateCurrentTargetAccess`** (6f2635a)
Implemented a rule to catch late access to `currentTarget` in event handlers, sharing new event-handler analysis infrastructure. This is a stronger correctness check for DOM/event code and appears to replace older shared logic around late event handling.

### **New lint: `noMisusedSpread`** (04f30c4)
Biome now detects spread misuse across object/array/JSX-like contexts, backed by type info for better precision. This is a broad correctness rule with full option/schema integration and substantial test coverage.

### **New lint: `noTripleSlashReference`** (5d7ca32)
Added a rule to flag `/// <reference ...>` directives in TypeScript files. The rule covers multiple file formats and edge cases like BOM/shebang handling, making it useful for codebases that want to avoid ambient reference directives.

### **New lint: `noTailwindRestrictedClasses`** (81d8d28)
Biome can now detect restricted Tailwind classes across HTML, Astro, Svelte, and Vue templates. The rule includes stylesheet-related CLI behavior and config/schema integration, making it applicable across supported frontend ecosystems.

### **New lint: `noVueDeprecatedVIs`** (0bbe4f1)
Introduced a Vue rule for deprecated `v-is` usage, with support for Vue templates and config/schema wiring. This helps projects surface outdated Vue syntax before it becomes a maintenance issue.

### **Other misc changes**
- Type-aware rule plumbing and test updates across JS/TS analysis.
- Docs/comments/test fixtures cleanup and snapshot removals.
- Dependency bump: `@types/node` to v24.19.2.
