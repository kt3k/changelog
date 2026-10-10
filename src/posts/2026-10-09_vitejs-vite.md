---
date: 2026-10-09
repo: vitejs/vite
size: M
title: "Bundled dev fixes and base matching"
excerpt: "Vite tightens bundled dev asset URL handling, fixes lockfile hashing, and corrects base-path stripping for partial matches."
commits: 9
authors: [h-a-n-a, aotradovec, btea]
commit_authors: {"3b72997": h-a-n-a, "f206096": aotradovec, "a4bfdb1": h-a-n-a, "cfe917d": h-a-n-a, "df4e02c": h-a-n-a, "52ba877": h-a-n-a, "849c253": h-a-n-a, "7a89794": h-a-n-a, "3dfde87": btea}
---

### **Bundled dev now respects `server.origin` for emitted asset URLs** (52ba877)
Asset URLs produced in dev and bundled dev now get prefixed with `server.origin`, which fixes broken links for files outside the project root and public/CSS asset references. This closes a class of incorrect URL generation in bundled dev that could break backend-integrated setups.

### **Lockfile hashing now falls back to `yarn.lock`** (f206096)
The dep optimizer now hashes `yarn.lock` when no lockfile is found under `node_modules`, instead of missing the project's actual lockfile. That makes dependency re-optimization track Yarn projects more reliably, especially when their state files are absent or managed differently.

### **Base middleware no longer strips partial path matches** (3dfde87)
Requests now only have the base removed when the pathname matches the base exactly or starts with it as a full segment. This fixes edge cases like `/foobar` being mistaken for `/foo`, preventing incorrect rewrites and improving 404 behavior for apps using a base without a trailing slash.

### Other misc changes
- Bundled-dev output normalization fix for served files (df4e02c)
- CI/playground test updates for bundled-dev skips across CSS, CSP, assets, and backend integration (3b72997, a4bfdb1, 849c253, 7a89794)
- Minor bundled-dev build ignore tweak for chunk import maps (cfe917d)
