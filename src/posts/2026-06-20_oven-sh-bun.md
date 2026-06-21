---
date: 2026-06-20
repo: oven-sh/bun
size: L
title: "React Compiler lands; linting gets stricter"
excerpt: "Bun adds React Compiler integration, tightens JS linting, and expands build/runtime flags for debug/assertion profiles."
commits: 6
authors: [robobun, Jarred-Sumner]
commit_authors: {"8841747": robobun, "8f1b951": robobun, "90e2bac": robobun, "de73fda": robobun, "315ed50": Jarred-Sumner, "46c54cd": Jarred-Sumner}
---

**React Compiler integration and follow-up fixes** (315ed50, 8f1b951)
Bun now ships the upstream React Compiler as a built-in build transform, with CLI/API wiring, parser/bundler integration, and test fixtures. The follow-up fixes a bug where `reactCompilerOutputMode` could enable the compiler even when `reactCompiler` was off, making the mode behave like configuration instead of an implicit switch.

**Build profiles now distinguish debug from assertions/ASAN** (de73fda)
The Rust build now enables `debug_assert!()`/`#[cfg(debug_assertions)]` in release-assertions and release-asan builds, while a new `bun_debug` cfg keeps Debug-only conveniences out of those profiles. This also updates related runtime/build constants and type definitions so logs and debug behavior no longer leak across profiles.

**Custom lint rule added for duplicate property reads** (90e2bac)
A new oxlint plugin flags cases in `src/js/**` where the same property is read in an `if` condition and again in the body, helping catch double getter/Proxy hits and other avoidable repeated work. This is a quality-and-performance guardrail for Bun’s JS internals, not a user-facing feature.

**BoringSSL fork upgraded upstream** (46c54cd)
Bun bumps its pinned BoringSSL fork to a newer upstream merge, preserving the project’s local crypto patches. This keeps TLS/crypto current and includes the related source-list and version updates.

### Other misc changes
- Removed stale port-era comments and cleanup markers across Rust/CSS internals (8841747)
- React Compiler sync docs/scripts and port-marker updates (315ed50, 8f1b951)
- Type/doc updates for subprocess stdio behavior and build constants (de73fda)
- Lint/dependency wiring for oxlint in the repo toolchain (90e2bac)
- BoringSSL upgrade helper docs and test expectation refreshes (46c54cd)
