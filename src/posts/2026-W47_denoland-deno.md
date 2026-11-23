---
date: 2026-11-22
repo: denoland/deno
period: weekly
slug: 2026-W47
period_label: "Nov 16–22, 2026"
size: M
title: "Deno removes leftover TypeScript tooling and tightens safety"
excerpt: "This week Deno finished rolling back obsolete TypeScript migration pieces, fixed coverage path matching, and hardened N-API typedarray checks."
commits: 5
---

### **TypeScript migration cleanup continues**
Deno removed the unstable `deno sync-types` subcommand and its surrounding plumbing, including parser wiring, installer support, tsconfig generation, and spec coverage. It also deleted the now-unused native TypeScript compiler module and `DENO_TSC_BIN` path, further simplifying the checker/tooling stack after the in-process checker change made it redundant.

### **N-API typedarray validation is now safer**
`napi_create_typedarray` now uses checked arithmetic when validating `length * element_size + byte_offset`, closing an overflow gap that could let invalid sizes slip through. New tests cover both regular out-of-range requests and an overflow case.

### **Coverage filters handle decoded paths correctly**
Coverage include/exclude matching now checks both the raw script URL and its percent-decoded form. That fixes filtering for paths with spaces or non-ASCII characters and adds regression coverage for encoded and decoded patterns.

### **Other misc changes**
- CI cache key/version bump for macOS workflows
