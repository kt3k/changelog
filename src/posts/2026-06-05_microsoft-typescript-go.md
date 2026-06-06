---
date: 2026-06-05
repo: microsoft/typescript-go
size: M
title: "WebStorm APIs, go-to-impl fix, comment preservation"
excerpt: "Adds native-preview APIs for WebStorm, fixes go-to-implementation on typed object literals, and preserves param comments in generated d.ts."
commits: 3
authors: [navya9singh, piotrtomiak, Andarist]
commit_authors: {"1f955e9": navya9singh, "bfc3663": piotrtomiak, "23d1c94": Andarist}
---

**WebStorm integration gets missing native-preview APIs** (bfc3663)
The native-preview API surface was expanded with new async/sync checker and type hooks, plus matching Go session/proto plumbing. This unblocks WebStorm integration by exposing type assignability and richer type metadata such as fresh/regular types, intrinsic names, alias symbols, and related object fields.

**Go to Implementation now finds typed object literal implementations** (1f955e9)
A reference-tracking condition was corrected so implementation candidates aren’t skipped when the containing type has already been seen. The update adds coverage for object literals typed as interfaces and broadens the baseline expectations for interface/namespace go-to-implementation results.

**Declaration emit preserves original parameter comments** (23d1c94)
Pseudo type node generation now carries over comment ranges from original parameter declarations when `removeComments: false` is in effect. That keeps inline JSDoc parameter comments in generated `.d.ts` output instead of dropping them.

### Other misc changes
- Added/updated fourslash and baseline tests for go-to-implementation and code lenses.
- Dependency/test baseline housekeeping around submodule accepted outputs.
