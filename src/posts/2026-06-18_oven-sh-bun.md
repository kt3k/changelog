---
date: 2026-06-18
repo: oven-sh/bun
size: L
title: "Pool wake fix, HTTP/2 overhaul lands"
excerpt: "Bun fixed a worker-pool shutdown stall, added trusted package listing, removed a Windows teardown crash probe, and landed a major node:http2 rewrite."
commits: 5
authors: [robobun, cirospaciari, dylan-conway]
commit_authors: {"454e3b2": robobun, "eae8038": robobun, "f9530ae": robobun, "6ef5977": cirospaciari}
---

### **Fix worker-pool shutdown wakeups to avoid 10s stalls** (454e3b2)
Concurrent `bun build` jobs could hang around the thread pool’s 10-second idle-worker timeout during shutdown, making parallel builds non-deterministically ~10,000ms slower instead of ~10ms. The fix now forces a wake on one-shot teardown paths so parked workers don’t get stranded, and it adds a regression test for the issue.

### **Add `--trusted` filtering to `bun list` / `bun pm ls`** (f9530ae)
Bun can now list only dependencies allowed to run lifecycle scripts, honoring both `trustedDependencies` in `package.json` and Bun’s default trusted list. This is a useful inspection and audit tool for package managers, and it ships with docs, completions, and tests.

### **Remove Windows FileSink teardown diagnostics that could crash** (eae8038)
Bun stripped out the Windows backtrace/symbolication probes from `FileSink` teardown and cleaned up the related generated plumbing. The change removes a source of teardown-time instability/UAF-style crashes on Windows standalone builds and includes a regression test around `filesink` behavior.

### **Major node:http2 rewrite with new frame engine and batching** (6ef5977)
This is a large compatibility and performance release for `node:http2`: inbound handling was rewritten around a new self-contained frame engine, and outbound writes were overhauled for batching, vectored writes, and TLS record batching. The commit also ports a large Node v26.3.0 test set and adds a substantial amount of new protocol machinery, so this materially improves both compatibility and throughput.

### Other misc changes
- CI image-bake tags are now ignored on `main` to prevent accidental multi-hour rebuilds and Windows image deletion during post-merge runs.
- Minor bootstrap/CI docs and command-help updates.
