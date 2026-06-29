---
date: 2026-06-28
repo: nodejs/node
size: M
title: "VFS security guidance tightened"
excerpt: "Node.js clarified that vfs is not a sandbox and updated SECURITY.md access lists."
commits: 2
authors: [richardlau, mcollina]
commit_authors: {"92b72d4": richardlau, "af100d1": mcollina}
---

### **Clarify `node:vfs` is not a security boundary** (af100d1)
The VFS docs now explicitly say the experimental `node:vfs` API is for testing, fixtures, and managed storage—not for isolating untrusted code. The security policy was also expanded to spell out that mounts, providers, and `RealFSProvider` path checks are not sandbox guarantees.

### **Refresh SECURITY.md access lists** (92b72d4)
Updated the named people who can access private security reports and private security patches. This keeps the repo’s security contacts current.

### Other misc changes
- Documentation wording and examples updated in `doc/api/vfs.md`
- Minor SECURITY.md list maintenance
