---
date: 2026-05-19
repo: tc39/proposals
size: L
title: "TC39 promotions and one withdrawal"
excerpt: "Multiple proposals advanced, including two to stage 4, while isTemplateObject was withdrawn."
commits: 8
authors: [ljharb]
commit_authors: {"2af05ca": ljharb, "2b91377": ljharb, "e605e9b": ljharb, "217882a": ljharb, "5adf344": ljharb, "cd2396f": ljharb, "aa5330f": ljharb, "7e2d9a4": ljharb}
---

### **Explicit Resource Management reaches stage 4** (5adf344)
This proposal moved from the active list into finished proposals, marking it as standardized. The repo update also pruned its old README entry and moved its meeting-note links into the finished-proposals index.

### **Joint Iteration is now stage 4** (7e2d9a4)
Joint Iteration was added to the finished proposals table and removed from the active stage 3 list. That signals the proposal is complete and expected to ship on the ES2027 timeline shown in the table.

### **`Atomics.pause` reaches stage 4** (aa5330f)
`Atomics.pause` was promoted into finished proposals and removed from the active proposals page. The change also adds its canonical notes/link references to the finished list, reflecting its move into the standardization track.

### **Decorator Metadata advances to stage 2.7** (2af05ca)
Decorator Metadata was bumped to stage 2.7 in the main proposals list. This is a meaningful status change, but it is still an intermediate step rather than a final approval.

### **Decorators advances to stage 2.7** (cd2396f)
Decorators also moved to stage 2.7, keeping it aligned with the committee’s latest decision. This update reshuffles the active-stage tables rather than changing the proposal itself.

### **Intl Keep Trailing Zeros reaches stage 3** (2b91377)
The Intl proposal was promoted to stage 3 in the ECMA-402 tracker. Stage 3 indicates the committee expects the design to stabilize and implementation work to continue.

### **RegExp Buffer Boundaries moves to stage 2.7** (217882a)
RegExp Buffer Boundaries was updated to stage 2.7 in the active proposals list. It’s a small but notable status bump that shows the proposal is progressing.

### **isTemplateObject withdrawn** (e605e9b)
The proposal was removed from the active list and added to inactive proposals with a withdrawal note citing lack of implementer interest and same-vs-cross-realm concerns. That’s a meaningful endpoint for the effort, even though it’s not a feature landing.

### Other misc changes
- Stage-table link/reference cleanup across README and finished-proposals
- Proposal index reordering and table maintenance
