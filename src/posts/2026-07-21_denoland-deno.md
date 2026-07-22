---
date: 2026-07-21
repo: denoland/deno
size: L
title: "Security hardening and UTF-16 fix"
excerpt: "Deno tightened multiple symlink-sensitive filesystem paths, fixed diagnostic columns for UTF-16 text, and hardened prompt rendering against bidi spoofing."
commits: 8
authors: [nathanwhit]
commit_authors: {"3f46264": nathanwhit, "d48d5a4": nathanwhit, "4e5de66": nathanwhit, "9ec3275": nathanwhit, "bee9c4c": nathanwhit, "81161b9": nathanwhit, "8b51f1a": nathanwhit, "61057f6": nathanwhit}
---

### **Fix diagnostics to respect UTF-16 source columns** (3f46264)
Deno now interprets runtime and TypeScript diagnostic positions as UTF-16 code-unit offsets, which matches what V8 and TypeScript report. This fixes misaligned underlines and incorrect source locations for non-BMP characters like emoji.

### **Harden temp `node_modules` creation against unsafe parent paths** (bee9c4c)
Temporary `node_modules` setup now validates the temp root and dated directories before use, checks ownership and permissions on Unix, and falls back to a fresh temp directory if the preferred layout is unsafe. This closes off symlink and permissive-directory tricks that could redirect cleanup or writes outside the intended temp tree.

### **Reject symlinked npm materialization destinations** (9ec3275)
Package hard-link/copy materialization now refuses symlinked destination directories instead of treating them like real directories. That prevents package files from being written through redirected paths.

### **Make native addon extraction use a dedicated cache dir** (8b51f1a)
Native addons extracted from embedded runtimes are now written into a validated, owner-only cache directory instead of the general temp dir with deterministic filenames. The loader also rejects reused files that are symlinks, mismatched, or owned by another user, reducing the risk of path hijacking.

### **Escape bidi and invisible control marks in permission prompts** (61057f6)
Permission prompts now visibly escape bidirectional formatting marks and other zero-width/invisible Unicode controls instead of rendering them directly. This prevents labels from being visually reordered or spoofed in security-sensitive prompts.

### Other misc changes
- Fixed Web Streams adapter error handling for Node stream polyfills (d48d5a4)
- Rejected symlinked `node_modules` and `.deno` cleanup roots in `deno clean` (4e5de66)
- Prevented npm lock poll updates from following symlinks (81161b9)
