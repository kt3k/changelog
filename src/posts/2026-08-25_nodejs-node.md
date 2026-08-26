---
date: 2026-08-25
repo: nodejs/node
size: L
title: "Crypto gets provider-aware discovery and faster checks"
excerpt: "OpenSSL provider enumeration lands for ciphers and hashes, plus crypto brand-check speedups, a recursive readdir optimization, and a buffer search fix."
commits: 18
authors: [panva, codebytere, slagiewka, nodejs-github-bot, DevJunz, legendecas, HoonDongKang, arynh, RafaelGSS, cflee, trivikr, jasnell]
commit_authors: {"96b1293": DevJunz, "e7a69c4": panva, "025e88f": panva, "ef4a636": legendecas, "7aaf9b4": panva, "ebd88be": panva, "ce40aa2": HoonDongKang, "056e2ae": arynh, "54b4e37": RafaelGSS, "f9f3fa9": codebytere, "f170888": cflee, "59dd75b": slagiewka, "e618b1b": codebytere, "4b5e86c": trivikr, "0c31886": jasnell, "a0abb47": nodejs-github-bot, "9d7f185": nodejs-github-bot}
---

### **Provider-aware cipher discovery expands crypto support** (e7a69c4)
Node now discovers usable ciphers and aliases from active OpenSSL 3 providers instead of relying on hard-coded provider-only lists. That exposes additional algorithms like CBC-CTS, SM4 modes, and more AES key wrap variants, and adds `ctsMode`/`xtsStandard` options so callers can select provider-specific variants precisely.

### **Provider-aware hash discovery adds new digest options** (025e88f)
Hash enumeration now comes from OpenSSL 3 providers too, with alias normalization and filtering for unusable names and OIDs. This also adds `functionName` and `customization` controls for cSHAKE, widening the supported digest surface while keeping legacy and non-OpenSSL-3 paths intact.

### **Recursive readdir skips unnecessary stat calls** (e618b1b)
`readdir({ recursive: true })` now asks the binding for entry types up front and only stats symlinks or unknown entries when needed. This should significantly reduce syscall overhead on large directory trees, especially for recursive scans.

### **Buffer indexOf/lastIndexOf handle lone surrogates safely** (54b4e37)
UTF-8 string search now uses replacement-character semantics for unpaired UTF-16 surrogates, matching `Buffer.from()` behavior. That prevents aborts on edge-case needles and makes `indexOf()`, `lastIndexOf()`, and `includes()` behave consistently.

### **Crypto brand checks avoid throwing for hot paths** (7aaf9b4, ebd88be)
`CryptoKey` and `KeyObject` identity checks now use native brand checks instead of probing slots and catching `ERR_INVALID_THIS`. This removes exception-driven control flow in a hot crypto path and keeps a fast path for same-realm objects.

### **Snapshot creation can build on a V8 startup blob** (f9f3fa9)
Node’s snapshotting support can now start from an existing V8 startup blob, which matters for embedders linked against V8 builds that only ship deserializer data. This unblocks snapshot support in setups that previously couldn’t use it at all and preserves the expected read-only heap lineage.

### **Stream fusion normalizes intermediate transform output** (4b5e86c)
Intermediate outputs between fused stateless transforms are now normalized before the next transform runs, for both sync and async pipelines. That makes chained transforms receive consistent `Uint8Array[]` batches instead of mixed shapes.

### **OpenSSL root certificates updated to NSS 3.126** (a0abb47)
Node’s bundled CA set was refreshed, adding several new roots and removing two deprecated ones. This directly affects TLS trust decisions for users relying on the built-in root store.

### Other misc changes
- Simplified array-argument validation in crypto internals and tests (96b1293)
- Removed obsolete configure flags (ef4a636)
- Simplified worker heap profile test (ce40aa2)
- Corrected documented `maxHeadersCount` semantics in HTTP/HTTPS docs (056e2ae)
- Clarified sync child-process return types in docs and JS annotations (f170888)
- Inlined a couple of EventTarget hybrid dispatch closures for a small perf win (984e46b, 59dd75b)
- Added a root-level `AGENTS.md` with contributor guidance (0c31886)
- Updated nixpkgs in tooling (9d7f185)
