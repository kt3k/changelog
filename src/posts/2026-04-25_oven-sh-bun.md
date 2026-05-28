---
date: 2026-04-25
repo: oven-sh/bun
size: M
title: "WebKit engine upgrade lands; date test hardened"
excerpt: "Bun updates to a newer WebKit with broad cast API churn and baseline allowlist changes, plus a flaky date assertion is made ICU-safe."
commits: 2
authors: [sosukesuzuki, dylan-conway]
commit_authors: {"73e8889": sosukesuzuki, "ed1c48f": dylan-conway}
---

### **WebKit upgraded with module-loader rewrite fallout** (73e8889)
Bun bumps its embedded WebKit to `f5f6c3f654bd` / upstream `aac4aed489d1`, replacing the earlier bisect-revert path and pulling in the latest upstream mainline directly. The upgrade forces a large `jsCast`/`jsDynamicCast` API migration across 1,500+ call sites and updates static baseline allowlists for new/changed JSC symbols, so it’s a meaningful engine-sync with broad internal churn.

### **Intl date regression test now checks values, not formatting** (ed1c48f)
The V8 date-parser regression test now compares numeric year/month/day parts via `formatToParts()` instead of asserting a locale-specific rendered string. That keeps the test validating the real calendar behavior while avoiding macOS ICU/CLDR formatting differences across OS releases.

### Other misc changes
- WebKit version pin updated in the build script.
- Static baseline allowlists expanded for new simdutf and JSC symbols.
- Minor symbol/count updates in x64 baseline lists.
