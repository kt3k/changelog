---
date: 2026-04-21
repo: oven-sh/bun
size: L
title: "Windows PTYs, faster installs, and Bun SQL fixes"
excerpt: "Bun added Windows Terminal support, sped up isolated installs, and fixed several correctness bugs in transpiling, SQL, TLS, and bunx."
commits: 18
authors: [Jarred-Sumner, robobun, cirospaciari, dylan-conway, alii]
commit_authors: {"28bace1": Jarred-Sumner, "c77b7d6": robobun, "1164dd6": cirospaciari, "48901bb": robobun, "c14e37e": cirospaciari, "4311f5b": robobun, "f32e595": dylan-conway, "33356e8": alii, "7c73f05": Jarred-Sumner, "2510d48": Jarred-Sumner, "49bd48c": Jarred-Sumner, "1b93e94": Jarred-Sumner, "fe8f190": Jarred-Sumner, "912405a": robobun, "dafe6ff": Jarred-Sumner, "460a065": cirospaciari, "c8e6aa1": robobun, "b424e70": robobun}
---

### **Windows `Bun.Terminal` now works via ConPTY** (f32e595)
Bun now implements `Bun.Terminal` and `Bun.spawn({ terminal })` on Windows using ConPTY, bringing PTY-style child process support to the platform. This is a major cross-platform feature, with new docs and tests covering Windows-specific behavior and limitations.

### **Isolated installs get a global virtual store for much faster warm installs** (7c73f05)
The isolated linker now uses a shared global store by default, so warm installs symlink packages instead of cloning or copying them per project. The change is positioned as a big speedup for repeat installs and multi-checkout workflows, with docs and tests showing the new model and its opt-out.

### **`bunx` no longer grabs unrelated system binaries for scoped packages** (912405a)
`bunx` now treats guessed bin names from scoped package names as unsafe to search in the full system `$PATH`, avoiding collisions like running `/usr/bin/install` for `bunx @scope/install`. That closes a real resolution bug and makes package bin lookup more predictable.

### **`using` / `await using` are no longer lowered when targeting Bun** (c77b7d6)
Bun now leaves explicit resource management syntax intact when the target is Bun, since JavaScriptCore already supports it natively. This reduces unnecessary transforms across the runtime transpiler, bundler, and REPL while preserving disposal semantics in the places that still need lowering.

### **MySQL prepared queries now wait for all result sets** (1164dd6)
The SQL MySQL path now accumulates multi-result responses until the server indicates the query is truly finished, instead of resolving early on the first result set. That fixes a stored-procedure bug where trailing packets could surface as uncaught errors outside the caller’s `catch`.

### **TLS `getCACertificates('system')` now always returns the OS store** (460a065)
System CA lookup is now lazy-loaded on demand and no longer depends on `--use-system-ca` for the `'system'` API. This aligns Bun with Node’s behavior and fixes empty results for callers expecting the OS trust store.

### **`mock.module()` now validates its callback before resolver side effects** (c8e6aa1)
Bun now checks that `mock.module(specifier, fn)` actually received a callable before attempting module resolution. That prevents a crash-prone path where resolution could reenter the event loop or auto-install machinery before the type error was thrown.

### **Standalone binaries drop embedded source pages after startup** (c14e37e)
Compiled standalone apps now `madvise(MADV_DONTNEED)` their embedded source section after the entrypoint has loaded and microtasks drain. This should reduce memory pressure for compiled apps while keeping lazy fault-in behavior for stack traces and deferred loads.

### **Shell leak sweep fixed fd/memory retention across many code paths** (1b93e94)
A broad shell audit tightened file-descriptor and memory handling across interpreter, IO, builtin commands, and subprocess state machines. The main impact is fewer leaked fds and more reliable cleanup around async shell execution.

### **Other misc changes**
- Deflake install and cron tests; move bun-types check to GitHub Actions (28bace1)
- Improve docs and CLAUDE guidance for test placement (4311f5b, 48901bb)
- Deduplicate bun-types FFI enum aliases for tsgo compatibility (b424e70)
- Run tsgo in bun-types tests (33356e8)
- Remove redundant codegen output constraints (fe8f190)
- Avoid forcing `BuiltinFunctions::visit<>` instantiation in every TU (2510d48)
- Out-of-line `BunBuiltinNames` ctor and drop unused builtin names (49bd48c)
- Add GC skill docs (dafe6ff)
