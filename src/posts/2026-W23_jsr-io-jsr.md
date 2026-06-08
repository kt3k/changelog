---
date: 2026-06-07
repo: jsr-io/jsr
period: weekly
slug: 2026-W23
period_label: "Jun 1–7, 2026"
size: L
title: "JSR starts splitting its API into Cloudflare Workers"
excerpt: "A new edge Worker takes over read-only endpoints, shared types are extracted, and observability plus key packaging/provenance fixes land."
commits: 19
---

### API split begins at the edge
**Worker front-end takes over metadata endpoints** — The new `workers-rs` front for `api.jsr.io` now serves `/api/stats` and `/api/metrics`, while a catch-all proxy forwards everything else to the existing compute service. This makes the split transparent for unmigrated routes and establishes the Worker as the new entry point.

**Shared API types moved into `jsr_types`** — Common IDs and response models were extracted into a wasm-safe crate so both the native API and the Worker can share one wire format. This was a prerequisite for keeping responses consistent across runtimes.

**Worker database path proved with Hyperdrive** — The Worker successfully opened a Postgres connection through Cloudflare Hyperdrive and ran `SELECT 1`, showing the wasm runtime can reach the database layer end-to-end. That lays groundwork for moving more API logic out of Cloud Run.

### Observability shifts to managed OTLP and Cloudflare exports
**API traces now export over OTLP/HTTP** — Tracing moved off OTLP/gRPC and Cloud Trace to OTLP/HTTP via `reqwest`, with deployment/config changes for Grafana Cloud headers and metadata.

**Cloudflare Workers observability enabled** — Logs and traces are now exported natively for the frontend and load balancer, reducing reliance on local invocation log storage and aligning edge observability with the new runtime split.

### Important fixes in packaging, provenance, and docs
**Provenance DSSE decoding accepts URL-safe base64** — The verifier now handles both standard and URL-safe payloads, fixing failures for envelopes using `-`/`_` characters.

**npm tarball permissions corrected** — Packaged files now emit with `0o644` instead of `0o777`, avoiding unwanted executable bits in installed packages.

**README root-relative links resolve correctly** — Links like `/LICENSE` and `/docs/...` now resolve from the repository root on `jsr.io`, fixing broken rendered README navigation.

### Other misc changes
- Accessibility and UX polish across the frontend: better labels/ARIA, improved tooltip stacking, safer mobile wrapping, and a fix for unsupported saved usage preferences.
- CI/build/Terraform cleanup to support the new Worker path and remove frontend Cloud Run pieces.
- Minor docs, comments, auth/tracing/config, and dependency lockfile updates.
