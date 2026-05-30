---
date: 2026-03-01
repo: denoland/deno
size: M
title: "Env file ordering fix lands"
excerpt: "Deno now applies multiple env files in the documented order, alongside a libuv-sys-lite bump and a flaky WPT exclusion."
commits: 3
authors: [Tango992, bartlomieju]
commit_authors: {"8782736": bartlomieju, "0d2ef7c": Tango992, "9cab294": Tango992}
---

### **Load multiple env files in the correct order** (9cab294)
Deno now processes env files in the order they were provided instead of reversing them first. This matches `dotenvy`'s precedence rules, so later env files can correctly override earlier ones.

### Other misc changes
- Bumped `libuv-sys-lite` to `1.48.3` with `dyn-symbols` enabled (0d2ef7c)
- Disabled a flaky WPT expectation for `remote-close.any.worker.html?default` (8782736)
