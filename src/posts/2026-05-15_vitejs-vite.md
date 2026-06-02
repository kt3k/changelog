---
date: 2026-05-15
repo: vitejs/vite
size: M
title: "JSX scan and console forwarding fixes"
excerpt: "Vite fixed dependency scanning for custom JSX runtimes and made dev console message forwarding resilient to transport send errors."
commits: 2
authors: [semimikoh, sapphi-red]
commit_authors: {"b3132da": semimikoh, "e8e9a34": sapphi-red}
---

### **Fix dependency scanning to honor Rolldown JSX options** (b3132da)
The optimizer scan now passes configured JSX transform options into `transformSync`, so `import.meta.glob` scanning resolves the same runtime as the rest of the build. This prevents mismatches like incorrectly pulling in `react/jsx-runtime` when `vue` JSX settings are configured.

### **Handle transport send errors when forwarding dev console output** (e8e9a34)
Vite’s console forwarding now catches failures from the module runner transport and ignores the expected “send before connect” case while logging other send errors. That makes dev error forwarding more robust and avoids noisy crashes or swallowed failures when the server connection isn’t ready.

### Other misc changes
- Added regression tests for JSX-runtime scan behavior.
- Added regression tests for forwardConsole transport error handling.
