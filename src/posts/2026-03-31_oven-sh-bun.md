---
date: 2026-03-31
repo: oven-sh/bun
size: M
title: "Proxy tunnels get keep-alive pooling"
excerpt: "Bun reuses HTTPS proxy CONNECT tunnels, updates root CAs, and fixes a WebView test-load crash on non-macOS CI."
commits: 5
authors: [cirospaciari, Jarred-Sumner]
commit_authors: {"3ed4186": cirospaciari, "590708e": cirospaciari, "687700d": cirospaciari, "06a11c0": cirospaciari, "5c59842": Jarred-Sumner}
---

### **Reuse HTTPS proxy CONNECT tunnels** (687700d)
Bun now pools and reuses tunneled HTTPS connections through proxies instead of doing a fresh CONNECT + TLS handshake for every request. That should cut latency and connection churn for sequential proxied requests, and the redirect handling was tightened so tunnels are shut down instead of being reused across redirect targets.

### **Update the bundled root certificate set** (06a11c0)
The bundled NSS trust store was refreshed to 3.121, adding the e-Szigno TLS Root CA 2023 and fixing the leading-space label on OISTE Server Root RSA G1. This keeps Bun aligned with current browser CA trust and reduces the chance of TLS validation mismatches.

### Other misc changes
- Fixed a WebView test chain so `.todoIf()` doesn’t get called on `test.skip` during file load on Linux/Windows CI (3ed4186)
- Removed an oxlint rule that was breaking CI config parsing on PRs (590708e)
- Added `@anthropic-ai/claude-code` to the default trusted dependency list (5c59842)
