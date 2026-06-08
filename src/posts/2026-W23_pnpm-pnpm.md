---
date: 2026-06-07
repo: pnpm/pnpm
period: weekly
slug: 2026-W23
period_label: "Jun 1–7, 2026"
size: L
title: "pnpm/pnpr sharpen installs, harden lockfiles, and speed up fetches"
excerpt: "This week focused on pnpr’s server/client evolution, deterministic lockfiles, stronger verification, and faster install paths."
commits: 78
---

### **pnpr shifts to a leaner server model**
The experimental install accelerator saw its biggest architectural change: `pnpm-agent` was retired in favor of `pnpr`, and the protocol/client were updated around a resolve-focused flow. pnpr now streams `/v1/resolve` frames, honors `--lockfile-only`, revalidates stale packuments with conditional GETs, and can run with S3-backed hosted package storage plus a separate proxy cache root. Auth handling also improved substantially, with caller credentials, upstream registry auth/custom headers, and backend-selectable auth storage for more scalable deployments.

### **Lockfiles became more deterministic and safer**
Several changes tightened lockfile behavior end to end. pnpm/pacquet now emit lockfiles in a canonical, byte-for-byte stable form that matches pnpm’s writer, reuse unchanged subtrees during non-frozen installs, preserve remote tarball integrity on re-resolution, and keep optional-peer contexts intact. Verification also got stricter: tarball URLs are checked against registry metadata, and uninterested verifiers are skipped earlier to reduce wasted work.

### **Pacquet broadened CLI coverage and install parity**
Pacquet picked up more of pnpm’s day-to-day command surface, including `outdated`, `remove`/`uninstall`, and initial `run`/`exec`/`dlx` support. It also gained pnpmfile hook support, `update` parity improvements like workspace ignore handling and catalog writes, and several behavior fixes around publish normalization, user-agent propagation, and config handling.

### **Install performance and concurrency improved**
The week brought multiple hot-path optimizations: metadata fetch retries now follow the same policy as tarballs, audit traversal prunes earlier, tarball extraction writes CAS entries in parallel with a dedicated pool, and cold/fresh install paths reuse in-flight tarball downloads instead of fetching twice. Virtual-store linking was also streamlined, and benchmark plumbing was expanded to measure real network cost and install timing more accurately.

### **Other misc changes**
- Windows shutdown crash fix for open network dispatchers
- Atomic workspace-state writes to avoid torn cache files
- Commit hook rule rejecting bare `#NNN` refs
- Concurrent install and auth-flow race fixes
- Release tooling, CI, docs, and test updates
