---
date: 2026-08-18
repo: vitejs/vite
size: M
title: "Bundled dev HMR gets cycle-aware fixes"
excerpt: "Bundled dev hot updates now handle circular imports, plus fixes for lazy bundling errors and a Windows path false-positive."
commits: 8
authors: [sapphi-red, FirmaSpring, grzdev, harshmathurx]
commit_authors: {"c0f2fc6": FirmaSpring, "3dbddef": sapphi-red, "7822e14": sapphi-red, "354adfe": grzdev, "3ba026d": sapphi-red, "02cffa9": harshmathurx, "1cbf7d6": FirmaSpring}
---

### **Bundled dev HMR now survives circular imports** (3dbddef)
The bundled-dev HMR client was refactored to track propagation boundaries with circular-import awareness instead of treating every accepted boundary the same. This should prevent unnecessary full reloads and make hot updates work more reliably when modules participate in import cycles.

### **Lazy bundling errors now fail cleanly with 500s** (3ba026d)
The lazy-bundling middleware now catches trigger failures, logs a structured error, and returns a proper server error instead of letting the request fall through ambiguously. This makes bundled-dev failure modes easier to diagnose and less likely to hang or misbehave.

### **Windows short-name detection is less overbroad** (02cffa9)
Vite now only blocks paths that actually look like Windows 8.3 short names, instead of rejecting any path containing `~`. That reduces false positives for legitimate filenames while preserving the security check against short-name aliasing bypasses.

### Other misc changes
- Dependency bumps across the repo, including pnpm, semgrep, release scripts, and docs tooling (ba958bd)
- Enabled bundled-dev HMR playground coverage and adjusted tests for the new behavior (7822e14)
- Updated outdated upstream license/comment links (c0f2fc6)
- Updated the create-vite README links for moved React ESLint plugins (1cbf7d6)
- Added `--experimentalBundle` to CLI docs (354adfe)
