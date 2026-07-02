---
date: 2026-07-01
repo: biomejs/biome
size: L
title: "Big lint, parser, and YAML formatter day"
excerpt: "New YAML sequence mapping formatting, multiple lint fixes, CSS parser recovery, and a workspace/LSP refactor landed today."
commits: 15
authors: [ematipico, WaterWhisperer, otkrickey, Netail, Mokto, minseong0324, dfedoryshchev, pkallos, Aqu1bp, JamBalaya56562, denbezrukov, pattrickrice]
commit_authors: {"f1d3877": ematipico, "86613d5": WaterWhisperer, "3c6513d": otkrickey, "ae31a00": Netail, "aa649b5": minseong0324, "a66a42c": dfedoryshchev, "4a32b63": pkallos, "2c3e82d": Aqu1bp, "7aff4c1": JamBalaya56562, "575ced6": WaterWhisperer, "f1b3ab2": ematipico, "2f6e0e6": denbezrukov, "bde945b": pattrickrice}
---

### **YAML formatter now handles sequence mappings** (f1d3877)
Biome’s YAML formatter gained support for flow-sequence mappings, with new separator handling and broader trivia preservation. This changes how several YAML flow-sequence cases are rendered and fixes a large set of snapshot expectations.

### **CSS parser recovers at EOF for unsupported CSS Modules syntax** (86613d5)
The parser now stops recovery loops at EOF when it encounters unsupported `@keyframes` CSS Modules names or `@value` rules. That prevents a panic-style failure mode and makes malformed end-of-file cases parse safely.

### **Vue `v-on` lint is less strict about valid shorthand forms** (3c6513d)
`useVueValidVOn` now accepts verb-modifier-only handlers like `@click.stop` and treats arg-less object syntax as valid when a value is present. It also tightens modifier handling so valid Vue patterns aren’t incorrectly flagged.

### **HTML accessibility rules now understand dynamic attributes** (ae31a00)
Several HTML a11y checks were updated to work with dynamic Vue/HTML attribute forms instead of only static HTML attributes. This fixes a broad class of false positives around `aria-hidden`, `type="hidden"`, and related attribute-driven accessibility logic.

### **`useNullishCoalescing` adds `ignorePrimitives`** (4a32b63)
The rule now supports a new `ignorePrimitives` option, letting users suppress diagnostics for primitive-only fallbacks by type. The change also updates the rule schema and backend config plumbing, so it’s a user-visible lint configuration expansion.

### **`noMisleadingReturnType` now respects type assertions more precisely** (aa649b5)
The rule no longer misflags widening assertions like `"a" as string`, and it now treats literal-pinning assertions such as `false as false` consistently with `as const`. That reduces false positives while improving the rule’s type reasoning.

### **Workspace/LSP internals were reworked for better correctness and responsiveness** (f1b3ab2)
A substantial refactor moved the workspace database out of the workspace layer and threaded it through CLI, LSP, and service code. The same patch also improves daemon responsiveness by cancelling stale in-flight work and fixes project/type-aware lint rule enablement.

### Other misc changes
- CSS parser feature: hyphen-led interpolated SCSS properties (2f6e0e6)
- `useAwaitThenable` custom thenable false positive fix (aa649b5)
- `noSolidDestructuredProps` handles JSX children better (2c3e82d)
- `noInteractiveElementToNoninteractiveRole` ignores custom elements (7aff4c1)
- GitLab reporter now filters verbose diagnostics (575ced6)
- `workspace_db` error wording fix and a formatter comment doc typo (bde945b, a66a42c)
- Release/changeset housekeeping and assorted test/snapshot updates (e649198, plus minor follow-up commits)
