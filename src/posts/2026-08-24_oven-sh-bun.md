---
date: 2026-08-24
repo: oven-sh/bun
size: L
title: "Bun tightens timers, fs, sockets, and compile output"
excerpt: "A packed day of bug fixes and runtime refactors across test timing, Node fs/worker compatibility, networking, SQL parsing, and compiled builds."
commits: 19
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"4441116": robobun, "8335017": robobun, "29b958f": robobun, "b746c07": robobun, "df75206": robobun, "66a8b88": robobun, "a73ed27": robobun, "861e9ae": Jarred-Sumner, "4d35aad": Jarred-Sumner, "f2fe7d3": robobun, "e54bbfa": robobun, "e625fb7": dylan-conway, "f039a9c": Jarred-Sumner, "aeb1905": dylan-conway, "865130f": Jarred-Sumner, "bc713f9": dylan-conway, "aff756f": robobun, "7a5d837": dylan-conway, "9dd7374": Jarred-Sumner}
---

### **Fake timers now move `performance.timeOrigin` too** (29b958f)
Bun’s test fake clock now keeps `performance.timeOrigin` in sync with `Date.now()` and `performance.now()` under `jest.useFakeTimers({ now })`. That fixes traces and other code that compute `timeOrigin + performance.now()` from jumping back to the real process start.

### **Node fs callbacks now reject long paths instead of throwing** (8335017)
Callback-style `node:fs` APIs now surface `ENAMETOOLONG` through the promise/callback path instead of throwing synchronously when a pathname exceeds syscall limits. This brings Bun in line with Node and prevents hard-to-handle crashes for oversized paths.

### **Worker threads stop trusting mutable global MessagePort constructors** (b746c07)
`node:worker_threads` now uses the intrinsic `MessagePort`/`MessageChannel` instead of whatever user code put on `globalThis`. That avoids breakage when preloaders or DOM shims replace the globals before Bun initializes worker messaging.

### **Deep object matching now throws RangeError instead of segfaulting** (df75206)
`expect(...).toMatchObject(...)` and `Bun.deepMatch(...)` no longer crash the process on extremely deep recursion. The fix turns stack exhaustion into a proper `RangeError`, which is the expected failure mode for runaway structural comparisons.

### **PowerShell completions fail gracefully on non-Windows hosts** (66a8b88)
`bun completions` now reports missing PowerShell completion support on macOS/Linux instead of hitting an unreachable panic. That also protects `bun upgrade` and `install.sh`, which invoke the same completion path.

### **node:assert deepStrictEqual now matches Node’s constructor rules** (a73ed27)
Bun’s `assert.deepStrictEqual` no longer requires prototype identity in the Node-compatible path. This fixes real-world test suite failures where structurally equal objects were being rejected for using different constructors/prototypes.

### **mimalloc bumps to a safer heap teardown protocol** (861e9ae)
Bun updates its bundled mimalloc dependency to a release that consolidates heap delete/destroy handling. The change is aimed at closing teardown races around concurrent frees and stale heap references.

### **Compiled executables now alias bytecode instead of copying it** (4d35aad)
`bun build --compile --bytecode` gets a major space-and-startup optimization: bytecode is now read in place from the embedded section rather than copied into heap memory. The build pipeline also lays out module data in load order and shares encoder string tables more aggressively, reducing binary size and improving startup locality.

### **Postgres timestamptz text decoding now handles seconds in offsets** (f2fe7d3)
Text-format `timestamptz` values are parsed from their components instead of relying on `Date.parse`, which failed on historical offsets like `-04:56:02`. That fixes `Invalid Date` results for older timestamps and other zones that emit second-level offsets.

### **Paused sockets keep reading enough to notice peer close** (e54bbfa)
Bun’s net/socket layer now preserves read interest correctly for paused sockets, matching Node’s behavior. That lets paused connections still observe FIN/RST and prevents hangs where `end`/`close` never arrive.

### **Blob/file writers now throw on invalid start options** (4441116)
`Blob.get_writer` and `FileSink.start` now surface `Start::Err` instead of silently falling back to a working writer. Invalid `path`/`fd` options now fail loudly, which is a correctness fix for file-writing APIs.

### **String-like values are no longer cast unsafely after loose string checks** (e625fb7)
Several bindings that accepted `String`, `StringObject`, or `DerivedStringObject` values now avoid unchecked `JSString*` casts after a broad `is_string()` guard. This removes a class of bad-cast bugs in node cluster, IPC, and Valkey paths.

### **`--compile` module graphs are now laid out in startup order** (f039a9c)
Bun changes compiled output ordering so per-module data is written in the order the app loads modules at startup, rather than chunk index order. For large split builds, that should reduce wasted I/O and improve cold-start behavior.

### **Node compatibility bindings stop running after exceptions** (aeb1905)
A broad set of Node-facing bindings now bail out immediately once a JS exception is thrown instead of continuing with stale return values. The fix covers cases like HTTP parser callbacks, X509 getters, Buffer/BigInt64Array handling, and structured-clone deserialization.

### **Structured clone string pools stay alive during deserialization** (865130f)
Bun keeps the deserializer’s interned string pool GC-visible while rebuilding object graphs for `postMessage`, `structuredClone`, and IPC serialization. That prevents use-after-free style bugs when back-references reuse a string that would otherwise be collected mid-deserialization.

### **`bun_core::String` now owns its ref correctly** (bc713f9)
A major internal refactor changes `bun_core::String` from a copyable POD-style wrapper into an owned/ref-counted type. This touches a wide swath of Rust and FFI call sites and should eliminate a large class of lifetime bugs around shared WTF strings.

### **REPL completions no longer enumerate huge typed-array indices** (aff756f)
The REPL stopped walking index properties when computing completions, which prevents pathological hangs on large Buffers and typed arrays. That fixes a serious usability regression where a simple `data.` could lock up the session.

### **Redundant exception checks were removed across bindings** (7a5d837)
A cleanup pass removed exception guards that could never trigger because the preceding call had already been checked. This is mostly internal noise reduction, not a behavior change.

### **Ctrl+C now stays with `bun run` scripts on Windows** (9dd7374)
Windows run/shim logic now lets the child process handle Ctrl+C instead of having Bun exit first with `STATUS_CONTROL_C_EXIT`. The shell/runtime also tracks interrupt propagation so exit behavior better matches the child’s actual termination.

### Other misc changes
- mimalloc dependency bump (1 commit)
- Internal ownership/documentation refactors around `String` and URL helpers
- Minor exception-check cleanup and test updates
