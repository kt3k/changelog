---
date: 2026-11-08
repo: pnpm/pnpm
period: weekly
slug: 2026-W45
period_label: "Nov 2–8, 2026"
size: L
title: "pnpm expands registry storage, variants, and install correctness"
excerpt: "Major pnpr storage backends landed, variants became first-class, and pnpm tightened installs, deploys, and resolver edge cases."
commits: 264
---

### **pnpr’s registry/storage stack took a big step forward**
The registry service moved deeper into SQL-backed storage and trust primitives: atomic metadata writes, staged publish replay protections, release records, transparency-log support, and a shared migration layer. By week’s end, pnpr had expanded from SQLite/libSQL into PostgreSQL and MySQL metadata backends, while also centralizing auth/metadata state and tightening validation around publishes, unpublishes, tags, and account flows.

### **Platform variants became first-class across pack, publish, and install**
pnpm now understands `publishConfig.variants` end-to-end: `pack` and `publish` can emit per-platform archives, installs can select and fetch the right variants, and supported architectures now carry their dependencies into the store for reuse. The resolver and deduplication logic were updated to keep peer variants, optional peers, and provenance statements consistent, and pnpr gained variant-aware publishing and batch commit support.

### **Install, deploy, and linker correctness improved across many edge cases**
A long run of fixes tightened repeat-install fast paths, workspace/root resolution, `modulesDir` handling, and sparse-checkout behavior. Notable fixes include frozen installs validating `link:` targets properly, hoisted installs dropping missing workspace projects instead of recreating stale trees, deploy handling `workspace:` and `publishConfig.directory` correctly, and commands like `bin`, `run`, `exec`, and `version` resolving the right modules directory.

### **Resolver, cache, and fetch paths were hardened**
pnpm now handles optional peers and peer deduplication more accurately, including project-scoped optional peers and cross-project variant separation. Tarball handling also got faster and safer: hashing now overlaps with extraction, cancelled downloads release cache slots, repeated archive failures use one retry budget, and Windows auto-imports prefer hardlinks first. On the registry side, cached metadata rendering and conditional responses were improved to reduce latency and stale reads.

### **New user-facing command and security/diagnostic fixes**
`pnpm fund` landed as a new command with JSON and recursive/filter options. The week also brought security and UX fixes such as rejecting placeholder registry URLs, improving provenance signing behavior, keeping Windows mapped-drive paths intact, and making broken symlink/junction and TLS/proxy failures easier to diagnose.

### **Other misc changes**
- Shell completion now returns paths for value-taking options.
- `pnpm store add` can ingest directories of local tarballs and runs faster.
- CI, docs, tests, and dependency bumps across pnpm and pnpr.
- Smaller refactors in store, linker, auth, and registry support code.
