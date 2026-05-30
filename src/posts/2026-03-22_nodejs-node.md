---
date: 2026-03-22
repo: nodejs/node
size: M
title: "Test runner timeout fix lands with docs tweaks"
excerpt: "A fake-timers compatibility fix stands out, alongside small docs updates and a V8 tooling override."
commits: 4
authors: [JeffMatson, RafaelGSS, mcollina, richardlau]
commit_authors: {"61102cd": JeffMatson, "5d900be": RafaelGSS, "8199f9c": mcollina, "abff716": richardlau}
---

### **Test runner no longer trips over fake timers** (8199f9c)
The test runner now uses `clearTimeout()` during timeout cleanup instead of calling `timer[SymbolDispose]()`, which avoids breaking when timer shims return non-disposable objects. A new regression test covers the fake-timers case so timeout cleanup keeps working with Sinon-style implementations.

### **Other misc changes**
- Docs typo cleanup in `doc/api/vm.md` (61102cd)
- Release docs updated to point `--security` at `../vulnerabilities.json` (5d900be)
- Override V8 `depot_tools` to a newer revision for Python 3.12 compatibility (abff716)
