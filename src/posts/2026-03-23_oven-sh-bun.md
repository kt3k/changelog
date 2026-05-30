---
date: 2026-03-23
repo: oven-sh/bun
size: M
title: "Bun hardens streams and socket args"
excerpt: "Pipe now catches write errors instead of crashing, and listen/connect reject empty hostname or unix values cleanly."
commits: 2
authors: [robobun]
commit_authors: {"2920fac": robobun, "2d4c2be": robobun}
---

### **Pipe now catches dest.write() failures** (2920fac)
Readable.pipe() now wraps `dest.write(chunk)` in a try/catch and destroys the destination stream on error instead of letting the exception crash the process. This fixes object-mode-to-byte-mode piping where `ERR_INVALID_ARG_TYPE` was previously uncatchable, and adds a regression test for emitted errors.

### **Empty hostname/unix coercions now fail cleanly** (2d4c2be)
`Bun.listen()` and `Bun.connect()` now return a proper invalid-arguments error when a truthy value coerces to an empty hostname or unix path, rather than hitting an internal assertion. The new tests cover cases like `[]` and `new String("")`, ensuring these inputs are rejected predictably.

### Other misc changes
- None.
