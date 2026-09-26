---
date: 2026-09-25
repo: biomejs/biome
size: M
title: "Lint and formatter fixes land"
excerpt: "Biome fixed focused-test and unused-variable false negatives, plus a GritQL spacing bug and generated-file metadata cleanup."
commits: 4
authors: [dyc3, erenbati]
commit_authors: {"6964bfc": erenbati, "8477e61": dyc3, "1696d60": dyc3, "b51040e": dyc3}
---

**noUnusedVariables now catches self-recursive arrow functions** (8477e61)
The linter now flags arrow functions whose expression bodies only reference themselves, such as `let h = () => h();`. This closes a false negative in `noUnusedVariables` and improves diagnostics for accidental recursive stubs.

**noFocusedTests stops misreading chained `.fit()` calls** (6964bfc)
`noFocusedTests` now only treats direct calls like `fit(...)` as focused tests, instead of flagging chained method calls such as `builder.image(url).fit("max")`. That reduces false positives in fluent APIs that happen to use the same method name.

**GritQL formatter fixes spacing for `within` without `until`** (b51040e)
The formatter no longer inserts a trailing space/comma artifact after `within` patterns when there is no `until` clause. This cleans up generated GritQL and makes formatter output match expected syntax more reliably.

### Other misc changes
- Generated-file metadata cleanup in `.gitattributes` (1696d60)
- Patch release notes added for the three fixes above
