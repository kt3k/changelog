---
date: 2026-07-10
repo: vitejs/vite
size: M
title: "Test harness fix trims noisy dep scans"
excerpt: "Vite’s test suite now avoids accidental dependency scanning under `__tests__`, alongside a couple of doc URL/reference fixes."
commits: 3
authors: [sapphi-red, sanjibani, KangaZero]
commit_authors: {"c961cae": sapphi-red, "d2e467d": sanjibani, "3c94c7c": KangaZero}
---

### **Test fixtures stop triggering full dependency scans** (c961cae)
Several node tests now disable dependency discovery when spinning up the dev server, preventing `server.listen()` from crawling every HTML fixture under `__tests__`. This keeps the suite focused and avoids unnecessary work during test startup.

### Other misc changes
- Docs: updated the xmit static deploy guide URL (d2e467d)
- Docs: corrected a stale `http-proxy` reference in the proxy config example (3c94c7c)
