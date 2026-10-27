---
date: 2026-10-26
repo: oven-sh/bun
size: M
title: "bun install quiets .env traces; lint gets broader fixes"
excerpt: "Installer .env loading is less noisy, bunx handles more native bin links, and linting works correctly for TS plugin ASTs."
commits: 4
authors: [robobun, Jarred-Sumner]
commit_authors: {"1341090": robobun, "5734941": Jarred-Sumner, "3396aea": robobun}
---

### **Hide .env load traces unless verbose** (1341090)
`bun install` and related commands no longer print the loaded `.env` file line by default; it now stays hidden under `--quiet`/`--silent` and only appears with `--verbose`. The change also distinguishes file-load tracing from error output, so the noisy timing-style message no longer leaks into normal installs.

### **bunx resolves native dependency bin links in more cases** (5734941)
`bunx` now recognizes more of the installer’s native-dependency bin linking behavior on macOS and Linux, including follow-up cases around optional dependencies and platform packages. That fixes command resolution for native packages whose `.bin` entry points are linked into their platform-specific installs.

### **JS lint plugins now see `start`/`end` on TS ASTs without a config** (3396aea)
When linting TypeScript files with only `bunfig.toml`, JavaScript plugins now get `start` and `end` on nodes, tokens, and comments instead of having to rely on `range`/`loc`. This fixes rules that compare positions and were silently misfiring on TS files.

### **Other misc changes**
- `bun lint` behavior was aligned with release builds and related docs/hints were updated.
- Lint config merging was adjusted for oxlint rule aliases.
- Small internal/test/documentation updates across lint and build scripts.
