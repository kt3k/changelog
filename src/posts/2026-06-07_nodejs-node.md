---
date: 2026-06-07
repo: nodejs/node
size: M
title: "Abortable stream reads and C++14 deprecations"
excerpt: "A stream iterator abort fix lands alongside a Node core deprecation macro cleanup; docs also get a minor release-note link update."
commits: 3
authors: [trivikr, addaleax, parkhojeong]
commit_authors: {"822ef3a": trivikr, "4826d74": addaleax, "45f6b83": parkhojeong}
---

### **Reject pending stream pulls when aborted** (822ef3a)
`pull()` now races in-flight source reads against the provided `AbortSignal`, so a pending `next()` can reject promptly even if the source hasn't yielded yet. This fixes a real abort-cancellation gap in async stream iteration and adds coverage for the new behavior.

### **Use standard `[[deprecated]]` for NODE_DEPRECATED** (4826d74)
`NODE_DEPRECATED` is switched from compiler-specific attributes to the C++14-standard `[[deprecated(message)]]` form. That simplifies the macro and makes the deprecation annotation more portable across toolchains.

### Other misc changes
- Release docs: update npm supported-versions link (45f6b83)
