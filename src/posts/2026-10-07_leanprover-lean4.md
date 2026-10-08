---
date: 2026-10-07
repo: leanprover/lean4
size: L
title: "Async fixes, HTTP dates, and a string refactor"
excerpt: "Major safety fixes for timers/signals and a few performance and API cleanup changes landed alongside HTTP date compliance and String.toList migration."
commits: 6
authors: [Kha, hargoniX, algebraic-dev, carlohamalainen]
commit_authors: {"59bd5aa": algebraic-dev, "3bd0c26": Kha, "e7f3d51": carlohamalainen, "7e9f797": hargoniX, "153e011": hargoniX, "0cea69c": Kha}
---

### **Timer and signal callbacks are now re-entrancy-safe** (59bd5aa)
Fixes crashes and stuck promises in libuv-backed timers/signals by changing how callbacks release references and how pending work is canceled. This addresses oneshot/repeating timer edge cases, lost signals, and selector behavior when callbacks race or are dropped.

### **HTTP Date now uses RFC 9110 GMT formatting** (e7f3d51)
`Std.Http.Server` now emits `Date` in the required IMF-fixdate form with literal `GMT`, which improves compatibility with strict clients and caches. The change also adds shared HTTP-date formatting/parsing helpers, including support for the obsolete accepted variants.

### **Imported module names are cached in the environment header** (3bd0c26)
`Environment.allImportedModuleNames` and `EnvironmentHeader.moduleNames` are back to constant-time by storing the array directly in the header. This removes repeated reconstruction work that had made some module lookups and metaprogramming paths much slower on large imports.

### **String.toList is now implemented in Lean** (153e011)
`String.toList` has been reimplemented in Lean and the old `String.data` alias/deprecations were removed from the core string theory. This is an API cleanup plus a step toward relying on the new csimp-based implementation path.

### **Reducibility status reads no longer wait on theorem proofs** (0cea69c)
The reducibility attribute extension now reads from the main environment branch instead of blocking on async proof elaboration. That makes reducibility queries faster and ensures same-file status changes are visible when expected.

### Other misc changes
- Fixed a debug-only IR interpreter race by marking a few global objects persistent (7e9f797)
- Updated HTTP and async tests for the new date and signal behavior
- Added coverage for re-entrant timer/signal, HTTP date, and reducibility regressions
