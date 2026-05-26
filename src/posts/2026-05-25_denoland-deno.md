---
date: 2026-05-25
repo: denoland/deno
size: M
title: "Faster cold starts and a safer permissions prompt"
excerpt: "Sample article showing the digest format. Delete once the daily job has generated real issues."
commits: 14
---
> **Sample issue.** This file shows what the generator produces. Run
> `deno task digest` (or let the GitHub Action run) to replace it with real ones.

### **Startup latency cut by ~18% (a1b2c3d)**
The module graph is now resolved lazily for entrypoints that don't touch the
network, shaving a noticeable chunk off cold starts for small scripts. Matters
most for short-lived CLI tools and serverless invocations.

### **Permission prompts now show the requesting module (e4f5a6b)**
Interactive `--allow` prompts include the module path that triggered the
request, making it harder to grant access to the wrong code. A small but real
supply-chain hardening win.

### Other misc changes
- Dependency bumps (4 commits)
- CI: pin the macOS runner image (2 commits)
- Docs and typo fixes across the std docs (3 commits)
- Internal test refactors (3 commits)
