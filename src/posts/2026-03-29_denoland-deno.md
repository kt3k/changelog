---
date: 2026-03-29
repo: denoland/deno
size: M
title: "LSP auto-imports now honor import map aliases"
excerpt: "Deno’s LSP now suggests meaningful import map aliases for local directories instead of falling back to relative paths."
commits: 1
authors: [bartlomieju]
commit_authors: {"af49b5b": bartlomieju}
---

### **LSP auto-imports keep alias mappings for local dirs** (af49b5b)
Deno’s import resolution logic was narrowed so auto-import completions no longer suppress meaningful aliases like `@app/` just because the referrer lives inside the mapped directory. This fixes suggestions such as `@app/islands/components/Button.tsx` instead of a less useful relative path, improving DX for projects that rely on alias-based import maps.

### Other misc changes
- Added regression coverage for alias-based auto-imports inside mapped directories.
- Refactored import-map lookup behavior to distinguish diagnostics from completion-time suggestions.
