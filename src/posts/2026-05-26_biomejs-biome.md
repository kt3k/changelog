---
date: 2026-05-26
repo: biomejs/biome
size: M
title: "Markdown, CSS, and linting fixes land"
excerpt: "Notable fixes for optional-chain linting, SCSS map comments, and markdown list parsing; a couple of docs and dependency bumps round out the day."
commits: 6
authors: [sjh9714, dfedoryshchev, jfmcdowell, denbezrukov]
commit_authors: {"1948b72": sjh9714, "0c718da": dfedoryshchev, "496a796": jfmcdowell, "a1633d8": denbezrukov}
---

### **Optional-chain lint now catches inequality guards** (1948b72)
The `useOptionalChain` rule now recognizes negated guards paired with strict/loose inequality comparisons like `!foo || foo.bar !== "x"`, so it can suggest optional chaining in more real-world patterns. This closes a linting gap that previously missed a valid transformation.

### **SCSS map comments preserve trailing-comma layout better** (a1633d8)
The SCSS formatter got a substantial comment-handling overhaul for map expressions, including leading, closing, separator, and include comments around map pairs. It also updated trivia handling across formatters, which should make SCSS map output more stable and keep comment placement consistent.

### **Markdown parser keeps blank-line separators inside list items** (496a796)
Markdown list parsing was adjusted so blank lines between list items stay attached to the preceding item, matching CommonMark expectations more closely. This affects parsing, CST invariants, and several formatter snapshots for nested and separated lists.

### Other misc changes
- Fixed the `noUntrustedLicenses` diagnostic text and snapshots (0c718da).
- Updated `tombi` to v0.11.7 and `jiff` to 0.2.27 (f6e6a40, e174a1d).
