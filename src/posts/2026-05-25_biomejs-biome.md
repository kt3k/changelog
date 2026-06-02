---
date: 2026-05-25
repo: biomejs/biome
size: M
title: "CLI test isolation and CI image refresh"
excerpt: "Fixed leaky CLI tests by using a current-thread Tokio runtime, and refreshed the Rust Docker digest in GitHub Actions."
commits: 2
authors: [ematipico]
commit_authors: {"19c7141": ematipico}
---

### **Leaky CLI tests now use a current-thread runtime** (19c7141)
The CLI test helper was switched from `Runtime::new()` to a `tokio::runtime::Builder::new_current_thread().enable_all().build()`, which should make the test harness more deterministic and avoid cross-thread leakage. This is a targeted fix for flaky or stateful CLI tests.

### Other misc changes
- Updated the `rust:1.95.0-bullseye` Docker digest in beta, preview, and release workflows (1 commit).
