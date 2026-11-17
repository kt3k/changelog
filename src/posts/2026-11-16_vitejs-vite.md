---
date: 2026-11-16
repo: vitejs/vite
size: M
title: "Vite beta release with key build fixes"
excerpt: "Beta release plus notable fixes for build metadata, CSS chunk matching, and HMR test stability."
commits: 9
authors: [sapphi-red, btea, maschwenk, shulaoda]
commit_authors: {"8aa52a9": sapphi-red, "c0d590d": sapphi-red, "dda2a82": maschwenk, "880f1cf": btea, "76f9618": shulaoda, "2decae3": btea}
---

### **Build transform meta now preserves rolldown internals** (c0d590d)
Vite now copies transform hook option descriptors instead of spreading them, so rolldown’s lazy `magicString` and `ast` getters survive when `ssr` is injected. The public plugin typings were also updated to expose those build-only meta fields.

### **CSS empty-chunk replacement matches relative paths correctly** (76f9618)
The CSS post-processing logic now resolves pure CSS chunk names against the importing chunk’s directory and avoids false matches on other chunks that merely share the same filename suffix. This fixes replacement behavior for nested imports and keeps the generated code aligned with the original length.

### **Rolldown dependency updates land across the workspace** (1404166)
Rolldown was bumped to `~1.3.2` in the root, `vite`, and playground packages, and `rolldown-plugin-dts` moved to `^0.30.2`. These updates keep Vite aligned with the latest rolldown releases.

### Other misc changes
- Release v8.4.0-beta.1 and update the package version/changelog (9a8d1a9)
- Fix flaky HMR playground tests and improve navigation waits (dda2a82)
- Add a debug log for Windows process start time fallback (880f1cf)
- Update non-major dependencies and CI workflows (c11a671)
- Drop unused capture groups in test-only regexes (2decae3)
- Exclude `maschwenk` from bot detection (8aa52a9)
