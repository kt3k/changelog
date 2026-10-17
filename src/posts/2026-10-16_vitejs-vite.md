---
date: 2026-10-16
repo: vitejs/vite
size: S
title: "HMR tests now account for bundled dev gaps"
excerpt: "Vite’s HMR playground tests were reorganized to mark bundled-dev limitations explicitly, while docs update the development tools list."
commits: 2
authors: [h-a-n-a, btea]
commit_authors: {"df7503c": h-a-n-a, "74ae709": btea}
---

### Other misc changes
- HMR playground tests were refactored to use explicit bundled-dev skip/todo helpers instead of inline comments, making known limitations clearer in the suite (df7503c).
- Backend integration HMR coverage was split so the CSS base-path assertion is only checked where bundled dev actually exposes a `<link>` tag (df7503c).
- Docs: replace `eslint` with `oxlint` in the development tools acknowledgements list (74ae709).
