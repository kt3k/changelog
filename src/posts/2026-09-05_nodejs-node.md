---
date: 2026-09-05
repo: nodejs/node
size: L
title: "Bench APIs land, KEMs and RSA get bigger"
excerpt: "node:bench gains several new APIs and diagnostics, WebCrypto adds hybrid KEMs, and RSA JWK export/import now preserves multi-prime keys."
commits: 21
authors: [jasnell, panva, christianaurichzm]
commit_authors: {"8327711": jasnell, "6f41e41": panva, "2d22505": panva, "57860ef": jasnell, "d011d0a": jasnell, "dd70a25": jasnell, "b00bd40": jasnell, "0cd23ed": jasnell, "b6ade12": jasnell, "12d7bb9": jasnell, "0f4bd3c": jasnell, "09de610": jasnell, "220f6b5": jasnell, "5a346e0": jasnell, "838baeb": jasnell}
---

**WebCrypto adds hybrid KEM algorithms** (2d22505)
Node’s Web Cryptography API now supports hybrid KEMs like `MLKEM768-P256`, `MLKEM768-X25519`, and `MLKEM1024-P384` across key import/export and encapsulation/decapsulation paths. This expands the API beyond pure ML-KEM and makes the new algorithms available to both docs and runtime checks.

**Multi-prime RSA JWKs now round-trip correctly** (6f41e41)
RSA private JWK import/export now preserves additional prime factors, exponents, and coefficients instead of dropping multi-prime data. That fixes interoperability for multi-prime RSA keys across supported OpenSSL versions.

**node:bench gets new run metadata, diagnostics, and file execution support** (b6ade12, 12d7bb9, 838baeb, 09de610, 5a346e0, 0cd23ed, b00bd40, dd70a25, d011d0a, 57860ef, 220f6b5, 8327711, 0f4bd3c)
The bench runner grew into a much richer toolchain: new `runFile` support, `context.diagnostic`, `bench:plan` events, run/file identity metadata, and improved stream handling and permission behavior. The related docs and tests suggest this is a substantial expansion of `node:bench`’s public surface and execution model.

### Other misc changes
- Deflake `test-permission-net-udp-handle`.
- Use OpenSSL feature helpers in tests and benchmarks.
- Fix a string-length-range test by zero-filling buffers before the limit check.
- Bump `@humanfs/node` in `/tools/eslint`.
- Bump `browserslist` in `/tools/eslint`.
