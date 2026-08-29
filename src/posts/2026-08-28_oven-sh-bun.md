---
date: 2026-08-28
repo: oven-sh/bun
size: L
title: "Bun tightens correctness across core paths"
excerpt: "Major fixes span compile output, test parallelism, DNS/TLS/env handling, HTTP semantics, CSS, and several API correctness bugs."
commits: 58
authors: [robobun, Jarred-Sumner, dylan-conway, sosukesuzuki]
commit_authors: {"85fba53": Jarred-Sumner, "02031c7": Jarred-Sumner, "5add697": robobun, "c20535c": Jarred-Sumner, "873ef14": robobun, "d578a8c": robobun, "dd0e2c2": robobun, "b026de3": robobun, "36e2480": robobun}
---

### **Compile bytecode now includes lazy builtin dependencies** (85fba53)
`bun build --compile --bytecode` now tracks builtin modules reached through lazy `require()` paths too, instead of stopping at top-level requires. That closes gaps where important internals like inspect, watch, streams/promises, and cluster code could be missing from compiled output.

### **TLS now caches the system CA bundle and avoids duplicate roots** (02031c7)
`tls.getCACertificates('system')` no longer rereads overlapping Linux CA locations and can return the same root certificate multiple times. This cuts startup cost and fixes inflated certificate lists on common distros.

### **Explicit `--env-file` can now read pipes, FIFOs, and devices** (5add697)
Bun now reads an explicitly passed env-file even when it is not a regular file, matching Node for cases like process substitution, `/dev/stdin`, and FIFOs. The loader also avoids double-reading the same pipe across workers and quiets the “loaded env” message when nothing new was loaded.

### **`server.listen()` stops loading `node:cluster` in the primary** (c20535c)
`net.listenInCluster()` now checks the existing `isPrimary` helper instead of requiring `node:cluster` on every listen call. That removes needless startup work in the common primary-process path.

### **CSS `composes` errors now render the emphasized markup correctly** (873ef14)
The bundler’s conflict diagnostic now preserves the intended rich-text formatting for the property and class names instead of flattening the whole message into one bold block. This makes the parse error much easier to read and act on.

### **JSON5 escape errors now point at the real offending character** (d578a8c)
Bad `\xHH` and `\uHHHH` escapes now report the caret on the invalid character itself, not the first hex digit. It does not change the error text, but it makes the location accurate.

### **Filesystem router now builds public paths as bytes** (dd0e2c2)
The router and file-loader path construction was rewritten to preserve raw bytes instead of round-tripping through lossy string formatting. That avoids accidental UTF-8 decoding/re-encoding and makes asset path handling more faithful.

### **Bun.serve now rejects malformed `Range` headers more strictly** (b026de3)
Range positions must now be all digits; signed and underscore-separated forms are ignored and fall back to a full-body response. This aligns Bun with RFC 9110 and prevents invalid partial responses.

### **`Bun.sha` now validates its output argument properly** (36e2480)
Invalid `output` values now throw the same argument error path as the lower-level SHA512_256 API instead of being silently treated like “no output”. That makes the API consistent and stops bad calls from succeeding unexpectedly.

### **Other misc changes**
- Dependency bumps and WebKit updates (multiple commits)
- CI/source-lint fixes and comment-cop workflow adjustments
- Test-only updates, snapshot changes, and docs clarifications
- Small internal refactors and error-message polish across errno, CSS, streams, FFI, and shell code
