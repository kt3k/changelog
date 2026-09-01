---
date: 2026-08-31
repo: denoland/deno
size: L
title: "Deno tightens Node compat, caching, and compression"
excerpt: "Big compat and runtime fixes landed for process identity, DNS, cache correctness, node buffers, and stream compression."
commits: 12
authors: [bartlomieju, nathanwhit, tomas-zijdemans, melbinjp, r3wretrhy]
commit_authors: {"1855034": nathanwhit, "9263752": nathanwhit, "e5575e2": nathanwhit, "1558ece": bartlomieju, "fe7b45a": bartlomieju, "32e6381": tomas-zijdemans, "6201a53": bartlomieju, "c54dc3b": r3wretrhy}
---

### **Process spawns now clear supplementary groups first** (1855034)
On Unix, child setup now drops supplementary groups before changing uid/gid, with careful handling for same-ID spawns and pre-exec cwd changes. This fixes a subtle privilege/identity bug when spawning processes with altered credentials.

### **DNS errors now match Node.js more closely** (6201a53)
`node:dns` now classifies malformed names and resolver failures with c-ares-style error codes like `EBADNAME`, `ENOTFOUND`, and `ENODATA`, and it parses query names up front so invalid input is detected precisely. This improves compatibility for code that branches on Node’s DNS error codes.

### **Buffer hex encoding moved onto native Uint8Array methods** (32e6381)
Node buffer hex paths now use the runtime’s native `Uint8Array.prototype.toHex`/`setFromHex` support instead of the older Rust hex path. That should reduce overhead in hot buffer conversions and remove a dependency while keeping the JS polyfill aligned with the new built-ins.

### **Code cache keys now hash full source contents** (fe7b45a)
Deno’s code cache lookup now hashes the actual source text instead of relying on string length-sensitive validation. This closes a stale-bytecode hole where an equal-length edit could have reused old compiled output.

### **Multicast membership checks now enforce the right net permissions** (9263752)
Joining IPv4/IPv6 multicast groups now checks permissions against both the multicast group and the socket’s bound port, preserving deny rules after resolution. This tightens network permission enforcement for UDP multicast APIs in both Deno and Node compatibility layers.

### **Compression streams stop flushing on every write** (1558ece)
Brotli and deflate/gzip writes now avoid per-chunk flushing, so output no longer depends on how input is chunked. That improves compression quality and fixes a correctness issue for stream chunking behavior.

### **Node HTTP header maps preserve prototype behavior** (e5575e2)
`IncomingMessage` header map handling was adjusted to better match Node’s prototype behavior. This is a compatibility fix for code that inspects or relies on the header object shape.

### **Package selector handling now validates --ignore-scripts inputs** (c54dc3b)
The CLI parser now validates package selectors passed alongside `--ignore-scripts`. This closes a validation gap that could let malformed selector input slip through.

### Other misc changes
- `node:buffer` hex conversion perf and tests
- zsh completion flag formatting fix
- Lockfile tarball registry path validation
- Shorter multicasting-related permission and compat tests
- Longer node compat timeout for a blob-slice pummel test
- Docs cleanup for removed `typescript_go_client` crate
