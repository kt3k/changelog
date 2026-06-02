---
date: 2026-03-02
repo: denoland/deno
size: L
title: "Deno tightens Node compat, npm installs, and Jupyter"
excerpt: "Big Node crypto/process fixes, npm resolver and install speedups, plus protocol-correct Jupyter interrupts and shutdowns."
commits: 27
authors: [bartlomieju, nathanwhit, marvinhagemeister, pmarchini, Tango992, fraidev]
commit_authors: {"f7bcc96": bartlomieju, "5fb8a4d": marvinhagemeister, "968baf7": bartlomieju, "cf2455c": bartlomieju, "95140c3": nathanwhit, "e726953": bartlomieju, "70497bb": bartlomieju, "fd9def3": bartlomieju, "84f7a15": bartlomieju, "b9f6889": nathanwhit, "64a1d86": bartlomieju, "cc8c488": bartlomieju, "59bec9b": bartlomieju, "63ff522": bartlomieju, "d428817": bartlomieju, "9cf5852": bartlomieju}
---

### **Node crypto gets broader key support and fewer edge-case crashes** (f7bcc96, fd9def3, 968baf7, 9becb83, 70497bb, cc8c488, 59bec9b, 63ff522, e726953, 9cf5852)
Deno’s `node:crypto`, `node:process`, `node:buffer`, `node:fs/promises`, and stream utilities picked up a long list of compatibility fixes. Highlights include support for Ed25519/X25519/P-521 X.509 public keys, DER-encoded encrypt/decrypt keys, secp256k1 ECDSA, a real `process.umask()`, correct `execPath`, and safer cipher finalization/padding behavior.

### **npm install and peer resolution are faster and more correct** (5fb8a4d, b9f6889, 95140c3)
The npm resolution graph was rewritten into a two-phase peer-dependency flow to avoid duplicate installs and hangs. Install paths also now request abbreviated packuments by default and move registry decompression off the async event loop, improving throughput and reducing stalls on large metadata responses.

### **X509Certificate methods are no longer mostly stubs** (cf2455c)
Nine `crypto.X509Certificate` methods were implemented, including `toString()`, `raw`, `subjectAltName`, `checkIP()`, `checkIssued()`, `checkPrivateKey()`, `verify()`, `infoAccess`, and `toLegacyObject()`. This closes a major gap in Node compatibility for certificate inspection and validation code.

### **Coverage reporting is fixed and more resilient** (64a1d86, 84f7a15)
`deno coverage` now computes line/branch counts correctly and no longer fails the whole report when source files disappear after collection. That makes LCOV output more trustworthy and coverage runs less fragile in build pipelines.

### **Jupyter now handles shutdown and interrupts properly** (d428817)
The kernel now replies to shutdown and interrupt messages per protocol instead of just logging unsupported operations. Interrupts actually terminate running JS via V8, and execution resumes cleanly afterward.

### **Other misc changes**
- CI switched from Cirrus runners/caches to GitHub-hosted defaults.
- `console.table` now handles iterators.
- Workspace test discovery deduplicates overlapping modules.
- Stack frame dimming and console log alignment were tweaked.
- `child_process` simple-quote escaping and a require(esm) regression test were added.
