---
date: 2026-04-14
repo: oven-sh/bun
size: L
title: "Bun fixes SQL, bundling, and profiling bugs"
excerpt: "MySQL hangs, Mach-O signing, CPU profiles, timeout handling, and more got meaningful fixes; a WebKit bump landed too."
commits: 15
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"4ee8b73": robobun, "29e035f": robobun, "d5ae67f": robobun, "27d2d0d": robobun, "9b49e90": robobun, "d4142b6": robobun, "398b630": robobun, "66210e2": robobun, "3ddb32b": dylan-conway, "0bf4528": Jarred-Sumner}
---

### **MySQL multi-statement hang fixed** (4ee8b73)
Bun.SQL's MySQL adapter no longer misparses OK/EOF terminators that carry an info string, which could make multi-statement queries hang forever against servers like ManticoreSearch. The packet-disambiguation logic now keys off the MySQL max-packet marker instead of the old `< 9` payload check.

### **Mach-O signing now sizes __LINKEDIT correctly** (398b630)
Cross-compiling to `bun-darwin-arm64` was producing binaries that macOS rejected on startup because `LC_CODE_SIGNATURE` and `__LINKEDIT` were being sized from the template signature instead of the signer’s actual output. Bun now computes the exact signature size up front and updates the load command even when the bundle fits the template slot, fixing broken signed binaries.

### **CPU profiles now match Node/Deno DevTools format** (29e035f)
`--cpu-prof` output was over-fragmented, with repeated function nodes tied to sample positions instead of stable call frames. This update makes Bun's `.cpuprofile` much closer to the Chrome DevTools format used by Node and Deno, improving profile readability and tooling compatibility.

### **Standalone HTML inlines JS-imported file-loader assets** (d5ae67f)
Browser standalone builds now inline assets imported from JS into the generated HTML instead of leaving broken sidecar paths behind. That fixes cases like logo SVGs disappearing from compiled React HTML outputs.

### **Re-exported string-literal names preserve their quotes** (27d2d0d)
The JS printer now preserves string-literal export names in `export { ... } from 'mod'` clauses, avoiding invalid output like `export { a b c }`. This fixes a real transpilation bug for unusual but valid module export names.

### **AbortSignal.timeout() no longer leaks refs** (9b49e90)
Bun now releases the extra ref taken by `AbortSignal.timeout()` when listeners disappear before the timer fires, and it also cancels dead timeout signals once they have no observers left. This fixes unbounded memory growth in `util.aborted()`-style usage.

### **Socket.setTimeout() now resets on incoming data** (66210e2)
Net sockets now refresh their idle timer on reads as well as writes, matching Node's documented inactivity semantics. Long-lived receive-only connections should no longer spuriously emit `timeout` while data is flowing.

### **Retry stat-family syscalls on EINTR** (3ddb32b)
`stat`, `lstat`, `fstat`, and related calls now retry automatically when interrupted by a signal instead of surfacing `EINTR` to JS. This makes filesystem probing more robust on platforms where vnode/path resolution can be interrupted.

### **MySQL binlink fallback fixed for nativeDependencies** (0bf4528)
`bunx`/install flows that rely on native dependency bin links now handle missing platform-specific targets correctly and fall back to the original package when needed. That fixes a class of "could not determine executable to run" failures.

### **MySQL `AbortSignal.timeout()` hang/leak regression and bundle/plugin race fixed** (d4142b6)
A segfault in bundler plugin `onResolve` races with failed sibling imports was fixed, along with a regression test for the crash path. The patch makes resolver state handling safer when one import fails while another is being externally resolved.

### **Other misc changes**
- WebKit upgraded twice, including a larger bump to `b39129e...` and a smaller one to `4d5e75e...`.
- MySQL prepared-statement/result-set parsing fix also added regression coverage.
- Dependency update workflows were migrated to `scripts/build/deps/*.ts` and repaired for future bumps.
- Several regression tests were added for the fixes above.
