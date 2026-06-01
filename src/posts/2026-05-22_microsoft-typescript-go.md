---
date: 2026-05-22
repo: microsoft/typescript-go
size: M
title: "Const assertion hovers now show concrete types"
excerpt: "Hovering `const` in `as const` expressions now reveals the inferred literal/readonly type instead of just `type const`."
commits: 1
---

### **Show inferred types for `as const` hovers** (2b43ca0)
Hovering the `const` keyword in a `as const` assertion now displays the actual inferred type, such as readonly object, tuple, string, or numeric literals, instead of the generic `type const` placeholder. This makes quick info much more useful when inspecting const assertions and aligns hover output with what the checker has already inferred.

### Other misc changes
- Added a fourslash regression test for const assertion hover output.
- Updated quick info baselines to match the new hover formatting.
