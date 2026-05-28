---
date: 2026-04-01
repo: nodejs/node
size: M
title: "Node 25.9.0 lands test runner and module changes"
excerpt: "New test runner context APIs, a runtime deprecation for module.register(), plus a new Node 25.9.0 release with async hooks, crypto, and CLI additions."
commits: 7
authors: [MoLow, aduh95, GeoffreyBooth, joyeecheung, richardlau]
commit_authors: {"86282b5": aduh95, "0dfdec9": GeoffreyBooth, "12c2736": joyeecheung, "e0d2e1c": MoLow, "cdc5774": MoLow, "c5a83ab": MoLow, "7b8934d": richardlau}
---

### **Node 25.9.0 ships with multiple semver-minor additions** (86282b5)
Release 25.9.0 pulls in several user-facing features: `AsyncLocalStorage.withScope()`, a new `--max-heap-size` CLI option, extra Web Crypto algorithms, and customizable REPL error handling. It also updates the release changelog and API docs to match the new surface area.

### **`module.register()` is now a runtime deprecation** (0dfdec9)
`module.register()` now emits DEP0205 at runtime and is documented as deprecated in favor of `module.registerHooks()`. The loader path was updated to warn on use, and the accompanying test coverage confirms the warning is emitted once per process.

### **Test runner gains `getTestContext()` and richer suite context** (c5a83ab, cdc5774, e0d2e1c)
The test runner now exposes `getTestContext()` so code can retrieve the active `TestContext` or `SuiteContext` from within tests, suites, and hooks. `SuiteContext` also gained `passed`, `attempt`, and `diagnostic()` helpers, and the docs clarify that attempt numbers are zero-based.

### **Security policy clarifies DoS triage criteria** (12c2736)
`SECURITY.md` now expands the memory-leak DoS guidance into a broader DoS section, tightening and clarifying the criteria used when evaluating reports. This should reduce ambiguity during security triage and make expectations more explicit for reporters.

### **Temporal build support respects `CARGO`** (7b8934d)
The build now honors the `CARGO` environment variable when locating Cargo, and passes that through to the crates build step. This helps Temporal builds work on systems where the binary is version-suffixed, such as `cargo-1.82`.

### Other misc changes
- Documentation-only deprecation updates in `doc/api/deprecations.md` and `doc/api/module.md`
- Test/docs wording update for retry attempt numbering
- Minor doc version markers refreshed across several API pages
