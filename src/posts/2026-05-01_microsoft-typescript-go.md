---
date: 2026-05-01
repo: microsoft/typescript-go
size: M
title: "Telemetry experiments and watcher scans improved"
excerpt: "The extension now initializes TAS experimentation telemetry, and the file watcher removes redundant directory hashing while slowing its poll loop."
commits: 2
authors: [DanielRosenwasser, andrewbranch]
commit_authors: {"6dff52f": DanielRosenwasser, "0fa4110": andrewbranch}
---

### **Extension wires up TAS experimentation telemetry** (6dff52f)
The VS Code extension now creates an `ExperimentationService` during activation, using `vscode-tas-client` to set shared telemetry properties for treatments/flights. This lays the groundwork for experiment-driven behavior, even though the current code only instantiates the service for telemetry context.

### **Polling watcher drops redundant directory work** (0fa4110)
The file watcher now avoids re-hashing directory contents on every scan and instead tracks explicit paths and wildcard directories more directly. It also raises the default watch interval from 1s to 2s and adds an opt-in `TS_WATCH_DEBUG` log hook, reducing unnecessary polling overhead while preserving debouncing behavior.

### Other misc changes
- Watcher tests and internal refactors around the new scan logic
- Extension cleanup and build metadata updates, including a new TAS client dependency
