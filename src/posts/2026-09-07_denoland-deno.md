---
date: 2026-09-07
repo: denoland/deno
size: S
title: "Deno config schema gains desktop app identifier"
excerpt: "A config schema fix adds the missing desktop.app.identifier field for reverse-DNS app IDs."
commits: 1
authors: [ErikAbele]
commit_authors: {"60e01b1": ErikAbele}
---

### **Desktop app identifier added to config schema** (60e01b1)
The JSON schema now includes `desktop.app.identifier`, described as a reverse-DNS application identifier like `com.example.myapp`. This fixes validation/documentation for configs that already rely on the field.

### Other misc changes
- None
