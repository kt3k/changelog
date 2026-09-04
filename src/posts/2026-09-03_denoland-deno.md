---
date: 2026-09-03
repo: denoland/deno
size: M
title: "Telemetry span leak fix, CI cleanup"
excerpt: "Deno fixed toplevel fetch/cron tracing leaks and removed obsolete gcloud auth steps from release/compat workflows."
commits: 2
authors: [CertainLach, piscisaureus]
commit_authors: {"a961cde": CertainLach, "c5e973b": piscisaureus}
---

### **Fix toplevel fetch/cron spans from leaking telemetry context** (a961cde)
`fetch()` and cron execution now use a dedicated `exitSpan()` path instead of restoring async context with a truthy check. This fixes cases where a valid “no ambient context” snapshot could be mistaken for “did not enter,” preventing span/context leaks in top-level fetch and cron tracing.

### **Drop obsolete gcloud auth steps from CI workflows** (c5e973b)
Several workflows were simplified after the `dl.deno.land` move: compatibility tests and post-publish no longer authenticate to Google Cloud, and the release upload step was collapsed into a single cross-platform path. This trims dead CI setup and removes Windows-only upload branching that was no longer needed.

### Other misc changes
- Telemetry internals export wiring updated for the new span exit helper.
- Workflow YAML regenerated after CI script changes.
