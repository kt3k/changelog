---
date: 2026-10-04
repo: oven-sh/bun
size: M
title: "Docker builds fixed; memory releases improved"
excerpt: "Inlined the Docker release signing key, updated WebKit, and pulled in two mimalloc upgrades to improve memory reclamation."
commits: 4
authors: [Jarred-Sumner]
commit_authors: {"1878660": Jarred-Sumner, "c7b06d9": Jarred-Sumner, "9c3439a": Jarred-Sumner, "b73ae47": Jarred-Sumner}
---

### **Inline Docker release signing to unblock image builds** (c7b06d9)
The Dockerfiles now embed Bun’s release public key instead of fetching it from a keyserver at build time, which avoids the current keyserver failures that were breaking Docker image builds. Verification also now uses `gpg --assert-signer` and writes to a separate verified checksum file before unpacking Bun.

### **WebKit bump releases compiler memory sooner** (1878660)
Bumped WebKit to a newer JSC snapshot that makes idle compiler and GC helper threads hand back free mimalloc memory after 100 ms instead of waiting for thread exit. The update also adds regression coverage for wasm compile RSS behavior and `Atomics.wait` memory release.

### **mimalloc upgrade improves heap performance and sleep-time reclamation** (b73ae47)
Bumped Bun’s vendored mimalloc and wired `Bun.sleepSync()` into mimalloc’s idle handoff so free pages on the sleeping thread can be released back to the OS. The event loop path was also adjusted so inline scavenging only happens on ticks that actually block.

### **mimalloc minor upstream refresh** (9c3439a)
Advanced the mimalloc dependency again to a newer upstream revision. This is another dependency update on top of the earlier heap/memory work.

### Other misc changes
- Dockerfile cleanup across alpine, debian, debian-slim, and distroless images.
- Added/updated tests for memory-reclamation behavior around `sleepSync`, timers, and WebKit idle threads.
- Dependency bumps (1 commit).
