---
date: 2026-07-05
repo: oven-sh/bun
size: L
title: "TypeScript 6 templates and build-order upgrades"
excerpt: "Bun updates init templates for TypeScript 6 and lands major build-order, Fetch header, CSS color, and console safety fixes."
commits: 11
authors: [robobun, Jarred-Sumner, alii]
commit_authors: {"d37f520": robobun, "26d9db3": Jarred-Sumner, "455efaa": robobun, "bb49700": robobun, "95ff5a0": robobun, "b8e7a95": robobun, "c76d6b2": robobun, "d9b2811": alii}
---

### **Build now traces and reuses symbol order files more robustly** (c76d6b2, b8e7a95, 26d9db3, 455efaa)
Bun’s build pipeline now has a first-class order-file flow: release builds trace, relink, and verify the order file; canary builds inherit a prior one; and builds can bootstrap when there’s nothing to inherit. The tracing work also expanded to interactive PTY workloads and fixed child processes from clobbering the trace, which should make the optimization much more complete and reliable on Linux.

### **Fetch and Bun.serve now combine duplicate headers correctly** (d9b2811)
Duplicate non-common headers are now joined with `, ` instead of silently keeping only the last value, matching the Fetch spec and Node/undici behavior. That affects both request parsing in `Bun.serve` and response/header handling in fetch paths, so callers stop losing earlier header values.

### **Console.write now throws instead of crashing on bad `this`** (bb49700)
`console.write` now validates its receiver and throws `ERR_INVALID_THIS` when called with a non-object `this`, rather than hitting a segfault/assertion. This closes a real crash found by fuzzing and makes the API fail safely like other builtins.

### **CSS color fallback preserves boundary colors** (95ff5a0)
The `lab()`/`oklab()` sRGB fallback now clips boundary colors directly when the clipped result is already within the just-noticeable-difference threshold. This fixes visible desaturation on saturated blues and brings Bun’s color output closer to CSS Color 4 expectations.

### **Template init now pins TypeScript 6 everywhere** (d37f520)
All `bun init` templates now declare TypeScript 6 instead of drifting on TypeScript 5 or whatever `latest` resolves to. That makes fresh projects more predictable and avoids surprise compiler version jumps as the ecosystem moves forward.

### Other misc changes
- Unmark flaky lab round-trip color test as failing.
- Fix flaky OOM assertion in TLS syscall fault test.
- Document pinned `ArrayBuffer.transfer()` copy behavior.
