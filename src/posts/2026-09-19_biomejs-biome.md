---
date: 2026-09-19
repo: biomejs/biome
size: L
title: "Biome adds new React rule and codegen upgrades"
excerpt: "New nursery React linting, broader codegen support, and release/publish workflow changes land in one busy day."
commits: 9
authors: [dyc3, johncarmack1984, ematipico, m1handr, subaru-hello]
commit_authors: {"3b429d1": m1handr, "1ccc6f2": dyc3, "9b9376f": dyc3, "323548b": johncarmack1984, "9dcc255": ematipico, "b436ba0": subaru-hello}
---

### **New nursery rule catches React object defaults** (b436ba0)
Biome adds `noReactObjectTypeAsDefaultProp`, a nursery lint rule that flags array, object, and function values used as React default props. It also wires the rule into config, diagnostics, ESLint migration, and the JS analyzer so users can enable it and migrate to it cleanly.

### **Astro `set:html` now reports inside template expressions** (3b429d1)
`noAstroSetHtmlDirective` now detects `set:html` when it appears inside Astro template expressions, closing a hole where unsafe HTML could slip through unreported. The added fixtures cover nested conditional rendering cases so the rule behaves correctly in more realistic templates.

### **Codegen now lowers method generics and array types** (1ccc6f2, 9b9376f)
The global-type lowering pipeline was expanded to handle array syntax and generic method signatures, including constraints, defaults, and references from callbacks. That makes the generated type metadata more complete and avoids rejecting patterns that were previously unsupported.

### **Crates release flow and publishing checks were hardened** (9dcc255, 85f7497, 323548b)
The repo added CI to verify publishable crates, introduced a dedicated publish-crates workflow, and bumped the workspace to `0.7.0` for the release. This tightens the release process by catching stale generated versions and automating the crate publishing path.

### Other misc changes
- Tailwind preset generation is now enforced in CI, and Renovate stops auto-updating Tailwind in that preset generator.
- Testing/tooling docs were updated for newer `cargo insta` workflows and CLI snapshot expectations.
- Release bookkeeping and workspace dependency versions were refreshed during the crate publish/release work.
