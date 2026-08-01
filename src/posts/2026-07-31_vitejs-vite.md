---
date: 2026-07-31
repo: vitejs/vite
size: M
title: "Rolldown bumps and shebang fixes"
excerpt: "Dependency updates landed alongside a fix for hashbangs with uncommon line terminators and a new assetsInclude regression test."
commits: 4
authors: [sapphi-red]
commit_authors: {"e6b6b16": sapphi-red, "17f7b2f": sapphi-red, "9cbeecb": sapphi-red}
---

### **Shebang parsing now handles uncommon line terminators** (17f7b2f)
Vite’s config loading now correctly detects hashbang offsets even when the first line ends with CRLF, CR, or Unicode line separators. That prevents injected variables and path handling from breaking on config files with nonstandard line endings.

### **Rolldown-related dependency updates** (7ac6f7f)
The repo bumps several rolldown ecosystem packages and adjusts CI to use Node 24 for builds while preserving Node 20 for test runs. This keeps the toolchain aligned with upstream changes and avoids build/test skew.

### **AssetsInclude now covers relative-path patterns in the playground** (9cbeecb)
The assets playground adds coverage for unknown extensions, `?inline`, and a relative `assetsInclude` glob, including a cwd adjustment to match how Vite resolves those patterns. This locks down an easy-to-miss asset resolution edge case.

### Other misc changes
- Docs refactor: extracted a `VersionsList` component for supported versions display (e6b6b16)
- Minor package/version bumps and lockfile refreshes
- Test fixture and workflow adjustments
