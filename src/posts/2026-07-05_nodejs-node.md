---
date: 2026-07-05
repo: nodejs/node
size: M
title: "ReadableStream tee API goes public"
excerpt: "Node exposes ReadableStreamTee, updates Temporal Rust requirements, and adds flaky-test guidance."
commits: 3
authors: [trivikr, aduh95, mcollina]
commit_authors: {"c7ddda9": trivikr, "d3502e2": aduh95, "4d27d80": mcollina}
---

### **Expose `ReadableStreamTee` as a public API** (4d27d80)
Node now exports `ReadableStreamTee(stream[, cloneForBranch2])`, wrapping the internal WHATWG tee operation with argument validation. The new API lets web-platform code opt into cloned chunks for the second branch, matching behaviors used by specs like Fetch body cloning.

### **Raise Temporal Rust baseline to 1.83** (d3502e2)
The Temporal toolchain and vendored crates were bumped to the newer Rust/`temporal_rs` stack, and the build docs/workflows now require Rust 1.83. This keeps Node aligned with the updated upstream dependency set and ensures CI builds use the expected compiler version.

### Other misc changes
- CI/docs guidance added recommending `node-stress-single-test` when fixing flaky tests (c7ddda9).
- Minor collaborator/onboarding wording updates around test reliability (c7ddda9).
