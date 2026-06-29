---
date: 2026-06-28
repo: pnpm/pnpm
period: weekly
slug: 2026-W26
period_label: "Jun 22–28, 2026"
size: L
title: "pnpm’s Rust port grew into a near-full CLI, with stricter auth"
excerpt: "Pacquet filled major CLI gaps while pnpr tightened routing, auth, and integrity checks across registry and resolve flows."
commits: 102
---

### **Rust pnpm/pacquet filled out major end-user workflows**
This week the Rust CLI gained a stack of high-value pnpm commands: `audit` with fix/ignore flows, `pack-app`, `config`, `pack`, `dist-tag`, `deploy`, `setup`, `with`, `logout`, `ping`, `docs/home`, `self-update`, `global` package management, `list/ls`, `link/unlink`, `prune`, `fetch`, `dedupe`, `import`, `patch`, `set-script`, and several cache/store inspection commands.

Taken together, pacquet is moving from a partial port to a practical pnpm replacement for install, publish, maintenance, and runtime workflows.

### **pnpr tightened auth, routing, and registry trust boundaries**
The registry/resolver backend got a broad security pass: bearer-token auth became stricter, self-registration is opt-in, unpublish and publish/update paths now enforce authorization more carefully, and resolver endpoints were moved under `/-/pnpr` with independent feature toggles for registry and resolver surfaces.

Late in the week, pnpr also made resolver cache entries auth-aware, stopped forwarding client credentials upstream, rejected inline URL creds, and chose upstream auth from route policy instead. That significantly narrows the trust boundary for private package resolution.

### **Integrity, reliability, and lockfile correctness improved**
pnpm/pacquet now computes missing tarball integrity on download and writes it into the lockfile, preventing broken lockfiles on the next install. Lockfile verification also now surfaces real registry fetch errors instead of misreporting them as tarball URL mismatches.

Other hardening included stronger tarball handling, safer bundled-package packlists, retrying body-read failures after a successful HTTP response, and signature verification for installed packages.

### **Release, CI, and packaging flows were hardened**
Release automation now refuses to run outside `v*.*.*` tags, and pnpr gained a Docker image publish path on release. CI was reshaped around merge queues, deduplicated push runs, and faster/sharded test execution.

On the packaging side, the Rust binaries are now published as `pnpm` and `@pnpm/exe` on the `next-12` line, with native placeholder installs to avoid startup overhead.

### Other misc changes
- `pnpm dlx` now uses shorter Windows paths to avoid `MAX_PATH` failures.
- pnpr default port changed to 7677.
- `pnpm patch` preserves git-hosted aliases.
- Docs, lockfiles, dependency bumps, and smaller Windows/runtime cleanup fixes.
