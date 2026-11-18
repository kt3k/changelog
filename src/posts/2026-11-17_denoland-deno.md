---
date: 2026-11-17
repo: denoland/deno
size: M
title: "Deno trims TypeScript migration leftovers"
excerpt: "Removed the last sync-types plumbing, fixed typedarray overflow handling, improved coverage path matching, and bumped CI caches."
commits: 5
authors: [bartlomieju, isl-Ramzi, Hixie]
commit_authors: {"d8c551b": bartlomieju, "563da2f": isl-Ramzi, "a37e99b": Hixie, "c79d6dd": bartlomieju}
---

### **Remove the unstable `deno sync-types` subcommand** (d8c551b)
Deno deletes the unstable subcommand along with its parser wiring, installer support, tsconfig generation path, and spec coverage. This completes the rollback of the TypeScript migration for that command and removes the last user of the npm-compat installer and stock tsconfig generator.

### **Harden N-API typedarray length checks** (563da2f)
`napi_create_typedarray` now uses checked arithmetic when validating `length * element_size + byte_offset`, preventing overflow from slipping past the bounds check. The new tests cover both ordinary out-of-range requests and an overflow case that previously could have produced a bogus typedarray.

### **Fix coverage include/exclude matching for decoded paths** (a37e99b)
Coverage filters now match against both the raw script URL and its percent-decoded form, which fixes filtering for files whose paths contain spaces or non-ASCII characters. The new regression test exercises both decoded and URL-escaped patterns.

### **Remove the native TypeScript compiler module** (c79d6dd)
This revert deletes the unused native `tsc` implementation and its `DENO_TSC_BIN` plumbing after the in-process checker change made it redundant. It further simplifies the TypeScript toolchain path ahead of the remaining migration rollback work.

### Other misc changes
- CI cache key/version bump for macOS workflows (1 commit)
