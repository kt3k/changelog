---
date: 2026-05-17
repo: pnpm/pnpm
period: weekly
slug: 2026-W20
period_label: "May 11–17, 2026"
size: L
title: "pnpm sharpened install parity, policy, and security"
excerpt: "Major pacquet install-parity work landed alongside security hardening, lockfile/runtime fixes, and faster policy-aware verification."
commits: 152
---

### **Install engine parity took a big step forward**
Pacquet picked up major missing pieces of pnpm behavior: patchedDependencies now apply before postinstall, bin linking/shims were added, lifecycle env/PATH handling was tightened, and side-effects cache writes landed for warm installs. Hoisted installs also became end-to-end usable, including workspace hoisting, top-level bin relinking, build support, and node-linker selection.

### **Lockfile and workspace handling got much more robust**
The week broadened lockfile support for pnpm v11 combined/runtime formats, added freshness checks against package.json, and fixed CRLF parsing on Windows. Workspace installs now anchor correctly from subdirectories, persist workspace state after pacquet installs, and support more config knobs like hoisting limits, offline/prefer-offline, and build policy.

### **Security and registry/auth behavior were hardened**
Several CodeQL and workflow issues were fixed, including prototype-pollution-sensitive writes and GitHub Actions injection/credential risks. On the network side, auth, proxy, TLS, and web-auth polling now behave more like upstream pnpm, while publish auth no longer leaks unresolved `${VAR}` placeholders.

### **Policy, runtime, and cache correctness improved**
minimumReleaseAge is now enforced more consistently, including on locked versions and self-update flows, and the verifier path was reworked to cache lockfile checks and speed up attestation-first lookups. Runtime-pinned packages and global virtual store hashing were also fixed so cache keys reflect the Node that actually runs scripts.

### **Other misc changes**
- `pnpm add -g` now isolates space-separated globals by default
- `pnpm view` shows publish age and publisher details
- `pnpm --version` cleanup no longer leaves worker pools hanging
- `pnpm runtime set` works from workspace roots
- Various docs, CI, release, and test/fixture updates
