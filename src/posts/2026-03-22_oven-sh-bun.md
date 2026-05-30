---
date: 2026-03-22
repo: oven-sh/bun
size: M
title: "WebKit engine bump updates Bun internals"
excerpt: "Bun upgrades its WebKit dependency and adjusts several bindings and test allowances to match the new engine."
commits: 1
authors: [sosukesuzuki]
commit_authors: {"7336160": sosukesuzuki}
---

### **WebKit upgraded to fc9f2fa** (7336160)
Bun bumps its bundled WebKit/JavaScriptCore revision to `fc9f2fa7272fec64905df6a9c78e15d7912f14ca`, pulling in upstream engine changes. The follow-up touches multiple bindings and runtime hooks to keep Bun aligned with the newer embedder API, plus a test timeout tweak and Windows baseline updates.
