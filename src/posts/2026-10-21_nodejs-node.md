---
date: 2026-10-21
repo: nodejs/node
size: L
title: "Security fixes dominate a busy LTS day"
excerpt: "Node.js shipped multiple CVE fixes across crypto, TLS, DNS, permissions, zlib, plus a few build and test improvements."
commits: 24
authors: [aduh95, panva, jasnell, inoway46, RafaelGSS, mcollina, marco-ippolito, vedchaudhari, ronag, eustas, legendecas]
commit_authors: {"9731991": jasnell, "c7974d9": ronag, "697ecce": panva, "7ba22c2": aduh95, "8c5debb": eustas, "8c44e38": panva, "6b88896": RafaelGSS, "5faa149": jasnell, "9ccbc81": mcollina, "a370966": jasnell}
---

### **Security release with multiple CVE fixes**
Node shipped coordinated security updates for TLS, DNS, permissions, crypto, and zlib, alongside updated LTS release notes for 22.23.4, 24.22.1, and 26.12.1. The day’s changes focus heavily on hardening exposed inputs and fixing correctness issues that could affect certificate validation, random data reuse, and archive parsing.

### **Harden X.509 conversion and formatting** (697ecce)
The crypto X.509 path now checks more conversion failures, preserves invalid-time diagnostics, rejects malformed SAN/AIA data, and avoids truncating long object identifiers. This tightens certificate parsing and formatting so invalid inputs fail cleanly instead of producing misleading output or skipping validation.

### **Coalesce buffered TLS records into one read** (c7974d9)
TLS now batches successive buffered application-data records into a single JS-visible read when safe to do so. That reduces buffer churn and callback overhead for peers that emit small records, improving throughput without changing record semantics.

### **Reset crypto random caches across snapshots** (8c44e38)
Startup snapshots now clear cached `randomInt()` and UUID data during serialization/deserialization boundaries. This prevents deserialized processes from replaying stale random values, which is a serious correctness and security issue for snapshot-based startup.

### **Reject non-canonical IPs in TLS identity checks** (9ccbc81)
TLS server identity verification now rejects hostnames that normalize into IP addresses only after IDNA conversion. That closes a class of certificate-matching confusion where a resolver or platform could interpret the original host differently from the normalized form.

### **Fix TLS IP normalization regression** (9731991)
A regression in TLS hostname checking was corrected so IP literals are matched more reliably against certificate SANs. The change restores the intended validation behavior and addresses a low-severity bypass reported upstream.

### **DNS resolver inputs now reject null bytes** (a370966)
All DNS resolver entry points now reject strings containing embedded NULs before they reach c-ares. This prevents accidental truncation at the first null byte, which could otherwise query a different hostname than the caller supplied.

### **Permission model now checks `realpathSync()`** (6b88896)
`fs.realpathSync()` now participates in the permission model the same way related filesystem APIs already do. That closes an access-control gap where forbidden paths could be resolved despite permissions being denied elsewhere.

### **Fix wildcard nodes in the fs permission tree** (5faa149)
The permission tree handling for wildcard nodes was corrected. This strengthens the filesystem sandbox so wildcard-based policy entries behave consistently and do not leave a mistaken allow/deny state.

### **Brotli surfaces block-switch format errors** (7ba22c2)
Node now exposes `BROTLI_DECODER_ERROR_FORMAT_BLOCK_SWITCH` and updates brotli decoding to report invalid streams earlier. This aligns the bundled decoder with the security fix that prevents malformed input from slipping through as a generic failure.

### **Brotli decoder cherry-pick for invalid stream handling** (8c5debb)
The vendored brotli decoder was updated to detect and report invalid streams sooner, including format-block-switch errors. This is part of the same CVE fix and is needed for the new public error surfaced by Node.

### Other misc changes
- Windows build now fails fast if Cargo/Rust is missing when required.
- Build system no longer passes vendored headers when targeting shared libraries.
- JSON config-schema test coverage was corrected; schema docs were regenerated.
- Crypto and zlib tests/docs were updated for API and behavior changes.
- Minor crypto constant/type cleanup and BoringSSL macro fix.
- Misc build metadata and release-note updates.
