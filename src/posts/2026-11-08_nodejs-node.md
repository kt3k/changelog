---
date: 2026-11-08
repo: nodejs/node
size: M
title: "HTTP/2 header handling gets smarter"
excerpt: "HTTP/2 now preserves repeated content-encoding values, alongside a worker ELU test deflake and a markdown lint refresh."
commits: 4
authors: [inoway46, mcollina, jay23606]
commit_authors: {"768315c": mcollina, "82940d6": inoway46, "b48b454": inoway46, "467462e": jay23606}
---

### **HTTP/2 now preserves repeated content-encoding values** (b48b454)
`content-encoding` is no longer treated as a single-value HTTP/2 header, so repeated codings are preserved and outgoing arrays are accepted instead of throwing `ERR_HTTP2_HEADER_SINGLE_VALUE`. The docs and tests were updated to reflect the new behavior, including strict validation cases and ordering of multiple codings.

### **Worker event-loop utilization test is deflaked** (768315c)
The sequential worker ELU test now measures how long the initial `workerELU()` read takes and subtracts that skew from the assertion. This tightens a timing-sensitive check that could otherwise undercount a 50ms spin when the parent thread stalls.

### Other misc changes
- Markdown lint dependencies refresh and Makefile rebuild trigger update (82940d6)
- Skip the readFileSync pipe short-read test when `/proc/self/io` is unavailable (467462e)
