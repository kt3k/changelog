---
date: 2026-07-26
repo: pnpm/pnpm
period: weekly
slug: 2026-W30
period_label: "Jul 20–26, 2026"
size: L
title: "pnpm fills core CLI parity gaps and hardens installs"
excerpt: "Major week for Rust CLI parity: installs, updates, versioning, ci/unpublish, and resolver fixes landed across workspace and lockfile flows."
commits: 132
---

### **Core CLI parity expands across install, update, and release flows**
This week brought several major Rust-CLI milestones: native `ci` and `unpublish`, `view`, `version` bump/from-git support, `update --changeset`, and broader `add`/`update` parity for aliases, workspace-linked updates, `--workspace`, `--latest`, `--allow-build`, and `--registry` handling. pnpm also tightened pre-command validation for pinned `packageManager`/runtime versions and restored `pnpm:devPreinstall` timing so workspace installs behave more like the TypeScript CLI.

### **Workspace and lockfile behavior got much more correct**
A lot of the week focused on workspace-aware correctness: recursive install-family commands now work with dedicated lockfiles, `rebuild` and `unlink` follow the selection-aware pipeline, and `outdated` gained recursive workspace support plus GitHub Actions dependency detection. On the data side, fixes landed for lockfile churn, frozen-install drift checks, `$dep-name` override self-references, peer-edge/provider depPath handling, peer-hoisting precedence, bundledDependencies recording, and compatibility with older lockfile and manifest shapes.

### **Resolver, install, and publish edge cases were hardened**
The resolver and installer picked up several important fixes, including better handling of git deps, tarballs, local `file:`/`link:` packages, JSR specs, `saveWorkspaceProtocol`, and `minimumReleaseAge`/resolution policy propagation. Publishing and release tooling also improved with package payload verification, `publishConfig.name`, provenance retry/timeout handling, and `unpublish` support, while self-update was locked down to ignore project-controlled config during bootstrap downloads.

### **Parity and reliability improvements round out the week**
The week closed several smaller but user-visible gaps: `pnpm list`/`why`, `dedupe --check`, `peers check`, `pnpm ci`, `pnpm view --registry`, and global bin/setup behavior all moved closer to pnpm expectations. CI and workflow reliability also improved, including coverage disk cleanup, timeouts, and environment propagation for global commands.

### **Other misc changes**
- Release/changelog and version bumps across pnpm v11/v12 alpha and pacquet
- Test coverage, fixture updates, and internal refactors
- Minor CLI parsing, reporter, and workflow cleanup
