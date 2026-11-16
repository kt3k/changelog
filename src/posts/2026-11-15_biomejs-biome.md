---
date: 2026-11-15
repo: biomejs/biome
size: L
title: "Big lint and tooling push lands"
excerpt: "Biomes adds several test-focused lint rules, a shared non-array receiver helper, parser hardening, and a new internal crate publisher."
commits: 16
authors: [dyc3, ematipico, pkallos, GBra-4-669]
commit_authors: {"103dc4e": dyc3, "909ceac": ematipico, "c919f1c": pkallos, "6e2b42e": dyc3, "54eb224": dyc3, "0cc8548": dyc3, "c3f850e": dyc3, "981cd33": dyc3, "8ece6a5": dyc3, "432e8c8": dyc3, "6f231d0": dyc3, "ee7e535": GBra-4-669}
---

### **Internal crate publishing automation added** (909ceac)
Biome now has an internal publisher workflow and supporting `xtask` tooling to plan, verify, rate-limit, and publish crates safely. The publish flow now checks for an existing release branch, requires a verified dry-run run, and publishes the exact reviewed revision rather than an unchecked merge commit.

### **New `useTopLevelDescribe` rule and test-rule fixes** (c3f850e)
Added a new nursery rule that enforces tests/hooks to live inside `describe` blocks, with a `maxTopLevelDescribes` option to cap top-level wrappers. The same change also fixes `describe`-modifier handling across existing test rules and extends title validation to tagged-template and conditional test calls.

### **New `noUselessSetConstruction` rule** (8ece6a5)
Biome now flags unnecessary `Set` construction, including broad coverage for JS, TS, JSX, and JSONC inputs. This closes a common performance and readability footgun by catching empty or redundant set-building patterns.

### **New `noUselessNestedTernary` rule** (981cd33)
Added a nursery rule that reports nested ternaries and ships with a wide set of JS/TS test cases. It helps simplify hard-to-read conditional expressions and provides editor/configuration integration out of the box.

### **New `noTestGlobals` rule** (0cc8548)
Biome now detects Jest and Vitest globals that should be imported explicitly instead of being assumed at runtime. The rule is wired into the CLI migration flow and config schema, and the snapshots show it can suggest safe imports for APIs like `describe`.

### **New `noJasmineGlobals` rule** (54eb224)
Added a nursery rule for Jasmine globals used in Jest-style tests, such as `spyOn`, `fail`, `pending`, and `jasmine` itself. That reduces portability issues when code runs under Jest's default environment, where those globals are not provided.

### **New `noReturnInTest` rule** (6e2b42e)
Biome now flags `return` statements directly inside test bodies and classifies the rule under the `test` domain. The implementation is integrated with framework detection and has migration mappings for Jest, Playwright, and Vitest equivalents.

### **New `useExpectToHaveLength` rule** (432e8c8)
Added a nursery rule that prefers `toHaveLength` over length-based `expect(...).toBe(...)` patterns. This improves test clarity and gives users direct lint migrations from corresponding Jest-style rules.

### **New `useExpectToStrictEqual` rule** (6f231d0)
Biome now recommends `toStrictEqual` where stricter deep equality is intended. The rule includes configuration, diagnostics, and migration support, making it easier to codify more precise assertions in tests.

### **JS parser no longer panics on `import.defer` / `import.source`** (ee7e535)
The parser now reports a syntax error when `import.defer` or `import.source` appears without the required call parentheses, instead of panicking. That turns a crash into a recoverable parse error and hardens parsing on malformed code.

### **Destructuring defaults now flow into binding types** (c919f1c)
Type inference now applies destructuring defaults to binding types, fixing cases where optional values were treated as potentially `undefined` even after a default assignment. That improves downstream analysis like `useNullishCoalescing` and module-type snapshots.

### **Shared non-array receiver checks refactored across lint rules** (103dc4e)
Several array-oriented lint rules now share a common helper for recognizing non-indexed receivers, replacing duplicated logic. This is mostly an internal refactor, but it should make these rules easier to maintain and keep their behavior consistent.

### Other misc changes
- Release-note and docs updates
- Minor publish/workflow tweaks outside the new publisher system
- Dependency and snapshot churn
