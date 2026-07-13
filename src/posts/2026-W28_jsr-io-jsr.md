---
date: 2026-07-12
repo: jsr-io/jsr
period: weekly
slug: 2026-W28
period_label: "Jul 6–12, 2026"
size: M
title: "JSR tightens docs access and hardens login with captcha"
excerpt: "Docs and diffs were restricted around latest versions, symbol indexing was disabled, and login now requires Turnstile verification."
commits: 3
---

### Security and access controls tightened
**Login now requires Cloudflare Turnstile**
The `/login/:service` flow was changed to a POST-backed captcha check before OAuth state is created, closing the direct-login bypass and switching the redirect to 303.

**Docs are limited to the latest published version**
Package docs now only serve the newest release; older-version requests return a 404-style response and redirects are centralized on the latest version.

**Diff pages were disabled behind a flag**
The diff experience was removed from navigation and routes, though the implementation remains in place for potential re-enablement.

### Search indexing was pared back
**Symbol indexing to Algolia was turned off**
Publishing no longer sends symbol data to Algolia, reducing indexing work and avoiding symbol record storage while the feature is disabled.

### Other misc changes
- Added new API error variants for the latest-only docs and disabled diff flows
- Added DB query metadata for latest-version package lookup
- Wired up Turnstile config, secrets, Terraform, and frontend login form updates
- Small test fixture, guard, and annotation cleanups
