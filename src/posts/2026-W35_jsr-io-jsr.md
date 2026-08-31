---
date: 2026-08-30
repo: jsr-io/jsr
period: weekly
slug: 2026-W35
period_label: "Aug 24–30, 2026"
size: L
title: "JSR tightens docs, metadata, and ticketing flows"
excerpt: "Weekly updates improved inbound support email, docs/source performance, package pages, and fixed stale metadata and manifest caching bugs."
commits: 31
---

### **Support email and ticketing moved to a real workflow**
Inbound support mail is now treated as first-class ticket traffic, with threaded replies, attachments, internal notes, canned responses, and safer failure handling when sender config is missing. The ticket UI and redirects were also updated so staff can claim and reply without dead ends.

### **Docs and source pages got faster and more accurate**
JSR improved docs rendering and source views with HTML previews for markdown, better import/export links, package-level documented-symbol counts, and more accurate usage snippets and `deno create` hints. The docs pipeline was updated for newer `deno_doc`/`deno_graph` behavior, and symbol listings now avoid runaway output by capping oversized packages.

### **Publishing and version metadata fixes**
Publishing now avoids oversized `meta` rows that could wedge package-version tasks, and staff can recompute stale version score metadata through a new admin path. JSR also fixed declaration-specifier rewrites in generated npm types, plus manifest purges so newly published or updated version data is no longer hidden behind stale cache entries.

### **Performance improvements across core API paths**
The dependency graph endpoint was reworked to build from metadata captured at publish time instead of downloading every transitive module on demand, and docs/source asset fetches now go through an object cache to avoid repeated bucket reads. CI also got a more reliable Docker cache path, helping keep API builds moving.

### **Package pages and docs response limits were cleaned up**
Historical package version pages now render correctly instead of redirecting to latest docs, and docs search endpoints now fail fast for packages whose symbol listings would create oversized responses. Several smaller fixes improved markdown anchors, syntax highlighting, deprecated-symbol display, and npm-ecosystem instructions.

### Other misc changes
- Added SQLx metadata and related migration/plumbing updates
- Updated build and routing/cache wiring for newer Deno and graph/doc dependencies
- Expanded tests around email delivery, docs scoring, npm type rewrites, and cache behavior
