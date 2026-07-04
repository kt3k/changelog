---
date: 2026-07-03
repo: nodejs/node
size: M
title: "Node tightens HTTP CONNECT and security docs"
excerpt: "A CONNECT host-header fix lands alongside a security-note update and several workflow/dependency bumps."
commits: 14
authors: [aduh95, Archkon, mcollina, hamidrezaghavami]
commit_authors: {"dc15da3": aduh95, "0e2126d": Archkon, "8410a91": mcollina}
---

### **HTTP CONNECT now preserves the target host header** (0e2126d)
`http.request()` now uses the CONNECT target as the `Host` header when one isn't explicitly set, instead of reusing the proxy host. This fixes proxy tunnel behavior and adds regression coverage for both the default CONNECT header and TLS-over-HTTP tunneling.

### **Security docs clarify V8 flags are out of scope** (8410a91)
`SECURITY.md` was updated to spell out that V8 flags are outside Node's threat model. This is a policy/documentation change, but it matters for how the project frames security expectations and disclosures.

### **Internal property-definition helpers hardened** (dc15da3)
Several internal modules switched to prototype-null descriptor objects or bulk descriptor APIs when copying/defining properties. This is a defense-in-depth refactor that reduces the chance of prototype pollution or inherited-property surprises in debugger, HTTP/2, DOMException, and test-mocking internals.

### Other misc changes
- Dependency bumps in ESLint tooling and GitHub Actions workflows, including `actions/checkout`, `actions/cache`, `setup-python`, CodeQL actions, Codecov, and Slack notify.
- Small doc typo fix in `node-config-schema.json` and `src/node_options.cc`.
