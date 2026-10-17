---
date: 2026-10-16
repo: oven-sh/bun
size: L
title: "Bun lands a major Bake and bindgen shakeup"
excerpt: "Bake sheds React-specific core behavior and gets config fixes, while bindgen and YAML parsing gain substantial safety and API improvements."
commits: 23
authors: [dylan-conway, alii, Jarred-Sumner, robobun, sosukesuzuki]
commit_authors: {"d7562f2": dylan-conway, "0b2d346": alii, "b28212a": alii, "f0e4f6b": dylan-conway, "f8bc171": Jarred-Sumner, "d940fbe": dylan-conway, "25411ea": Jarred-Sumner, "0a2f1c8": dylan-conway, "5866b5f": alii, "288aca3": alii, "4b1681a": alii, "8ba82c3": Jarred-Sumner, "e4c638f": alii, "86da172": alii, "6ffebec": Jarred-Sumner, "0663016": robobun, "f14a5a6": Jarred-Sumner, "e6f65f3": Jarred-Sumner, "af5743d": dylan-conway, "792368f": Jarred-Sumner, "f2405c3": sosukesuzuki}
---

### **Bake core drops React Server Components behavior** (4b1681a)
Bun’s core Bake path no longer carries `use server`, `--server-components`, or `bun:app` behavior; frameworks are now expected to provide that layer themselves. This removes crashy parser/server paths and trims a large amount of Bake-specific core code.

### **One bindgen generator now powers more Bun APIs** (af5743d)
The bindings pipeline was consolidated into a single generator that handles functions and classes, replacing both bindgen v1 and v2. That’s a major internal refactor that should make future Rust/JS binding work more consistent and easier to extend.

### **YAML.parse now defers key stringification safely** (d7562f2)
`Bun.YAML.parse` no longer stringifies sequence/mapping keys while it is still walking the input tree. That closes a class of input-lifetime and mutation hazards, especially when the source comes from typed arrays or `ArrayBuffer`s.

### **HTTP/2 fetch gets hang fixes for TLS alerts and idle sessions** (792368f)
Two long-hanging cases in experimental HTTP/2 fetch are fixed: fatal TLS alerts after handshake now fail requests correctly, and idle sessions are handled more aggressively, including liveness-PING-aware cleanup. This should reduce “stuck” origins that poison later requests.

### **Install is more compatible with pnpm-style symlinks** (f8bc171)
`bun install` now replaces files at command names even when `node_modules` is symlinked, avoiding `EEXIST` failures on pnpm layouts. This restores installs for projects that were previously breaking on link conflicts.

### **Compile cache stops paying the bytecode optimizer tax** (0663016)
Bun no longer runs the JSC bytecode optimizer when writing compile-cache entries. That trims cache-write latency, which had regressed noticeably for larger modules.

### **bunx and bun install behavior is clarified and tightened** (e6f65f3)
Package-manager behavior got a broad round of regressions and bug fixes, including lockfile stability, protocol handling, trust/lifecycle rules, and clearer install semantics. The changes also make `bunx`’s registry refresh and fallback behavior more predictable.

### Other misc changes
- Bake bug fixes for plugin cleanup, `ignoreDirs` parsing, and a router crash (0b2d346)
- Bindgen gains `SharedArrayBuffer` support and `Bun.indexOfLine` binding cleanup (0a2f1c8)
- `bun lint` / `bun fmt` / `bun check` fixes and docs updates (25411ea)
- `bun lint` type-aware lookup now requests types on demand (f14a5a6)
- `bun lint` warns on huge tsconfig coverage when `include` is missing (6ffebec)
- WebKit bumps and runtime maintenance updates (d940fbe, f2405c3)
- Mordant / CI baseline bumps and a small promise cleanup (288aca3, e4c638f, 86da172, 5866b5f)
- Bake code move into folders without behavior change (b28212a)
- Window-dressing/test fixes, docs tweaks, and install-message polish (f0e4f6b, 8ba82c3)
