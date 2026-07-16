---
date: 2026-07-15
repo: microsoft/typescript-go
size: L
title: "API addition plus compiler and watch fixes"
excerpt: "Added temporary snapshot updates and fixed several checker/JSX/declaration emit bugs, alongside a watch-loop optimization."
commits: 9
authors: [weswigham, johnfav03, gabritto, andrewbranch]
commit_authors: {"9ea7f6b": weswigham, "80d4f46": weswigham, "de9cd5d": johnfav03, "a563794": weswigham, "4a8c02b": johnfav03, "3ba2d7b": weswigham, "4e1413c": weswigham, "bd08444": gabritto, "0d0b387": andrewbranch}
---

### **Add temporary file updates to the API and sync generator** (bd08444)
Introduces `runWithTemporaryFileUpdate`, letting callers apply a one-off file edit against a base snapshot, run work on the derived snapshot, and cleanly dispose it afterward. The change is wired through the native-preview async/sync APIs and the underlying Go session plumbing, which should make temporary analysis and tooling flows much easier.

### **Fix declaration emit crash for exported arrow functions with external names** (80d4f46)
Declaration emit now handles exported arrow/function expressions that reference external names instead of crashing, and it emits the right visibility diagnostics for more function-like forms. This closes a real `.d.ts` generation failure for JS export assignments and preserves the expected type surface.

### **Skip project rechecks on no-op watch events** (de9cd5d)
Watch-triggered file changes are now filtered against on-disk content before dirtying files, so unchanged events no longer rebuild the program. That reduces unnecessary churn while still rebuilding when a file’s contents actually change.

### **Always report deferred checker diagnostics** (9ea7f6b)
The checker now unconditionally accumulates deferred diagnostics, including deferred "property does not exist" reporting that previously depended on a temporary flag. This also fixes computed-name lookup caching and updates several affected error baselines, reducing missed or inconsistent semantic errors.

### **Stabilize JSX missing-module error locations** (4e1413c)
JSX implicit-import resolution now pins the missing-module error to the first JSX tag in the file, giving a stable and predictable span. That makes diagnostics less noisy and avoids shifting error locations across identical code.

### **Fix computed-name error emit reusing cached name expressions** (a563794)
Computed property-name checking now caches the resolved name on the computed-name node itself rather than reusing the expression cache. This corrects bad diagnostic behavior in self-referential and symbol-property cases where the old lookup path produced the wrong errors.

### **Avoid range-format panics inside JSDoc comments** (4a8c02b)
Range formatting now skips JSDoc when finding the preceding token, preventing the formatter from starting inside comment trivia and hitting the "Token end is child end" crash. A regression test covers formatting a selection that begins within a JSDoc block.

### **Fix unused-reference accounting for self-referential enums** (3ba2d7b)
The checker no longer treats a self-reference as a value-use when resolving names for unused-locals analysis, which restores the expected unused diagnostics for enums and namespaces. This corrects a subtle semantic bug that had been suppressing real warnings.

### Other misc changes
- [api] Minor performance tweak for `RemoteNodeArray` construction (0d0b387)
- Additional baseline/test updates and internal refactors tied to the fixes above
