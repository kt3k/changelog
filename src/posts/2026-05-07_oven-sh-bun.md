---
date: 2026-05-07
repo: oven-sh/bun
size: L
title: "Bun fixes publish metadata, TLS, and signal bugs"
excerpt: "Notable fixes landed for npm publish readme fields, macOS CA lookup stalls, Windows signal handling, and several crash/TLA regressions."
commits: 7
authors: [robobun, cirospaciari, ig-ant, sosukesuzuki]
commit_authors: {"9ed6e89": robobun, "d352dfd": cirospaciari, "58fcdad": cirospaciari, "a17a13c": ig-ant, "79c3d4d": sosukesuzuki, "c5a2f8f": robobun, "090a5fe": robobun}
---

### **npm publish now sends README metadata** (9ed6e89)
`bun publish` will now populate the registry payload's `readme` and `readmeFilename` fields when a README is packaged. That fixes empty `npm view <pkg> readme` output for Bun-published packages and brings the API behavior in line with `npm publish`.

### **macOS system CA lookup avoids per-cert network revocation fetches** (58fcdad)
`tls.getCACertificates('system')` on macOS no longer drives `trustd` into expensive OCSP/CRL/AIA network checks for every keychain certificate. This is a major performance fix for managed Macs, where the previous approach could turn a local lookup into a multi-second operation.

### **Windows console-close and break events now map to signals** (a17a13c)
Bun now recognizes `SIGHUP` and `SIGBREAK` on Windows, so console-control events are surfaced through the signal APIs instead of being treated as unknown names. This matches Node.js and fixes process listeners for window close and Ctrl+Break.

### **TLA sibling imports now wait correctly within the same evaluation pass** (79c3d4d)
A static import that revisits a suspended top-level-await module in the same `Evaluate()` pass now waits for the dependency to settle instead of running with bindings still in TDZ. This closes a spec-compliance bug that could produce incorrect module execution order.

### **TLS shutdown no longer defers close when close_notify flush fails** (d352dfd)
If `SSL_shutdown` can't flush `close_notify` because the write fails or the peer is already gone, Bun now closes immediately instead of keeping the socket around waiting for an event that may never come. That avoids a leak-prone stalled shutdown path.

### **Other misc changes**
- Fixed a data race in `MessageEvent` locking and added a regression test. (c5a2f8f)
- Prevented `new Bun.Terminal()` from crashing on non-object arguments. (090a5fe)
- Dependency bump: WebKit updated for the TLA fix. (79c3d4d)
