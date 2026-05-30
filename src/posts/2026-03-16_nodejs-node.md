---
date: 2026-03-16
repo: nodejs/node
size: M
title: "WebCrypto params, ESM, undici updates"
excerpt: "Renames WebCrypto parameter fields, fixes ESM path normalization, and pulls in undici plus npm version updates."
commits: 8
authors: [aduh95, npm-cli-bot, nodejs-github-bot, panva, thisalihassan]
commit_authors: {"eb92eac": nodejs-github-bot, "ab8dc2b": panva, "e0928d6": aduh95, "9c1c08e": thisalihassan}
---

### **WebCrypto parameter fields renamed to `outputLength`** (ab8dc2b)
Node.js Web Crypto now uses `outputLength` instead of `length` for cSHAKE and KMAC parameter objects, aligning the API with the updated Web Platform Tests. The docs, implementation, and fixtures/tests were updated together, so code using these params will need to follow the new property names.

### **ESM resolution no longer mischecks trailing slashes** (e0928d6)
`finalizeResolution()` now correctly checks the resolved path string rather than the fs binding object when stripping a trailing `/`. This fixes a path-normalization bug in module resolution that could affect how ESM paths are classified.

### **Undici updated to 7.24.4 with fetch path fix** (eb92eac)
Node’s bundled undici was bumped, and its fetch dispatch path handling was corrected to preserve a trailing `?` in request URLs. That avoids subtle request-target differences for edge-case URLs while keeping the embedded version in sync.

### **Benchmark throughput config fixed** (9c1c08e)
The crypto benchmark suite now uses the renamed `n` config key consistently, restoring the intended iteration counts. This fixes a regression that could make the benchmark report near-zero throughput.

### Other misc changes
- npm upgraded to 11.11.1, with generated docs/version metadata refreshed.
- Docs adjusted for DEP0190, workspace install wording, and a small npm docs helper null-safe change.
- flatted bumped in `/tools/eslint`.
