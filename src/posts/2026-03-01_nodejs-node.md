---
date: 2026-03-01
repo: nodejs/node
size: M
title: "Minimatch update and test cleanup"
excerpt: "Node updates minimatch with security/perf guidance, fixes ESM docs, and trims several test/process-exit patterns."
commits: 6
authors: [aduh95, nodejs-github-bot, Renegade334, richardlau]
commit_authors: {"4d0cb65": nodejs-github-bot, "0994958": Renegade334, "101d58c": richardlau, "f951acf": aduh95, "a5e534c": aduh95}
---

### **minimatch upgraded with security/performance hardening** (4d0cb65)
Node vendored minimatch to 10.2.4, bringing a substantial rewrite of the matcher internals and updated type surfaces. The new README warns about ReDoS risk from untrusted glob patterns and documents recursion limits intended to trade a bit of correctness for safety and performance.

### **Test suite and benchmark stop relying on `process.exit()`** (f951acf)
Several child-process and CLI tests were simplified to return naturally or use `common.mustCall()` instead of forcing exit paths. This makes the tests less brittle and better at exercising real shutdown behavior, while also cleaning up a benchmark skip path.

### **WPT `test-url` now skips explicitly on shared Ada builds** (a5e534c)
The `test-url` Web Platform Test now self-skips when Node is built with shared Ada, matching the existing environment-specific workaround in `shell.nix`. That keeps the skip logic close to the test and avoids relying solely on shell configuration.

### Other misc changes
- ESM docs: minor wording fix in `DETECT_MODULE_SYNTAX` (0994958)
- Clang-format tool dependency bump for minimatch (d310cd2)
- Fix execute bit on `tools/dep_updaters/update-merve.sh` (101d58c)
