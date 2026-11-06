---
date: 2026-11-05
repo: oven-sh/bun
size: M
title: "Bun trims SSH servers and unsafe Rust"
excerpt: "Linux CI images now drop sshd, and a broad Rust refactor removes 125 unsafe blocks across IPC, parsers, crypto bindings, and more."
commits: 2
authors: [dylan-conway]
commit_authors: {"b1305dd": dylan-conway, "b1007f1": dylan-conway}
---

### **Linux CI images now exclude the SSH server** (b1305dd)
The Linux bake now installs the SSH client while explicitly removing the server, then fails the image build if any sshd binary is still present. This keeps the CI images cleaner and avoids shipping host-key-generating services in the base image.

### **Large Rust safety cleanup removes 125 unsafe blocks** (b1007f1)
This commit replaces a wide set of raw-pointer and slice-casting patterns with safer typed APIs across AOT, IPC/N-API neighbors, `bun:ffi`, `node:zlib`, c-ares, BoringSSL, `node:quic`, and parser/printer/CSS code. The main impact is reduced unsoundness and clearer ownership/lifetime signatures, which should make these bindings and internal helpers easier to maintain and audit.

### Other misc changes
- CI image docs and guardrails updated for the new SSH-client-only Linux bake.
- Build-image tooling gained purge/remove helpers and a final no-SSH-server check.
