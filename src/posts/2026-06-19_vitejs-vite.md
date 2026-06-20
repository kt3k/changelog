---
date: 2026-06-19
repo: vitejs/vite
size: M
title: "Vite hardens server defaults and fixes edge cases"
excerpt: "New fs deny defaults, safer URI handling, env caching, and several targeted fixes landed across server, HTML, and glob matching."
commits: 6
authors: [shulaoda, wan9chi, bluwy]
commit_authors: {"da72733": wan9chi, "8340bb5": shulaoda, "df9e0a5": shulaoda, "0e91e79": shulaoda, "65f525e": shulaoda, "61ba8fd": bluwy}
---

### **Expand `server.fs.deny` with more sensitive files** (61ba8fd)
Vite now blocks several additional secrets and credentials by default, including key/cert variants plus `.npmrc` and `.yarnrc.yml`. This tightens dev-server file exposure and reduces the chance of accidentally serving sensitive local config.

### **Fix malformed URIs in memory file serving** (df9e0a5)
The memory-files middleware now catches `decodeURIComponent` failures and falls back cleanly instead of throwing on bad request paths. That avoids a server-side error path for malformed URLs.

### **Respect `caseSensitive` in `import.meta.glob` HMR matching** (65f525e)
The glob matcher now passes `nocase` based on the `caseSensitive` option for both affirmed and negated patterns. This makes HMR matching behave consistently with the caller’s requested case-sensitivity.

### **Cache falsy per-environment state correctly** (0e91e79)
`perEnvironmentState` now checks map membership instead of truthiness, so valid falsy cached values are preserved. This fixes a subtle bug where `false`, `0`, or `""` could trigger unnecessary reinitialization.

### **Omit import-map nonce when CSP nonce is unset** (8340bb5)
The HTML plugin now only adds a `nonce` attribute to generated import maps when one actually exists. This avoids emitting a meaningless nonce attribute in nonce-less builds and keeps the markup cleaner.

### Other misc changes
- Env prefix lookup for Vite Task now uses literal prefix queries and bumps `@voidzero-dev/vite-task-client` (da72733)
- Minor dependency lockfile/package update (da72733)
