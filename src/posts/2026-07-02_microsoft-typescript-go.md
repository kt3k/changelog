---
date: 2026-07-02
repo: microsoft/typescript-go
size: L
title: "Timing API lands; snapshot and diagnostics fixups"
excerpt: "Added client/server timing collection to the native preview API, plus fixes for unloaded projects, JSDoc completions, and isolated-declarations errors."
commits: 7
authors: [weswigham, jakebailey, andrewbranch, ulitink]
commit_authors: {"2483843": weswigham, "acfaa5b": weswigham, "99fbd74": andrewbranch, "6a49d85": ulitink, "4457aa7": jakebailey}
---

### **Add request timing collection to the API (99fbd74)**
The native preview API now supports collecting end-to-end request timing, including client round-trip latency, bytes transferred, server processing time, and transport overhead. It adds new `getTimingInfo()` and `resetTimingInfo()` methods, plus the wiring needed to enable timing mode on the client and server.

### **Improve unloaded-project handling in snapshot responses (6a49d85)**
Snapshot updates now skip unloaded ancestor project placeholders instead of reporting them as real projects, which avoids exposing incomplete state to callers. The response builder also hardens against nil command lines, backed by a regression test.

### **Add JSDoc snippet completions and config aliases (4457aa7)**
JSDoc completion snippets were added, and configuration resolution now accepts several `.enabled`/legacy setting aliases so missing or renamed settings still work. This also expands the fourslash test harness and generated coverage for the new completion behavior.

### **Reprioritize isolated-declarations class-expression errors (2483843)**
Class expressions under `--isolatedDeclarations` now surface the more specific inference failure instead of a generic variable-annotation error when both could apply. That makes the diagnostic more accurate and the accompanying baseline output clearer.

### **Reenable pre/post-emit diagnostic consistency checks (acfaa5b)**
The checker/emit pipeline now restores consistency checks around pre- and post-emit diagnostics and adds guards for JSX intrinsic tags and meta properties that should not be treated as real references. The change is broad and touched several baselines, indicating it tightens correctness across emit-related paths.

### **Other misc changes**
- Moved the last ID-triaged diff into accepted (#4524).
- Removed runtime metric logging from project session updates (#4518).
