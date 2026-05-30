---
date: 2026-03-25
repo: nodejs/node
size: M
title: "Doc-kit swap and debugger test fix"
excerpt: "Node.js switched its doc tool to the npm-published doc-kit and tightened a flaky debugger restart test."
commits: 2
authors: [inoway46, avivkeller]
commit_authors: {"9137925": inoway46, "583c479": avivkeller}
---

### **Switch tools/doc to npm-published doc-kit** (583c479)
Node.js now depends on `@node-core/doc-kit@1.0.2` instead of fetching `@nodejs/doc-kit` from a GitHub tarball. The update also removes the custom doc-kit updater scripts and adjusts build/workflow paths so the new package location is used consistently.

### **Stabilize debugger restart test timing** (9137925)
The debugger restart test now sends `run` as a normal command instead of a step command, avoiding a flaky wait during restart. This makes the test less timing-sensitive and reduces intermittent failures.

### Other misc changes
- None beyond the two notable commits.
