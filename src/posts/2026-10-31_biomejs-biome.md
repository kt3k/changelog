---
date: 2026-10-31
repo: biomejs/biome
size: L
title: "Biome adds a wave of Vue lint rules"
excerpt: "A feature-heavy day: 9 new Vue/HTML lint rules landed, plus config, migration, and docs plumbing across the stack."
commits: 13
authors: [dyc3, Bsibz]
commit_authors: {"4347302": dyc3, "5044c56": dyc3, "e998921": dyc3, "1d4ed92": dyc3, "4b1089d": dyc3, "3d92356": dyc3, "071324d": dyc3, "e2a5cdb": dyc3, "37440f9": Bsibz, "e69572b": dyc3, "c3dc557": dyc3, "59838bb": dyc3}
---

### **Nine new Vue/HTML lint rules land across Biome**
Biome added a large batch of nursery lint rules covering Vue correctness and deprecation cases, including `noVueRestrictedCallAfterAwait` (5044c56), `noVueUndeclaredEmits` (1d4ed92), `noVueDeprecatedPropsDefaultThis` (e998921), `noVueDeprecatedSlotScope` (4347302), `noVueLoneTemplate` (c3dc557), `noVueVForTemplateKeyOnChild` (59838bb), `noVueMixin` (4b1089d), `useVueSlotNameCasing` (3d92356), and `useVueValidDefineOptions` (071324d).
These rules expand Biome’s Vue support in a meaningful way, catching deprecated APIs, invalid macro usage, and template patterns that can produce broken or misleading Vue behavior.

### **`useVueRenderReturn` enforces render paths**
The new `useVueRenderReturn` rule (e69572b) checks that Vue component `render()` functions return a value on every path. The implementation also adjusts control-flow handling to support the rule, making it a deeper semantic lint addition than a simple pattern check.

### **`rules_check` gains Vue semantic model support**
Biome refactored rule documentation/model generation so `rules_check` builds and uses Vue semantic models (e2a5cdb). That change updates the ruledoc pipeline and service database plumbing, which should improve how Vue rules are analyzed and documented going forward.

### Other misc changes
- Rule migration mappings added for the new Vue rules.
- Configuration/schema and diagnostics category updates for new rule names.
- Small rule-option and test-only follow-ups.
- A minor naming-convention bug fix for `typeMember` matching type parameters (37440f9).
