---
date: 2026-03-11
repo: denoland/deno
size: L
title: "Node compat and fetch reliability land"
excerpt: "Deno adds a developer CLI and ships several Node compatibility fixes, plus stale HTTP retry and FreeBSD signal handling."
commits: 17
authors: [bartlomieju, dsherret, amyssnippet, fraidev, denobot, littledivy]
commit_authors: {"6936075": dsherret, "7c84b09": amyssnippet, "9e682be": dsherret, "e0464f4": bartlomieju, "3249c98": dsherret, "b2ecb43": dsherret, "a395e36": bartlomieju, "cbdfed1": bartlomieju, "7bcaaa2": bartlomieju, "26972e6": fraidev, "9bb8552": bartlomieju, "0238181": denobot, "e55b986": bartlomieju, "bd3fd9a": littledivy, "130a377": bartlomieju}
---

### **Node compatibility gets a batch of fixes**
Several Node polyfills were tightened up in ways that unblock real packages and tests: `child_process.kill(0)` now works as a process-liveness check, `node:dgram` compatibility improved, `generateKeyPair(type, callback)` handles the 2-arg form, and TLS cleanup no longer leaks a JS stream socket resource that could hang the event loop. These are the kind of fixes that directly reduce breakage for npm and Node-compat workloads. (7bcaaa2, 130a377, e55b986, 26972e6)

### **Fetch now retries stale pooled connections**
`fetch()` was taught to retry when a pooled HTTP/1.1 connection has gone stale and the server has already restarted or closed the socket. That closes a user-visible reliability gap where every other request could fail with `connection closed before message completed`. (e0464f4)

### **Upgrade rejection with non-101 responses now works**
`node:http` upgrade handling can now reject an upgrade request with a normal non-101 response instead of throwing a parser/write error. This makes it possible to return responses like 401 during upgrade negotiation and keep the server alive for later requests. (bd3fd9a)

### **FreeBSD signal registration no longer panics**
Deno fixed a FreeBSD-specific signal-table bug that could panic when registering signals because `SIGLIBRT` was incorrectly included even though it does not exist there. The change also surfaces registration failures as I/O errors instead of unwrapping. (7c84b09)

### **npm bin setup handles read-only executables**
The npm installer now copes with package bin files that are executable but not writable, avoiding `EACCES` during `.bin` setup. This matches how some tarballs are published in the wild and prevents install-time failures. (cbdfed1)

### **Developer CLI lands at `./x`**
A new top-level `./x` script adds a convenience CLI for common contributor workflows like build, check, test, and lint tasks. It centralizes internal repo commands and should make day-to-day development faster. (1190dc9)

### Other misc changes
- Windows build fix for the latest MSVC (3249c98)
- Node `fs` consolidation refactor; more polyfills inlined into `fs.ts` (a395e36)
- Cargo feature handling fix for `cargo publish` in `ext/node` (9bb8552)
- Release/version bump to 2.7.5 and generated workflow/Cargo updates (0238181)
- Dependency bump: `quinn-proto` 0.11.12 → 0.11.14 (4b0fdb1)
- CI workflow rename: `lint ci status` → `ci status` (b2ecb43)
- Internal npm cache warning cleanup and small `deno_npm` refactor (6936075, 9e682be)
