---
date: 2026-11-27
repo: nodejs/node
size: L
title: "Crypto X.509 hardening and API cleanup"
excerpt: "Node.js unflags text imports, adds http2 request abort signals, fixes several crypto and fs edge cases, and hardens sqlite/http client behavior."
commits: 17
authors: [pimterry, legendecas, LiviaMedeiros, joyeecheung, panva, mcollina, christianaurichzm, inoway46, avivkeller, IlyasShabi, manusingh090]
commit_authors: {"4afd7d6": pimterry, "6ce2fae": pimterry, "7ed1ca0": mcollina, "949f252": legendecas, "2fdac69": christianaurichzm, "d833320": inoway46}
---

### **HTTP/2 compat requests now expose `request.signal`** (d833320)
`Http2ServerRequest` gains an AbortSignal that aborts when the stream closes before the response finishes, matching HTTP/1 request semantics. This gives apps a clean way to cancel downstream work like fetches or DB queries when the client goes away.

### **Crypto X.509 generation tightens validation and PSS defaults** (4afd7d6, 6ce2fae)
X.509 key-identifier extensions now reject empty `subjectKeyIdentifier` / `authorityKeyIdentifier` inputs, and generated AKI/SKI handling consistently rejects empty values. The PSS signing path also gets a better default salt length for certificate generation, fixing cases where generated certs could carry incompatible RSA-PSS parameters.

### **`--experimental-import-text` is unflagged** (949f252)
Text-module imports are promoted out of the experimental flag, and the CLI/docs now describe the inverse `--no-experimental-import-text` toggle. The tests and manpage/docs were updated to reflect the new default behavior.

### **HTTP client keeps forwarding `drain` after early responses** (7ed1ca0)
When a server responds before the request body is fully written, the client now keeps relaying socket `drain` events until the request actually finishes. This fixes a backpressure deadlock where writers could stall forever and keep the process alive.

### **SQLite stops aborting on oversized SQL text** (2fdac69)
SQLite string conversion now passes explicit lengths instead of relying on unbounded UTF-8 conversion, avoiding V8 aborts on huge SQL strings. Oversized source/expanded SQL and column names now fail cleanly, and query tracing skips invalid events instead of crashing.

### Other misc changes
- `node-api`: clear pending exceptions before re-entering exception handlers
- `fs`: harden one-round-trip read/write jobs and permission handling
- `src`: V8 embedder-data API migrations and related build config updates
- `tools`, `build`, `doc`: refactors for the doc/build redesign
- `crypto`: doc clarification and X.509 generation behavior cleanup
- `lib`: lint/internal refactors around `Symbol.[Async]Dispose` aliases
- Misc source consistency cleanups (`V8 using` declarations, etc.)
