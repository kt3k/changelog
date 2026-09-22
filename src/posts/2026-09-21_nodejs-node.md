---
date: 2026-09-21
repo: nodejs/node
size: M
title: "Node-API crash fix leads test flurry"
excerpt: "A Node-API version mismatch no longer segfaults, alongside filesystem and benchmark/test deflakes plus typing updates."
commits: 7
authors: [panva, krassx, XadillaX, agape1225, christianaurichzm]
commit_authors: {"20b3a69": panva, "3f76564": panva, "194eb69": panva, "67a4416": krassx, "916d0d6": XadillaX, "35f72de": agape1225, "513981d": christianaurichzm}
---

### **Node-API version mismatches now fail cleanly** (67a4416)
Loading an addon that asks for an unsupported Node-API version no longer crashes the process; the loader now bails out when `node_napi_env__::New()` returns `nullptr`. That preserves the original error so `require()` can catch it instead of taking down the runtime.

### **FileHandle transfer now closes fd 0 correctly** (513981d)
`FileHandle::TransferData` now treats file descriptor 0 as a valid owned descriptor when a transfer is discarded, fixing a leak/left-open bug in the messaging path. The new test exercises the edge case by closing stdin first and confirming the descriptor is actually closed.

### **Bench error test hardened against timeout race** (20b3a69)
The bench test now aborts from inside the callback to guarantee unsettled work exists, avoiding the race where a 10ms timeout fires before the callback even starts. It also adds a separate zero-timeout case and updates the expected completion/error accounting.

### **HTTP/2 debug test no longer depends on flaky stderr piping** (3f76564)
The test now captures native debug output in a temporary file instead of a non-blocking stderr pipe, which can drop log lines when it fills up. This makes the assertions stable and removes the Linux s390x flaky marking.

### **Crypto benchmark flake removed** (194eb69)
The timingSafeEqual benchmark test mode now uses a larger buffer and forces the first byte to differ, eliminating the rare chance of equal random inputs. The benchmark is also unmarked as flaky.

### Other misc changes
- Added QUIC internal binding typing to `globals.d.ts` (35f72de)
- Restored XadillaX to collaborators in `README.md` (916d0d6)
