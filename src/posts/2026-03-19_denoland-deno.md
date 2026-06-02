---
date: 2026-03-19
repo: denoland/deno
size: L
title: "Timer refactor, WebCrypto P-521, and compat fixes"
excerpt: "Major timer architecture cleanup plus P-521 WebCrypto support, Node compat fixes, and an HTTP telemetry enhancement."
commits: 13
authors: [bartlomieju, joshvfleming, dsherret, denobot]
commit_authors: {"391a2c8": bartlomieju, "756d5d9": joshvfleming, "8ab268c": bartlomieju, "24dd077": bartlomieju, "b82edaf": dsherret, "af16b8a": bartlomieju, "c436b5f": bartlomieju, "b3e93cf": bartlomieju, "8fa9085": denobot, "42eb6ab": bartlomieju, "a2a7955": bartlomieju}
---

### **Web timers now ride on Node's Timeout implementation** (391a2c8)
Deno's WHATWG timer layer was refactored to build `setTimeout`/`setInterval` on top of Node's `Timeout` class instead of maintaining a separate web-timer registry. This removes duplicated timer bookkeeping and keeps web timers aligned with the core timer implementation while preserving WHATWG nesting-depth behavior.

### **WebCrypto gains full P-521 sign/verify and ECDH support** (24dd077)
P-521 curve support is now complete for WebCrypto: key generation/import/export already existed, and this fills in sign, verify, and key derivation. It also handles short digests by left-padding them for P-521's field-size requirements, closing a long-standing gap for users relying on secp521r1.

### **HTTP metrics can now inherit span attributes like `http.route`** (af16b8a)
The HTTP server now copies relevant attributes from the request span into telemetry data before the request external is invalidated, allowing metrics to reflect values like `http.route`. That makes HTTP metrics more useful and more aligned with tracing data in frameworks that annotate spans.

### **Node HTTP keep-alive close ordering fixed** (756d5d9)
The client keep-alive path now emits request `close` before socket `free`, matching Node's lifecycle ordering. This prevents per-request socket listeners from leaking across reused sockets and avoids `MaxListenersExceededWarning` / premature-close failures under load.

### **Node events and readline compatibility improved** (c436b5f)
`readline.pause()` / `resume()` now correctly throw after close, and `events.listenerCount()` now works with `EventTarget` objects. The `events.on()` async iterator also gained backpressure-aware watermark handling and better cleanup semantics, improving compatibility with newer Node patterns.

### **DNS module compatibility tightened** (a2a7955)
The DNS polyfill now respects `--dns-result-order` from `NODE_OPTIONS`, avoids the `punycode` deprecation path, and trims stack frames more like Node. It also exposes a few internal/testing hooks and error aliases needed by Node-compat test suites.

### **AES CBC/ECB key and IV validation added** (42eb6ab)
Cipher construction now validates key and IV lengths up front for AES-128 CBC/ECB and AES-192/256 ECB modes. That brings these paths in line with the rest of the crypto API and produces earlier, clearer errors for invalid inputs.

### **Flamegraph SVG now fills the viewport** (8a5a704)
The CPU profiler flamegraph no longer uses a fixed pixel height that could constrain width in the browser. The SVG now renders to the full viewport instead of leaving empty space on the right.

### **Global install now uses JSR package lockfiles** (b82edaf)
Global installs gained support for lockfiles from JSR packages, with safeguards to ignore lockfiles that pull from non-npm registries. This improves reproducibility for JSR-based installs while avoiding unsafe lockfile reuse.

### **Test runner timeout behavior hardened** (8ab268c)
WPT test execution now has a per-file timeout so the runner can move on even if a server hangs during bundle generation or fetches. The CI job timeout for that workflow was also reduced substantially to better fail fast on stuck runs.

### **Contributing guidelines updated** (b3e93cf)
The project updated contributor guidance and the PR template, mostly to set expectations for AI-assisted submissions.

### **Version bump to 2.7.7** (8fa9085)
Release metadata and Cargo manifests were bumped for the 2.7.7 cut.

### Other misc changes
- Timer refactor follow-up cleanup and sanitizer expectation updates
- Various internal Node polyfill/test harness adjustments
