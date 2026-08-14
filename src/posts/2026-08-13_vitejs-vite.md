---
date: 2026-08-13
repo: vitejs/vite
size: M
title: "Define fix lands, docs clarified"
excerpt: "Vite fixes $-prefixed define replacements, updates CSS target precedence docs, and cleans up Rolldown config imports."
commits: 5
authors: [dogledogle, contactjawad, santhiprakash, btea]
commit_authors: {"dcf88bd": contactjawad, "a20a35e": santhiprakash, "d615bcd": btea, "74a25c3": dogledogle, "5e7efa0": dogledogle}
---

### **Fix define replacements for $-prefixed keys** (dcf88bd)
Vite now correctly matches escaped dots without breaking define keys that contain `$`, so replacements like `$FOO` are transformed as expected. The added test covers this regression and confirms the plugin emits the substituted value.

### **Use JSON import attributes in Rolldown configs** (d615bcd)
The Rolldown build and d.ts configs now import `package.json` directly with JSON import attributes instead of reading and parsing it from disk. This modernizes the config code and removes extra filesystem work during config loading.

### **Document cssTarget precedence over lightningcss targets** (a20a35e)
The build docs and inline config comments now clarify that `build.cssTarget` wins over `css.lightningcss.targets` when CSS minification uses Lightning CSS. This resolves an easy-to-miss precedence detail that affects CSS output for browser-targeted builds.

### Other misc changes
- Rolldown sourcemapIgnoreList docs updated for current references (74a25c3)
- Markdown image size package bumped in docs tooling (5e7efa0)
