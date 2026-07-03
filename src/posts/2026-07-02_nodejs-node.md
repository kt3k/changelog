---
date: 2026-07-02
repo: nodejs/node
size: L
title: "Permissions, TLA, and HTTP fixes land"
excerpt: "Node.js gains default addon import support, fixes permission propagation and TLA errors, plus HTTP, VFS, and QUIC bug fixes."
commits: 12
authors: [mcollina, trivikr, legendecas, panva, davidje13, mawalu, martenrichter, joyeecheung]
commit_authors: {"5922197": mcollina, "5d8693e": legendecas, "a6d3e93": trivikr, "615749b": davidje13, "b7e9a20": mawalu, "87d6386": martenrichter, "d7a658a": mcollina, "85c31df": joyeecheung}
---

### **Addon import support is now on by default** (5d8693e)
Node.js now enables experimental import support for `.node` addons by default, changing the option from experimental-default gated to always on. This moves the feature closer to general availability and updates the CLI docs to reflect the new default stability level.

### **`require()` TLA errors now report locations without evaluating modules** (85c31df)
The ESM/CJS bridge was reworked so Node can print top-level-await locations earlier, without waiting for module evaluation. The new path collects require-stack and TLA location info during loading, which improves the error message for `require()`-ing async module graphs and avoids unnecessary execution.

### **Child process permission flags no longer get fooled by substrings** (5922197)
Permission propagation via `NODE_OPTIONS` now checks for real `--permission`/`--permission-audit` tokens instead of substring matches. That fixes a bug where unrelated values like `--title=--permission` could block permission-model inheritance in spawned children.

### **HTTP `drain` now fires correctly after `cork()`/`uncork()`** (615749b)
`ServerResponse.uncork()` now emits `drain` immediately when buffered data is fully flushed and `writableNeedDrain` was set. This closes a reliability bug where backpressure state could get stuck after uncorking.

### **VFS sync writes now work with virtual file descriptors** (a6d3e93)
`fs.writeFileSync()` and `fs.appendFileSync()` now route numeric file descriptors owned by the VFS through the virtual handle instead of falling back to native fs calls. That preserves descriptor semantics for both in-memory VFS files and real-backed providers.

### **Addon loading respects permission drops** (b7e9a20)
Native addon loading now checks the addon permission scope before `process.dlopen()` proceeds. This closes a gap where addon access could still succeed after `process.permission.drop('addon')`.

### **QUIC inspect no longer crashes on undefined handles** (87d6386)
`QuicStreamState`’s inspector now treats an undefined handle as closed before probing its byte length. That avoids a `DataView` exception when the object is inspected in an uninitialized state.

### **Security policy docs clarify defense-in-depth issues** (d7a658a)
`SECURITY.md` now explicitly defines defense-in-depth bugs as non-vulnerabilities that do not receive CVEs. This clarifies how the project classifies hardening issues versus security-reportable flaws.

### Other misc changes
- Benchmark trimmed down the argon2 sets.
- `@node-core/doc-kit` and `undici` were bumped in `tools/doc`.
- A blob stream test was made less timing-sensitive.
