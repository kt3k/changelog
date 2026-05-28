---
date: 2026-05-13
repo: nodejs/node
size: L
title: "Node 22.22.3 lands with key fixes"
excerpt: "An LTS patch release plus N-API, module, HTTP, crypto, and build/doc updates."
commits: 8
authors: [watilde, marco-ippolito, ChrisJr404, nodejs-github-bot, umuoy1, richardlau]
commit_authors: {"bf7e79c": marco-ippolito, "a192f19": ChrisJr404, "c24e552": umuoy1, "6916e64": watilde, "d5beddb": richardlau}
---

### **Node.js 22.22.3 LTS release** (bf7e79c)
A new 22.22.3 'Jod' LTS release was cut, pulling in the full set of backported fixes and dependency updates for the line. This is the main event of the day and includes security, runtime, and tooling work.

### **N-API typed arrays now accept SharedArrayBuffer** (c24e552)
`napi_create_typedarray()` and related docs were updated to support `SharedArrayBuffer` in addition to `ArrayBuffer`. The implementation and new tests cover the new buffer type and validate offset/alignment rules, expanding addon compatibility with shared memory use cases.

### **Temporal build flags are now documented** (a192f19)
BUILDING.md now explains that Temporal support is default-on starting in Node.js 26 and how `configure.py` behaves when Rust tooling is present or missing. It also documents the explicit enable/disable flags, which matters for distro builders and anyone packaging custom Node builds.

### **V8 build scripts filter toolchain-specific flags** (d5beddb)
The V8 build wrapper now strips or rewrites flags to work around clang/Rust toolchain mismatches on Linux ppc64le and s390x CI. This should reduce build breakage caused by differences between nightly and released toolchains.

### **Validator error text is clearer** (6916e64)
The array-length validator now says "must have a length of at least N" instead of "must be longer than N," and the test suite asserts the new wording. This is a small user-facing fix, but it doesn't change behavior.

### **Other misc changes**
- Release metadata/changelog updates for 22.22.3.
- Collaborator emeritus list adjustment in README.
- Typo fix in single-byte encoding comments.
