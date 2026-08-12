---
date: 2026-08-11
repo: nodejs/node
size: L
title: "Node tightens sqlite, crypto, and test runner"
excerpt: "Abort hooks, stricter sqlite error handling, and FIPS crypto gating headline a day with release/meta updates and deps bumps."
commits: 20
authors: [nodejs-github-bot, aduh95, TrevorBurnham, araujogui, maxhfisher, atlowChemi, AugustinMauroy, panva, trivikr, semimikoh, lemire, jasnell, Rawal27]
commit_authors: {"2749388": atlowChemi, "b0edc37": araujogui, "559afb1": maxhfisher, "eff293f": aduh95, "ed9f464": panva, "673cdef": semimikoh, "cb9bb66": TrevorBurnham, "71b3676": TrevorBurnham}
---

### **Add a process-global abort handler** (559afb1)
Node now exposes `SetAbortHandler`, letting embedders install a custom callback for programmatic aborts before any isolate or environment exists. The default path still prints native/JS backtraces, but fatal asserts and OOM/fatal error paths now route through the handler-aware abort macro so behavior can be customized safely.

### **Harden sqlite prepared-statement lifetime and error handling** (673cdef, cb9bb66, 71b3676, b0edc37)
SQLite statements are now managed with RAII, reducing manual finalize/reset bookkeeping and preventing dangling-pointer cleanup issues. The sqlite APIs also now reject SQL that contains no statements up front, and statement execution checks `sqlite3_step()`/`sqlite3_reset()` results so deferred errors surface correctly instead of being ignored.

### **Gate non-FIPS WebCrypto algorithms in FIPS mode** (ed9f464)
FIPS builds now hide TurboSHAKE and KangarooTwelve and reject cSHAKE/KMAC parameters that depend on non-provider implementations. This closes gaps where algorithms could appear available but fail or violate FIPS expectations at runtime.

### **Fix test runner tag filtering for file wrappers** (2749388)
Tag filters no longer incorrectly block file-wrapper tests from spawning, which previously could prevent any tests from running under process isolation. The runner now treats wrapper filtering separately and re-emits the canonical filters to child processes where appropriate.

### **Support alpha prerelease version tags** (eff293f)
Release tooling and version macros now understand alpha prereleases, including dedicated alpha version fields in `src/node_version.h`. The release docs and major-release workflow were updated to reflect the new annual release cadence and alpha/major release flow.

### Other misc changes
- Update undici to 8.10.0
- Update libffi to 3.8.0
- Update googletest to a newer commit
- Enable AVX-512 OpenSSL asm with clang
- Modernize templates with C++ concepts
- Minor sqlite docs and statement RAII cleanup
- Small doc wording/synopsis updates
- Fix quote escaping in `update-nixpkgs-pin.sh`
- Remove skip logic from `commit-queue.sh`
- Update WPT fixtures for WebCryptoAPI and urlpattern
