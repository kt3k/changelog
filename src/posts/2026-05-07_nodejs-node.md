---
date: 2026-05-07
repo: nodejs/node
size: M
title: "Node 26.1.0 lands with crypto and module fixes"
excerpt: "Node 26.1.0 ships, with raw key import validation tightened and a sync CJS import hook bug fixed."
commits: 3
authors: [panva, joyeecheung, aduh95]
commit_authors: {"1fd4949": panva, "4f44c6f": joyeecheung, "a725fe1": aduh95}
---

### **Tighten raw key import validation** (1fd4949)
Node now rejects invalid raw public key imports when the API expects a private or seed-capable key, closing a class of mis-specified crypto inputs. The PQC key import path was also corrected to use the proper raw seed format for ML-KEM, and the native key handling gained broader validation for unsupported or unavailable key types.

### **Fix sync hook short-circuiting for imported CJS** (4f44c6f)
This fixes a bug where imported CommonJS modules could still take the slower/redundant require path or rerun default evaluation after synchronous module hooks short-circuited resolution/loading. The loader changes make the sync-hook branches explicit and should preserve the intended module source/URL/format without reloading from disk.

### **Version 26.1.0 release** (a725fe1)
Node 26.1.0 is cut with semver-minor additions including `Buffer`'s new `end` parameter, `crypto.diffieHellman()` accepting key data, `randomUUIDv7()`, and debugger probe improvements. The release also updates the changelog and API docs to reflect the new version.

### Other misc changes
- API doc/version metadata updates across multiple docs
- Changelog and release notes refresh
