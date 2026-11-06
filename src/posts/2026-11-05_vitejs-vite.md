---
date: 2026-11-05
repo: vitejs/vite
size: M
title: "Vite ships patch fixes for HTML, workers, and dev server"
excerpt: "Patch releases plus targeted fixes for HTML escaping, worker tree-shaking, and docs clarification round out the day."
commits: 8
authors: [sapphi-red, Singmin, aaronanish-t, halcyon-past]
commit_authors: {"4835128": sapphi-red, "eab1dc2": Singmin, "a270391": sapphi-red, "7139ef3": aaronanish-t}
---

### **Worker asset emission now preserves nested workers used indirectly** (7139ef3)
Vite’s worker bundling logic now tracks live assets from the root bundle, so a nested worker won’t be dropped just because its importer was tree-shaken in the main bundle. This fixes a real build-time edge case where assets could disappear even though a live worker still depends on them.

### **HTML generation fixes adjacent tag removal on the first line** (eab1dc2)
The HTML plugin now clamps the first-line offset calculation to avoid misdetecting content as empty and accidentally leaving adjacent tags in place. New regression coverage was added for back-to-back `<script>` and `<link>` tags at the top of a document.

### **Server HTML output now escapes user-controlled attributes** (a270391)
Vite now HTML-escapes redirected base URLs and injected proxy script URLs in dev server middleware. That closes off malformed output and makes these responses safer when paths contain special characters.

### **Vite 8.3.6 patch release** (0fd9a29)
The core package was bumped to 8.3.6, pulling in the latest patch-level bug fixes and maintenance updates for the main Vite release line.

### **create-vite 9.3.4 release** (47321be)
The project scaffold was released as 9.3.4, including a fix to keep TypeScript 6 when using ESLint. Template package manifests were also updated to the matching Vite version.

### **plugin-legacy 8.2.4 release** (aacc63f)
`@vitejs/plugin-legacy` was republished at 8.2.4 with changelog updates and dependency maintenance. It’s a release-only bump, but it keeps the plugin aligned with the rest of the ecosystem.

### **Docs clarify `server.fs.deny` replaces defaults** (4835128)
The config docs now explicitly note that setting `server.fs.deny` replaces Vite’s default deny list rather than merging with it. That should prevent accidental exposure from incomplete custom lists.

### **Other misc changes**
- Docs/UI tweak for the ViteConf sponsor card hover styles
- Release-only version/changelog bumps for `vite`, `create-vite`, and `plugin-legacy`
- Minor docs clarification for `server.fs.deny`
