---
date: 2026-04-13
repo: denoland/deno
size: L
title: "PR upgrades, Linux build fix, Windows fs bug"
excerpt: "Deno adds PR-based upgrades, restores older-glibc Linux compatibility, and fixes a Windows writeFileSync corruption bug."
commits: 4
authors: [bartlomieju, JimmyBowcott]
commit_authors: {"3875093": JimmyBowcott, "ba1ed29": bartlomieju, "6ef6695": bartlomieju, "4a6e8b3": bartlomieju}
---

**Install Deno directly from a pull request** (ba1ed29)
`deno upgrade` can now take `pr <number>` and fetch a binary from a PR’s CI artifacts via the GitHub CLI. This is a big workflow upgrade for testing unreleased changes locally, with support for dry runs, custom output paths, and `#12345` shorthand.

**Restore Linux release compatibility with older glibc** (6ef6695)
The release build now works again on systems with glibc older than 2.27, including older AWS Lambda and Fedora environments. Deno adds a small C shim and linker wraps around several math functions so binaries no longer pick up newer `GLIBC_2.27` symbols.

**Fix Windows `writeFileSync('wx')` data-loss bug** (4a6e8b3)
`node:fs.writeFileSync` on Windows no longer spuriously throws `EEXIST` with an OS error 0 message, and it no longer truncates an existing file before failing. The fix tightens the open-option mapping so exclusive creation and truncation don’t conflict on Windows.

**Add Prism support for JSX/TSX doc blocks** (3875093)
The built-in doc generator now highlights JSX/TSX code blocks correctly. This improves rendered documentation for TypeScript/React examples and fixes long-standing highlighting gaps.

### Other misc changes
- Upgrade CLI help/flag parsing updates to support PR installs
- Added/updated upgrade tests for PR input handling
- Doc syntax highlighter bundle refreshed to Prism 1.30.0
