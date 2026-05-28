---
date: 2026-05-09
repo: oven-sh/bun
size: M
title: "TLS handshakes now time out cleanly"
excerpt: "Bun now arms HTTP idle timers on socket open, preventing stalled TLS handshakes from hanging install and fetch requests forever."
commits: 1
authors: [robobun]
commit_authors: {"fe735f8": robobun}
---

### **Stalled TLS handshakes now fail with timeout** (fe735f8)
Bun now starts the HTTP idle timer as soon as a client socket opens, so a server that accepts TCP but never completes the TLS handshake will no longer leave `bun install` or fetch requests stuck indefinitely. The new configurable idle timeout is applied consistently across h1 and h2 paths, with values normalized to avoid uSockets timer edge cases.
