---
date: 2026-10-11
repo: pnpm/pnpm
period: weekly
slug: 2026-W41
period_label: "Oct 5–11, 2026"
size: L
title: "pnpm adds tool protocol, remote cache, and major hardening"
excerpt: "A busy week of new runtime/tooling flows, remote caching, OIDC auth, and numerous install, resolver, and filesystem fixes."
commits: 201
---

### **New runtime/tooling and registry flows land**
pnpm expanded its ecosystem support in a few big ways: the new `tool:` protocol now aliases `runtime:` for Node, Bun, Deno, and Yarn provisioning; Rust toolchains became first-class install targets; and `pnpx` can provision and run Rust tools from requested releases. On the registry side, pnpr gained OIDC sign-in plus OIDC-backed dist-tag management, and hosted registries got new admin APIs for users, teams, and package rules.

### **Remote cache and install performance improve**
`pnpm pipeline` can now use a remote cache server, storing signed task results and side effects so CI hits can be shared across machines. Install-time and metadata paths also got faster and leaner: metadata resolution moved to an indexed mirror layout, lockfile verification uses less memory, workspace discovery prunes earlier, and several rebuild/import hot paths were trimmed to avoid redundant re-resolves, copies, and rebuilds.

### **Security, registry, and filesystem correctness were tightened**
This week brought broad hardening across install, fetch, publish, and verify paths, including stricter tar and signature handling, lockfile variation checks, and protection against global virtual store path traversal. pnpm also normalized the npm registry HTTPS alias, fixed bootstrap downloads to honor configured registries, improved TLS-close handling behind proxies, and made macOS atomic writes and setup/shim behavior more robust on symlinked or shared filesystems.

### **Installer and resolver behavior saw many important fixes**
Several correctness fixes landed for workspace and lockfile edge cases: optional peers and workspace-provided peers are now selected more reliably, config dependencies obey minimum release age and update like normal deps, `enableModulesDir: false` still fetches store packages correctly, and deploy/import flows now handle peers, patches, and Windows paths more safely. The global virtual store path repair logic was also strengthened to recover interrupted or incomplete shared slots.

### **Other misc changes**
- CLI polish and parser cleanup, including `Infinity` support in more commands and better `pnpm setup` PATH/executable handling.
- Miscellaneous reporter, color, and error-message fixes.
- Docs, release-note, dependency, and CI/toolchain updates.
- Test coverage additions and internal refactors across install, resolver, deploy, and registry code.
