---
date: 2026-10-21
repo: denoland/deno
size: M
title: "Deno adds npm lockfile caching and release tweaks"
excerpt: "Installers now keep node_modules lockfile copies to avoid re-resolving, alongside a rustls bump and release workflow fixes."
commits: 5
authors: [bartlomieju, denobot, dsherret, ump45nose]
commit_authors: {"4c3579c": dsherret, "41d4085": bartlomieju}
---

### **npm installs now persist a lockfile copy in node_modules** (4c3579c)
Deno now writes a filtered lockfile copy into `node_modules` during package caching, so npm packages can be re-used without re-resolving if the workspace lockfile disappears. This should make installs and subsequent script runs more resilient and faster, especially in workflows that clean the project tree.

### **Release promotion now reads the Cloudflare zone ID from secrets** (41d4085)
The CDN purge step in the release-promotion workflow switched from `vars.CLOUDFLARE_ZONE_ID` to `secrets.CLOUDFLARE_ZONE_ID`. That tightens how the release automation handles sensitive deployment data.

### Other misc changes
- Forwarded the v2.9.8 release commit to `main` and refreshed generated CI/version metadata.
- Bumped `rustls` to 0.23.46.
- Added `lts` to the `deno upgrade` usage text.
