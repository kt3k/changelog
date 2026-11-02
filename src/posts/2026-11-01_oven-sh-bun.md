---
date: 2026-11-01
repo: oven-sh/bun
size: L
title: "Crypto fixes and release pipeline hardening"
excerpt: "Node crypto/WebCrypto compatibility gets a substantial fix batch, while CI and release jobs switch to OIDC and trusted publishing."
commits: 7
authors: [dylan-conway, robobun]
commit_authors: {"3f3a9ff": dylan-conway, "1b6d511": dylan-conway, "cee9dd9": dylan-conway}
---

**Node crypto/WebCrypto compatibility gets a third fix batch** (cee9dd9)
Bun now matches Node more closely in several `node:crypto` and WebCrypto edge cases, including padded DH secret derivation, RSA-OAEP MGF1 handling, and stricter IP validation for X509 checks. The change also adds and updates tests across crypto and webcrypto suites, so this should close a broad set of behavioral gaps rather than just one isolated bug.

**CI image lookup now uses Buildkite OIDC + an AWS role** (3f3a9ff)
`getLinuxImageState` no longer reads long-lived AWS access keys; it requests a short-lived Buildkite OIDC token and lets the AWS CLI assume `EC2_ROLE_ARN` via web identity. This reduces secret exposure in CI and moves image lookup onto a more standard temporary-credentials flow.

**Canary release uploads now use a GitHub App token** (1b6d511)
The release upload script now mints an installation token for the `bun-release-upload` GitHub App instead of consuming a shared `GITHUB_TOKEN`, and it redacts the token in logs. The canary path also stops waiting on tests before publishing, which makes the upload flow faster and more direct.

### Other misc changes
- NPM releases switched to trusted publishing and removed the npm token auth line.
- Release jobs now run in the `release` GitHub environment.
- Removed the `[sign windows]` Buildkite commit-message override.
- Small debug-build include fix for `BunPlugin.cpp`.
