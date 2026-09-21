---
date: 2026-09-20
repo: jsr-io/jsr
period: weekly
slug: 2026-W38
period_label: "Sep 14–20, 2026"
size: M
title: "Security-focused dependency refresh clears alert backlog"
excerpt: "A broad Rust dependency upgrade closed Dependabot security alerts and updated auth, tracing, HTTP, and parsing crates with needed code adjustments."
commits: 1
---

### Security and dependency refresh
**Dependabot alert cleanup** — A broad Rust dependency upgrade landed to clear all open security alerts, with lockfiles regenerated across the main workspace and workers package.

**API and manifest adjustments** — The refresh included several nontrivial version jumps in HTTP, OAuth, OpenTelemetry, JWT, and tree-sitter-related crates, plus manifest tweaks to keep reqwest features isolated and switch OTLP export to blocking HTTP.

### Other misc changes
**Compile updates for upgraded crates** — Internal code was adjusted where needed to match the newer auth, tracing, and parser APIs, along with assorted transitive bumps and lockfile churn.
