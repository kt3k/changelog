---
date: 2026-03-31
repo: denoland/deno
size: L
title: "Alpha/beta releases and Node crypto upgrades"
excerpt: "Deno adds alpha/beta release channels, improves Node crypto compatibility, and trims dev watch shutdown latency."
commits: 6
authors: [bartlomieju, crowlKats, denobot]
commit_authors: {"c7d55f5": bartlomieju, "094f8bf": bartlomieju, "a2c128a": bartlomieju, "f79eedc": bartlomieju}
---

**Add alpha and beta release channels, plus prerelease upgrade flow** (c7d55f5)
Deno now recognizes `alpha` and `beta` alongside `rc`/`canary`, including serialization, version detection from prerelease tags, and `deno upgrade alpha|beta` support. It also updates release workflows and scripts so prerelease builds can be tagged and published without extra env/config changes.

**Improve Node.js sign/verify compatibility** (f79eedc)
Verification now accepts private keys in more cases by deriving a public key from PKCS#8/SEC1 private keys when needed, and it adds support for DSA private-key PEM parsing. RSA-PSS salt-length handling is also expanded to match Node.js constants, reducing interop failures in crypto-heavy code.

**Add ChaCha20-Poly1305 support to `node:crypto`** (a2c128a)
`createCipheriv`/`createDecipheriv` now support the ChaCha20-Poly1305 AEAD cipher, including streaming `update()`/`final()`, AAD, and auth-tag handling. This closes a major gap in Node crypto compatibility for apps that rely on RFC 8439 encryption.

**Speed up file-watcher graceful shutdown** (094f8bf)
The watch loop’s SIGTERM grace period drops from 5 seconds to 500ms, which should make reloads much snappier during development. It still leaves a short window for cleanup, but avoids long pauses when handlers are present.

### Other misc changes
- CI/release plumbing cleanup, including removal of legacy gcloud upload paths and S3 upload script changes
- Version bump to 2.7.10
- Cache key/version refreshes and related workflow churn
