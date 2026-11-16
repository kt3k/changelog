---
date: 2026-11-15
repo: nodejs/node
size: M
title: "Stream, fs, and glob fixes land"
excerpt: "Node.js adds a stream write optimization, fixes fs retry and ReadStream behavior, and tightens glob, URL, and node --run edge cases."
commits: 13
authors: [christianaurichzm, LiviaMedeiros, rozzilla, Dansatch, legendecas, gurgunday, UlisesGascon, hamzakargin, jazelly, araujogui]
commit_authors: {"1347527": Dansatch, "d0d82d9": rozzilla, "2a854a8": legendecas, "47d6da0": gurgunday, "55da353": UlisesGascon, "d105ef7": LiviaMedeiros, "b0aa887": LiviaMedeiros, "537a20c": hamzakargin, "c07db8c": jazelly, "2e59a6d": christianaurichzm, "80fc1ef": christianaurichzm, "2e0029f": christianaurichzm, "e18f106": araujogui}
---

### **Stream writes avoid flattening concatenated strings** (e18f106)
Node now writes one-byte strings to streams without forcing an intermediate flatten, which reduces extra heap copying for common cases like concatenated HTTP headers. The change also preserves existing UTF-8 handling and adds coverage for concatenated-string writes and writev paths.

### **ReadStream now honors setDefaultHighWaterMark()** (537a20c)
`fs.createReadStream()` now uses a user-configured default byte highWaterMark when one has been set, instead of always sticking to 64 KiB. This makes the stream API behave consistently with `stream.setDefaultHighWaterMark()` and updates the docs and tests accordingly.

### **fs.writev retries resume from the correct offset** (2e59a6d)
A retry after a partial `writev()` or `EAGAIN` now uses the tracked local position instead of the stream’s advanced batch position. That fixes holes and misplaced data on retry, with regression tests covering partial writes and transient failures.

### **node --run no longer aborts on filesystem errors** (c07db8c)
`node --run` now uses non-throwing filesystem checks so unreadable `node_modules/.bin` directories are skipped and a missing working directory becomes a normal user-facing error. This removes an abort-on-exception path and makes command discovery more robust.

### **Glob matching fixes globstar section bounds** (47d6da0)
`path.matchesGlob()` and `fs.glob()` now compute globstar section bounds correctly when sections have different lengths. That fixes false negatives for patterns such as `**/a/b/c/**/d/**` and adds regression coverage.

### **URL href setter validates the receiver first** (1347527)
The `href` setter now checks the URL receiver before converting the assigned value, so a bad receiver no longer triggers user-defined `toString()` side effects first. This tightens behavior around Web-compatible URL setters.

### Other misc changes
- Enable PIE in Linux builds (2a854a8)
- Notarize `bin/node` in Darwin tarballs (55da353)
- Use indexed appends for dependent signals (d0d82d9)
- Improve circular reference formatting with `Map.prototype.getOrInsert()` (b0aa887)
- Deflake TLS resume SNI test (80fc1ef)
- Deflake fs stat cancel-inflight test under FIPS (2e0029f)
- Minor test path cleanup in watch mode (d105ef7)
