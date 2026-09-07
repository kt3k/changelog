---
date: 2026-09-06
repo: oven-sh/bun
period: weekly
slug: 2026-W36
period_label: "Aug 31 – Sep 6, 2026"
size: L
title: "Bun hardens bundling, streams, and build reproducibility"
excerpt: "Major bundler correctness fixes, better stream/error handling, and a reproducible source build for Bun’s core deps landed this week."
commits: 160
---

### **Bundler correctness got a major overhaul**
Bun spent the week tightening CommonJS/ESM interop, split-chunk printing, symbol renaming, tree-shaking, and hash naming. Fixes landed for lifted CommonJS exports, namespace writes, dynamic imports, re-exported namespaces, hoisted-var collisions, and `#__PURE__` comment parsing, plus automatic `modulepreload` for browser splits and safer `[hash]` collision handling. These changes close several real production breakages in React apps, split bundles, and mixed module graphs.

### **Streams, fetch, and subprocess I/O are much more robust**
A cluster of runtime fixes made aborted or failing streams clean up correctly instead of hanging or leaking. `Bun.serve` now cancels unread bodies on abort/HEAD and releases streaming bodies during finalization, file streams settle on error, brotli/zstd fetch decoders fully drain flushed output, and subprocess stdio errors now propagate instead of disappearing. Bun also fixed TLS force-close behavior, worker message delivery semantics, and several `bun test --parallel` failure modes.

### **Builds and installs became safer and more reproducible**
Bun now builds JavaScriptCore, ICU, and related WebKit components from source in its normal graph by default, with prebuilt WebKit still opt-in. Compile-time bundling now fails cleanly when embedded graphs exceed platform limits, while install/prune work improved hardlink safety, workspace linking consistency, and mixed `node_modules` layout handling. The week also included lockfile corruption fixes and better handling for self-contained workspaces.

### **Compatibility and platform gaps were closed**
HTTP/2 picked up more Node-compatible behavior around session shutdown, idle connection cleanup, flow control, and headers. DNS got better rrtype support and error mapping, macOS launch-time DNS fallback was hardened, `AsyncLocalStorage` was reworked for correctness and lower overhead, and `NAPI` finalizer timing was brought closer to Node. Bun.Image also expanded image format support with HEIC and CMYK/YCCK JPEG decoding.

### **Other misc changes**
- `util.parseEnv()` numeric keys now behave like real indexed properties
- `Bun.inspect`/`console.log` property dedup became linear-time
- `bun run --filter` now shows full output by default
- CSS parser updated for newer pseudo-elements
- Various docs, CI, build-system, and test-coverage updates
