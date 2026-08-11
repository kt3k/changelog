---
date: 2026-08-10
repo: denoland/deno
size: L
title: "Env locking, fmt stdin fixes, and base64 speedups"
excerpt: "Deno tightened process-env coordination, improved stdin formatting with .editorconfig, and sped up base64 handling while fixing a few edge cases."
commits: 7
authors: [nathanwhit, minato32, tomas-zijdemans, JakeChampion, magurotuna]
commit_authors: {"19c25e2": nathanwhit, "3bbcbe7": minato32, "0e72c12": nathanwhit, "eb89bc8": nathanwhit, "ca568b1": tomas-zijdemans, "1fa856d": JakeChampion, "0752844": magurotuna}
---

### **Serialize process environment updates across workers** (19c25e2)
Deno now coordinates process-environment reads and writes through a shared guard, so `TZ` updates, native timezone refreshes, and V8 timezone redetection happen atomically. That also covers Node dotenv loading and watched dotenv reloads, fixing races around environment mutation and timezone behavior.

### **Honor .editorconfig when formatting from stdin** (3bbcbe7)
`deno fmt -` now resolves a synthetic stdin path against the current working directory and applies the same `.editorconfig` rules as file-based formatting. This closes a long-standing inconsistency where stdin formatting could ignore local formatting settings.

### **Cap oversized adaptive buffer allocations** (0e72c12)
Adaptive buffer sizing now saturates and clamps huge hints instead of letting them overflow into pathological allocations. This makes buffer growth more robust for extreme size hints and prevents oversized initial reservations.

### **Use an internal token for `Deno.FsFile` construction** (eb89bc8)
`Deno.FsFile` now validates construction with a private token instead of a global symbol, preventing external code from spoofing the constructor guard. The related `Process` stdio wiring was updated to use the same internal token.

### **Speed up base64 paths with buffer-based ops** (ca568b1)
Deno switched standard base64 encoding/decoding paths to the same buffer-oriented op design already used for base64url, reducing conversion overhead on common buffer operations. The update also tightens Node `Buffer` base64 semantics for dirty input and improves Jupyter image encoding paths.

### **Recognize `text/x-component` as compressible** (1fa856d)
The HTTP compressibility list now includes `text/x-component`, matching React Server Components content types so they can be compressed when served.

### **Allow cached npm metadata under `--cached-only`** (0752844)
When npm metadata is already cached in abbreviated form, Deno now reuses it instead of trying to refetch a full packument under `--cached-only`. That avoids an unnecessary failure path for offline/cached installs that already have enough information to resolve packages.

### Other misc changes
- Formatter/editorconfig stdin tests added
- Buffer/base64 Node polyfill test updates
- Process-env timezone regression coverage added
- `Deno.FsFile` construction regression test added
- NPM cached-only fixture/test additions
