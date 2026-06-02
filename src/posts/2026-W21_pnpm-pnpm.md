---
date: 2026-05-24
repo: pnpm/pnpm
period: weekly
slug: 2026-W21
period_label: "May 18–24, 2026"
size: L
title: "pnpm surges toward Rust-backed installs and CLI parity"
excerpt: "This week added major pacquet resolver/install parity, native CLI commands, faster installs, and tighter lockfile and registry handling."
commits: 116
---

### **Pacquet gets much closer to pnpm install parity**
A big chunk of the week went into porting pnpm’s resolver and install pipeline into pacquet. Support landed for runtime specifiers, local/file/link/workspace paths, tarballs, git deps, JSR, named registries, overrides, catalogs, workspace protocol rewriting, patch handling, and peer-dependency auto-install. Fresh-lockfile installs now follow the phased virtual-store pipeline, can write lockfiles, and respect frozen/prefer-frozen behavior and global virtual store settings.

### **Install correctness and determinism were hardened**
Several fixes targeted edge cases that previously caused wrong or unstable installs: peer graph handling now uses dep-path-based tracking, cyclic peer suffixes are deterministic, leaf packages are deduplicated in the tree, and lockfile pruning re-derives transitive optionality. Pacquet also fixed store-path compatibility, virtual-store naming, patch-store races, Windows symlink targets across drive roots, and stale or malformed lockfile cases involving non-semver slots.

### **Lockfile verification became stricter, faster, and more visible**
Lockfile verification now runs immediately after load and after fresh lockfile writes, enforcing `minimumReleaseAge` and `trustPolicy='no-downgrade'` earlier in the flow. The verifier gained progress reporting in the default reporter, a `trustLockfile` opt-out for already trusted lockfiles, and lower memory use for large workspaces. Related policy handling was also fixed for global add/update flows.

### **Install performance improved meaningfully**
Pacquet closed much of the clean-install and warm-cache gap by pipelining tarball fetches with resolution, reusing in-memory packuments, memoizing repeated resolution work, and deferring child realization until peer resolution needs it. Fresh installs also now no-op when frozen-lockfile state and modules metadata already match, avoiding unnecessary materialization.

### **Native CLI coverage expanded**
pnpm gained native implementations for `pkg`, `stage`, and `repo`, covering package.json editing, staged publishing flows, and opening repository URLs directly. The week also added scoped `pnpm login` support, made login/logout registry sync workspace-aware, and fixed `publishConfig.access` handling and `cafile` path resolution.

### **Other misc changes**
- `pnpm outdated` now reports runtime-managed Node/Deno/Bun versions.
- `pnpm deploy` skips config deps in nested installs to avoid crashes.
- `pack`/`publish` gained `--skip-manifest-obfuscation`.
- A native Rust `pnpm-registry` server replaced the Node/Verdaccio test mock.
- Release prep, version bumps, docs, CI, benchmark, and test-harness updates.
