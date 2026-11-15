---
date: 2026-11-14
repo: oven-sh/bun
size: L
title: "Bun sheds more unsafe ownership plumbing"
excerpt: "Large refactors made callbacks, resources, and event loops owned types instead of raw pointer dance, plus a notable tar/npm behavior change."
commits: 22
authors: [dylan-conway, Jarred-Sumner]
commit_authors: {"181ee9f": dylan-conway, "1ae1ed5": dylan-conway, "e4cbe17": dylan-conway, "e46ece8": dylan-conway, "6ea0fc9": dylan-conway, "9564c16": dylan-conway, "751d4ed": dylan-conway, "4df48e4": dylan-conway, "9b72307": dylan-conway, "9c4f436": dylan-conway, "b6f9cfa": dylan-conway, "b514dd9": dylan-conway, "7f0db35": dylan-conway, "2a42fc3": dylan-conway, "9d12a53": dylan-conway, "d4596e9": dylan-conway, "4cf6d10": dylan-conway, "e0c9596": dylan-conway, "0554db8": dylan-conway}
---

### **Bun keeps replacing raw-pointer ownership with typed owners** (181ee9f, 1ae1ed5, e4cbe17, e46ece8, 6ea0fc9, 9564c16, 751d4ed, 4df48e4, 9b72307, b514dd9, 7f0db35, 2a42fc3, 9d12a53, 0554db8, e0c9596, 4cf6d10, 9c4f436, b6f9cfa)
Across bundling, install, DNS, shell, streams, and event-loop code, a long series of commits replaced handwritten vtables, callback tables, and manual cleanup paths with enums, trait objects, `Box<Self>`, `Owned*` wrappers, and reference-counted handles. The net effect is far less `unsafe` code and much clearer lifetime ownership around core runtime subsystems.

### **Tar/npm mode now matches npm more closely** (d4596e9)
The tar reader’s npm mode was tightened to follow npm’s behavior in more places, including filename handling and gzip-layer expectations, while keeping the general archive mode separate. This matters for install/publish interoperability and for edge cases where Bun previously accepted tarballs npm would reject.

### Other misc changes
- HTTP/2 auto-flush ref cleanup and associated borrow-lifetime adjustments
- Thread-pool deinit ownership cleanup for worker shutdown
- Blob/source-map/internal resource ownership refactors
- Markdown parser typed-vector refactor
- Misc baseline/test updates and small supporting edits
