---
date: 2026-09-14
repo: denoland/deno
size: M
title: "Bash completions now generate valid newlines"
excerpt: "Deno fixes a bash completion bug that emitted escaped newlines, and adds a regression test to keep the script valid."
commits: 1
authors: [taljeon]
commit_authors: {"c8401c5": taljeon}
---

### **Bash completions fixed to emit real newlines** (c8401c5)
The CLI completion generator no longer writes `\n` escapes into the bash script; it now emits actual newline characters in the subcommand case entries and fallback branch. This fixes invalid completion output for bash users and is backed by a new regression test.

### Other misc changes
- None
