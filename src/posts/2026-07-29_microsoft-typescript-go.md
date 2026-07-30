---
date: 2026-07-29
repo: microsoft/typescript-go
size: M
title: "Watchers, reuse, and hover fixes land"
excerpt: "A medium-sized day of performance work plus several user-facing bug fixes across build watch, language service, and emit paths."
commits: 12
authors: [johnfav03, mds-ant, jakebailey, a-tarasyuk, lixiaoyan, weswigham]
commit_authors: {"2960015": johnfav03, "fefef6e": johnfav03, "2a1030b": jakebailey, "a863d40": a-tarasyuk, "c679a92": jakebailey, "a74f64b": johnfav03, "04f7f3d": johnfav03, "4eb214d": lixiaoyan, "efc1ee7": mds-ant, "78137b6": mds-ant, "d9773e3": weswigham, "19d61fc": mds-ant}
---

**Build watch no longer stalls on large solutions** (2960015)
The build orchestrator now tracks desired directories with a dedicated watch set, which reduces duplicated work while computing watches. The same change adds overflow simulation to the watch test backend and strengthens coverage around watch startup/rebuild behavior.

**Watcher performance gets a broader overhaul** (04f7f3d)
Program reuse was extended to avoid rebuilding a throwaway fallback when the caller will handle it differently, and watch plumbing was tightened to support faster, more stable incremental watching. The added race tests suggest this was aimed at improving throughput and correctness under heavy watch activity.

**Program reuse now respects module-resolution mode changes** (c679a92)
The program reuse check now compares the resolved module mode for each import, not just the specifier text. That prevents reusing stale programs when a file switches resolution modes and would otherwise need different type-checking results.

**Signature help no longer crashes on recovered JSX** (fefef6e)
A crash in signature help for error-recovered JSX attributes was fixed in token/span navigation. This is a direct stability fix for an editor scenario that could previously hit an internal "Not a subspan" failure.

**Deprecated contextual props are now reported in JSX and object literals** (a863d40)
The checker now emits deprecated suggestions when a contextual property is marked deprecated, not just on direct symbol usage. That makes deprecation warnings show up earlier and more consistently in object literals and JSX attribute contexts.

**Hover JSDoc resolution no longer overflows on cyclic inheritance** (a74f64b)
Inherited documentation lookup now carries a seen-symbol set to break recursion when a type chain loops back on itself. This fixes a stack overflow in hover/quick info for certain re-export and augmentation patterns.

### Other misc changes
- Declaration emit now retains uninitialized binding patterns in more cases, with diagnostics adjusted accordingly (d9773e3)
- AST struct generation changed field embedding order for zero-sized marker bases to preserve layout guarantees (19d61fc)
- Parse/bind internal work reductions and speculative-parse cleanup (2a1030b, 78137b6)
- Arrow-function grammar rule check no longer needs the line map (efc1ee7)
- Module-specifier rename trigger span fix (4eb214d)
- Minor build/watch test and internal refactors (2960015, 04f7f3d, c679a92)
