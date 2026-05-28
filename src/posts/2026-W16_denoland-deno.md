---
date: 2026-04-19
repo: denoland/deno
period: weekly
slug: 2026-W16
period_label: "Apr 13–19, 2026"
size: L
title: "Deno revamps Node compat, HTTP/TLS, and upgrade workflows"
excerpt: "Major Node compatibility work landed this week, alongside PR-based upgrades, Linux build fixes, and several Windows and audit improvements."
commits: 28
---

### **Node compatibility saw a major overhaul**
Deno landed a large wave of runtime compatibility work for Node APIs. The biggest shift is a rewrite of `node:http` around native TCPWrap plus llhttp, alongside a parallel stream-wrap refactor that moves duplicated JS plumbing into native implementations. The week also brought tighter `require.resolve` behavior, real N-API handle scopes, zero-copy external Latin-1 strings, better `ChildProcess.kill()` semantics, and fixes for custom inspect, worker option warnings, and several edge cases across HTTP/2, TLS, and crypto.

### **HTTP, TLS, and stream behavior became much closer to Node**
The HTTP stack gained header-size enforcement, better validation around `writeHead()`, and prompt HTTP/2 HEADERS flushing to avoid stalls. TLS now waits for handshakes to finish before shutdown, auto-starts STARTTLS-style server sockets, and avoids reentrant writes on JS-backed duplex streams. On top of that, Playwright compatibility was restored on Windows by fixing pipe/handle handling.

### **Upgrade and release workflows got smoother**
`deno upgrade` can now install directly from a pull request via `pr <number>` or `#12345`, pulling CI artifacts through the GitHub CLI and supporting dry runs and custom output paths. The command also now explains when a requested canary build has expired. In parallel, the Linux release build was fixed to work again on older glibc systems, widening compatibility for older AWS Lambda and Fedora environments.

### **Security and compatibility fixes landed across the stack**
`deno audit` switched to npm’s supported bulk advisories API, avoiding failures from the retired endpoint. Windows `writeFileSync('wx')` no longer corrupts files on failure, Prisma/React doc blocks now highlight JSX/TSX correctly, and the Node polyfill API lint stopped producing false positives.

### **Other misc changes**
- Adjusted canary upgrade tests and platform gating
- Updated audit and HTTP/compat test fixtures
- Refreshed the doc syntax highlighter bundle
