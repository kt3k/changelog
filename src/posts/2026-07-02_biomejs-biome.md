---
date: 2026-07-02
repo: biomejs/biome
size: M
title: "Lint fixes and formatter compatibility gains"
excerpt: "Biome tightened type-aware linting, expanded markdown formatting compatibility, and sped up embedded-range plumbing."
commits: 6
authors: [ematipico, JamBalaya56562, minseong0324, Aqu1bp]
commit_authors: {"2862780": ematipico, "d83c66b": minseong0324, "5dbbbb9": ematipico, "d3ac549": JamBalaya56562, "bba3092": JamBalaya56562, "098ba41": Aqu1bp}
---

### **Type-aware linting now catches more real-world cases** (d83c66b)
Biome improved its inference for built-in globals and indexed function calls, so rules like `noFloatingPromises` can recognize cases such as `Error(...)`, `new Error(...)`, `Error#stack`, and `handlers[0]()` more accurately. This reduces false negatives in promise and type-aware analysis.

### **Markdown formatter handles more compatibility edge cases** (2862780)
The markdown formatter got a broad compatibility pass across lists, inline formatting, links, quotes, code blocks, and escaping. These changes aim to preserve valid CommonMark behavior more reliably while avoiding idempotency regressions in tricky nested-list and fenced-code scenarios.

### **Embedded-range plumbing was optimized across JS tooling** (5dbbbb9)
Biome switched JS formatting context/state from a boolean flag to explicit embedded-node ranges, tightening how embedded template chunks are delegated to language-specific formatters. That refactor removes guesswork, makes the pipeline more precise, and includes related service/codegen updates plus a small formatter benchmark adjustment.

### **Unsafe optional chaining now flags TS wrappers** (098ba41)
`noUnsafeOptionalChaining` now detects unsafe optional chains wrapped in TypeScript `as`, `satisfies`, type assertions, and instantiation expressions. That closes a gap where cases like `new (value?.constructor as Constructor)()` could slip through unnoticed.

### **`noProcessEnv` now checks computed member access** (bba3092)
The `noProcessEnv` rule now reports bracket access too, catching patterns like `process["env"]` and `env["NODE_ENV"]` in addition to dot notation. This makes the rule more complete and harder to bypass accidentally.

### Other misc changes
- CI/security advisory allowlist updated for `quick-xml` advisories (d3ac549)
