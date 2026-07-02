---
date: 2026-07-01
repo: nodejs/node
size: M
title: "HTTP proxy checks and TLS group support land"
excerpt: "Notable HTTP authority validation and TLS reporting updates, plus build and docs work including Maglev on riscv64."
commits: 8
authors: [joyeecheung, JamieMagee, watilde, Renegade334, sxa, aduh95, panva]
commit_authors: {"42fd49a": JamieMagee, "ed33235": watilde, "f1e01e7": Renegade334, "7ba71f7": sxa, "29ca673": joyeecheung, "fd34191": joyeecheung, "9c9c06f": aduh95, "d3ed6c1": panva}
---

### **HTTP requests now validate absolute-form targets** (fd34191)
`http.request()` now documents and enforces that an absolute-form `options.path` matches the request authority when built-in proxy support is in use. This reduces the risk of proxy-routed requests being sent to a destination that disagrees with `host`/`Host`, and adds explicit validation errors for mismatches.

### **TLS can now report negotiated groups for key agreement** (d3ed6c1)
`getEphemeralKeyInfo()` now falls back to the negotiated TLS Supported Group when OpenSSL doesn’t expose a peer temporary key, allowing PQ and hybrid handshakes to be identified as `TLSGroup`. The TLS docs were expanded to reflect the broader meaning of `ecdhCurve` in TLSv1.3 and the new `TLSGroup` result shape.

### **Maglev is enabled for riscv64** (42fd49a)
Node’s build now wires V8 Maglev support up for riscv64 in both configuration and V8 GYP generation. That brings riscv64 in line with other supported architectures and lets Node build V8’s Maglev sources there.

### Other misc changes
- Fast FFI docs corrected to reflect architecture/type-dependent argument limits (ed33235)
- libffi Windows clang build warning suppression (f1e01e7)
- Added Stewart X Addison’s GPG key to the release key list (7ba71f7)
- Added a manually-dispatched stress-test GitHub Actions workflow (29ca673)
- Updated the c-ares dependency updater script to verify signatures (9c9c06f)
