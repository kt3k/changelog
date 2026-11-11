---
date: 2026-11-10
repo: oven-sh/bun
size: L
title: "Bun lands AOT and vendor pinning"
excerpt: "Large AOT compiler updates ship alongside vendor suites pinned by commit instead of tag, plus a benchmark runner refresh."
commits: 3
authors: [Jarred-Sumner, dylan-conway]
commit_authors: {"89452d2": Jarred-Sumner, "98cda0d": Jarred-Sumner, "750f232": dylan-conway}
---

### **AOT compiler rewrite lands new build/test flow** (89452d2)
Bun’s experimental ahead-of-time compiler work expanded to cover `bun build --compile --aot`, `bun test --aot`, module mocks, and a new naming/organization pass for the AOT test tree. The docs and benchmark tooling were updated to reflect the new output shape and behavior, including the compiler’s `compile` row instead of the previous closing line.

### **Vendored test suites are now checked out by commit** (750f232)
Vendored suites in `test/vendor.json` now track both the release tag and the exact commit to check out, and the runner fetches that commit directly. The vendor update workflow now compares commits too, making pinned test inputs more precise and reducing ambiguity when tags move or releases are retagged.

### Other misc changes
- AOT compiler follow-up work and test/data reshuffling (98cda0d)
- Benchmark runner scenario bookkeeping and command prep refactors were folded into the AOT work
- Docs and configuration updates related to the AOT compiler and vendored tests
