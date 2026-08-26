---
date: 2026-08-25
repo: denoland/deno
size: L
title: "Desktop menus, HTTP keep-alive, snapshot perf"
excerpt: "Adds desktop menu item fields, fixes raw HTTP keep-alive reuse, and lands a major snapshot rehydration speedup."
commits: 5
authors: [nathanwhit, crowlKats, bartlomieju]
commit_authors: {"e8d62c9": crowlKats, "acc8c6f": nathanwhit, "5d5600f": bartlomieju, "81c5a82": nathanwhit, "3a37565": nathanwhit}
---

### **Zero-copy snapshot rehydration drops bincode** (5d5600f)
The core snapshot format was refactored to avoid bincode during rehydration, replacing it with a custom encoder/decoder path and zero-copy handling for module and snapshot metadata. This should reduce snapshot startup overhead and tighten the runtime’s internal serialization path.

### **Raw HTTP now preserves keep-alive after body reads** (acc8c6f)
The HTTP/1 server path now distinguishes between bodies that were fully consumed by JS and bodies that were canceled or left unread, so pipelined requests can reuse the connection more reliably. It also drains any remaining request body before handing the socket back, avoiding premature closes and truncated bodies.

### **Desktop menu items expose checked, icon, and tooltip** (e8d62c9)
Deno’s desktop menu-item bridge now forwards `checked`, `icon`, and `tooltip` from JS into Laufey instead of hard-coding defaults. That makes the newer menu-item API actually usable from desktop apps without losing state or metadata.

### **Publish rejects invalid JSR package names earlier** (81c5a82)
Publish requests now validate package names before building registry URLs, which prevents malformed IDs from making it into the publish flow. The URL construction was also hardened to preserve base paths and encode config query data correctly.

### **LSP registry completions only accept HTTP(S) endpoints** (3a37565)
Registry endpoint resolution now rejects non-HTTP schemes and resolves relative endpoints more consistently against the current module URL. This closes off unintended scheme handling in completion/documentation fetches and makes registry lookup behavior safer and more predictable.

### Other misc changes
- Desktop runtime bumped Laufey to 0.7.0 and updated the API version pin
- Snapshot/module-map internal refactors and tests
- Lockfile refreshes and minor descriptor updates
