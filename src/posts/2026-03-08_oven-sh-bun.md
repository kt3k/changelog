---
date: 2026-03-08
repo: oven-sh/bun
size: L
title: "Two TLS fixes and a tiny typo cleanup"
excerpt: "Bun fixed a proxy-tunnel SSLConfig race and custom DNS lookup TLS verification, plus a minor comment spelling fix."
commits: 3
authors: [ssing2, cirospaciari, robobun]
commit_authors: {"06b2ba7": ssing2, "7b8aabb": cirospaciari, "7ce4120": robobun}
---

### **Fix SSLConfig intern/deref race that could segfault in proxy tunnels** (7b8aabb)
Bun rewired interned SSLConfig lifetime management to avoid a weak-cache refcount race that could leave freed cert/key strings behind and crash in proxy tunnel setup. The fix adds null guards in the OpenSSL string helpers, changes SSLConfig to use shared pointer semantics, and adds regression coverage for the race.

### **Preserve the original hostname for TLS verification with custom lookup** (7ce4120)
When a custom DNS `lookup` returned an IP, Bun could verify the certificate against the wrong hostname and fail TLS handshakes with alt-name errors. This update keeps the original hostname for SNI/cert checks, strips port suffixes where needed, and adjusts Host header handling for default ports.

### Other misc changes
- Comment typo fix in codegen: “seperately” → “separately” (06b2ba7)
