---
date: 2026-06-05
repo: denoland/deno
size: L
title: "Deno adds HTTP/1, crypto, and LSP upgrades"
excerpt: "Major runtime work landed: a Deno-owned HTTP/1.1 serve path, crypto/WebCrypto modern-algorithms support, and substantial LSP improvements."
commits: 79
authors: [divybot, bartlomieju, crowlbot, nathanwhitbot, nathanwhit, crowlKats, igorbdl, fallintoplace, magurotuna]
commit_authors: {"3859156": bartlomieju, "6475783": nathanwhitbot, "9656486": divybot, "2a930df": bartlomieju, "1472e69": divybot, "c0dfd6a": divybot, "b04ec7f": divybot, "92a7dae": nathanwhit, "b7cf076": divybot, "6f16d40": divybot, "42d7ef0": divybot, "987d01d": divybot, "1d51877": divybot, "599007c": divybot, "4a4983b": divybot, "438666d": divybot, "2aa45eb": divybot, "d8991fc": divybot, "dc2d779": bartlomieju, "3a9c991": divybot, "93d6277": divybot, "281be3e": divybot, "82cc57b": fallintoplace, "82514b5": divybot, "bb80cf8": bartlomieju, "9d8e531": divybot, "9d177ea": divybot, "7fc6ca5": divybot, "f93c548": divybot, "1ded28f": divybot, "7b251d9": divybot, "f9078c9": divybot, "4e53408": divybot, "fec485c": divybot, "0816e0d": magurotuna, "60b484b": divybot, "7e29bed": divybot, "4f54897": divybot}
---

### **Deno takes ownership of HTTP/1.1 serving** (92a7dae)
Deno now routes `Deno.serve()` HTTP/1 traffic through a new runtime-owned `libs/http_h1` path by default, keeping Hyper for HTTP/2. The change is aimed at tighter integration and lower overhead, with broad plumbing updates across fetch, HTTP handling, and response/request behavior.

### **WebCrypto gets a big modern-algorithms expansion** (c0dfd6a, b04ec7f, d8991fc, 6f16d40, 987d01d, 93d6277, 3a9c991, f93c548)
Crypto support was extended in several directions: `SubtleCrypto.supports()` landed, ML-KEM/ML-DSA gained missing JWK and seed/raw-public/raw-seed handling, ChaCha20-Poly1305 was brought in line with the modern spec, and key storage moved into Rust-backed handles. This is a major compatibility and API surface update for WebCrypto users, especially for newer post-quantum algorithms.

### **Fetch behavior and decompression were overhauled** (6475783, b7cf076, fec485c, 82cc57b, 0816e0d)
The fetch stack dropped `tower-http` decompression in favor of a local service, added bad-port blocking per the Fetch Standard, fixed empty gzip/br responses, tightened multipart parsing, and corrected forwarding of partially buffered request bodies. These changes improve standards compliance and remove a class of fetch/runtime failures.

### **The LSP got significantly more capable and faster** (82514b5, 4a4983b, 2aa45eb, 60b484b, 7e29bed, 7fc6ca5, 1d51877, 438666d, 281be3e, c16d80b)
The language server now diagnoses import maps, surfaces remap info in hovers, offers test ignore/only code actions, reports JSR fast-check diagnostics, caches lint/doc diagnostics per document, and fixes stale on-disk document handling. It also improves import-map remap suggestions and cache graph behavior, making editor feedback more accurate and responsive.

### **Compile and bundle workflows gained important fixes and features** (7b251d9, 599007c, 1472e69, 9d177ea, 1ded28f, dc2d779)
`deno compile` now supports watch mode and can prune unused npm packages from embedded snapshots, while bundling now properly instantiates `.wasm` imports and handles HTML sourcemap naming correctly. The compiler also fixes `fs.fstatSync` on virtual files and avoids panicking when esbuild is busy or unavailable.

### **Node/runtime compatibility improved in several edge cases** (2a930df, 9656486, 4f54897, 9d8e531, f9078c9, 3859156, bb80cf8, 4e53408, 42d7ef0)
Several compatibility fixes landed for Node-facing APIs: HTTP servers now notify the control socket when serving starts, workers stay alive with refed `MessagePort`s, TCP keepalive works again on native TCPWrap, scoped IPv6 multicast interfaces are accepted, and a few Node inspection/feature-probe behaviors were aligned. There are also fixes for DNS lookup, websocket auth headers, and Windows process-kill semantics.

### **Other misc changes**
- Cron parser dependency removed in favor of an internal implementation.
- `deno x` gained `--ignore-scripts` support.
- `deno clean --dry-run` now works without `--except`.
- `--env-file` support expanded to more dependency/registry subcommands.
- Various smaller fixes: dotenv underscores, special-file permission guards, coverage exclusions, watcher updates, and docs/test-only changes.
