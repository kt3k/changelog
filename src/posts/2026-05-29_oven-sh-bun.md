---
date: 2026-05-29
repo: oven-sh/bun
size: L
title: "Bun patches YAML, crypto, SQL, and parser bugs"
excerpt: "A busy day of bug fixes: YAML conformance, crypto/OpenSSL compatibility, SQL decoding and naming, plus performance and crash hardening."
commits: 31
authors: [dylan-conway, robobun, alii, Jarred-Sumner]
commit_authors: {"7069b30": dylan-conway, "3a79bd7": alii, "6162fb2": robobun, "e3481db": alii, "bb94ed4": Jarred-Sumner, "16f34ba": robobun, "496ce7e": dylan-conway, "efc26a1": robobun, "cb4a5c6": robobun, "051f782": robobun, "9d00056": dylan-conway, "57d8e38": dylan-conway, "677fe1c": robobun, "5ba2f65": alii, "973d1de": robobun, "ecfdaa6": robobun, "d4b3a3e": dylan-conway}
---

### **YAML spec conformance tightened across multiple edge cases** (7069b30, 9d00056, 57d8e38, d4b3a3e)
Bun cleared several `test.todo` YAML cases and fixed a cluster of flow/block parsing issues, including BOM handling, column-0 document markers, tab indentation before structural tokens, and multiple flow-context over-accepts. These changes make the YAML parser noticeably stricter and closer to the spec.

### **Crypto X509 behavior now matches Node/OpenSSL** (3a79bd7, efc26a1)
`X509Certificate.serialNumber` and modulus output are now uppercased to match Node/OpenSSL, which matters for literal cert pinning and allowlists. Separately, `checkIssued()` now returns a boolean instead of a certificate object, fixing a public API mismatch.

### **MySQL SQL results now decode DECIMALs and digit-named columns correctly** (e3481db, cb4a5c6)
Computed `DECIMAL` values from MySQL are now returned as strings instead of raw buffers, fixing broken `toFixed()`/`JSON.stringify` behavior. Bun also fixed misclassification of digit-heavy column names like `2024_01`, which were being treated as array indices and could abort debug builds.

### **CSS `atan2()` parsing no longer hangs exponentially** (6162fb2)
Nested math-function parsing was hardened to avoid exponential backtracking on malformed `atan2()`-heavy input. This closes a fuzzing-found hang that could turn a small CSS payload into seconds or minutes of CPU burn.

### **LinearFifo wrapped-removal bounds bug fixed** (16f34ba)
`LinearFifo::ordered_remove_item` now uses the correct wrapped-prefix length when the readable region spans the end of the buffer. That prevents out-of-bounds slice math and data corruption in the wrapped-buffer case.

### **Bundled JS modules can load source zero-copy when ASCII** (496ce7e)
Standalone compiled modules now honor the serialized encoding from the bundle graph instead of always forcing binary treatment. For ASCII JS, that restores the zero-copy path and avoids an unnecessary heap copy at module load.

### **Stack depth guard added to nested JSX parsing** (ecfdaa6)
The TSX/JSX parser now guards against deeply nested JSX causing a straight SIGSEGV. That turns a fuzzing-discovered crash into a bounded parse failure instead of a process kill.

### **Compiled executables no longer segfault in a deleted cwd** (677fe1c)
Starting a compiled Bun executable from a directory that has been removed now fails cleanly instead of crashing. This is a user-facing robustness fix for standalone builds and CLI workflows.

### **TextEncoder no longer corrupts partial astral output** (5ba2f65)
`encodeInto()` now leaves the destination buffer untouched when a valid astral character does not fit, matching the Encoding spec. That fixes incorrect replacement-character writes and bad resume behavior in streaming encoders.

### **Lockfile version 2 introduced with stricter parsing gates** (973d1de, 051f782)
Bun bumped the default lockfile format to v2 and gated newer parse-time checks behind the version so older lockfiles continue loading. A follow-up made v2 stamping independent of the writer's registry config, improving round-trips and compatibility.

### **Inspector/debug adapter hardened against event spoofing** (bb94ed4)
The debug adapter now only forwards protocol events from known inspector domains, preventing request-name spoofing from reaching DAP handlers. The same patch also hardens the TCP signal listener to bind loopback explicitly and track the actual port.

### Other misc changes
- Security/hardening sweep across install, http2, path/fs, S3, V8, and debug-adapter subsystems (1 commit)
- Dead-code cleanup across collections, resolver, threading, bun_core, bun_alloc, bun_http_types, bun_sys, bun_paths, bun_semver, and bun_ast (9 commits)
- Release script updated to ship Android and FreeBSD artifacts (1 commit)
- Small test fix in lockfile version 2 coverage (1 commit)
