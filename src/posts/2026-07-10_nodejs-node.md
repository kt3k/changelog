---
date: 2026-07-10
repo: nodejs/node
size: L
title: "OpenSSL riscv64 ASM lands, stream fix ships"
excerpt: "Node strengthens riscv64 OpenSSL builds, tightens stream iterable handling, and clarifies built-in proxy security guidance."
commits: 5
authors: [pimterry, mcollina, aduh95, JamieMagee, trivikr]
commit_authors: {"ab41cf0": pimterry, "26079c0": mcollina, "116302d": aduh95, "d6cd5c1": JamieMagee, "4140d4c": trivikr}
---

### **OpenSSL enables riscv64 assembly support** (d6cd5c1)
Node’s vendored OpenSSL config now treats `linux64-riscv64` as an ASM-enabled architecture instead of `NO_ASM_ARCHS`. That regenerates the riscv64 config with new assembly variants and should improve cryptographic performance on RISC-V builds.

### **Streams now reject nested async streamables in `from()`** (4140d4c)
`stream.iter.from()` now rejects nested async iterables and `toAsyncStreamable` values when it is consuming a sync iterable source, while still awaiting promise values. This closes a class of incorrect nesting behavior and makes async stream normalization stricter and more predictable.

### **DNS wrapper addresses compile-time warnings** (116302d)
The c-ares wrapper was substantially refactored to use DNS record parsing directly and clean up server parsing logic. This is mostly maintenance work, but it touches a core networking path and was large enough to warrant careful review.

### **Docs clarify the built-in proxy threat model** (26079c0)
Node’s proxy docs and security guidance now spell out that built-in proxy support is for trusted, authorized deployment proxies, not anonymity or policy evasion. That reduces the chance of users misunderstanding what `HTTP_PROXY`/`HTTPS_PROXY` support is meant to protect.

### Other misc changes
- Fixed a flaky test for watch + cwd + argv behavior in the test runner (ab41cf0)
