---
date: 2026-07-05
repo: jsr-io/jsr
period: weekly
slug: 2026-W27
period_label: "Jun 29 – Jul 5, 2026"
size: S
title: "Provenance verification now locks to published tarballs"
excerpt: "Provenance checks now compare attestations against the exact uploaded tarball hash, preventing mismatched-byte verification."
commits: 1
---

### **Provenance verification now checks the published tarball bytes**
The publish flow now stores the SHA-256 of the uploaded tarball, and provenance verification compares an attestation’s `subject.digest.sha256` against that exact publish-time hash. This closes a gap where a valid attestation could be incorrectly matched to the wrong package bytes, and verification now fails closed if the hash is missing.

### Other misc changes
- DB migration adding nullable `publishing_tasks.tarball_hash`
- SQLx query metadata updates for tarball hash reads/writes
- Frontend asset/style updates
