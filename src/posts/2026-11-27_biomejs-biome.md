---
date: 2026-11-27
repo: biomejs/biome
size: L
title: "New lint rules, type inference fixes"
excerpt: "Biome adds 3 nursery rules, tightens Promise inference and floating-promise detection, and fixes SPDX `+` license trust checks."
commits: 6
authors: [dyc3, 2tsoftwareapp]
commit_authors: {"100d4d7": dyc3, "3f1f7ce": dyc3, "00e98fc": dyc3, "f50b262": dyc3, "cc402fa": 2tsoftwareapp, "c12cd1c": dyc3}
---

### **Promise inference and floating-promise detection improved** (f50b262)
Biome now understands more of the TypeScript `Promise` surface, including static members and executor callback types, which makes promise classification more accurate. This also sharpens `noFloatingPromises`, so cases like `Promise.withResolvers().promise` are now reported correctly.

### **`noFloatingPromises` and `noMisusedPromises` now handle more Promise-like shapes** (c12cd1c)
This fixes several false negatives around promise handling, including computed string-literal method calls like `promise["then"](...)` and `PromiseLike` method results. It also adjusts the rule’s type inference hooks so async-disposable and promise-like methods are classified more consistently.

### **Added `noDuplicateIfBranches` nursery lint rule** (3f1f7ce)
Biome gains a new JS nursery rule that flags `if` branches which execute the same code as the previous branch. The rule is wired into lint configuration, schema, diagnostics, and ESLint migration support.

### **Added `noAmd` nursery lint rule** (00e98fc)
A new JS nursery rule now reports AMD `define()` and `require()` calls that load modules from arrays, nudging projects toward `import`-based modules. The rule is fully registered in configuration, diagnostics, and ESLint migration mapping.

### **Added `noTailwindLegacyImportant` nursery lint rule** (100d4d7)
Biome adds a new JS/HTML nursery rule for Tailwind classes that still use the legacy leading `!` important syntax from Tailwind v3. It points users to the modern suffix form and is integrated into lint migration support for Tailwind-related ESLint rules.

### **SPDX `+` license expressions are now trusted correctly** (cc402fa)
`noUntrustedLicenses` no longer rejects valid SPDX expressions like `Apache-2.0+` and `MPL-2.0+`. The trust checker now recognizes the trailing `+` operator while still preserving checks for deprecated or invalid forms.

### Other misc changes
- ESLint migration coverage updated for new nursery rules
- New rule options and diagnostics category entries generated
- Snapshot/test additions and updates for new rules and inference behavior
- Changeset and schema/documentation plumbing updates
