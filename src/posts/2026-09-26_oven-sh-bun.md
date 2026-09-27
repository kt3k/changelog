---
date: 2026-09-26
repo: oven-sh/bun
size: L
title: "Major Bun fixes land across HTTP, TLS, bundler"
excerpt: "Node parity, HTTP/2 reset limits, TLS handshake safety, and bundler splitting/coverage fixes headline a substantial day."
commits: 15
authors: [robobun, Jarred-Sumner]
commit_authors: {"5d5f03f": robobun, "37da174": Jarred-Sumner, "97246d0": robobun, "4a658e8": robobun, "a2b4233": robobun, "e13ec92": robobun, "b12539c": robobun, "ecf3490": Jarred-Sumner, "9390b39": robobun, "caa197e": robobun, "a0a71e2": robobun}
---

### **HTTP server now matches Node more closely** (5d5f03f)
Bun’s `node:http` server behavior was brought in line with Node across request bodies, framing, lifecycle, and response finishing. The patch also refactors a large amount of uSockets/uWebSockets plumbing to support those semantics, so several long-standing edge cases should now behave predictably.

### **Bundler splitting fixes chunk order and duplicate entry execution** (37da174, 97246d0)
Two `--splitting` bugs were fixed: shared chunks now print in loader-evaluation order, and the linker avoids importing an unhashed entry from a lazy chunk. That prevents import cycles from evaluating in the wrong order and stops an entry file from running twice when loaded with a query string.

### **HTTP/2 gains per-connection reset rate limiting** (9390b39)
The `node:http2` engine now rate-limits stream resets per connection, mirroring Node/nghttp2’s behavior and addressing rapid-reset abuse patterns. This is a meaningful security-hardening change that prevents a peer from burning CPU by spamming `RST_STREAM`.

### **TLS handshake handling is hardened against shutdown races** (caa197e, a0a71e2)
TLS now distinguishes between a real peer-certificate failure and a FIN/close initiated by Bun, and it avoids closing the SSL wrapper from a write triggered during a fatal read. These fixes close a correctness and safety gap that could otherwise leak untrusted data into a rejecting server or trigger use-after-free behavior in proxy upgrade paths.

### **`Bun.serve` listen-address handling becomes exhaustive** (b12539c)
The server config and its readers were updated to handle all address variants explicitly, including the upcoming `fd` listen mode. That prevents future address variants from compiling into runtime panics or silently taking the wrong branch.

### **Coverage now counts every load of a source file** (e13ec92)
`bun test --coverage` now tracks multiple loads of the same file instead of only the last one. This fixes misreported or missing coverage rows for repeated imports and overlapping module graphs.

### **Minifier preserves tagged access on CommonJS exports** (a2b4233)
A syntax-minification bug that rewrote `ns["tag"]\`x\`` incorrectly was fixed. The broken rewrite could change `this` binding for tagged templates and crash code that depends on lifted CommonJS exports.

### **Windows install cleanup no longer spins forever on undeletable files** (4a658e8)
`delete_tree` was corrected so it stops retrying a path that `unlink` cannot remove. That fixes a Windows uninstall deadlock/CPU-spin case where `bun install` could hang while replacing a package that still had a live hard link.

### **Bun.serve rejects reused response bodies sooner** (ecf3490)
The server now detects when a pending `Response` body is already being consumed and fails it with `BODY_ALREADY_USED` instead of crashing. This tightens the lifecycle around streamed responses and fixes a stack-overflow style failure mode.

### Other misc changes
- Upgrade WebKit to `7b485a76e9` and refresh related pins/tooling.
- Remove dead code from bake client, uSockets, uWS HTTP/2, `uws_sys`, and CI script.
- `tls`: change verify-error handling for half-closed sockets.
- `socket`: fix non-Windows build around `ListenerType::NamedPipe`.
- `sys`: refine directory deletion behavior on Windows-like error paths.
- `Bun.serve`/dev server refactors for listen host handling and address checks.
- CI/cloud script tweaks, comments, and small internal cleanup.
