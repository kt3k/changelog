---
date: 2026-11-19
repo: biomejs/biome
size: M
title: "Lint fixes, perf wins, and CSS precision"
excerpt: "Biome improved JS/CSS lint accuracy and sped up lint/check/ci on Linux, with a nullish-coalescing refactor and event-handler fix."
commits: 4
authors: [dyc3, pkallos, vibbix]
commit_authors: {"29520f5": pkallos, "c531a54": dyc3, "ea3b347": dyc3, "03b0edd": vibbix}
---

**Nullish coalescing rule got a major cleanup and behavior clarification** (29520f5)
The `useNullishCoalescing` rule was heavily reworked, with the implementation and test matrix reorganized to cover ternaries, conditional-test handling, boolean coercion options, and comment trivia more precisely. The rule docs were also tightened to spell out when ternaries are reported and when strict null/undefined comparisons are allowed.

**`noDescendingSpecificity` now compares resolved selectors more accurately** (03b0edd)
The CSS specificity rule now handles nested selectors, ignores rules with no declarations, and compares resolved subjects so it matches cases Stylelint reports. This fixes false positives around nested SCSS/CSS patterns and broadens test coverage for selector resolution edge cases.

**`noLateCurrentTargetAccess` skips handlers that can’t pause** (c531a54)
The event-handler lint now avoids treating non-`async`, non-generator handlers as needing pause tracking, which removes a bad code path and tightens the rule’s logic. That fixes a false positive/edge-case in late `currentTarget` access detection.

**Lint/check/ci got faster by avoiding per-file empty project layouts** (ea3b347)
Biome now skips building an empty project layout for every analyzed file on Linux, reducing OS overhead during large runs. The change should make `biome lint`, `biome check`, and `biome ci` noticeably faster on bigger codebases.

### Other misc changes
- Dependency/release metadata updates via changesets (3 commits)
- Added/updated regression tests and snapshots for the lint and CSS fixes
