---
date: 2026-07-10
repo: biomejs/biome
size: L
title: "Bug fixes for linting, inference, and markdown"
excerpt: "Fixed an infinite fix loop in noCommentText, improved inference cloning, and corrected markdown list parsing/formatting."
commits: 4
authors: [JamBalaya56562, dfedoryshchev, ematipico, tidefield]
commit_authors: {"5e1abfe": JamBalaya56562, "879589b": dfedoryshchev, "ecca79e": ematipico, "bc8701b": tidefield}
---

**noCommentText fix no longer loops forever** (5e1abfe)
`biome check --write --unsafe` now applies the JSX comment fix in a way that doesn’t get re-triggered by the same rule. The change wraps comments in a real JSX expression container, which prevents the infinite fix loop behind issue #9196.

**Markdown list whitespace is parsed and formatted correctly** (bc8701b)
Whitespace after list markers is now handled more accurately in the Markdown parser and formatter, including marker-only bullets. This fixes edge cases around list continuation and trailing spaces that previously produced incorrect parsing or formatting output.

**Inference now clones data with the correct function** (ecca79e)
A regression in module inference was fixed by using the right cloning path when copying data. This matters because it restores correct analysis for cross-module promise flows and avoids false negatives in affected projects.

### Other misc changes
- CSS docs note that `noDuplicateProperties` ignores `@keyframes` declarations (879589b)
- Added regression coverage and snapshots for the fixed issues (5e1abfe, ecca79e)
