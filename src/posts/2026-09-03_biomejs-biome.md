---
date: 2026-09-03
repo: biomejs/biome
size: L
title: "SCSS parsing and Vue linting expand"
excerpt: "Biome adds SCSS numeric identifier support, a new Vue import rule, and broader CSS/markdown benchmark coverage."
commits: 8
authors: [denbezrukov, dyc3, ematipico, nhedger]
commit_authors: {"3046345": denbezrukov, "137d48a": denbezrukov, "a64d757": dyc3, "d946e69": denbezrukov, "3823f8a": ematipico, "611767f": nhedger, "d064a46": denbezrukov}
---

### **SCSS interpolated identifiers now handle numeric parts** (137d48a)
Biome’s CSS parser and formatter were extended to model `CssNumber` inside SCSS interpolated identifier parts, fixing cases where numbers can legally touch interpolated names in selectors and identifiers. The change is backed by new parser/formatter fixtures covering boundary cases like `#{$tag}1`, `.item-#{$index}0`, and attribute selectors with interpolated numeric suffixes.

### **New Vue rule: prefer importing APIs from `vue`** (a64d757)
A new nursery lint rule, `useVueBaseImport`, flags imports from internal `@vue/*` packages and steers users toward the public `vue` entrypoint. The rule is wired into config, diagnostics, ESLint migration, the rule-options schema, and the generated docs/snapshots, so it’s fully exposed to CLI and workspace config users.

### **SCSS unary operator parsing gets a fast path** (d946e69)
The SCSS expression parser now short-circuits unary-operator detection with a direct token check, while preserving the special-case handling for dashed custom-property identifiers like `var(--#{$name})`. This is a small parser performance cleanup that should reduce unnecessary lookahead work.

### **CSS parser benchmarks stop collecting diagnostics in-loop** (3046345)
Benchmarking now separates diagnostic printing from the timed parse loop, avoiding benchmark noise from accumulated diagnostics. That makes parser benchmark results more representative of parse cost rather than post-processing overhead.

### **Markdown and YAML benchmark coverage widened** (3823f8a)
The benchmark workflow was consolidated and expanded to cover markdown formatter/analyzer packages and the YAML formatter, not just the parser crates. This also removes the old standalone markdown benchmark workflow and adds fresh benchmark fixtures for markdown and YAML workloads.

### **Other misc changes**
- Added isolated SCSS benchmark fixture list entries for additional operator/list/map/argument cases (d064a46)
- Updated Depot logo assets in the Biome package README (611767f)
- Release/changelog housekeeping from the ci: release workflow (0a31d7c)
