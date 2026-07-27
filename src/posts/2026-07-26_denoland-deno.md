---
date: 2026-07-26
repo: denoland/deno
size: M
title: "Deno desktop and Node compat get notable fixes"
excerpt: "Desktop navigation events, node:test tags, and web stream interop were improved; Laufey was also bumped to 0.6.1."
commits: 4
authors: [littledivy, bartlomieju]
commit_authors: {"34c4661": littledivy, "bec84a0": bartlomieju, "39cc464": bartlomieju, "dc80b47": littledivy}
---

### **Desktop now exposes page-load events and fixes HMR URL parsing** (34c4661)
Deno Desktop now surfaces a `load` event on `BrowserWindow` and forwards completed navigation as a `pageLoad` event, which also preserves the initial hidden-window reveal behavior on first load. The same change strips ANSI codes from framework dev-server output so colored HMR URLs can be parsed correctly.

### **node:test gains tag filtering support** (bec84a0)
`node:test` now accepts experimental `testTagFilters`, normalizes a single string into an array, validates the filter types, and emits the one-time experimental warning when tags are used. Test contexts also carry canonical tags through parent/child suites so tag inheritance and filtering work consistently.

### **Web stream and Node stream interop is tightened** (39cc464)
Node compat for streams was expanded to handle real web `TransformStream`s in `eos`, unwrap `ArrayBuffer`/`SharedArrayBuffer` writes for non-object-mode writable streams, and wire abort handling into web stream controllers. That improves behavior for `addAbortSignal` and other stream bridges that previously could fail with awkward type errors.

### Other misc changes
- Bumped `laufey` to 0.6.1 and updated the desktop ABI guard/checksum pins (dc80b47)
