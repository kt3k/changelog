---
date: 2026-04-02
repo: nodejs/node
size: M
title: "Wasm safeguards, test randomization land"
excerpt: "Node.js adds test-order randomization and a smarter WebAssembly trap-handler check, plus an AbortSignal memory leak fix."
commits: 6
authors: [joyeecheung, aduh95, pmarchini, Han5991]
commit_authors: {"b411f90": joyeecheung, "8ee5b26": joyeecheung, "5ff1eab": pmarchini, "25443db": aduh95, "a9ac9b1": Han5991, "4f6e602": aduh95}
---

**Test runner can now randomize execution order** (5ff1eab)
Node's test runner gains `--test-randomize` and `--test-random-seed`, letting file order and queued tests be shuffled to catch order-dependent failures. The seed is printed for reproducibility, and the docs spell out the constraints and behavior.

**AbortSignal.any() now avoids long-lived retention** (a9ac9b1)
AbortSignal composites are no longer registered as dependants until they are actually observed, reducing the memory-retention pattern caused by keeping source signals alive too long. The change also unregisters fired timeout signals sooner so timeout churn releases memory more promptly.

**Node now skips the wasm trap handler when virtual memory is too tight** (b411f90)
At startup, Node checks whether the process has enough virtual memory to reserve at least one WebAssembly cage and disables the trap-handler optimization when it does not. This preserves WebAssembly functionality on constrained systems, instead of failing allocations outright.

### Other misc changes
- V8 backport adding `V8::GetWasmMemoryReservationSizeInBytes()` to estimate wasm reservation needs (8ee5b26)
- CI workflow tweak to let triagers queue approved PRs for CI (25443db)
- Commit-lint workflow narrowed for release proposal branches (4f6e602)
