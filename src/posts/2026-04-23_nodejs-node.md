---
date: 2026-04-23
repo: nodejs/node
size: L
title: "Node patches crypto, test runner, and Windows build"
excerpt: "Key fixes landed for MockTimers, crypto keygen/lookup hardening, NO_PROXY matching, plus Windows PGO/LTO support."
commits: 9
authors: [Han5991, joyeecheung, panva, JonathanLopes404, tniessen, StefanStojanovic, nodejs-github-bot, watilde, MoLow]
commit_authors: {"a5b3d76": Han5991, "3dc06ae": joyeecheung, "1f6f3ac": panva, "800f582": JonathanLopes404, "262dee5": StefanStojanovic, "d44a71a": watilde, "633b963": MoLow}
---

### **Windows build now supports PGO and Thin LTO** (262dee5)
Node’s Windows build/configuration was extended to support profile-guided optimization and Thin LTO flows, including new CLI/config flags and corresponding MSVC link/compiler settings. This is a significant build-system change that can affect release performance and how binaries are produced on Windows.

### **MockTimers now matches the public Timeout disposal API** (a5b3d76)
Fake timer handles exposed by the test runner now implement `Timeout.close()` and `Timeout[Symbol.dispose]()` just like real timers. That keeps disposal-based patterns from throwing when tests use MockTimers, and the new coverage locks in the behavior.

### **HTTP proxy NO_PROXY matching is fixed for leading-dot domains** (d44a71a)
The proxy matcher no longer treats `.example.com` as matching partial names like `notexample.com` or `badexample.com`; it now requires an exact suffix boundary or the exact host. This closes a correctness bug in proxy bypass behavior that could send traffic through the wrong path.

### **Crypto key generation is hardened against inherited properties** (800f582)
`generateKeyPair*` now checks key type names as own properties instead of walking the prototype chain, preventing inherited values like `toString` or `constructor` from being accepted as supported algorithms. That’s a small but important hardening fix for public crypto input validation.

### **WebCrypto crypto util lookup is hardened against prototype pollution** (1f6f3ac)
The internal `kKeyOps` lookup was tightened with a null-prototype object, reducing the risk of prototype-chain interference in crypto utility dispatch. The accompanying test coverage confirms the lookup stays safe.

### **Debugger probe tests now normalize a known inspector crash** (3dc06ae)
The probe harness now treats a trailing inspector segfault as completion for a pre-existing teardown issue, so CI doesn’t fail on machines where the debuggee exits too quickly. This is a pragmatic test-only workaround, not a product fix, but it stabilizes the suite until the upstream bug is resolved.

### **Test runner rerun edge case around ambiguous children is fixed** (633b963)
Suite reruns no longer double-start direct children, which could re-run synthetic descendants with already-incremented disambiguators and produce spurious failures. The regression coverage adds an ambiguous shared-helper scenario and updates expected rerun state to match.

### Other misc changes
- Streams WPT fixtures updated to a newer upstream snapshot and related metadata.
- Argon2 docs corrected to show inclusive parameter bounds.
- Test coverage added for MockTimers disposal methods, debugger probe normalization, crypto keygen validation, and rerun bookkeeping.
