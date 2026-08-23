---
date: 2026-08-22
repo: vitejs/vite
size: S
title: "Import sorting sweep across docs and templates"
excerpt: "Vite adopts oxfmt import sorting across docs, templates, and config files, plus one minor eslint cleanup."
commits: 2
authors: [btea, sapphi-red]
commit_authors: {"a98c8d9": btea, "97ad042": sapphi-red}
---

### Other misc changes
- Adopted `oxfmt` `sortImports` across docs, theme components, and create-vite templates, mostly reshuffling import order for consistency (97ad042).
- Removed an unnecessary eslint-disable comment in a playground CSS example (a98c8d9).
