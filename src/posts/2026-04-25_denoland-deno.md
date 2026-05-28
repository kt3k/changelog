---
date: 2026-04-25
repo: denoland/deno
size: L
title: "Deno tightens Node parity across core APIs"
excerpt: "Major Node-compat work landed in timers, TLS, fs, fetch, and web cloning, plus a macOS permission fix and fs event path normalization."
commits: 55
authors: [nathanwhitbot, fibibot, divybot, bartlomieju, lunadogbot, nathanwhit, JimmyBowcott, ry]
commit_authors: {"c149dd0": fibibot, "d96c05e": bartlomieju, "5a14d2c": fibibot, "35532a3": bartlomieju, "8e15d6e": fibibot, "54aa01c": nathanwhitbot, "318503f": nathanwhitbot, "ff403ee": fibibot}
---

### **TLS servers now honor client cert settings** (8e15d6e)
`node:tls` server setup now respects `requestCert`, `rejectUnauthorized`, and `ca` instead of always using no-client-auth. This fixes peer certificate reporting and aligns server-side handshake behavior much more closely with Node.

### **structuredClone now rejects non-serializable Web types** (5a14d2c)
`Request`, `Response`, `Headers`, and the stream classes are marked non-serializable so `structuredClone(value)` throws `DataCloneError` instead of silently round-tripping them as `{}`. That closes a spec/Node parity gap and prevents misleading clone results for platform objects.

### **fs.watchFs paths are normalized before emission** (c149dd0)
Watch events now strip stray `./` and `..` segments from reported paths, even when the watcher is created with a relative path like `./`. This fixes noisy, confusing event output and makes file watch results more usable across platforms.

### **macOS permissions now compare filesystem-equivalent paths** (35532a3)
Permission checks now normalize Unicode-equivalent and case-equivalent paths on macOS before comparing them. That brings permission decisions in line with APFS behavior, avoiding false mismatches for paths that refer to the same inode.

### **Byte streams are preserved for Node request bodies** (ff403ee)
Passing a binary `stream.Readable`/`IncomingMessage` into `Request` now produces a byte `ReadableStream`, so BYOB readers work as expected. This fixes an important interop break for proxying and other streaming HTTP code.

### **Node fs and timer semantics got a batch of fixes** (54aa01c, 318503f, d96c05e)
Several `fs` paths now validate arguments and attach richer error metadata, including `path`, `syscall`, and correct `truncate`/`ftruncate` behavior. Timers also gained Node-compatible handling around repeat state and a `close()` method, improving compatibility for code that relies on Node’s timer internals.

### **Other misc changes**
- Enabled a large batch of already-passing `node_compat` tests and ignored a few unsupported ones.
- Numerous Node-compat parity fixes for crypto, process, dgram, vm, console, abort signals, URL errors, and fs watcher behavior.
- WPT expectation updates and runner log cleanup.
- Small docs/style and internal test tweaks.
