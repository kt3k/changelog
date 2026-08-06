---
date: 2026-08-05
repo: denoland/deno
size: L
title: "Security fixes and a base64url speedup"
excerpt: "Control-character escaping, invalid npm bin target filtering, and simdutf-backed base64url ops headline a busy day."
commits: 5
authors: [nathanwhit, tomas-zijdemans]
commit_authors: {"fdda8b7": nathanwhit, "f048172": nathanwhit, "e0523a5": tomas-zijdemans}
---

### **Escape terminal control characters in CLI metadata** (fdda8b7)
Deno now sanitizes externally sourced registry and package metadata before printing it to terminal UIs and error messages. That closes a class of output-injection issues in places like lifecycle script approval, audit advisories, and registry API errors.

### **Reject invalid npm bin targets** (f048172)
The npm installer now ignores bin entries that are empty, absolute, or escape the package directory via `..` segments. This prevents packages from creating or mutating executables outside their own install tree on both Unix and Windows.

### **Implement base64url encode/decode in Rust for speed** (e0523a5)
Deno replaced the JS base64url shim with Rust ops backed by simdutf, bringing `node:buffer` base64url paths to parity with Node and cutting common encode/decode cases by multiple times. This also tightens the Buffer API implementation around native encode/decode behavior.

### Other misc changes
- Test isolation for `pkg_json_imports` specs
- CI/build fixes for QuickJS Windows and parser lint
- Dependency bumps and internal workflow/test adjustments
