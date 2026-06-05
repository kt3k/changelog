---
date: 2026-06-04
repo: vitejs/vite
size: M
title: "Vite adds Cloudflare banner and support update"
excerpt: "A new top banner and blog post announce Cloudflare backing Vite, alongside template and docs updates."
commits: 5
authors: [sapphi-red, TheAlexLichter, DucMinhNe]
commit_authors: {"4551a4b": TheAlexLichter, "67f5d4b": sapphi-red, "00edb41": sapphi-red, "d58c470": DucMinhNe, "fef134a": sapphi-red}
---

### **Cloudflare support takes center stage** (4551a4b)
Vite’s docs site now ships a new dismissible top banner pointing to a dedicated announcement post, replacing the previous Vite+ alpha promotion. The change also wires in a new banner component via theme aliasing, making it easier to surface future site-wide announcements.

### **Cloudflare partnership announcement published** (67f5d4b)
The docs blog adds a full post explaining that VoidZero is joining Cloudflare while Vite remains MIT-licensed, vendor-neutral, and stewarded by the same broader team. It also introduces the matching social image asset used for the announcement.

### **create-vite templates switch Node resolution mode** (fef134a)
All TypeScript app templates in `create-vite` now use `"moduleResolution": "nodenext"` in `tsconfig.node.json` instead of `bundler`. This should align the starter configs more closely with Node-style resolution expectations for tooling and config files.

### **Other misc changes**
- Bundled `@voidzero-dev/vite-task-client` into `packages/vite` package metadata and license docs (00edb41).
- Updated the documented `baseline-widely-available` browser target to include `ios16.4` (d58c470).
