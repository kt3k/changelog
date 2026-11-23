---
date: 2026-11-22
repo: nodejs/node
size: L
title: "Streams iter gets a major speedup push"
excerpt: "Node shipped TLS, SQLite, fs, and URL fixes, but the headline is a sweeping stream/iter refactor that cuts allocations and async overhead."
commits: 68
authors: [jasnell, christianaurichzm, ShogunPanda, gengjiawen, irontaek, lemire, aduh95, LiviaMedeiros, JuHyeong424, araujogui, aayushbtw, fatihguzeldev, Renegade334, nodejs-github-bot, inoway46]
commit_authors: {"3189560": gengjiawen, "10f56c3": jasnell, "2566f1b": christianaurichzm, "97d5d90": ShogunPanda, "f428cf2": gengjiawen, "9a2046e": aduh95, "626d61a": LiviaMedeiros, "d46aecc": jasnell, "a8faad0": jasnell, "b2c5fd1": jasnell, "4a77c8d": jasnell, "01c5543": jasnell, "97de6e0": jasnell, "d58dc09": jasnell, "0da0a1b": jasnell, "ec97d64": araujogui, "d3fdcc6": christianaurichzm, "4f6a561": aayushbtw, "eb86d28": ShogunPanda, "d53c581": fatihguzeldev, "d5570d9": Renegade334, "01f381e": nodejs-github-bot, "0d27382": inoway46, "2ab7bc0": irontaek, "8fd96f4": irontaek}
---

### **Stream/iter gets a broad performance and refactor sweep**
A large series of commits reworked `stream/iter` to remove async-generator layers, reduce promise churn, and avoid quadratic queue behavior in hot paths like `from()`, `pull()`, `share()`, `broadcast()`, `push()`, and `merge()` (e.g. `d58dc09`, `0da0a1b`, `b2c5fd1`, `97de6e0`). These changes also add cheaper batching and snapshotting paths, plus tests and docs updates, and are intended to materially improve throughput and memory use across iterable streams.

### **TLS and HTTPS fix correctness issues in edge cases**
`https.Agent#getName()` now encodes all TLS-related option fields before pooling, preventing collisions when option values contain separator characters and fixing incorrect handling of some typed values like `dhparam`/`sigalgs` (`97d5d90`). TLS also fixes a handshake-after-destroy bug and an OCSP/SNI certificate-reporting issue, avoiding incorrect completion of destroyed sockets (`eb86d28`).

### **SQLite fixes empty buffers, query tracing, and close-time cleanup**
SQLite now binds and returns empty `ArrayBuffer`/`SharedArrayBuffer` values as empty blobs instead of NULL, which fixes a real data-loss edge case (`ec97d64`). It also avoids publishing diagnostic-channel events while an exception is already pending, and finalizes statements prepared during connection close so virtual-table teardown cannot leak live statements (`f428cf2`, `3189560`).

### **fs and net fix crashes on rare buffer/length edge cases**
`fs.write()`/`fs.writeSync()`/`filehandle.write()` no longer abort on negative zero write lengths, matching the existing read-side behavior (`2566f1b`). Separately, `net` and TLS onread buffers are now revalidated before each read, preventing writes into detached or stale backing stores (`d53c581`).

### **URLSearchParams parsing no longer rescans endlessly**
`URLSearchParams` parsing now remembers the next `=` across pairs, so inputs with long runs of `a&` no longer degrade quadratically (`4f6a561`). This is a notable performance fix for both direct parsing and urlencoded form handling.

### Other misc changes
- `--process-timeout` graduated in the CLI docs (`10f56c3`).
- `sqlite` is now marked stable in docs (`d3fdcc6`).
- ICU updated to 79.1, with follow-up Intl test adjustments (`01f381e`, `d5570d9`).
- Release proposal linting no longer stops at the first error (`9a2046e`).
- A few small stream/iter API/docs cleanups and benchmark/test fixes (`626d61a`, `d46aecc`, `a8faad0`, `01c5543`, `4a77c8d`, `0d27382`, `2ab7bc0`, `8fd96f4`).
