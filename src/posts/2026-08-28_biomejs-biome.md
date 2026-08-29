---
date: 2026-08-28
repo: biomejs/biome
size: M
title: "CSS specificity lint fixed, then reverted"
excerpt: "Biome briefly fixed noDescendingSpecificity for repeated tail selectors, then reverted the change the same day."
commits: 2
authors: [ematipico, rawsun007]
commit_authors: {"aec4638": ematipico, "de126de": rawsun007}
---

### **Reverted a noDescendingSpecificity fix for repeated tail selectors** (aec4638)
This rollback removes the earlier logic change and its regression test for issue #11512. It also deletes the associated changeset, so the lint behavior returns to its previous state.

### **Previously added fix for repeated tail selectors** (de126de)
The reverted patch updated `noDescendingSpecificity` to track the highest specificity seen for selectors sharing the same tail, instead of only comparing against the most recent match. That addresses cases like repeated trailing elements where a lower-specificity selector can appear after a higher-specificity one and should still be flagged.

### Other misc changes
- Revert/addition of the patch changeset for `@biomejs/biome`
- Test fixture and snapshot removed, then restored
