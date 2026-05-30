---
date: 2026-03-07
repo: nodejs/node
size: S
title: "Electron 42 ABI reserved; updater hardened"
excerpt: "Node reserved module version 146 for Electron 42, and a fixture update script now fails fast when it can't find the expected SHA."
commits: 2
authors: [Trott]
commit_authors: {"1bd17b4": Trott}
---

### **Reserve NMV 146 for Electron 42** (f38a739)
Node's ABI registry now includes module version 146 for Electron 42, keeping the published compatibility map in sync with the next Electron release.

### Other misc changes
- Hardened `update-test426-fixtures.sh` error handling so it exits with a clear failure if the expected commit SHA can't be found in the README (1bd17b4).
