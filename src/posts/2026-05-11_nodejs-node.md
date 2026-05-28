---
date: 2026-05-11
repo: nodejs/node
size: L
title: "QUIC permissions, debugger help, and ffi fixes"
excerpt: "Debugger docs improve, QUIC gains permission checks, and libffi/crypto support expands across more targets."
commits: 10
authors: [panva, aduh95, mcollina, joyeecheung, ShogunPanda, jasnell, Jah-yee]
commit_authors: {"78bbee3": joyeecheung, "a2aeb72": ShogunPanda, "58cd0b8": jasnell, "e107f3c": panva, "20e6a54": mcollina}
---

### **Debugger inspect gets help and clearer probe docs** (78bbee3)
`node inspect` now supports `--help`/`-h` in both interactive and probe modes, with careful forwarding so child scripts still receive their own `--help`. The debugger docs were also reorganized and expanded with probe-mode behavior, examples, and edge-case notes that should make the CLI much easier to use correctly.

### **libffi static-linking support expands to more targets** (a2aeb72)
Node now recognizes additional libffi target combinations for static linking, including more architectures and OS-specific mappings. This widens the set of builds that can use bundled ffi without hitting unsupported-target failures.

### **QUIC now respects the permission model** (58cd0b8)
`quic.connect()` and `quic.listen()` now require `--allow-net` under the permission model, and the docs explain the new behavior. This closes a security/consistency gap by ensuring QUIC network I/O is gated like other net APIs.

### **BoringSSL EVP enumeration fallback added** (e107f3c)
Node can now fall back to a local cipher list when BoringSSL is built without `libdecrepit`, avoiding missing `EVP_*_do_all*` symbols. That keeps cipher enumeration working on stock no-decrepit builds while preserving the normal path for embedders that do provide those APIs.

### **Large pull request policy documented** (20e6a54)
A new contributor guide spells out expectations for large PRs, including thresholds, exclusions, and review requirements. This is mostly process/documentation work, but it codifies how especially big changes should be handled.

### Other misc changes
- Nix/OpenSSL tooling now includes BoringSSL in the matrix and updates branch selection for staging tools.
- ReadableStreamBYOBRequest.view is documented as `Uint8Array`.
- AI assistant files are ignored by git/lint tooling.
- A flaky registry-per-thread test was stabilized.
