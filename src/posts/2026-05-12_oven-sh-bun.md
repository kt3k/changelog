---
date: 2026-05-12
repo: oven-sh/bun
size: M
title: "HTTP/3 rename lands; WebKit deadlock fixed"
excerpt: "Bun.serve’s HTTP/3 options were renamed and docs updated, WebKit was bumped to fix a require(ESM) deadlock, and two import hang regressions were pinned."
commits: 5
authors: [alii, Jarred-Sumner]
commit_authors: {"0d9b296": Jarred-Sumner, "314ffe3": alii, "2043f9c": alii}
---

### **Bun.serve HTTP/3 options renamed to `http3`/`http1`** (0d9b296)
`Bun.serve()`’s experimental QUIC options were renamed from `h3`/`h1` to `http3`/`http1`, with type definitions, tests, benchmarks, and docs updated to match. The change also adds new HTTP/3 documentation, including `http1: false` for HTTP/3-only mode and clearer notes about TLS and UDP requirements.

### **WebKit bumped to fix a require(ESM) diamond-dep deadlock** (2043f9c)
Bun now tracks WebKit `5488984d`, bringing in the JavaScriptCore fix for a double-fired module-settlement path that could deadlock or assert when `require()` hit an ESM diamond dependency. A regression test was added to cover the deadlock case and confirm the module resolves normally.

### **Repeated dynamic imports that throw no longer hang** (314ffe3)
Two regression tests were added for cases where a second `await import()` of an already-failed module used to hang instead of re-throwing. This guards both the same-path retry and the X/Y/X interleave variant that had been reported in the issue tracker.

### Other misc changes
- Docs-only follow-up to the HTTP/3 rename to keep the inline code span Prettier-stable.
- GitHub Actions workflow pins across the repo (25 commits worth of action/version updates collapsed into one change).
