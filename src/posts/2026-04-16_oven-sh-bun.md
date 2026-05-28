---
date: 2026-04-16
repo: oven-sh/bun
size: L
title: "Bun swaps source maps to a packed binary format"
excerpt: "Major InternalSourceMap rewrite removes VLQ decode from stack-trace remapping and adds benchmarks/tests for the new storage path."
commits: 1
authors: [Jarred-Sumner]
commit_authors: {"b2d3f5d": Jarred-Sumner}
---

### **InternalSourceMap replaces serialized VLQ maps** (b2d3f5d)
Bun now stores source mappings in a private bit-packed `InternalSourceMap` blob instead of decoding whole VLQ maps into memory first. The new format uses fixed-size windows plus varint deltas, which cuts lookup overhead and memory churn for stack-trace/source-map remapping.

### **Source-map loading and stack-trace remapping now read the blob in place** (b2d3f5d)
The standalone/runtime paths were updated to validate and consume the serialized blob directly, rather than parsing mappings into `Mapping.List`. That means `find(line, col)` can work without a full decode pass, which is especially important for large transpiled modules and error stacks.

### **Benchmark and round-trip coverage added for the new format** (b2d3f5d)
This change also adds a dedicated microbench plus new internal/bundler tests to exercise the storage format and remapping behavior. That helps verify the binary encoding stays correct and makes performance regressions easier to spot.

### Other misc changes
- Source-map plumbing updated across runtime, coverage, and stack-trace code
- New internal source-map helpers/tests and standalone serialization header adjustments
- Minor test/config tweaks and benchmark ignore file
