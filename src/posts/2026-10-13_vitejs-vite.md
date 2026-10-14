---
date: 2026-10-13
repo: vitejs/vite
size: M
title: "Rolldown bumps and env fixes"
excerpt: "Rolldown-related dependency updates landed alongside a bundled-dev env object fix and test adjustments for bundled dev."
commits: 4
authors: [h-a-n-a]
commit_authors: {"726aca5": h-a-n-a, "6019aa7": h-a-n-a}
---

### **Bundled dev now exposes user `import.meta.env.*` defines** (6019aa7)
The define plugin now includes user-defined `import.meta.env.*` entries in the `import.meta.env` object for bundled builds, not just standard build mode. This fixes bundled-dev parity for apps that rely on custom env defines.

### **Rolldown-related dependency updates** (43f0d05)
Several rolldown-adjacent packages were bumped, including `rolldown`, `tsdown`, and `rolldown-plugin-dts`, with a large lockfile refresh. This is mostly maintenance, but it keeps the build toolchain aligned with the latest patch releases.

### **Bundled-dev SSR playground tests adjusted** (726aca5)
The environment-react-ssr playground test was reworked to use bundled-dev-specific skip helpers and to split client/server dependency reload checks. This reflects current bundled-dev limitations more accurately and makes the test expectations explicit.

### Other misc changes
- Dependency bumps across package manifests and templates, plus workflow action updates (pnpm/setup, create-github-app-token, semgrep image).
- CI/build workflow maintenance in multiple GitHub Actions files.
- Test-only tweak in the environment-react-ssr playground.
