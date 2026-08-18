---
date: 2026-08-17
repo: denoland/deno
size: L
title: "Multipart, crypto, and process fixes land"
excerpt: "Multipart parsing, crypto correctness, Node compatibility, and several process/runtime bugs were fixed across the stack."
commits: 10
authors: [nathanwhit, bartlomieju]
commit_authors: {"1dea13d": nathanwhit, "b90cd5c": nathanwhit, "e518437": nathanwhit, "8c76f75": nathanwhit, "7d88089": nathanwhit, "ea07bc6": nathanwhit, "62d5bcd": bartlomieju, "b37adef": nathanwhit, "f74b15c": nathanwhit}
---

### **Multipart parser now handles RFC-compliant boundaries (1dea13d)**
The fetch form-data parser now waits for a valid opening boundary, ignores preambles, accepts transport padding, and treats an initial closing delimiter as an empty form. That fixes malformed multipart edge cases and makes parsing align much more closely with RFC 2046.

### **Windows process args now reject embedded NULs (b90cd5c)**
Windows subprocess spawning now validates every argument for internal NUL code units before command-line construction. This closes a correctness hole that could produce invalid process invocations and ensures the public spawn API surfaces the right error.

### **Node crypto cipher updates now size inputs by bytes, not elements (e518437)**
Typed-array and `DataView` inputs are now normalized using their underlying buffer, byte offset, and byte length before cipher updates and block caching. This fixes length miscalculation bugs for multi-byte views and improves compatibility with spoofed allocator behavior.

### **V8 deserialization now preserves view offsets (8c76f75)**
The Node V8 deserializer now computes raw-byte positions relative to the supplied view instead of the backing buffer, preventing double-counting of offsets. This fixes host-object deserialization from nonzero-offset slices and makes failed/out-of-range reads error out cleanly.

### **Outgoing HTTP headers are now validated in raw forms (7d88089)**
`ServerResponse.writeHead()` now validates header names and values when callers pass flat arrays, tuple arrays, or plain objects, and rejects odd-length flat arrays. This brings Deno’s Node compatibility closer to Node.js and prevents malformed outgoing header construction.

### **Gitignore parsing keeps valid rules after bad lines (ea07bc6)**
A malformed `.gitignore` line no longer discards the rest of the file’s valid patterns. The loader now warns with file and line information while preserving usable ignore rules, which also fixes publish dry-run behavior.

### **Peer-resolution cache now honors fallback-installed peers (62d5bcd)**
The npm resolver now checks peer fallbacks when deciding whether a cached peer-resolution entry still matches. This fixes a pathological re-resolution loop that could make layered dependency graphs effectively never finish.

### **MessagePort resource IDs are no longer writable (b37adef)**
`MessagePort` internal resource identifiers moved from a writable symbol property to module-private WeakMap state. That prevents user code from retargeting port operations or transfers by mutating internal bookkeeping.

### **X448 key derivation now follows RFC 7748 (f74b15c)**
Node crypto’s X448 paths now use RFC 7748 scalar decoding instead of the previous Ed448-style modulo reduction. That corrects derived public keys and shared secrets for imported X448 keys while keeping low-order peer rejection intact.

### Other misc changes
- Process loader environment validation tightened for whitespace-only values (1 commit).
- Various tests and internal refactors supporting the above fixes.
