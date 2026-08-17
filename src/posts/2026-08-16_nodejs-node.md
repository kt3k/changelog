---
date: 2026-08-16
repo: nodejs/node
size: M
title: "Release tooling and docs cleaned up"
excerpt: "Fixed binary upload naming, clarified fs.lchmod history, and refreshed Nix pins."
commits: 3
authors: [sxa, lazerg, nodejs-github-bot]
commit_authors: {"ad7a5b8": sxa, "46cac5a": lazerg}
---

### **Binary upload now uses the actual tarball name** (ad7a5b8)
The release `binary-upload` target was using `$(TARNAME)` even though the archive is created from `$(BINARYNAME)`, which can include a variation suffix. This fixes upload/publish paths so release artifacts like Alpine/musl builds are named consistently and won’t be missed.

### **fs.lchmod docs now include missing added tags** (46cac5a)
The `fs.lchmod` and `fs.lchmodSync` docs were missing their historical `added:` metadata, and the promise variant now also records when it was added. This is a documentation correctness fix that makes the API timeline clearer for readers and tooling.

### Other misc changes
- Updated Nixpkgs pins and hashes for the Nix-based tooling.
- Dropped `openssl_1_1` from the OpenSSL test matrix and removed the insecure package allowance.
