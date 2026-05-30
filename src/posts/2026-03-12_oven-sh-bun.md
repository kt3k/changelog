---
date: 2026-03-12
repo: oven-sh/bun
size: M
title: "Docs plus three bug fixes land"
excerpt: "Bun adds TOML docs and fixes JSONL offsets, stat precision, and WebSocket protocol corruption."
commits: 4
authors: [robobun, Jarred-Sumner]
commit_authors: {"2dae33e": robobun, "c63ff6f": Jarred-Sumner, "a305e99": robobun, "51ca482": robobun}
---

### **Document Bun.TOML and add it to runtime docs** (2dae33e)
Bun now has dedicated TOML runtime documentation, including `Bun.TOML.parse()` examples and coverage notes for TOML v1.0 features. The API is also linked from the runtime navigation so it’s easier to discover alongside JSON5/YAML parsing.

### **Fix `Bun.JSONL.parseChunk()` offsets for string input** (c63ff6f)
`start` and `end` are now honored for string inputs, matching the typed-array behavior that already existed. This fixes error-recovery loops that depended on advancing through malformed JSONL without getting stuck reprocessing the same chunk.

### **Preserve sub-millisecond precision in `fs.stat` times** (a305e99)
The non-BigInt `*Ms` fields now keep fractional milliseconds instead of truncating to whole milliseconds. That brings Bun closer to Node.js behavior and avoids losing timestamp precision in real filesystem workflows.

### **Fix WebSocket protocol string corruption after upgrade** (51ca482)
`WebSocket.protocol` is now cloned into owned storage instead of pointing at the upgrade response buffer. This prevents later frame reads from overwriting the negotiated subprotocol string exposed to JavaScript.

### Other misc changes
- Docs navigation update for TOML
- Type definitions updated for `Bun.JSONL.parseChunk()` string offsets
- Regression tests added for JSONL offsets, stat precision, and WebSocket protocol stability
