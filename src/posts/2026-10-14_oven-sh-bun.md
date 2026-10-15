---
date: 2026-10-14
repo: oven-sh/bun
size: L
title: "Major formatter, lint, and checker updates"
excerpt: "Bun shipped a large formatter comment-model rewrite, lint de-duplication improvements, type-checker fixes, and a new install/package-manager consolidation."
commits: 10
authors: [Jarred-Sumner, dylan-conway, sosukesuzuki, robobun]
commit_authors: {"8ed8256": dylan-conway, "9510e74": Jarred-Sumner, "f841e36": Jarred-Sumner, "47ba1c8": Jarred-Sumner, "e40a58a": Jarred-Sumner, "408c937": sosukesuzuki, "bfd957f": Jarred-Sumner, "3da4e25": robobun, "177da66": Jarred-Sumner, "3d6c7bc": Jarred-Sumner}
---

### **Formatter comment ownership rewritten** (f841e36)
`bun fmt` now attaches every comment to exactly one node up front, matching Prettier’s model instead of deciding ownership during printing. That’s a substantial internal refactor that should make comment handling more predictable and unblock a class of comment-related bugs.

### **Package-manager changes consolidated for Bun 1.5** (9510e74)
Bun folded 597 open package-manager PRs into one reviewed change, with broad updates across install docs, completions, and lockfile-related plumbing. This is a major release-management and behavior-consolidation step rather than a small tweak.

### **Socket reads no longer starve timers** (8ed8256)
A peer that keeps a socket’s receive buffer nearly full could previously keep Bun stuck in the read loop and stop timers/immediates from running. The fix restores event-loop fairness across POSIX sockets used by `Bun.connect`, `node:net`, and `node:http`.

### **Type-aware lint rules stop double-reporting** (47ba1c8)
`bun lint --type-aware` now suppresses duplicate diagnostics when both a syntax-only rule and its type-aware counterpart match the same problem. This improves signal quality immediately for overlapping rule sets like `require-await`.

### **`bun check` fixes a hang and loop-related misses** (e40a58a)
The checker now handles a hang in inference and several TypeScript disagreement cases involving loops, including errors found while a loop is analyzed and false positives around flow. These changes materially improve correctness for real-world code that exercises control flow and inference.

### **Headers iteration gets cheaper** (408c937)
`Headers` iteration was streamlined to avoid extra lookups and string allocations per header name. That should improve common adapter-style header copying and iteration paths, with new benchmarks and tests covering the behavior.

### **CSS minifier preserves translate/rotate/scale** (3da4e25)
The CSS transform minifier no longer drops or incorrectly merges standalone `translate`, `rotate`, and `scale` declarations around `transform`. This fixes visible output corruption in a core formatting/minification path.

### **`bun lint` type-aware parity tightened** (bfd957f, 177da66)
A broad set of type-aware lint rules was adjusted to better match tsgolint/TypeScript behavior, especially around parentheses, unions, optional chains, and other AST edge cases. This is mostly correctness work, but it’s spread across many rules and test cases, so it meaningfully improves lint fidelity.

### **`bun lint` and `bun fmt` now honor nearer config files** (3d6c7bc)
Both tools can now discover the nearest relevant `bunfig.toml` from a subdirectory instead of only reading the working directory, making project-local config resolution more intuitive. The same change also adds Svelte formatting support and clarifies oxlint-disable behavior in docs.

### Other misc changes
- Docs and completion updates for new install/lint/format options.
- `bun lint` duplicate-rule and redundant-parentheses follow-ups.
- Small internal refactors in lint/sema utilities.
- Dependency/lockfile metadata bumps and cleanup.
