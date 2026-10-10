---
date: 2026-10-09
repo: nodejs/node
size: M
title: "ICU updater hardens signatures; sqlite fix lands"
excerpt: "Node.js switches ICU updates to PGP/SHA-256, tightens sqlite argument validation, and documents the new release schedule."
commits: 3
authors: [aduh95, araujogui]
commit_authors: {"ae5a0f4": aduh95, "c0daf39": araujogui, "d448455": aduh95}
---

### **ICU updater now verifies PGP signatures and SHA-256** (ae5a0f4)
The ICU update tooling was hardened to download the tarball, verify its PGP signature with a bundled keyring, and record a SHA-256 digest instead of MD5. This reduces supply-chain risk and makes ICU maintenance follow a more modern verification flow.

### **sqlite aggregate() now rejects bad arguments up front** (c0daf39)
`Database.prototype.aggregate()` now throws `ERR_INVALID_ARG_TYPE` when `name` is not a string or `options` is missing/non-object, matching the behavior of the other sqlite bindings. This prevents confusing V8 type errors and makes the API validation more consistent.

### **Documentation updated for the new release schedule** (d448455)
The top-level docs were revised to describe the Alpha/Current/LTS release model and the new timing for semver-major changes. This keeps contributor guidance aligned with the updated Node.js release policy.

### Other misc changes
- Release schedule wording refreshed in contributor docs
- ICU maintainer guide updated for keyring handling and SHA-256 checks
