---
date: 2026-06-29
repo: denoland/std
size: M
title: "Nightly CI lands; YAML emoji fix"
excerpt: "Adds scheduled Deno canary/stable CI, updates YAML to preserve emoji, and refreshes tests for Deno v2.9."
commits: 5
authors: [bartlomieju, minato32, dsherret]
commit_authors: {"cac00a1": bartlomieju, "6d5aea1": minato32, "e28fa81": dsherret, "f0431c2": bartlomieju}
---

### **Nightly CI now runs daily on stable and canary** (cac00a1)
A new scheduled workflow runs the full test, lint, and format suite every day against stable v2.x and canary Deno, helping catch runtime regressions even when no PRs or pushes are landing. On failure, it opens or updates a tracking issue and pings @bartlomieju so breakages don’t sit unnoticed.

### **YAML stringification now keeps astral characters literal** (e28fa81)
The YAML dumper now iterates by Unicode code point instead of UTF-16 code unit, so emoji and other astral characters are treated as printable characters rather than surrogate halves. That means strings like `🐱` are emitted literally instead of being escaped, matching the updated test expectations.

### **Tests and helpers updated for Deno v2.9** (f0431c2)
Several tests were relaxed or adjusted to account for runtime behavior and interface changes in newer Deno releases, including the addition of `Deno.TestContext.assertSnapshot` and version-dependent crypto error text. This keeps the suite compatible as Deno evolves.

### Other misc changes
- Speeded up `ProgressBarStream` tests by removing randomized delays and using a short fixed interval (6d5aea1).
- Updated `actions/checkout` to v7 across CI and release workflows (094f127).
