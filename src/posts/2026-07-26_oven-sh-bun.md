---
date: 2026-07-26
repo: oven-sh/bun
size: M
title: "Builder images refreshed for new secret flow"
excerpt: "CI builder images were republished with updated bootstrap logic, moving Buildkite token lookup to cloud secrets and trimming launch tags."
commits: 1
authors: [Jarred-Sumner]
commit_authors: {"43d60f6": Jarred-Sumner}
---

### **Builder images refreshed for current agent bootstrap** (43d60f6)
Republished the builder images with updated bootstrap logic so Buildkite agents can fetch their registration token from cloud secret stores instead of launch-time tags. AWS now reads from Secrets Manager and Azure from Key Vault, with a fallback to the older metadata tag path for pre-secret images.

This also removes token-related launch parameters/tags from machine provisioning, tightening how credentials are passed to CI machines and reducing dependence on instance metadata for new images.

### Other misc changes
- None beyond the builder-image/bootstrap refresh.
