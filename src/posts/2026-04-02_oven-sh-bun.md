---
date: 2026-04-02
repo: oven-sh/bun
size: L
title: "Proxy env updates and a blob fix land"
excerpt: "Bun now honors runtime proxy env changes in fetch, fixes a consumed-body blob crash, and ships broad doc polish plus ANSI perf work."
commits: 5
authors: [robobun, cirospaciari, Jarred-Sumner]
commit_authors: {"17bd6cb": robobun, "db0f775": robobun, "e7f2bfd": robobun, "7922fd8": cirospaciari, "4760d78": Jarred-Sumner}
---

### **fetch() now sees runtime proxy env changes** (7922fd8)
`process.env.NO_PROXY`, `HTTP_PROXY`, and `HTTPS_PROXY` updates now take effect on the next `fetch()` call instead of being stuck at startup values. This closes a real consistency gap between JS env mutations and Zig-side proxy resolution, and it extends the fix to worker-thread sharing so runtime changes stay visible across the VM.

### **Consumed body now rejects correctly in `ReadableStream.blob()`** (17bd6cb)
Calling `blob()` on a stream whose underlying response body has already been consumed now returns a rejected promise with `ERR_BODY_ALREADY_USED` instead of hitting an assertion failure. That turns a crashy host-function contract violation into a proper error path for already-used bodies.

### **Faster ANSI/string-width parsing** (4760d78)
Bun sped up `stripANSI`, `stringWidth`, and shared ANSI parsing helpers with SIMD and parsing-path optimizations. The benchmark harness was also expanded to cover more real-world ANSI, OSC, emoji, and CJK cases, which should make the performance gains easier to validate.

### **Docs copy polish across runtime and CSS guides** (e7f2bfd, db0f775)
Large-scale wording cleanup made the docs more concise, active, and consistent across many pages. A couple of repeated phrases and awkward lines in shell/CSS docs were also tightened up.

### Other misc changes
- Docs voice/clarity edits across 70+ files
- Minor wording fixes in CSS and shell docs
