---
date: 2026-11-25
repo: vitejs/vite
size: M
title: "Vite beta update with CSS and dev-server fixes"
excerpt: "Beta release plus a CSS dedupe fix and tighter dev-server file reference handling under extended fs strictness."
commits: 4
authors: [sapphi-red, hyfdev]
commit_authors: {"1b34d86": hyfdev, "a78fb8a": sapphi-red}
---

### **CSS from inlined common chunks is deduped** (1b34d86)
Vite now emits shared CSS only once when `cssCodeSplit: false` and Rolldown inlines common chunks. This fixes duplicate rules in single-file CSS output and preserves the expected override order.

### **Dev server reference tracking is restricted to extended fs strictness** (a78fb8a)
File and worker references are now registered as safe modules only when `server.fs.strict: 'extended'` is enabled. That narrows the exposure surface while still allowing the dev server to serve assets referenced by client entries outside the normal fs allowlist.

### Other misc changes
- Release: v8.4.0-beta.2
- Security docs clarification for referenced files
- CHANGELOG/package version bump
