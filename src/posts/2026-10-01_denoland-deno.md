---
date: 2026-10-01
repo: denoland/deno
size: M
title: "Deno tightens compile permissions and deploy schema"
excerpt: "Compile now enforces read perms for local dynamic imports, while deploy config gains timeout and memory limit settings."
commits: 3
authors: [bartlomieju, piscisaureus]
commit_authors: {"b4f08f1": piscisaureus, "b8681df": bartlomieju, "34a123a": bartlomieju}
---

### **Compile now checks read permission for local dynamic imports** (34a123a)
Deno’s compile path now rejects dynamically imported local files unless the process has read access, matching `deno run` behavior more closely. The change also extends that check to web worker entry modules, closing a permission gap that could otherwise let host files load without the expected read gate.

### **Deploy config adds build timeout and runtime memory limits** (b4f08f1)
The deploy schema now accepts `deploy.buildTimeout` plus `deploy.runtime.memoryLimit`, with a deprecated snake_case `memory_limit` alias for compatibility. This gives users explicit control over build duration and runtime memory caps in deployment config.

### **Other misc changes**
- Node TLS/X.509v1 handling aligned with OpenSSL; added extensive certificate test fixtures and TLS wrapper refactor (b8681df)
