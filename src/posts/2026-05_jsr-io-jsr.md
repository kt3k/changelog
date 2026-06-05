---
date: 2026-05-31
repo: jsr-io/jsr
period: monthly
slug: 2026-05
period_label: "May 2026"
size: L
title: "Frontend overhaul and edge caching reduce origin load"
excerpt: "JSR moved its frontend to Vite and Cloudflare Workers, fixed auth/docs regressions, and added rate limiting plus CDN caching for hot paths."
commits: 9
---

### **Frontend platform migration lands**
The biggest change this month was a full frontend refresh: the app moved from the old build/dev stack to Vite, with Fresh/Preact and tooling updated alongside it. Static assets were reorganized, the Docker image and type config were revised, and the frontend was then cut over to run as its own Cloudflare Worker behind a service binding instead of Cloud Run.

### **Docs rendering fixed under the new build**
The Vite migration exposed a docs path resolution bug, which was corrected so markdown is loaded from the repo-relative docs directory again. E2E coverage was also added for docs page rendering to guard the new setup.

### **Auth and staff checks corrected**
IAM scope handling was fixed so staff detection now distinguishes between an omitted user and an explicit null value. That restores correct authorization behavior for sudo/admin-style capability checks.

### **Edge protection and caching added**
The frontend proxy gained per-IP rate limiting using Cloudflare bindings to slow scraper-driven cache misses, and the limit was later raised to ease pressure on legitimate traffic. In parallel, several hot read paths were made cacheable at the CDN: user profile and scope endpoints, sitemap responses, and package manifest uploads now use cache-friendly headers, with publish flows explicitly purging affected manifests to avoid stale data.

### Other misc changes
- CI/build and Terraform updates for the new frontend deployment flow
- Legacy Cloud Run fallback and architecture/docs cleanup
- Lockfile churn and small import/file-structure tweaks
