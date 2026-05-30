---
date: 2026-03-03
repo: denoland/deno
size: L
title: "Node compat and npm resolver get big upgrades"
excerpt: "Major Node crypto/UDP fixes, npm resolution performance gains, and a cache-dir refactor landed alongside several CI and correctness improvements."
commits: 24
authors: [bartlomieju, dsherret, nathanwhit, denobot, arnauorriols, Tango992]
commit_authors: {"5073362": bartlomieju, "2334e53": dsherret, "86a97b2": bartlomieju, "3fe843d": dsherret, "5d6b106": bartlomieju, "75c9638": bartlomieju, "d45142b": bartlomieju, "83e3746": denobot, "3f45941": nathanwhit, "74cc882": bartlomieju, "0cfe40a": dsherret, "25dbe4c": bartlomieju, "28ec7c0": bartlomieju, "5b5f84c": bartlomieju, "01f99e8": arnauorriols, "a4f20ad": dsherret, "291532f": bartlomieju, "984300a": bartlomieju, "f5f84cd": Tango992, "df9c814": dsherret}
---

### **Deno cache directory moved into the main repo** (3fe843d)
`deno_cache_dir` is now a workspace member under `libs/cache_dir`, with its own internal modules and tests instead of living as an external workspace dependency. The refactor also adds support for an initial cwd when resolving the Deno dir, which should make startup and path resolution faster in some cases.

### **Node UDP sockets now work synchronously and support more dgram APIs** (d45142b)
The Node compatibility layer now owns UDP socket operations directly and makes bind/send/recv and socket configuration synchronous, instead of routing through async wrappers. It also implements missing dgram methods like TTL and multicast-source membership handling, and removes the artificial 64KB buffer-size cap.

### **npm resolution parallelism improved during install** (3f45941)
Dependency graph resolution now fetches package metadata across pending parents in parallel instead of processing each parent serially. This should reduce install latency, especially on larger graphs with many network-bound package lookups.

### **P-521 key generation and export/import are fixed** (5b5f84c)
Web Crypto now generates P-521 private keys in PKCS8 form instead of raw scalar bytes, and export/import paths were updated so JWK private keys round-trip correctly. This fixes broken P-521 interoperability and aligns behavior with other EC curves.

### **Node crypto gains key equality, KeyObject support, and padding fixes** (5073362)
`KeyObject.prototype.equals()` is now implemented, and `createCipheriv`/`createDecipheriv` can accept `KeyObject` keys and `null` IVs. The change also improves internal key comparisons across asymmetric key types, making Node crypto compatibility more complete.

### **RSA-PSS sign/verify now preserves padding options** (291532f)
`crypto.sign()` and `crypto.verify()` now pass RSA padding through correctly, including `RSA_PKCS1_PSS_PADDING`, instead of always falling back to PKCS#1 v1.5 behavior. That closes a real compatibility gap for code that depends on PSS-specific options.

### **CBC decrypt respects setAutoPadding(false)** (984300a)
`Decipheriv.final()` no longer strips PKCS7 padding when auto padding has been disabled. That fixes data corruption in CBC round-trips where callers intentionally manage padding themselves.

### **SEC1 EC private key import/export handles missing parameters** (25dbe4c)
EC private key import now falls back to the inner SEC1 parameters when PKCS#8 metadata is incomplete, avoiding failures for keys that omit the optional named-curve field. Export was also adjusted so SEC1/PKCS#8 round-trips work for more curve/key combinations.

### **Node dgram membership regression fixed** (86a97b2)
Adds a regression test for `dgram.addMembership()` rejecting invalid addresses with `EINVAL`. This is a narrow but useful guard for the earlier UDP compatibility work.

### **Invalid NODE_CHANNEL_FD now exits cleanly** (74cc882)
When `NODE_CHANNEL_FD` points to a non-IPC file descriptor, Deno now emits a clear error and exits with code 1 instead of panicking during bootstrap. That makes failures with process managers like PM2 much less disruptive.

### **NPM registry override handling is corrected** (c15deea)
`NPM_CONFIG_REGISTRY` now properly overrides `.npmrc`-derived registry settings throughout npm resolution and audit flows. That fixes an important configuration precedence bug for users pointing installs at custom registries.

### **Cron socket schedule validation added** (01f99e8)
Validates cron schedules when using the cron socket path, preventing bad schedules from slipping through. This is a small correctness fix with limited scope.

### **Environment precedence in watcher flows is fixed** (f5f84cd)
Process-level environment variables now take precedence over values loaded from env files in watcher-related code paths. That aligns runtime behavior with expected env precedence rules.

### **Compile-time self-extracting directory placement changed** (df9c814)
The self-extracting directory is now stored in a hidden folder beside the executable. This is a small packaging/behavior tweak.

### **Cache-dir-aware CI and release plumbing updated** (2334e53, 28ec7c0, 83e3746, a4f20ad, 75c9638, 5d6b106, 0cfe40a)
CI and workflow wiring were updated for the new cache-dir crate, npm publish/release version bumps, duplicate-work hashing, and WPT expectation reshaping. Also includes a tarball extraction perf refinement and a small npm resolver cleanup.

### Other misc changes
- CI workflow tweaks and job gating changes
- Release/version bump to 2.7.2
- WPT expectation file split and related test harness updates
- Minor test-only regression additions and internal refactors
- npm registry/audit plumbing cleanup and dependency updates
