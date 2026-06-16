---
date: 2026-06-15
repo: biomejs/biome
size: M
title: "Two lint fixes, rest are dependency churn"
excerpt: "Biome tightened two JavaScript lint rules and spent the rest of the day on routine dependency and workflow updates."
commits: 11
authors: [Netail]
commit_authors: {"aa0a6eb": Netail, "d8c3e87": Netail}
---

### **useErrorCause now handles shorthand `cause` properties** (d8c3e87)
The `useErrorCause` rule was fixed to recognize `cause` when it appears as a shorthand object property, not just a normal property assignment. That closes a false-negative gap in error-cause detection and should improve autofix/diagnostic accuracy in real code.

### **useInlineScriptId now trims trivia before checking `id`** (aa0a6eb)
The `useInlineScriptId` rule now uses trimmed token text when collecting JSX attribute names, so whitespace/trivia no longer hides an existing `id` attribute. This prevents false positives for inline `next/script` usage.

### Other misc changes
- Removed stale links from docs/snapshots/readmes.
- Dependency bumps: smallvec, insta, regex, prettier, pnpm, @types/node.
- Updated GitHub Actions workflow versions and a Rust Docker image digest.
