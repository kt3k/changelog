---
date: 2026-08-31
repo: pnpm/pnpm
period: monthly
slug: 2026-08
period_label: "August 2026"
size: L
title: "pnpm 12 hardens installs, determinism, and workspace tooling"
excerpt: "August brought a major pnpm 12 wave: shared virtual store by default, faster deterministic installs, new workspace/task features, and several security and auth fixes."
commits: 519
---

### **Install engine and layout changes**
August’s biggest shift was pnpm 12’s new shared virtual store default, which materializes packages once per machine and reuses them across projects. To keep that layout compatible, pnpm updated script resolution, lifecycle execution, hoisting, `NODE_PATH`/ESM loader behavior, bin handling, and store placement so installs, `run`, `exec`, `dlx`, and native-addon workflows still work correctly in the new model.

### **Fast-path installs got much smarter**
A large amount of work went into avoiding unnecessary full re-resolves. Install/update now handles combined manifest drift, patch edits, catalog and override changes, ignored optionals, and moved dependency groups in place when possible. The result is less registry traffic, fewer lockfile rewrites, and much better performance on common incremental edits.

### **Peer resolution became faster, steadier, and deterministic**
Peer-heavy workspaces saw repeated performance and correctness improvements: incremental discovery, memoized metadata parsing, bounded cycle handling, less allocation, and major memory reductions on large graphs. Several nondeterminism sources were also removed, including concurrent walk races, importer-order dependence, and unstable peer-provider selection, so repeated installs now converge on the same lockfile much more reliably.

### **Security and trust hardening**
The month included notable security and integrity fixes: rebuild path traversal from lockfile names was blocked, named-registry lockfiles were keyed safely to prevent substitution, archive decoding memory use was capped to reduce bomb risk, and Node.js mirror downloads gained proper auth scoping. pnpm also hardened CA fallback, git URL handling, tarball path normalization, and release-tag verification.

### **Workspace, catalog, and config workflows expanded**
Workspace tooling got a lot more capable: branch-scoped lockfiles, configurable lockfile placement, parent-relative workspace globs, workspace catalog resolution for `workspace:` entries, and better config introspection. pnpm also improved handling of scoped auth, login/adduser storage, `config get/list`, and many env/config edge cases so the Rust CLI more closely matches expected pnpm behavior.

### **New task, artifact, and deploy capabilities**
The second half of the month added major workflow features: recursive task orchestration with per-task concurrency and resumable state, shared build artifacts recorded in lockfiles, and expanded deploy semantics for linked workspaces, singleton peers, and filtered outputs. pnpr also evolved significantly, with protocol changes, artifact provenance, and broader resolver/config forwarding.

### **Other misc changes**
- Corepack and package-manager pinning fixes, including `pnpm init` writing exact pnpm versions
- Global command and self-update fixes, including safer global updates and atomic global installs
- Windows/macOS/CI reliability fixes for shims, symlinks, cleanup, and release packaging
- Numerous Rust-module splits and refactors across install, resolver, audit, tarball, and pnpr code
- Smaller CLI compatibility fixes, test additions, dependency bumps, and workflow updates
