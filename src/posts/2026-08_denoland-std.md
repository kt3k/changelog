---
date: 2026-08-31
repo: denoland/std
period: monthly
slug: 2026-08
period_label: "August 2026"
size: M
title: "Std tightens async behavior and promotes stable APIs"
excerpt: "August focused on async cancellation fixes plus stabilizing streams, zip, and pooled mapping, with a publish workflow hardening change."
commits: 16
---

### Stabilization and API promotions
**Streams and collections shed unstable wrappers**
`BatchStream` was stabilized and re-exported from `@std/streams`, while `zip()` in collections was promoted to a stable entrypoint for iterable inputs. These changes make both utilities part of the supported public API.

**Async utilities gained a new pooled mapping helper**
`@std/async/unstable-pool` added `pooledMap`, an abort-aware concurrent mapper that lets queued work be canceled while in-flight tasks settle. A companion `pooledMapSettled()` fix also ensures late aborts are honored after input is drained.

### Correctness and cancellation fixes
**Abort handling was tightened across async iterators**
`abortable()` now closes source async iterators correctly when consumers exit early or when cancellation fires, preventing leaks and making cleanup behavior more predictable. The unstable variant was also fixed to return the proper async generator when no signal is passed.

**CBOR encoding now ignores inherited enumerable keys**
Object serialization was corrected to use own enumerable keys consistently, preventing inherited properties from leaking into encoded output and changing emitted bytes for affected objects.

### Release and CI hardening
**Publish workflow no longer follows canary Deno**
The JSR publish workflow was pinned to stable `v2.x` instead of canary builds, avoiding release failures from unreleased Deno regressions.

### Other misc changes
- CI stopped uploading coverage to Deno Deploy.
- Contributor docs and AGENTS guidance were clarified around error classes, PR titles, and unstable semantics.
- Several skipped doc examples were enabled, and a stale lint task/config typo was removed.
