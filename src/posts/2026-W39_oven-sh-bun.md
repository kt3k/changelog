---
date: 2026-09-27
repo: oven-sh/bun
period: weekly
slug: 2026-W39
period_label: "Sep 21–27, 2026"
size: L
title: "Bun sharpens TLS, streams, and build reliability"
excerpt: "A week of major correctness and security fixes across TLS, streams, HTTP, SQL, plus new bytecode-ordering and S3 test infra."
commits: 125
---

### **TLS got much stricter and safer**
Bun spent most of the week hardening TLS across clients, servers, and WebSockets. It now rejects bad chains earlier, stops sending client certs before a failure is known, preserves handshake writes correctly, and fixes hostname/SNI handling, session resumption, and renegotiation edge cases. Server-side context updates now really apply to new sockets, and several shutdown races were closed to avoid leaks and use-after-free style bugs.

### **Streams, fetch, and body handling were made more Node-like**
Native readers now surface abort reasons correctly, locked stream errors regain `ERR_INVALID_STATE`, and direct stream reads settle in the right order so data is not lost. Fetch also fixes oversized `arrayBuffer()`/`bytes()` handling and gzip fast-path performance, while legacy and async-iterable body sources now fail or propagate errors instead of hanging or truncating.

### **HTTP, HTTP/2, and sockets got important correctness and hardening fixes**
`node:http` behavior was brought closer to Node across request and response lifecycles, and `node:http2` now rate-limits rapid resets per connection. Socket writes, disconnect events, accepted-socket shutdown, and wrapped TLS transport teardown all received fixes that make error reporting and close semantics more predictable.

### **SQL, spawn, and process APIs were tightened up**
Postgres and MySQL both got queueing and decode-failure fixes so one bad request does not poison the rest of the connection. Spawn was corrected to keep stdio-adjacent fds out of child processes and to avoid IPC short writes and fd-slot collisions. `process.exit()` and `fs` callback ordering were also aligned more closely with Node.

### **Build and runtime performance saw several targeted wins**
The event loop and promise rejection tracking were optimized, `vm` option parsing got cheaper, and next-tick checkpoints avoid empty work. Bun also added bytecode order-file support for compiled apps, native build timing instrumentation, and removed `archive-link` from the build pipeline. On the compiler side, TinyCC is now serialized across threads, and `buffer.transcode()` no longer crashes on very large outputs.

### **Other misc changes**
- Added a self-contained Bun S3 test server to replace MinIO in CI/tests.
- Image decoding now tolerates warned JPEGs and fixes a cropping overflow path.
- Windows install cleanup, secrets persistence options, cron edge cases, and parser diagnostics were improved.
- Various docs, dead-code removals, CI updates, and test harness cleanups.
