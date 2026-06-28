---
date: 2026-06-27
repo: microsoft/typescript-go
size: M
title: "Release plumbing shifts for native preview"
excerpt: "Release scripts, packaging, and CI were updated to support publishing the native preview package in more flexible ways."
commits: 1
authors: [jakebailey]
commit_authors: {"f7c4664": jakebailey}
---

**Release pipeline now supports alternate native package flavors** (f7c4664)
The release script was refactored to make the native-preview publish flow configurable, including a switchable package name, version override, and npm tag selection logic. It also adds stricter guards so release-mode publishing won’t proceed unless the expected versioning and VSIX settings are in place.

**Packaging and platform handling were expanded** (f7c4664)
Native preview packaging now distinguishes the binary entrypoint layout more cleanly, and the release tooling gained broader OS/arch typing to cover more target combinations. This is groundwork for shipping the package with fewer hardcoded assumptions.

**CI now checks native-preview platform coverage** (f7c4664)
The main CI workflow gained a new `native-preview:check-platforms` step to validate platform support as part of the daily build. That helps catch packaging regressions before release artifacts go out.

### Other misc changes
- Dprint ignore updated for the native-preview binary path
- Small utility and package metadata updates
- Lockfile refreshed
