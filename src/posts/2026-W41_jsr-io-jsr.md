---
date: 2026-10-11
repo: jsr-io/jsr
period: weekly
slug: 2026-W41
period_label: "Oct 5–11, 2026"
size: L
title: "JSR modernizes its server stack with Axum and Hyper 1"
excerpt: "The week centered on a major router migration to Axum/Hyper 1 plus broad dependency upgrades across docs, highlighting, and storage."
commits: 2
---

### **Server stack modernized**
JSR’s routing layer was migrated from routerify to axum 0.8 with hyper 1, replacing the old API routing setup with Axum-style `{param}` routes and a new local `RequestExt` helper backed by request extensions. This is the week’s biggest infrastructure change and removes the routerify dependency entirely.

### **Dependency refresh across core subsystems**
A broader upgrade pass touched the docs, syntax highlighting, and storage paths. `reqwest` gained streaming support, S3 handling moved from `rust-s3` to `rusty-s3`, and the docs/highlighting stack was updated to newer `deno_doc`, `comrak`, and `tree-sitter-highlight` versions. The source-view highlighter was adjusted to write into a `String`, alongside lockfile and toolchain updates required by the new baseline.

### Other misc changes
- Added `From<std::fmt::Error>` conversion for API errors.
- Minor internal tweaks to package/docs/error handling to fit the dependency changes.
