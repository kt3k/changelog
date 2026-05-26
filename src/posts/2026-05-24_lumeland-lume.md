---
date: 2026-05-24
repo: lumeland/lume
size: M
title: "Faster incremental builds in watch mode"
excerpt: "Sample article. The dev server now rebuilds only the pages affected by a change."
commit_count: 9
---
> **Sample issue** for layout/testing. Replace with real output via `deno task digest`.

### **Watch mode rebuilds only affected pages (3f1c9aa)**
The dev server now tracks per-page dependencies and rebuilds just the pages
touched by a change instead of the whole site. On large sites this turns
multi-second reloads into near-instant ones.

### **Fix `base_path` double-prefixing on absolute URLs (7b2e004)**
URLs that already included the site's base path were being prefixed twice when
deployed under a subdirectory. Links now resolve correctly on project pages.

### Other misc changes
- Bump `std` dependencies (2 commits)
- Tidy internal logging output (1 commit)
- Docs: clarify the `url` filter behavior (2 commits)
