---
date: 2026-08-09
repo: jsr-io/jsr
period: weekly
slug: 2026-W32
period_label: "Aug 3–9, 2026"
size: M
title: "WAF hardens scraping defense; provenance check fixed"
excerpt: "Provenance verification now matches the published manifest, while frontend anti-scraping moved into Cloudflare WAF to save Worker capacity."
commits: 3
---

### **Provenance verification now matches the published manifest**
The attestations check was corrected to compare `subject.digest.sha256` against the stored `<version>_meta.json` manifest digest, aligning verification with what the Deno CLI signs. This closes a bug that could reject valid provenance or validate the wrong bytes.

### **Frontend scraping protection moved earlier into Cloudflare WAF**
Anti-scraping controls were moved out of the LB Worker and into WAF phases, so blocked requests are stopped before any Worker execution. That reduces unnecessary compute on scraper traffic and leaves the raw module-serving path unchanged.

### **Production Cloud SQL was downsized**
The main PostgreSQL instance was reduced from `db-custom-4-8192` to `db-custom-2-6144` and switched from regional HA to zonal. This is an operational cost-saving change, but it trades away automatic failover and some capacity.

### Other misc changes
- Provenance-related DB/query cleanup and test fixture updates
- Removed the old LB-side limiter and helper/tests
- Added WAF/Terraform config and CI coverage for the new protection path
- Small Terraform config adjustments
