---
date: 2026-04-20
repo: nodejs/node
size: M
title: "Node updates for inspector, TLS, and experiments"
excerpt: "Inspector docs got a new help link, TLS tests were adapted for OpenSSL 4.0, and Node gained a flag to enable all experimentals."
commits: 16
authors: [panva, semimikoh, omghante, aduh95, legendecas, galaxy4276, kxxt, ShogunPanda]
commit_authors: {"7560670": ShogunPanda, "e02087c": omghante, "c3dd52a": panva, "12750e1": panva, "fb1e373": panva, "ba835bf": panva, "f974dbd": panva, "38aeed2": panva, "b2403f2": panva, "e729c5f": panva, "5e0bcab": galaxy4276}
---

### **Add a build flag to enable all experimental features** (7560670)
Node now accepts `--enable-all-experimentals`, wiring a new build-time default that flips many experimental runtime options on together. This is a meaningful configurability change for packagers and power users, and it touches both configure-time plumbing and option defaults.

### **Expand TLS/OpenSSL test coverage for OpenSSL 4.0** (12750e1, c3dd52a, fb1e373, ba835bf, f974dbd, 38aeed2, b2403f2, e729c5f)
A cluster of TLS and crypto tests was updated to match OpenSSL 4.0 behavior changes, including RFC 7919 FFDHE negotiation, renamed or broader error codes, deprecated curve handling, and stricter OCSP response validation. These changes keep the suite green across OpenSSL versions and document real compatibility shifts that affect TLS/DH behavior.

### **Document `dns.lookup()` callback results when `all: true`** (5e0bcab)
The DNS API docs now explicitly describe the `addresses` array returned by `dns.lookup()` when `options.all` is enabled, and note that `address` and `family` are omitted. This closes an API-doc gap that could trip up consumers relying on the callback shape.

### **Update `MaybeStackBuffer` to avoid libc++ deprecation warnings** (e02087c)
`MaybeStackBuffer::ToString()` and `ToStringView()` were constrained to standard character types so newer libc++ versions stop warning on unsupported `std::char_traits` instantiations. It’s a small internal cleanup, but it protects builds on newer macOS toolchains.

### Other misc changes
- Fixed dead inspector help URLs in docs and runtime output.
- Updated the N-API libuv ABI stability note.
- Removed two names from the triagger team in `README.md`.
- Dependabot/doc tooling bumps and cooldown config tweaks.
