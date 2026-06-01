---
date: 2026-05-20
repo: microsoft/typescript-go
size: M
title: "Declaration emit fix and AI policy update"
excerpt: "Declaration emit now normalizes reused string property names, while CONTRIBUTING adds explicit guidance on AI-assisted and autonomous PRs."
commits: 3
authors: [RyanCavanaugh]
commit_authors: {"2cf002e": RyanCavanaugh}
---

### **Normalize reused string-literal property names in declaration emit** (91c4dfd)
Declaration emit now converts reused string-literal property names to identifiers when the text is a valid identifier, matching how freshly built property names are handled. This fixes inconsistent `.d.ts` output for object properties like `"query"`, `"search"`, and `"user"`, while preserving the special `"new"` case so method signatures don’t accidentally turn into construct signatures.

### **Add explicit guidance against bulk AI bot contributions** (2cf002e)
`CONTRIBUTING.md` now spells out the project’s stance on AI-assisted work: human-reviewed, agent-authored patches are acceptable, but bulk or queue-driven autonomous submissions are not. The new section also asks contributors to disclose AI assistance in PRs and warns that automated comment spam is disallowed.

### Other misc changes
- Moved one conformance diff from triaged to accepted and updated the accepted/triaged test lists (196800c).
- Test baseline updates for the declaration-emit consistency fix (91c4dfd).
